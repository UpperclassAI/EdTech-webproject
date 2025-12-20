from rest_framework import viewsets, generics, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Count, Avg
from django.utils import timezone
import json

from .models import (
    CourseCategory, CourseSource, CourseImportJob, Course, 
    Module, Lesson, AIKnowledgeChunk, AIKnowledgeGraph, UserCourseProgress
)
from .serializers import (
    CourseCategorySerializer, CourseSourceSerializer, CourseImportJobSerializer,
    CourseListSerializer, CourseDetailSerializer, CourseCreateSerializer,
    ModuleListSerializer, ModuleDetailSerializer, LessonListSerializer,
    LessonDetailSerializer, AIKnowledgeChunkListSerializer, AIKnowledgeChunkDetailSerializer,
    AIKnowledgeGraphSerializer, UserCourseProgressSerializer, CourseProgressUpdateSerializer,
    CourseSearchSerializer, CourseImportSerializer
)

# =============== CourseCategory Views ===============
class CourseCategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for CourseCategory"""
    
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['order', 'name']
    ordering = ['order', 'name']

# =============== CourseSource Views ===============
class CourseSourceViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for CourseSource (read-only)"""
    
    queryset = CourseSource.objects.filter(is_active=True)
    serializer_class = CourseSourceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'source_type']

# =============== CourseImportJob Views ===============
class CourseImportJobViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for CourseImportJob (read-only)"""
    
    serializer_class = CourseImportJobSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    ordering_fields = ['created_at', 'started_at', 'completed_at']
    ordering = ['-created_at']
    filterset_fields = ['status', 'source']
    
    def get_queryset(self):
        # Users can only see jobs they initiated
        return CourseImportJob.objects.filter(initiated_by=self.request.user)

# =============== Course Views ===============
class CourseViewSet(viewsets.ModelViewSet):
    """ViewSet for Course"""
    
    queryset = Course.objects.filter(is_published=True)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['title', 'description', 'tags', 'short_description']
    ordering_fields = ['created_at', 'title', 'average_rating', 'enrolled_count', 'estimated_hours']
    ordering = ['-created_at']
    filterset_fields = ['category', 'difficulty', 'course_type', 'is_free', 'is_featured', 'language']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return CourseListSerializer
        elif self.action == 'create':
            return CourseCreateSerializer
        return CourseDetailSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by school if user is from a school
        user = self.request.user
        if user.is_authenticated and user.school_name:
            queryset = queryset.filter(
                Q(school__name=user.school_name) | Q(school__isnull=True)
            )
        
        # Filter by search query
        search_query = self.request.query_params.get('search', '')
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(tags__icontains=search_query)
            )
        
        # Filter by min rating
        min_rating = self.request.query_params.get('min_rating')
        if min_rating:
            try:
                queryset = queryset.filter(average_rating__gte=float(min_rating))
            except ValueError:
                pass
        
        return queryset
    
    @action(detail=True, methods=['post'])
    def enroll(self, request, pk=None):
        """Enroll in a course"""
        course = self.get_object()
        user = request.user
        
        # Check if already enrolled
        progress, created = UserCourseProgress.objects.get_or_create(
            user=user,
            course=course,
            defaults={
                'current_module': course.modules.first(),
                'current_lesson': course.modules.first().lessons.first() if course.modules.first() else None
            }
        )
        
        if created:
            # Update enrolled count
            course.enrolled_count += 1
            course.save()
            
            return Response({
                'message': 'Successfully enrolled in course',
                'progress': UserCourseProgressSerializer(progress).data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'message': 'Already enrolled in this course',
                'progress': UserCourseProgressSerializer(progress).data
            }, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'])
    def search(self, request):
        """Advanced course search"""
        serializer = CourseSearchSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data
        queryset = Course.objects.filter(is_published=True)
        
        # Apply filters
        if data.get('query'):
            queryset = queryset.filter(
                Q(title__icontains=data['query']) |
                Q(description__icontains=data['query']) |
                Q(tags__icontains=data['query'])
            )
        
        if data.get('category'):
            queryset = queryset.filter(category__name=data['category'])
        
        if data.get('difficulty'):
            queryset = queryset.filter(difficulty=data['difficulty'])
        
        if data.get('min_rating'):
            queryset = queryset.filter(average_rating__gte=data['min_rating'])
        
        if data.get('is_free') is not None:
            queryset = queryset.filter(is_free=data['is_free'])
        
        if data.get('is_featured') is not None:
            queryset = queryset.filter(is_featured=data['is_featured'])
        
        # Apply sorting
        sort_by = data.get('sort_by', 'relevance')
        if sort_by == 'newest':
            queryset = queryset.order_by('-created_at')
        elif sort_by == 'rating':
            queryset = queryset.order_by('-average_rating')
        elif sort_by == 'popular':
            queryset = queryset.order_by('-enrolled_count')
        elif sort_by == 'duration':
            queryset = queryset.order_by('estimated_hours')
        else:  # relevance
            queryset = queryset.order_by('-created_at')
        
        # Pagination
        page = data.get('page', 1)
        page_size = data.get('page_size', 20)
        start = (page - 1) * page_size
        end = start + page_size
        
        total = queryset.count()
        courses = queryset[start:end]
        
        return Response({
            'total': total,
            'page': page,
            'page_size': page_size,
            'total_pages': (total + page_size - 1) // page_size,
            'results': CourseListSerializer(courses, many=True).data
        })
    
    @action(detail=False, methods=['post'])
    def import_course(self, request):
        """Import a course from external source"""
        serializer = CourseImportSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # TODO: Implement course import logic
        # This would trigger a Celery task
        # from .tasks import import_course_task
        # task = import_course_task.delay(...)
        
        return Response({
            'message': 'Course import initiated',
            'data': serializer.validated_data
        }, status=status.HTTP_202_ACCEPTED)

# =============== Module Views ===============
class ModuleViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Module (read-only)"""
    
    serializer_class = ModuleDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    ordering_fields = ['order']
    ordering = ['order']
    
    def get_queryset(self):
        # Filter by course if provided
        course_id = self.request.query_params.get('course_id')
        if course_id:
            return Module.objects.filter(course_id=course_id)
        return Module.objects.all()

