from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify
from django.utils import timezone
import uuid

# Import the models we need from users
from users.models import UpperclassUser, School

# =============== CourseCategory Model ===============
class CourseCategory(models.Model):
    """Category for organizing courses"""
    
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True, help_text="FontAwesome icon class")
    color = models.CharField(max_length=7, default='#4F46E5', help_text="Hex color code")
    order = models.IntegerField(default=0, help_text="Display order")
    
    class Meta:
        verbose_name = 'Course Category'
        verbose_name_plural = 'Course Categories'
        ordering = ['order', 'name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

# =============== CourseSource Model ===============
class CourseSource(models.Model):
    """Sources where courses are imported from"""
    
    SOURCE_TYPES = (
        ('khan_academy', 'Khan Academy'),
        ('coursera', 'Coursera'),
        ('edx', 'edX'),
        ('youtube', 'YouTube Educational'),
        ('openstax', 'OpenStax'),
        ('mit_ocw', 'MIT OpenCourseWare'),
        ('custom', 'Custom Upload'),
        ('upperclass_ai', 'Upperclass AI Generated'),
    )
    
    name = models.CharField(max_length=100)
    source_type = models.CharField(max_length=50, choices=SOURCE_TYPES)
    base_url = models.URLField(blank=True)
    api_key = models.CharField(max_length=200, blank=True)
    api_secret = models.CharField(max_length=200, blank=True)
    
    # Configuration
    is_active = models.BooleanField(default=True)
    sync_frequency = models.CharField(max_length=20, default='daily', choices=[
        ('hourly', 'Hourly'),
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('manual', 'Manual'),
    ])
    
    # Sync tracking
    last_sync = models.DateTimeField(null=True, blank=True)
    last_sync_status = models.CharField(max_length=20, default='pending', choices=[
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed'),
    ])
    last_sync_error = models.TextField(blank=True)
    
    # Rate limiting
    requests_per_minute = models.IntegerField(default=60)
    daily_request_limit = models.IntegerField(default=1000)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
        verbose_name_plural = 'Course Sources'
    
    def __str__(self):
        return f"{self.name} ({self.get_source_type_display()})"

# =============== CourseImportJob Model ===============
class CourseImportJob(models.Model):
    """Tracks course import jobs"""
    
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('extracting', 'Extracting Knowledge'),
        ('embedding', 'Generating Embeddings'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    )
    
    source = models.ForeignKey(CourseSource, on_delete=models.CASCADE, related_name='import_jobs')
    source_url = models.URLField()
    job_id = models.CharField(max_length=100, unique=True, db_index=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # User who initiated the import (if any)
    initiated_by = models.ForeignKey(UpperclassUser, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Processing parameters
    max_chunks = models.IntegerField(default=100, help_text="Maximum number of knowledge chunks to extract")
    generate_embeddings = models.BooleanField(default=True, help_text="Generate vector embeddings for chunks")
    analyze_with_ai = models.BooleanField(default=True, help_text="Analyze content with AI for metadata")
    
    # Results
    total_chunks_extracted = models.IntegerField(default=0)
    chunks_with_embeddings = models.IntegerField(default=0)
    failed_extractions = models.IntegerField(default=0)
    error_chunks = JSONField(default=list, blank=True, help_text="Chunks that failed processing")
    
    # Processing metadata
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True)
    error_traceback = models.TextField(blank=True)
    
    # Performance metrics
    processing_time = models.FloatField(null=True, blank=True, help_text="Total processing time in seconds")
    embedding_time = models.FloatField(null=True, blank=True, help_text="Time spent generating embeddings")
    ai_analysis_time = models.FloatField(null=True, blank=True, help_text="Time spent on AI analysis")
    
    # File attachments (for file uploads)
    uploaded_file = models.FileField(upload_to='course_imports/', null=True, blank=True)
    file_name = models.CharField(max_length=255, blank=True)
    file_size = models.BigIntegerField(null=True, blank=True, help_text="File size in bytes")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Course Import Job'
        verbose_name_plural = 'Course Import Jobs'
        indexes = [
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['job_id']),
            models.Index(fields=['source', 'status']),
        ]
    
    def __str__(self):
        return f"Import {self.job_id} from {self.source.name}"
    
    def save(self, *args, **kwargs):
        # Set started_at when status changes to processing
        if self.status == 'processing' and not self.started_at:
            self.started_at = timezone.now()
        
        # Set completed_at when job finishes
        if self.status in ['completed', 'failed', 'cancelled'] and not self.completed_at:
            self.completed_at = timezone.now()
            
            # Calculate processing time
            if self.started_at and self.completed_at:
                self.processing_time = (self.completed_at - self.started_at).total_seconds()
        
        super().save(*args, **kwargs)
    
    @property
    def is_completed(self):
        return self.status == 'completed'
    
    @property
    def is_failed(self):
        return self.status == 'failed'
    
    @property
    def is_running(self):
        return self.status in ['processing', 'extracting', 'embedding']
    
    def mark_as_failed(self, error_message, traceback=None):
        """Mark the job as failed with error message"""
        self.status = 'failed'
        self.error_message = str(error_message)[:1000]  # Limit length
        if traceback:
            self.error_traceback = str(traceback)[:2000]
        self.save()

# =============== Course Model ===============
class Course(models.Model):
    """Main course model"""
    
    COURSE_TYPES = (
        ('upperclass_ai', 'Upperclass AI Generated'),
        ('imported', 'Imported from Source'),
        ('custom', 'Custom School Course'),
        ('community', 'Community Created'),
    )
    
    DIFFICULTY_LEVELS = (
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('mixed', 'Mixed Levels'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField()
    short_description = models.CharField(max_length=300, blank=True)
    
    # Classification
    category = models.ForeignKey(CourseCategory, on_delete=models.SET_NULL, null=True, related_name='courses')
    course_type = models.CharField(max_length=20, choices=COURSE_TYPES, default='upperclass_ai')
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_LEVELS, default='beginner')
    
    # Content
    thumbnail = models.ImageField(upload_to='course_thumbnails/', null=True, blank=True)
    preview_video_url = models.URLField(blank=True)
    
    # Metadata
    tags = ArrayField(
        models.CharField(max_length=50),
        default=list,
        blank=True,
        help_text="Tags for search and categorization"
    )
    estimated_hours = models.FloatField(
        default=5.0,
        validators=[MinValueValidator(0.5)],
        help_text="Estimated completion time in hours"
    )
    language = models.CharField(max_length=10, default='en', choices=[
        ('en', 'English'),
        ('es', 'Spanish'),
        ('fr', 'French'),
        ('de', 'German'),
    ])
    
    # Prerequisites
    prerequisites = models.ManyToManyField('self', symmetrical=False, blank=True)
    required_skills = ArrayField(models.CharField(max_length=100), default=list, blank=True)
    
    # Source information
    source = models.ForeignKey(CourseSource, on_delete=models.SET_NULL, null=True, blank=True, related_name='courses')
    source_url = models.URLField(blank=True)
    source_name = models.CharField(max_length=100, blank=True)
    imported_date = models.DateTimeField(null=True, blank=True)
    
    # AI-generated fields
    ai_generated = models.BooleanField(default=False)
    ai_model_used = models.CharField(max_length=100, blank=True)
    ai_generated_at = models.DateTimeField(null=True, blank=True)
    
    # School association
    school = models.ForeignKey(School, on_delete=models.CASCADE, null=True, blank=True, related_name='courses')
    created_by = models.ForeignKey(UpperclassUser, on_delete=models.SET_NULL, null=True, related_name='created_courses')
    
    # Status
    is_published = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    is_free = models.BooleanField(default=True)
    
    # Statistics
    enrolled_count = models.IntegerField(default=0)
    average_rating = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)]
    )
    review_count = models.IntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug', 'is_published']),
            models.Index(fields=['category', 'difficulty']),
            models.Index(fields=['is_featured', 'is_published']),
        ]
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)
    
    @property
    def total_modules(self):
        return self.modules.count()
    
    @property
    def total_lessons(self):
        from django.db.models import Count
        return self.modules.aggregate(
            total_lessons=Count('lessons')
        )['total_lessons'] or 0

