from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

class TutorPersonality(models.Model):
    """Different personalities for the AI Tutor"""
    
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    # Personality traits (0-1 scale)
    formality = models.FloatField(default=0.5, validators=[MinValueValidator(0), MaxValueValidator(1)])
    enthusiasm = models.FloatField(default=0.7, validators=[MinValueValidator(0), MaxValueValidator(1)])
    patience = models.FloatField(default=0.8, validators=[MinValueValidator(0), MaxValueValidator(1)])
    humor = models.FloatField(default=0.3, validators=[MinValueValidator(0), MaxValueValidator(1)])
    
    # Teaching style preferences
    prefers_examples = models.BooleanField(default=True)
    prefers_analogies = models.BooleanField(default=True)
    prefers_visuals = models.BooleanField(default=False)
    
    # Greeting and closing messages
    greeting_template = models.TextField()
    closing_template = models.TextField()
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class TeachingStrategy(models.Model):
    """Different teaching strategies the AI can use"""
    
    STRATEGY_TYPES = (
        ('direct', 'Direct Instruction'),
        ('socratic', 'Socratic Questioning'),
        ('discovery', 'Discovery Learning'),
        ('scaffolding', 'Scaffolding'),
        ('worked_example', 'Worked Examples'),
        ('analogy', 'Teaching by Analogy'),
        ('conceptual', 'Conceptual Change'),
    )
    
    name = models.CharField(max_length=100)
    strategy_type = models.CharField(max_length=20, choices=STRATEGY_TYPES)
    description = models.TextField()
    
    # When to use this strategy
    best_for_beginners = models.BooleanField(default=True)
    best_for_intermediate = models.BooleanField(default=True)
    best_for_advanced = models.BooleanField(default=True)
    
    # Implementation parameters
    question_density = models.FloatField(default=0.3, validators=[MinValueValidator(0), MaxValueValidator(1)])
    example_frequency = models.FloatField(default=0.5, validators=[MinValueValidator(0), MaxValueValidator(1)])
    
    # Success metrics
    average_success_rate = models.FloatField(default=0.0)
    times_used = models.IntegerField(default=0)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} ({self.get_strategy_type_display()})"

class UpperclassTutorSession(models.Model):
    """Main tutor session model"""
    
    SESSION_STATUS = (
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
        ('abandoned', 'Abandoned'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('users.UpperclassUser', on_delete=models.CASCADE, related_name='tutor_sessions')
    
    # Learning context
    learning_goal = models.TextField()
    subject = models.CharField(max_length=100)
    user_proficiency = models.CharField(max_length=20, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ])
    
    # Tutor configuration
    personality = models.ForeignKey(TutorPersonality, on_delete=models.SET_NULL, null=True, blank=True)
    teaching_strategy = models.ForeignKey(TeachingStrategy, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Session state
    status = models.CharField(max_length=20, choices=SESSION_STATUS, default='active')
    current_concept = models.CharField(max_length=200, blank=True)
    concepts_covered = ArrayField(models.CharField(max_length=200), default=list)
    
    # Progress tracking
    progress = models.FloatField(default=0.0, validators=[MinValueValidator(0), MaxValueValidator(1)])
    understanding_scores = JSONField(default=dict)  # {concept: score}
    
    # Conversation
    conversation_history = JSONField(default=list)  # List of message objects
    last_user_message = models.TextField(blank=True)
    last_tutor_response = models.TextField(blank=True)
    
    # Session metrics
    start_time = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)
    total_messages = models.IntegerField(default=0)
    session_duration = models.FloatField(default=0.0)  # in minutes
    
    # AI State (serialized for persistence)
    ai_state = JSONField(default=dict)
    
    class Meta:
        ordering = ['-start_time']
        indexes = [
            models.Index(fields=['user', 'status']),
            models.Index(fields=['status', 'last_activity']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.learning_goal[:50]}"
    
    def save(self, *args, **kwargs):
        # Update session duration
        if self.start_time:
            from django.utils import timezone
            duration = (timezone.now() - self.start_time).total_seconds() / 60
            self.session_duration = round(duration, 2)
        
        super().save(*args, **kwargs)

class TutorInteractionLog(models.Model):
    """Log all tutor interactions for continuous learning"""
    
    INTERACTION_TYPES = (
        ('explanation', 'Explanation'),
        ('question', 'Question'),
        ('example', 'Example'),
        ('analogy', 'Analogy'),
        ('assessment', 'Assessment'),
        ('feedback', 'Feedback'),
        ('correction', 'Correction'),
    )
    
    session = models.ForeignKey(UpperclassTutorSession, on_delete=models.CASCADE, related_name='interaction_logs')
    interaction_type = models.CharField(max_length=20, choices=INTERACTION_TYPES)
    
    # Content
    user_input = models.TextField(blank=True)
    tutor_response = models.TextField()
    concept = models.CharField(max_length=200)
    
    # AI Metadata
    teaching_strategy_used = models.CharField(max_length=50, blank=True)
    personality_traits_used = JSONField(default=dict)
    knowledge_chunks_used = ArrayField(models.CharField(max_length=200), default=list)
    
    # Effectiveness metrics
    user_rating = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)])
    understanding_gain = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(1)])
    time_spent = models.FloatField(default=0.0)  # in seconds
    
    # For continuous learning
    was_effective = models.BooleanField(null=True, blank=True)
    effectiveness_reason = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.session.user.username} - {self.interaction_type} - {self.concept[:50]}"

class KnowledgeRetrievalLog(models.Model):
    """Log knowledge retrieval for optimization"""
    
    session = models.ForeignKey(UpperclassTutorSession, on_delete=models.CASCADE, related_name='retrieval_logs')
    query = models.TextField()
    filters_applied = JSONField(default=dict)
    
    # Retrieval results
    chunks_retrieved = ArrayField(models.CharField(max_length=200), default=list)  # Chunk IDs
    total_chunks_available = models.IntegerField(default=0)
    retrieval_time = models.FloatField(default=0.0)  # in seconds
    
    # Relevance metrics
    relevance_score = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(1)])
    user_feedback = models.CharField(max_length=20, blank=True, choices=[
        ('relevant', 'Relevant'),
        ('somewhat_relevant', 'Somewhat Relevant'),
        ('irrelevant', 'Irrelevant'),
    ])
    
    # Vector search parameters
    similarity_threshold = models.FloatField(default=0.7)
    max_results = models.IntegerField(default=10)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Retrieval for: {self.query[:50]}"