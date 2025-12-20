from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils.text import slugify
from .models import Course, Module, Lesson

@receiver(pre_save, sender=Course)
def generate_course_slug(sender, instance, **kwargs):
    """Generate slug for course if not provided"""
    if not instance.slug:
        instance.slug = slugify(instance.title)

@receiver(pre_save, sender=Module)
def generate_module_slug(sender, instance, **kwargs):
    """Generate slug for module if not provided"""
    if not instance.slug and instance.course:
        base_slug = slugify(f"{instance.course.slug}-{instance.title}")
        instance.slug = base_slug[:200]

@receiver(pre_save, sender=Lesson)
def generate_lesson_slug(sender, instance, **kwargs):
    """Generate slug for lesson if not provided"""
    if not instance.slug and instance.module:
        base_slug = slugify(f"{instance.module.slug}-{instance.title}")
        instance.slug = base_slug[:200]

@receiver(post_save, sender=Course)
def update_course_stats(sender, instance, created, **kwargs):
    """Update course statistics when related objects change"""
    if not created:
        # Update total modules and lessons
        instance.total_modules = instance.modules.count()
        
        from django.db.models import Count
        total_lessons = instance.modules.aggregate(
            total_lessons=Count('lessons')
        )['total_lessons'] or 0
        instance.total_lessons = total_lessons
        
        # Don't call save() here to avoid infinite recursion
        # This will be updated when the course is saved again