# =============== Module Model ===============
class Module(models.Model):
    """Module/Chapter within a course"""
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, blank=True)
    description = models.TextField()
    order = models.IntegerField(default=0)
    difficulty = models.CharField(max_length=20, choices=Course.DIFFICULTY_LEVELS, default='beginner')
    
    # AI-enriched content
    key_concepts = ArrayField(
        models.CharField(max_length=100),
        default=list,
        blank=True,
        help_text="Key concepts covered in this module"
    )
    learning_objectives = ArrayField(
        models.CharField(max_length=200),
        default=list,
        blank=True,
        help_text="Learning objectives for this module"
    )
    common_misconceptions = JSONField(
        default=list,
        blank=True,
        help_text="Common misconceptions students have about this topic"
    )
    
    # Multimedia
    thumbnail = models.ImageField(upload_to='module_thumbnails/', null=True, blank=True)
    video_intro_url = models.URLField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order']
        unique_together = ['course', 'order']
    
    def __str__(self):
        return f"{self.course.title} - {self.title}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.course.slug}-{self.title}")
        super().save(*args, **kwargs)
    
    @property
    def total_lessons(self):
        return self.lessons.count()
    
    @property
    def estimated_time(self):
        """Estimated time to complete module in minutes"""
        return self.lessons.aggregate(
            total_time=models.Sum('estimated_minutes')
        )['total_time'] or 0