# =============== Lesson Views ===============
class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Lesson (read-only)"""
    
    serializer_class = LessonDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    ordering_fields = ['order']
    ordering = ['order']
    
    def get_queryset(self):
        # Filter by module if provided
        module_id = self.request.query_params.get('module_id')
        if module_id:
            return Lesson.objects.filter(module_id=module_id)
        return Lesson.objects.all()

# =============== AI Knowledge Chunk Views ===============
class AIKnowledgeChunkViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for AIKnowledgeChunk (read-only)"""
    
    serializer_class = AIKnowledgeChunkListSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['title', 'content', 'topic', 'subject', 'subtopics']
    ordering_fields = ['created_at', 'times_used', 'success_rate', 'clarity_score']
    ordering = ['-created_at']
    filterset_fields = ['content_type', 'difficulty_level', 'subject', 'ai_analyzed']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return AIKnowledgeChunkDetailSerializer
        return AIKnowledgeChunkListSerializer
    
    @action(detail=False, methods=['get'])
    def search_by_query(self, request):
        """Search knowledge chunks by natural language query"""
        query = request.query_params.get('q', '')
        subject = request.query_params.get('subject', '')
        difficulty = request.query_params.get('difficulty', '')
        
        if not query:
            return Response({'error': 'Query parameter is required'}, status=400)
        
        # TODO: Implement semantic search using vector database
        # For now, do keyword search
        chunks = AIKnowledgeChunk.objects.filter(
            Q(title__icontains=query) | Q(content__icontains=query)
        )
        
        if subject:
            chunks = chunks.filter(subject=subject)
        
        if difficulty:
            chunks = chunks.filter(difficulty_level=difficulty)
        
        # Limit results
        chunks = chunks[:20]
        
        return Response(AIKnowledgeChunkListSerializer(chunks, many=True).data)

