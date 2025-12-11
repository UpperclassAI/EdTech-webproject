from django.contrib import admin
from django.urls import path
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
from django.utils.html import format_html
from django.utils import timezone
import json

from .models import (
    CourseCategory, CourseSource, CourseImportJob, Course, 
    Module, Lesson, AIKnowledgeChunk, AIKnowledgeGraph, UserCourseProgress
)

# =============== CourseCategory Admin ===============
@admin.register(CourseCategory)
class CourseCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order', 'icon', 'color_display')
    list_editable = ('order', 'icon')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ['name']}
    
    def color_display(self, obj):
        return format_html(
            '<span style="display: inline-block; width: 20px; height: 20px; '
            'background-color: {}; border-radius: 3px; border: 1px solid #ccc;"></span> {}',
            obj.color, obj.color
        )
    color_display.short_description = 'Color'

# =============== CourseSource Admin ===============
@admin.register(CourseSource)
class CourseSourceAdmin(admin.ModelAdmin):
    list_display = ('name', 'source_type', 'is_active', 'last_sync', 'last_sync_status')
    list_filter = ('source_type', 'is_active', 'last_sync_status')
    search_fields = ('name', 'base_url')
    list_editable = ('is_active',)
    readonly_fields = ('last_sync', 'last_sync_status', 'last_sync_error', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'source_type', 'base_url')
        }),
        ('API Configuration', {
            'fields': ('api_key', 'api_secret'),
            'classes': ('collapse',)
        }),
        ('Sync Configuration', {
            'fields': ('is_active', 'sync_frequency', 'requests_per_minute', 'daily_request_limit')
        }),
        ('Sync Status', {
            'fields': ('last_sync', 'last_sync_status', 'last_sync_error'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['sync_selected_sources', 'activate_sources', 'deactivate_sources']
    
    def sync_selected_sources(self, request, queryset):
        """Sync selected course sources"""
        from .tasks import sync_source_courses
        for source in queryset:
            if source.is_active:
                sync_source_courses.delay(source.id)
                self.message_user(request, f"Queued sync for {source.name}")
    sync_selected_sources.short_description = "Sync selected sources"
    
    def activate_sources(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f"Activated {queryset.count()} sources")
    activate_sources.short_description = "Activate selected sources"
    
    def deactivate_sources(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f"Deactivated {queryset.count()} sources")
    deactivate_sources.short_description = "Deactivate selected sources"

# =============== CourseImportJob Admin ===============
@admin.register(CourseImportJob)
class CourseImportJobAdmin(admin.ModelAdmin):
    list_display = ('job_id', 'source', 'status', 'total_chunks_extracted', 
                   'processing_time_display', 'created_at', 'completed_at')
    list_filter = ('status', 'source', 'created_at')
    search_fields = ('job_id', 'source_url', 'error_message')
    readonly_fields = ('job_id', 'status', 'total_chunks_extracted', 'chunks_with_embeddings',
                      'failed_extractions', 'error_chunks', 'started_at', 'completed_at',
                      'processing_time', 'embedding_time', 'ai_analysis_time',
                      'error_message', 'error_traceback', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Job Information', {
            'fields': ('job_id', 'source', 'source_url', 'status', 'initiated_by')
        }),
        ('Processing Parameters', {
            'fields': ('max_chunks', 'generate_embeddings', 'analyze_with_ai'),
            'classes': ('collapse',)
        }),
        ('Results', {
            'fields': ('total_chunks_extracted', 'chunks_with_embeddings', 'failed_extractions', 'error_chunks')
        }),
        ('Timing', {
            'fields': ('started_at', 'completed_at', 'processing_time', 'embedding_time', 'ai_analysis_time'),
            'classes': ('collapse',)
        }),
        ('Errors', {
            'fields': ('error_message', 'error_traceback'),
            'classes': ('collapse',)
        }),
        ('File Upload', {
            'fields': ('uploaded_file', 'file_name', 'file_size'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def processing_time_display(self, obj):
        if obj.processing_time:
            return f"{obj.processing_time:.1f}s"
        return "-"
    processing_time_display.short_description = 'Processing Time'
    
    def has_add_permission(self, request):
        return False
    
    actions = ['retry_failed_jobs', 'cancel_running_jobs']
    
    def retry_failed_jobs(self, request, queryset):
        """Retry failed import jobs"""
        from .tasks import retry_import_job
        for job in queryset.filter(status='failed'):
            retry_import_job.delay(job.id)
            self.message_user(request, f"Queued retry for job {job.job_id}")
    retry_failed_jobs.short_description = "Retry failed jobs"
    
    def cancel_running_jobs(self, request, queryset):
        """Cancel running jobs"""
        cancelled = 0
        for job in queryset.filter(status__in=['processing', 'extracting', 'embedding']):
            job.status = 'cancelled'
            job.completed_at = timezone.now()
            job.save()
            cancelled += 1
        self.message_user(request, f"Cancelled {cancelled} jobs")
    cancel_running_jobs.short_description = "Cancel running jobs"

# =============== Course Admin ===============
class ModuleInline(admin.StackedInline):
    model = Module
    extra = 1
    show_change_link = True
    fields = ('title', 'order', 'difficulty', 'description', 'thumbnail', 'video_intro_url')
    ordering = ('order',)

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'course_type', 'difficulty', 'is_published', 
                   'is_featured', 'enrolled_count', 'average_rating', 'created_at')
    list_filter = ('course_type', 'difficulty', 'is_published', 'is_featured', 
                  'category', 'language', 'created_at')
    search_fields = ('title', 'description', 'tags')
    list_editable = ('is_published', 'is_featured')
    prepopulated_fields = {'slug': ['title']}
    readonly_fields = ('enrolled_count', 'average_rating', 'review_count', 
                      'created_at', 'updated_at', 'published_at', 'total_modules', 'total_lessons')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'description', 'short_description', 
                      'category', 'course_type', 'difficulty')
        }),
        ('Media', {
            'fields': ('thumbnail', 'preview_video_url'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('tags', 'estimated_hours', 'language', 'required_skills')
        }),
        ('Prerequisites', {
            'fields': ('prerequisites',),
            'classes': ('collapse',)
        }),
        ('Source Information', {
            'fields': ('source', 'source_url', 'source_name', 'imported_date'),
            'classes': ('collapse',)
        }),
        ('AI Generation', {
            'fields': ('ai_generated', 'ai_model_used', 'ai_generated_at'),
            'classes': ('collapse',)
        }),
        ('Organization', {
            'fields': ('school', 'created_by'),
            'classes': ('collapse',)
        }),
        ('Status', {
            'fields': ('is_published', 'is_featured', 'is_free')
        }),
        ('Statistics', {
            'fields': ('enrolled_count', 'average_rating', 'review_count', 
                      'total_modules', 'total_lessons'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'published_at'),
            'classes': ('collapse',)
        }),
    )
    
    inlines = [ModuleInline]
    
    actions = ['publish_courses', 'unpublish_courses', 'feature_courses', 'unfeature_courses']
    
    def publish_courses(self, request, queryset):
        queryset.update(is_published=True)
        self.message_user(request, f"Published {queryset.count()} courses")
    publish_courses.short_description = "Publish selected courses"
    
    def unpublish_courses(self, request, queryset):
        queryset.update(is_published=False)
        self.message_user(request, f"Unpublished {queryset.count()} courses")
    unpublish_courses.short_description = "Unpublish selected courses"
    
    def feature_courses(self, request, queryset):
        queryset.update(is_featured=True)
        self.message_user(request, f"Featured {queryset.count()} courses")
    feature_courses.short_description = "Feature selected courses"
    
    def unfeature_courses(self, request, queryset):
        queryset.update(is_featured=False)
        self.message_user(request, f"Unfeatured {queryset.count()} courses")
    unfeature_courses.short_description = "Unfeature selected courses"

# =============== Module Admin ===============
class LessonInline(admin.StackedInline):
    model = Lesson
    extra = 1
    show_change_link = True
    fields = ('title', 'lesson_type', 'order', 'is_published', 'estimated_minutes', 'points')
    ordering = ('order',)

@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'order', 'difficulty', 'total_lessons', 'estimated_time_display')
    list_filter = ('difficulty', 'course')
    search_fields = ('title', 'description', 'course__title')
    list_editable = ('order',)
    readonly_fields = ('created_at', 'updated_at', 'total_lessons', 'estimated_time')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('course', 'title', 'slug', 'order', 'difficulty', 'description')
        }),
        ('AI-Enriched Content', {
            'fields': ('key_concepts', 'learning_objectives', 'common_misconceptions'),
            'classes': ('collapse',)
        }),
        ('Media', {
            'fields': ('thumbnail', 'video_intro_url'),
            'classes': ('collapse',)
        }),
        ('Statistics', {
            'fields': ('total_lessons', 'estimated_time'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    inlines = [LessonInline]
    
    def estimated_time_display(self, obj):
        if obj.estimated_time:
            return f"{obj.estimated_time} min"
        return "-"
    estimated_time_display.short_description = 'Estimated Time'

# =============== Lesson Admin ===============
@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'module', 'lesson_type', 'order', 'is_published', 
                   'estimated_minutes', 'points', 'ai_difficulty_score_display')
    list_filter = ('lesson_type', 'is_published', 'module__course', 'module')
    search_fields = ('title', 'content', 'module__title', 'module__course__title')
    list_editable = ('order', 'is_published', 'estimated_minutes', 'points')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('module', 'title', 'slug', 'lesson_type', 'order', 'is_published')
        }),
        ('Content', {
            'fields': ('content', 'problem_statement', 'solution', 'examples', 'questions'),
            'classes': ('wide',)
        }),
        ('AI Metadata', {
            'fields': ('ai_difficulty_score', 'ai_prerequisites', 'ai_generated_hints'),
            'classes': ('collapse',)
        }),
        ('Multimedia', {
            'fields': ('video_url', 'image_url', 'audio_url', 'interactive_element'),
            'classes': ('collapse',)
        }),
        ('Learning Aids', {
            'fields': ('key_terms', 'learning_tips', 'common_mistakes'),
            'classes': ('collapse',)
        }),
        ('Progress Tracking', {
            'fields': ('estimated_minutes', 'points', 'requires_completion')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def ai_difficulty_score_display(self, obj):
        return f"{obj.ai_difficulty_score:.2f}"
    ai_difficulty_score_display.short_description = 'AI Difficulty'

# =============== AIKnowledgeChunk Admin ===============
@admin.register(AIKnowledgeChunk)
class AIKnowledgeChunkAdmin(admin.ModelAdmin):
    list_display = ('title', 'content_type', 'difficulty_level', 'subject', 'topic', 
                   'times_used', 'success_rate_display', 'clarity_score_display')
    list_filter = ('content_type', 'difficulty_level', 'subject', 'source', 'ai_analyzed')
    search_fields = ('title', 'content', 'topic', 'subject', 'subtopics')
    readonly_fields = ('times_used', 'success_rate', 'user_ratings', 'user_feedback',
                      'last_used', 'created_at', 'updated_at', 'embedding_generated_at')
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'content', 'content_type')
        }),
        ('Classification', {
            'fields': ('difficulty_level', 'subject', 'topic', 'subtopics', 'target_audience')
        }),
        ('Teaching Strategy', {
            'fields': ('teaching_strategy', 'learning_objectives'),
            'classes': ('collapse',)
        }),
        ('Concept Relationships', {
            'fields': ('prerequisites', 'related_concepts'),
            'classes': ('collapse',)
        }),
        ('Source Information', {
            'fields': ('source', 'source_url', 'source_metadata'),
            'classes': ('collapse',)
        }),
        ('AI Embeddings', {
            'fields': ('embedding_model', 'embedding_dimensions', 'embedding_generated_at'),
            'classes': ('collapse',)
        }),
        ('Quality Metrics', {
            'fields': ('clarity_score', 'completeness_score', 'accuracy_score', 'engagement_score')
        }),
        ('Usage Statistics', {
            'fields': ('times_used', 'success_rate', 'user_ratings', 'user_feedback', 'last_used')
        }),
        ('AI Analysis', {
            'fields': ('ai_analyzed', 'ai_analysis_metadata'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def success_rate_display(self, obj):
        return f"{obj.success_rate:.1%}"
    success_rate_display.short_description = 'Success Rate'
    
    def clarity_score_display(self, obj):
        return f"{obj.clarity_score:.2f}"
    clarity_score_display.short_description = 'Clarity'

# =============== AIKnowledgeGraph Admin ===============
@admin.register(AIKnowledgeGraph)
class AIKnowledgeGraphAdmin(admin.ModelAdmin):
    list_display = ('source_concept', 'relationship_type', 'target_concept', 
                   'strength', 'confidence', 'ai_confirmed', 'source')
    list_filter = ('relationship_type', 'ai_confirmed', 'source', 'needs_review')
    search_fields = ('source_concept__title', 'target_concept__title', 'review_notes')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Relationship', {
            'fields': ('source_concept', 'relationship_type', 'target_concept')
        }),
        ('Strength & Confidence', {
            'fields': ('strength', 'confidence')
        }),
        ('Source', {
            'fields': ('source', 'ai_confirmed', 'needs_review', 'review_notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

# =============== UserCourseProgress Admin ===============
@admin.register(UserCourseProgress)
class UserCourseProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'completion_percentage_display', 'completed', 
                   'time_spent_display', 'total_sessions', 'last_accessed')
    list_filter = ('completed', 'course', 'last_accessed')
    search_fields = ('user__username', 'user__email', 'course__title')
    readonly_fields = ('completion_percentage', 'started_at', 'last_accessed', 
                      'completed_at', 'time_spent', 'total_sessions', 
                      'engagement_score', 'consistency_score')
    
    fieldsets = (
        ('Progress Information', {
            'fields': ('user', 'course', 'completion_percentage', 'completed', 'completed_at')
        }),
        ('Current Position', {
            'fields': ('current_module', 'current_lesson'),
            'classes': ('collapse',)
        }),
        ('Learning Analytics', {
            'fields': ('time_spent', 'quiz_scores', 'weak_points', 'last_session_duration', 'total_sessions')
        }),
        ('Engagement Metrics', {
            'fields': ('engagement_score', 'consistency_score'),
            'classes': ('collapse',)
        }),
        ('Completed Items', {
            'fields': ('completed_modules', 'completed_lessons'),
            'classes': ('collapse',)
        }),
        ('User Content', {
            'fields': ('user_notes', 'bookmarks'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('started_at', 'last_accessed'),
            'classes': ('collapse',)
        }),
    )
    
    def completion_percentage_display(self, obj):
        return f"{obj.completion_percentage:.1%}"
    completion_percentage_display.short_description = 'Completion'
    
    def time_spent_display(self, obj):
        if obj.time_spent >= 60:
            return f"{obj.time_spent/60:.1f}h"
        return f"{obj.time_spent:.0f}m"
    time_spent_display.short_description = 'Time Spent'

# =============== Custom Admin Views ===============
def import_course_view(request):
    """Admin view for importing courses"""
    
    if request.method == 'POST':
        source_url = request.POST.get('source_url', '').strip()
        source_type = request.POST.get('source_type', 'khan_academy')
        source_id = request.POST.get('source_id')
        
        if not source_url:
            messages.error(request, "Please provide a source URL")
        else:
            try:
                from .tasks import import_course_task
                
                # Start import task
                task = import_course_task.delay(
                    source_url=source_url,
                    source_type=source_type,
                    source_id=source_id,
                    user_id=request.user.id if request.user.is_authenticated else None
                )
                
                messages.success(
                    request, 
                    f"Import job started! Task ID: {task.id}. "
                    f"Check the Course Import Jobs section for progress."
                )
                return redirect('admin:courses_courseimportjob_changelist')
                
            except Exception as e:
                messages.error(request, f"Failed to start import: {str(e)}")
    
    # Get available sources
    sources = CourseSource.objects.filter(is_active=True)
    source_types = CourseSource.SOURCE_TYPES
    
    context = {
        'title': 'Import Course for AI Training',
        'sources': sources,
        'source_types': source_types,
        'opts': CourseSource._meta,
    }
    
    return render(request, 'admin/courses/import_course.html', context)

def knowledge_base_stats_view(request):
    """Admin view for knowledge base statistics"""
    
    from django.db.models import Count, Avg
    
    try:
        # Get basic stats
        total_chunks = AIKnowledgeChunk.objects.count()
        chunks_with_embeddings = AIKnowledgeChunk.objects.exclude(embedding=None).count()
        ai_analyzed_chunks = AIKnowledgeChunk.objects.filter(ai_analyzed=True).count()
        
        # Get stats by content type
        by_content_type = AIKnowledgeChunk.objects.values('content_type').annotate(
            count=Count('id'),
            avg_clarity=Avg('clarity_score'),
            avg_accuracy=Avg('accuracy_score')
        ).order_by('-count')
        
        # Get stats by difficulty
        by_difficulty = AIKnowledgeChunk.objects.values('difficulty_level').annotate(
            count=Count('id'),
            avg_success=Avg('success_rate')
        ).order_by('difficulty_level')
        
        # Get top subjects
        top_subjects = AIKnowledgeChunk.objects.values('subject').annotate(
            count=Count('id')
        ).order_by('-count')[:10]
        
        # Get knowledge graph stats
        total_edges = AIKnowledgeGraph.objects.count()
        ai_confirmed_edges = AIKnowledgeGraph.objects.filter(ai_confirmed=True).count()
        
        stats = {
            'total_chunks': total_chunks,
            'chunks_with_embeddings': chunks_with_embeddings,
            'ai_analyzed_chunks': ai_analyzed_chunks,
            'embedding_coverage': f"{(chunks_with_embeddings/total_chunks*100):.1f}%" if total_chunks > 0 else "0%",
            'ai_analysis_coverage': f"{(ai_analyzed_chunks/total_chunks*100):.1f}%" if total_chunks > 0 else "0%",
            'by_content_type': list(by_content_type),
            'by_difficulty': list(by_difficulty),
            'top_subjects': list(top_subjects),
            'knowledge_graph': {
                'total_edges': total_edges,
                'ai_confirmed_edges': ai_confirmed_edges,
                'ai_confirmed_percentage': f"{(ai_confirmed_edges/total_edges*100):.1f}%" if total_edges > 0 else "0%",
            }
        }
        
        return JsonResponse(stats)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

# =============== Register Admin URLs ===============
def get_admin_urls(urls):
    def get_urls():
        my_urls = [
            path('import-course/', admin.site.admin_view(import_course_view), name='import_course'),
            path('knowledge-base-stats/', admin.site.admin_view(knowledge_base_stats_view), name='knowledge_base_stats'),
        ]
        return my_urls + urls
    return get_urls

admin.site.get_urls = get_admin_urls(admin.site.get_urls())