# =============== Lesson Model ===============
class Lesson(models.Model):
    """Individual lesson within a module"""
    
    LESSON_TYPES = (
        ('theory', 'Theory/Lecture'),
        ('practice', 'Practice Problem'),
        ('example', 'Worked Example'),
        ('quiz', 'Quiz/Assessment'),
        ('project', 'Project/Assignment'),
        ('reading', 'Reading Material'),
        ('video', 'Video Lecture'),
        ('interactive', 'Interactive Exercise'),
    )
    
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, blank=True)
    lesson_type = models.CharField(max_length=20, choices=LESSON_TYPES, default='theory')
    order = models.IntegerField(default=0)
    
    # Content (varies by type)
    content = models.TextField(blank=True, help_text="For theory lessons")
    problem_statement = models.TextField(blank=True, help_text="For practice problems")
    solution = models.TextField(blank=True, help_text="For practice solutions")
    examples = JSONField(default=list, blank=True, help_text="List of examples with explanations")
    questions = JSONField(default=list, blank=True, help_text="For quizzes and assessments")
    
    # AI metadata
    ai_difficulty_score = models.FloatField(
        default=0.5,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        help_text="AI-assessed difficulty (0-1)"
    )
    ai_prerequisites = ArrayField(
        models.CharField(max_length=100),
        default=list,
        blank=True,
        help_text="Prerequisite concepts identified by AI"
    )
    ai_generated_hints = JSONField(
        default=list,
        blank=True,
        help_text="AI-generated hints for solving problems"
    )
    
    # Multimedia
    video_url = models.URLField(blank=True)
    image_url = models.URLField(blank=True)
    audio_url = models.URLField(blank=True)
    interactive_element = JSONField(
        default=dict,
        blank=True,
        help_text="Configuration for interactive components"
    )
    
    # Learning aids
    key_terms = ArrayField(
        models.CharField(max_length=100),
        default=list,
        blank=True,
        help_text="Key terms introduced in this lesson"
    )
    learning_tips = models.TextField(blank=True, help_text="Tips for learning this content")
    common_mistakes = JSONField(
        default=list,
        blank=True,
        help_text="Common mistakes students make"
    )
    
    # Progress tracking
    estimated_minutes = models.IntegerField(default=15, validators=[MinValueValidator(1)])
    points = models.IntegerField(default=10, help_text="Points awarded for completion")
    
    # Status
    is_published = models.BooleanField(default=True)
    requires_completion = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order']
        unique_together = ['module', 'order']
        verbose_name = 'Lesson'
        verbose_name_plural = 'Lessons'
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.module.slug}-{self.title}")
        super().save(*args, **kwargs)

