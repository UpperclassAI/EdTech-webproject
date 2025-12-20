from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

class UpperclassUser(AbstractUser):
    USER_TYPES = (
        ('individual', 'Individual Learner'),
        ('school', 'School/Institution'),
        ('teacher', 'Teacher'),
    )
    
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default='individual')
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(blank=True)
    
    # Learning preferences
    preferred_learning_style = models.CharField(max_length=50, blank=True, choices=[
        ('visual', 'Visual'),
        ('auditory', 'Auditory'),
        ('kinesthetic', 'Kinesthetic'),
        ('reading_writing', 'Reading/Writing'),
    ])
    proficiency_level = models.CharField(max_length=20, default='beginner', choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ])
    interests = ArrayField(
        models.CharField(max_length=100),
        default=list,
        blank=True,
        help_text="User's learning interests"
    )
    
    # School-specific fields
    school_name = models.CharField(max_length=200, blank=True)
    school_id = models.CharField(max_length=50, blank=True)
    grade_level = models.CharField(max_length=20, blank=True, choices=[
        ('elementary', 'Elementary'),
        ('middle', 'Middle School'),
        ('high', 'High School'),
        ('college', 'College'),
        ('university', 'University'),
    ])
    
    # Additional fields
    phone_number = models.CharField(max_length=20, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    country = models.CharField(max_length=100, blank=True)
    timezone = models.CharField(max_length=50, default='UTC')
    
    # Email verification
    email_verified = models.BooleanField(default=False)
    verification_token = models.UUIDField(default=uuid.uuid4, editable=False)
    
    # GDPR compliance
    agreed_to_terms = models.BooleanField(default=False)
    agreed_to_privacy = models.BooleanField(default=False)
    marketing_consent = models.BooleanField(default=False)
    
    # Account status
    is_verified = models.BooleanField(default=False)
    verification_date = models.DateTimeField(null=True, blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Upperclass User'
        verbose_name_plural = 'Upperclass Users'
        indexes = [
            models.Index(fields=['user_type', 'is_active']),
            models.Index(fields=['email_verified', 'is_active']),
        ]
    
    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"
    
    def get_full_name_or_username(self):
        """Return full name if available, otherwise username"""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username
    
    def save(self, *args, **kwargs):
        # Auto-set email as username if not set
        if not self.username and self.email:
            self.username = self.email
        super().save(*args, **kwargs)

class School(models.Model):
    """School/Institution model"""
    
    SUBSCRIPTION_TIERS = (
        ('free', 'Free'),
        ('basic', 'Basic'),
        ('pro', 'Professional'),
        ('enterprise', 'Enterprise'),
    )
    
    name = models.CharField(max_length=200, unique=True)
    license_key = models.CharField(max_length=100, unique=True)
    admin = models.ForeignKey(UpperclassUser, on_delete=models.CASCADE, related_name='admin_of_school')
    teachers = models.ManyToManyField(UpperclassUser, related_name='teacher_at_schools', blank=True)
    students = models.ManyToManyField(UpperclassUser, related_name='student_at_schools', blank=True)
    
    # Subscription info
    subscription_tier = models.CharField(max_length=20, choices=SUBSCRIPTION_TIERS, default='free')
    subscription_start = models.DateField(null=True, blank=True)
    subscription_end = models.DateField(null=True, blank=True)
    max_users = models.IntegerField(default=50)
    
    # School details
    address = models.TextField(blank=True)
    website = models.URLField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    
    # Features enabled
    enable_classrooms = models.BooleanField(default=True)
    enable_analytics = models.BooleanField(default=True)
    enable_custom_courses = models.BooleanField(default=False)
    
    # Settings
    allow_student_registration = models.BooleanField(default=True)
    require_teacher_approval = models.BooleanField(default=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['name']
        verbose_name_plural = 'Schools'
    
    def __str__(self):
        return self.name
    
    @property
    def total_users(self):
        """Get total number of users in school"""
        return self.students.count() + self.teachers.count() + 1  # +1 for admin
    
    @property
    def is_subscription_active(self):
        """Check if subscription is active"""
        if not self.subscription_end:
            return True
        from django.utils import timezone
        return timezone.now().date() <= self.subscription_end

class UserLearningProfile(models.Model):
    """Detailed learning profile for each user"""
    
    user = models.OneToOneField(UpperclassUser, on_delete=models.CASCADE, related_name='learning_profile')
    
    # Knowledge tracking
    knowledge_graph = models.JSONField(default=dict, help_text="Stores user's knowledge structure")
    learning_patterns = models.JSONField(default=dict, help_text="AI-detected learning patterns")
    
    # Progress metrics
    completion_rate = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        help_text="Overall course completion rate (0-1)"
    )
    average_session_time = models.FloatField(default=0.0, help_text="Average session time in minutes")
    total_learning_time = models.FloatField(default=0.0, help_text="Total learning time in hours")
    
    # Strengths and weaknesses
    weak_areas = ArrayField(
        models.CharField(max_length=200),
        default=list,
        blank=True,
        help_text="Topics where user needs improvement"
    )
    strong_areas = ArrayField(
        models.CharField(max_length=200),
        default=list,
        blank=True,
        help_text="Topics where user excels"
    )
    
    # Assessment history
    last_assessment_date = models.DateTimeField(null=True, blank=True)
    average_quiz_score = models.FloatField(default=0.0, validators=[MinValueValidator(0.0), MaxValueValidator(100.0)])
    assessment_history = models.JSONField(default=list, help_text="History of assessments")
    
    # Learning preferences (AI-adjusted)
    optimal_session_length = models.FloatField(default=45.0, help_text="Optimal session length in minutes")
    preferred_teaching_strategy = models.CharField(max_length=50, blank=True)
    difficulty_preference = models.CharField(max_length=20, default='adaptive', choices=[
        ('easier', 'Easier'),
        ('current', 'Current Level'),
        ('challenging', 'More Challenging'),
        ('adaptive', 'Adaptive'),
    ])
    
    # Goals
    weekly_goal = models.IntegerField(default=5, help_text="Weekly learning goal in hours")
    current_streak = models.IntegerField(default=0, help_text="Current daily learning streak")
    longest_streak = models.IntegerField(default=0, help_text="Longest daily learning streak")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'User Learning Profile'
        verbose_name_plural = 'User Learning Profiles'
    
    def __str__(self):
        return f"Learning Profile - {self.user.username}"
    
    def update_completion_rate(self):
        """Update completion rate based on user progress"""
        from courses.models import UserCourseProgress
        progresses = UserCourseProgress.objects.filter(user=self.user)
        
        if progresses.exists():
            total = progresses.count()
            completed = progresses.filter(completed=True).count()
            self.completion_rate = completed / total
            self.save()
    
    def add_weak_area(self, topic):
        """Add a weak area if not already present"""
        if topic not in self.weak_areas:
            self.weak_areas.append(topic)
            self.save()
    
    def add_strong_area(self, topic):
        """Add a strong area if not already present"""
        if topic not in self.strong_areas:
            self.strong_areas.append(topic)
            self.save()