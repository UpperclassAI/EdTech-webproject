from django.core.management.base import BaseCommand
from courses.tasks import sync_popular_courses

class Command(BaseCommand):
    help = 'Sync popular courses for AI training'
    
    def handle(self, *args, **options):
        self.stdout.write("Starting sync of popular courses...")
        
        try:
            result = sync_popular_courses.delay()
            self.stdout.write(
                self.style.SUCCESS(f"Sync task queued. Task ID: {result.id}")
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"Failed to queue sync: {e}")
            )