# =============== AIKnowledgeChunk Model ===============
class AIKnowledgeChunk(models.Model):
    """Atomic pieces of knowledge for AI training"""
    
    CONTENT_TYPES = (
        ('concept', 'Concept Explanation'),
        ('example', 'Worked Example'),
        ('problem', 'Practice Problem'),
        ('definition', 'Definition'),
        ('analogy', 'Analogies'),
        ('quiz', 'Quiz Question'),
        ('summary', 'Topic Summary'),
        ('tip', 'Learning Tip'),
        ('warning', 'Common Mistake Warning'),
        ('application', 'Real-world Application'),
    )
    
    TEACHING_STRATEGIES = (
        ('direct_instruction', 'Direct Instruction'),
        ('socratic', 'Socratic Method'),
        ('worked_example', 'Worked Examples'),
        ('discovery', 'Discovery Learning'),
        ('analogy', 'Teaching by Analogy'),
        ('scaffolding', 'Scaffolding'),
        ('conceptual_change', 'Conceptual Change'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Content
    title = models.CharField(max_length=200)
    content = models.TextField()
    content_type = models.CharField(max_length=50, choices=CONTENT_TYPES, default='concept')
    
    # Metadata for AI learning
    difficulty_level = models.CharField(max_length=20, choices=Course.DIFFICULTY_LEVELS, default='intermediate')
    subject = models.CharField(max_length=100, db_index=True)
    topic = models.CharField(max_length=200, db_index=True)
    subtopics = ArrayField(
        models.CharField(max_length=100),
        default=list,
        blank=True
    )
    
    # Teaching metadata
    teaching_strategy = models.CharField(max_length=50, choices=TEACHING_STRATEGIES, default='direct_instruction')
    learning_objectives = ArrayField(
        models.CharField(max_length=200),
        default=list,
        blank=True
    )
    target_audience = models.CharField(max_length=100, blank=True, help_text="e.g., 'high school students', 'college freshmen'")
    
    # Concept relationships (knowledge graph)
    prerequisites = models.ManyToManyField(
        'self',
        symmetrical=False,
        blank=True,
        related_name='leads_to',
        help_text="Concepts that should be understood before this one"
    )
    related_concepts = models.ManyToManyField(
        'self',
        symmetrical=True,
        blank=True,
        related_name='_related_concepts'
    )
    
    # AI embeddings
    embedding = models.BinaryField(null=True, blank=True, help_text="Vector embedding for semantic search")
    embedding_model = models.CharField(max_length=100, blank=True, help_text="Which model generated the embedding")
    embedding_dimensions = models.IntegerField(default=1536, help_text="Dimensions of the embedding vector")
    embedding_generated_at = models.DateTimeField(null=True, blank=True)
    
    # Source tracking
    source = models.ForeignKey(CourseSource, on_delete=models.SET_NULL, null=True, blank=True)
    source_url = models.URLField(blank=True)
    source_metadata = JSONField(default=dict, blank=True)
    
    # Quality metrics (AI-assessed)
    clarity_score = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        help_text="How clear is the explanation (0-1)"
    )
    completeness_score = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        help_text="How complete is the information (0-1)"
    )
    accuracy_score = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        help_text="Factual accuracy (0-1)"
    )
    engagement_score = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        help_text="How engaging is the content (0-1)"
    )
    
    # Usage stats (for continuous learning)
    times_used = models.IntegerField(default=0, help_text="Number of times used in teaching")
    success_rate = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        help_text="How effective it was in teaching (0-1)"
    )
    user_ratings = JSONField(
        default=dict,
        blank=True,
        help_text="User ratings {'user_id': rating, ...}"
    )
    user_feedback = JSONField(
        default=list,
        blank=True,
        help_text="Detailed user feedback"
    )
    
    # AI analysis metadata
    ai_analyzed = models.BooleanField(default=False)
    ai_analysis_metadata = JSONField(default=dict, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_used = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['subject', 'topic', 'difficulty_level']),
            models.Index(fields=['content_type', 'teaching_strategy']),
            models.Index(fields=['clarity_score', 'accuracy_score']),
            models.Index(fields=['times_used', 'success_rate']),
        ]
        verbose_name = 'AI Knowledge Chunk'
        verbose_name_plural = 'AI Knowledge Chunks'
    
    def __str__(self):
        return f"{self.title} ({self.difficulty_level})"
    
    def update_success_rate(self, was_successful: bool):
        """Update success rate based on new outcome"""
        if self.times_used == 0:
            self.success_rate = 1.0 if was_successful else 0.0
        else:
            current_total = self.success_rate * self.times_used
            self.times_used += 1
            if was_successful:
                self.success_rate = (current_total + 1) / self.times_used
            else:
                self.success_rate = current_total / self.times_used
        
        from django.utils import timezone
        self.last_used = timezone.now()
        self.save()
    
    def add_user_rating(self, user_id, rating):
        """Add or update user rating"""
        if not isinstance(rating, int) or rating < 1 or rating > 5:
            raise ValueError("Rating must be an integer between 1 and 5")
        
        self.user_ratings[str(user_id)] = rating
        self.save()

