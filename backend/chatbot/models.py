from django.db import models
from users.models import UpperclassUser
from django.contrib.postgres.fields import JSONField, ArrayField

class ChatbotSession(models.Model):
    user = models.ForeignKey(UpperclassUser, on_delete=models.CASCADE, related_name='chatbot_sessions')
    context = models.CharField(max_length=100, default='general')  # 'course', 'technical', 'general'
    course = models.ForeignKey('courses.Course', on_delete=models.SET_NULL, null=True, blank=True)
    
    conversation_history = JSONField(default=list)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_message_at = models.DateTimeField(auto_now=True)
    
    # Quick help vs deep help
    help_depth = models.CharField(max_length=20, default='quick', choices=[
        ('quick', 'Quick Answer'),
        ('deep', 'Detailed Explanation')
    ])
    
    class Meta:
        ordering = ['-created_at']

class FAQLearning(models.Model):
    """Chatbot learns from frequently asked questions"""
    question = models.TextField()
    question_embedding = models.BinaryField()  # Vector embedding
    best_answer = models.TextField()
    alternative_answers = JSONField(default=list)
    context = models.CharField(max_length=100)
    
    # Usage stats
    ask_count = models.IntegerField(default=0)
    success_rate = models.FloatField(default=0.0)  # How often answer was helpful
    
    # AI metadata
    confidence = models.FloatField(default=0.0)
    needs_human_review = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)