from django.core.management.base import BaseCommand
from django.utils import timezone
from courses.tasks import import_course_from_url

class Command(BaseCommand):
    help = 'Import a course from URL for AI training'
    
    def add_arguments(self, parser):
        parser.add_argument('url', type=str, help='URL of the course to import')
        parser.add_argument('--type', type=str, default='khan_academy', 
                          help='Source type (khan_academy, youtube, etc.)')
        parser.add_argument('--async', action='store_true', 
                          help='Run import asynchronously using Celery')
    
    def handle(self, *args, **options):
        url = options['url']
        source_type = options['type']
        async_mode = options['async']
        
        self.stdout.write(f"Starting import from: {url}")
        self.stdout.write(f"Source type: {source_type}")
        self.stdout.write(f"Async mode: {async_mode}")
        
        if async_mode:
            # Start async task
            task = import_course_from_url.delay(url, source_type)
            self.stdout.write(
                self.style.SUCCESS(f"Import task queued. Task ID: {task.id}")
            )
            self.stdout.write("Check admin panel for progress.")
        else:
            # Run synchronously (for debugging)
            self.stdout.write("Running import synchronously...")
            try:
                result = import_course_from_url.apply(args=[url, source_type])
                self.stdout.write(
                    self.style.SUCCESS(f"Import completed: {result.get()}")
                )
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f"Import failed: {e}")
                )