# =============== AIKnowledgeGraph Model ===============
class AIKnowledgeGraph(models.Model):
    """Graph of how concepts relate to each other"""
    
    RELATIONSHIP_TYPES = (
        ('prerequisite', 'Prerequisite'),
        ('leads_to', 'Leads To'),
        ('similar_to', 'Similar To'),
        ('contrasts_with', 'Contrasts With'),
        ('example_of', 'Example Of'),
        ('part_of', 'Part Of'),
        ('application_of', 'Application Of'),
        ('specialization_of', 'Specialization Of'),
        ('generalization_of', 'Generalization Of'),
    )
    
    source_concept = models.ForeignKey(AIKnowledgeChunk, on_delete=models.CASCADE, related_name='outgoing_edges')
    target_concept = models.ForeignKey(AIKnowledgeChunk, on_delete=models.CASCADE, related_name='incoming_edges')
    relationship_type = models.CharField(max_length=50, choices=RELATIONSHIP_TYPES)
    strength = models.FloatField(
        default=1.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        help_text="Strength of the relationship (0-1)"
    )
    confidence = models.FloatField(
        default=0.8,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        help_text="Confidence in this relationship (0-1)"
    )
    
    # Source of this relationship
    source = models.CharField(max_length=50, choices=[
        ('ai_analyzed', 'AI Analyzed'),
        ('human_curated', 'Human Curated'),
        ('crowdsourced', 'Crowdsourced'),
        ('imported', 'Imported'),
    ], default='ai_analyzed')
    
    # Metadata
    ai_confirmed = models.BooleanField(default=False, help_text="Whether AI verified this relationship")
    needs_review = models.BooleanField(default=False, help_text="Needs human review")
    review_notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['source_concept', 'target_concept', 'relationship_type']
        verbose_name = 'AI Knowledge Graph Edge'
        verbose_name_plural = 'AI Knowledge Graph Edges'
        indexes = [
            models.Index(fields=['source_concept', 'relationship_type']),
            models.Index(fields=['target_concept', 'relationship_type']),
        ]
    
    def __str__(self):
        return f"{self.source_concept.title} -> {self.relationship_type} -> {self.target_concept.title}"