# =============== User Course Progress Views ===============
class UserCourseProgressViewSet(viewsets.ModelViewSet):
    """ViewSet for UserCourseProgress"""
    
    serializer_class = UserCourseProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Users can only see their own progress
        return UserCourseProgress.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            return CourseProgressUpdateSerializer
        return UserCourseProgressSerializer
    
    @action(detail=True, methods=['post'])
    def complete_lesson(self, request, pk=None):
        """Mark a lesson as completed"""
        progress = self.get_object()
        lesson_id = request.data.get('lesson_id')
        
        if not lesson_id:
            return Response({'error': 'lesson_id is required'}, status=400)
        
        try:
            lesson = Lesson.objects.get(id=lesson_id)
            
            # Check if lesson belongs to the course
            if lesson.module.course != progress.course:
                return Response({'error': 'Lesson does not belong to this course'}, status=400)
            
            # Mark lesson as completed
            progress.complete_lesson(lesson)
            
            return Response({
                'message': 'Lesson marked as completed',
                'progress': UserCourseProgressSerializer(progress).data
            })
            
        except Lesson.DoesNotExist:
            return Response({'error': 'Lesson not found'}, status=404)
    
    @action(detail=True, methods=['get'])
    def next_lesson(self, request, pk=None):
        """Get the next lesson to complete"""
        progress = self.get_object()
        next_lesson = progress.get_next_lesson()
        
        if next_lesson:
            return Response({
                'lesson': LessonListSerializer(next_lesson).data,
                'message': 'Next lesson found'
            })
        else:
            return Response({
                'message': 'No more lessons available or course completed'
            })

# =============== Dashboard Views ===============
class UserDashboardView(generics.RetrieveAPIView):
    """Get user's learning dashboard"""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        # Get enrolled courses
        enrolled_courses = UserCourseProgress.objects.filter(user=user)
        
        # Get progress statistics
        total_courses = enrolled_courses.count()
        completed_courses = enrolled_courses.filter(completed=True).count()
        in_progress_courses = total_courses - completed_courses
        
        # Calculate total learning time
        total_learning_time = sum(progress.time_spent for progress in enrolled_courses)
        
        # Get recent activity
        recent_progress = enrolled_courses.order_by('-last_accessed')[:5]
        
        # Get recommended courses (simple logic for now)
        recommended_courses = Course.objects.filter(
            is_published=True
        ).exclude(
            id__in=enrolled_courses.values_list('course_id', flat=True)
        ).order_by('-average_rating', '-enrolled_count')[:5]
        
        data = {
            'user': {
                'username': user.username,
                'proficiency_level': user.proficiency_level,
                'preferred_learning_style': user.preferred_learning_style
            },
            'statistics': {
                'total_courses': total_courses,
                'completed_courses': completed_courses,
                'in_progress_courses': in_progress_courses,
                'completion_rate': (completed_courses / total_courses * 100) if total_courses > 0 else 0,
                'total_learning_time': total_learning_time,
                'average_session_time': user.learning_profile.average_session_time if hasattr(user, 'learning_profile') else 0
            },
            'recent_activity': UserCourseProgressSerializer(recent_progress, many=True).data,
            'recommended_courses': CourseListSerializer(recommended_courses, many=True).data
        }
        
        return Response(data)

# =============== Knowledge Base Views ===============
class KnowledgeBaseStatsView(generics.GenericAPIView):
    """Get knowledge base statistics"""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
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
        
        data = {
            'total_chunks': total_chunks,
            'chunks_with_embeddings': chunks_with_embeddings,
            'ai_analyzed_chunks': ai_analyzed_chunks,
            'embedding_coverage': (chunks_with_embeddings / total_chunks * 100) if total_chunks > 0 else 0,
            'ai_analysis_coverage': (ai_analyzed_chunks / total_chunks * 100) if total_chunks > 0 else 0,
            'by_content_type': list(by_content_type),
            'by_difficulty': list(by_difficulty),
            'top_subjects': list(top_subjects),
            'knowledge_graph': {
                'total_edges': total_edges,
                'ai_confirmed_edges': ai_confirmed_edges,
                'ai_confirmed_percentage': (ai_confirmed_edges / total_edges * 100) if total_edges > 0 else 0
            }
        }
        
        return Response(data)