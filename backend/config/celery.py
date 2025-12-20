import os
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('upperclass')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

# Configure periodic tasks
app.conf.beat_schedule = {
    'sync-popular-courses-every-24-hours': {
        'task': 'courses.tasks.sync_popular_courses',
        'schedule': 86400.0,  # 24 hours in seconds
    },
    'cleanup-old-import-jobs': {
        'task': 'courses.tasks.cleanup_old_import_jobs',
        'schedule': 43200.0,  # 12 hours
    },
}

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')