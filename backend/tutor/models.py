from django.db import models
from django.contrib.auth.models import User

class TutorSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    current_topic = models.ForeignKey('curriculum.Topic', on_delete=models.SET_NULL, null=True)
    difficulty_level = models.CharField(max_length=20, default='beginner')
    session_start = models.DateTimeField(auto_now_add=True)
    last_interaction = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    # Tutor personality/state
    tutor_mode = models.CharField(max_length=20, default='explainer', choices=[
        ('explainer', 'Explainer'),
        ('questioner', 'Questioner'),
        ('reviewer', 'Reviewer'),
        ('motivator', 'Motivator')
    ])
    
    # Conversation memory
    conversation_history = models.JSONField(default=list)

class UserLearningProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='learning_profile')
    preferred_difficulty = models.CharField(max_length=20, default='beginner')
    learning_pace = models.CharField(max_length=20, default='moderate')
    topics_completed = models.ManyToManyField('curriculum.Topic', through='TopicCompletion')
    strengths = models.JSONField(default=list)  # List of strong topics
    weaknesses = models.JSONField(default=list)  # List of topics needing review