# =============== UserCourseProgress Model ===============
class UserCourseProgress(models.Model):
    """Tracks user progress through courses"""
    
    user = models.ForeignKey(UpperclassUser, on_delete=models.CASCADE, related_name='course_progress')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='user_progress')
    
    # Current position
    current_module = models.ForeignKey(Module, on_delete=models.SET_NULL, null=True, blank=True)
    current_lesson = models.ForeignKey(Lesson, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Progress metrics
    completion_percentage = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        help_text="Overall completion percentage (0-1)"
    )
    started_at = models.DateTimeField(auto_now_add=True)
    last_accessed = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    # Learning analytics
    time_spent = models.FloatField(default=0.0, help_text="Total time spent in minutes")
    quiz_scores = JSONField(default=dict, help_text="{quiz_id: score, ...}")
    weak_points = ArrayField(
        models.CharField(max_length=100),
        default=list,
        blank=True,
        help_text="Topics where user needs improvement"
    )
    
    # Module-level progress
    completed_modules = models.ManyToManyField(Module, blank=True, related_name='completed_by_users')
    completed_lessons = models.ManyToManyField(Lesson, blank=True, related_name='completed_by_users')
    
    # Session tracking
    last_session_duration = models.FloatField(default=0.0, help_text="Duration of last session in minutes")
    total_sessions = models.IntegerField(default=0)
    
    # Engagement metrics
    engagement_score = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        help_text="Overall engagement score (0-1)"
    )
    consistency_score = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        help_text="Learning consistency (0-1)"
    )
    
    # Notes and bookmarks
    user_notes = JSONField(default=list, blank=True, help_text="User's notes for this course")
    bookmarks = JSONField(default=list, blank=True, help_text="Bookmarked lessons and positions")
    
    class Meta:
        unique_together = ['user', 'course']
        verbose_name = 'User Course Progress'
        verbose_name_plural = 'User Course Progress'
        indexes = [
            models.Index(fields=['user', 'completed']),
            models.Index(fields=['course', 'completion_percentage']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.course.title} ({self.completion_percentage:.0%})"
    
    def save(self, *args, **kwargs):
        # Update completion percentage
        total_lessons = self.course.total_lessons
        if total_lessons > 0:
            completed_count = self.completed_lessons.count()
            self.completion_percentage = completed_count / total_lessons
            
            # Mark as completed if all lessons are done
            if completed_count == total_lessons and not self.completed:
                self.completed = True
                self.completed_at = timezone.now()
        
        super().save(*args, **kwargs)
    
    def complete_lesson(self, lesson):
        """Mark a lesson as completed"""
        if lesson not in self.completed_lessons.all():
            self.completed_lessons.add(lesson)
            
            # If this lesson is in the current module, check if module is complete
            if self.current_module and lesson.module == self.current_module:
                module_lessons = self.current_module.lessons.all()
                completed_module_lessons = self.completed_lessons.filter(module=self.current_module)
                
                if module_lessons.count() == completed_module_lessons.count():
                    self.completed_modules.add(self.current_module)
            
            self.save()
    
    def get_next_lesson(self):
        """Get the next lesson the user should take"""
        if not self.current_module:
            # Start with first module
            first_module = self.course.modules.first()
            if first_module:
                self.current_module = first_module
                self.save()
        
        if self.current_module:
            # Find first uncompleted lesson in current module
            completed_lesson_ids = self.completed_lessons.filter(module=self.current_module).values_list('id', flat=True)
            next_lesson = self.current_module.lessons.exclude(id__in=completed_lesson_ids).order_by('order').first()
            
            if next_lesson:
                return next_lesson
            else:
                # Move to next module
                next_module = self.course.modules.filter(order__gt=self.current_module.order).order_by('order').first()
                if next_module:
                    self.current_module = next_module
                    self.save()
                    return next_module.lessons.order_by('order').first()
        
        return None