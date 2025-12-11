from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import UserLearningProfile

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_learning_profile(sender, instance, created, **kwargs):
    """Create a learning profile for new users"""
    if created:
        UserLearningProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_learning_profile(sender, instance, **kwargs):
    """Save learning profile when user is saved"""
    try:
        instance.learning_profile.save()
    except UserLearningProfile.DoesNotExist:
        UserLearningProfile.objects.create(user=instance)