from rest_framework import serializers
from django.utils.text import slugify
from .models import (
    CourseCategory, CourseSource, CourseImportJob, Course, 
    Module, Lesson, AIKnowledgeChunk, AIKnowledgeGraph, UserCourseProgress
)

# =============== CourseCategory Serializers ===============
class CourseCategorySerializer(serializers.ModelSerializer):
    """Serializer for CourseCategory"""
    
    class Meta:
        model = CourseCategory
        fields = ['id', 'name', 'slug', 'description', 'icon', 'color', 'order']
        read_only_fields = ['slug']

# =============== CourseSource Serializers ===============
class CourseSourceSerializer(serializers.ModelSerializer):
    """Serializer for CourseSource"""
    
    class Meta:
        model = CourseSource
        fields = [
            'id', 'name', 'source_type', 'base_url', 'is_active',
            'sync_frequency', 'last_sync', 'last_sync_status'
        ]
        read_only_fields = ['last_sync', 'last_sync_status']

# =============== CourseImportJob Serializers ===============
class CourseImportJobSerializer(serializers.ModelSerializer):
    """Serializer for CourseImportJob"""
    
    source_name = serializers.CharField(source='source.name', read_only=True)
    initiated_by_name = serializers.CharField(source='initiated_by.username', read_only=True, allow_null=True)
    
    class Meta:
        model = CourseImportJob
        fields = [
            'id', 'job_id', 'source', 'source_name', 'source_url', 'status',
            'initiated_by', 'initiated_by_name', 'total_chunks_extracted',
            'chunks_with_embeddings', 'failed_extractions', 'started_at',
            'completed_at', 'processing_time', 'error_message', 'created_at'
        ]
        read_only_fields = [
            'job_id', 'status', 'total_chunks_extracted', 'chunks_with_embeddings',
            'failed_extractions', 'started_at', 'completed_at', 'processing_time',
            'error_message', 'created_at'
        ]

# =============== Course Serializers ===============
class CourseListSerializer(serializers.ModelSerializer):
    """Serializer for listing courses"""
    
    category_name = serializers.CharField(source='category.name', read_only=True)
    creator_name = serializers.CharField(source='created_by.username', read_only=True, allow_null=True)
    total_modules = serializers.IntegerField(read_only=True)
    total_lessons = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'short_description', 'category', 'category_name',
            'course_type', 'difficulty', 'thumbnail', 'estimated_hours',
            'is_published', 'is_featured', 'is_free', 'enrolled_count',
            'average_rating', 'review_count', 'creator_name', 'total_modules',
            'total_lessons', 'created_at'
        ]
        read_only_fields = [
            'slug', 'enrolled_count', 'average_rating', 'review_count',
            'total_modules', 'total_lessons', 'created_at'
        ]

class CourseDetailSerializer(serializers.ModelSerializer):
    """Serializer for course details"""
    
    category = CourseCategorySerializer(read_only=True)
    source = CourseSourceSerializer(read_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True, allow_null=True)
    prerequisites = CourseListSerializer(many=True, read_only=True)
    total_modules = serializers.IntegerField(read_only=True)
    total_lessons = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'category', 'course_type', 'difficulty', 'thumbnail',
            'preview_video_url', 'tags', 'estimated_hours', 'language',
            'required_skills', 'source', 'source_url', 'source_name',
            'imported_date', 'ai_generated', 'ai_model_used',
            'ai_generated_at', 'school', 'created_by', 'created_by_name',
            'is_published', 'is_featured', 'is_free', 'prerequisites',
            'enrolled_count', 'average_rating', 'review_count',
            'total_modules', 'total_lessons', 'created_at', 'updated_at',
            'published_at'
        ]
        read_only_fields = [
            'slug', 'enrolled_count', 'average_rating', 'review_count',
            'total_modules', 'total_lessons', 'created_at', 'updated_at',
            'published_at'
        ]
    
    def validate_tags(self, value):
        """Validate tags array"""
        if len(value) > 20:
            raise serializers.ValidationError("Maximum 20 tags allowed.")
        return value

class CourseCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating courses"""
    
    class Meta:
        model = Course
        fields = [
            'title', 'description', 'short_description', 'category',
            'course_type', 'difficulty', 'thumbnail', 'preview_video_url',
            'tags', 'estimated_hours', 'language', 'required_skills',
            'is_published', 'is_featured', 'is_free', 'prerequisites'
        ]
    
    def create(self, validated_data):
        # Get the current user from context
        user = self.context['request'].user
        
        # Handle prerequisites
        prerequisites = validated_data.pop('prerequisites', [])
        
        # Create course
        course = Course.objects.create(
            **validated_data,
            created_by=user
        )
        
        # Add prerequisites
        if prerequisites:
            course.prerequisites.set(prerequisites)
        
        return course

# =============== Module Serializers ===============
class ModuleListSerializer(serializers.ModelSerializer):
    """Serializer for listing modules"""
    
    total_lessons = serializers.IntegerField(read_only=True)
    estimated_time = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Module
        fields = [
            'id', 'title', 'slug', 'order', 'difficulty', 'description',
            'thumbnail', 'video_intro_url', 'total_lessons', 'estimated_time',
            'created_at'
        ]
        read_only_fields = ['slug', 'total_lessons', 'estimated_time', 'created_at']

class ModuleDetailSerializer(serializers.ModelSerializer):
    """Serializer for module details"""
    
    course_title = serializers.CharField(source='course.title', read_only=True)
    total_lessons = serializers.IntegerField(read_only=True)
    estimated_time = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Module
        fields = [
            'id', 'course', 'course_title', 'title', 'slug', 'order',
            'difficulty', 'description', 'key_concepts', 'learning_objectives',
            'common_misconceptions', 'thumbnail', 'video_intro_url',
            'total_lessons', 'estimated_time', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'slug', 'total_lessons', 'estimated_time', 'created_at', 'updated_at'
        ]

# =============== Lesson Serializers ===============
class LessonListSerializer(serializers.ModelSerializer):
    """Serializer for listing lessons"""
    
    module_title = serializers.CharField(source='module.title', read_only=True)
    
    class Meta:
        model = Lesson
        fields = [
            'id', 'title', 'slug', 'lesson_type', 'order', 'module', 'module_title',
            'estimated_minutes', 'points', 'is_published', 'created_at'
        ]
        read_only_fields = ['slug', 'created_at']

class LessonDetailSerializer(serializers.ModelSerializer):
    """Serializer for lesson details"""
    
    module_title = serializers.CharField(source='module.title', read_only=True)
    course_title = serializers.CharField(source='module.course.title', read_only=True)
    
    class Meta:
        model = Lesson
        fields = [
            'id', 'module', 'module_title', 'course_title', 'title', 'slug',
            'lesson_type', 'order', 'content', 'problem_statement', 'solution',
            'examples', 'questions', 'ai_difficulty_score', 'ai_prerequisites',
            'ai_generated_hints', 'video_url', 'image_url', 'audio_url',
            'interactive_element', 'key_terms', 'learning_tips',
            'common_mistakes', 'estimated_minutes', 'points', 'is_published',
            'requires_completion', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'slug', 'ai_difficulty_score', 'ai_prerequisites',
            'ai_generated_hints', 'created_at', 'updated_at'
        ]

# =============== AI Knowledge Chunk Serializers ===============
class AIKnowledgeChunkListSerializer(serializers.ModelSerializer):
    """Serializer for listing AI knowledge chunks"""
    
    class Meta:
        model = AIKnowledgeChunk
        fields = [
            'id', 'title', 'content_type', 'difficulty_level', 'subject', 'topic',
            'clarity_score', 'accuracy_score', 'times_used', 'success_rate',
            'created_at'
        ]

class AIKnowledgeChunkDetailSerializer(serializers.ModelSerializer):
    """Serializer for AI knowledge chunk details"""
    
    source_name = serializers.CharField(source='source.name', read_only=True, allow_null=True)
    prerequisites_titles = serializers.SerializerMethodField()
    related_concepts_titles = serializers.SerializerMethodField()
    
    class Meta:
        model = AIKnowledgeChunk
        fields = [
            'id', 'title', 'content', 'content_type', 'difficulty_level',
            'subject', 'topic', 'subtopics', 'teaching_strategy',
            'learning_objectives', 'target_audience', 'prerequisites',
            'prerequisites_titles', 'related_concepts', 'related_concepts_titles',
            'source', 'source_name', 'source_url', 'clarity_score',
            'completeness_score', 'accuracy_score', 'engagement_score',
            'times_used', 'success_rate', 'user_ratings', 'user_feedback',
            'ai_analyzed', 'ai_analysis_metadata', 'created_at', 'updated_at',
            'last_used'
        ]
        read_only_fields = [
            'clarity_score', 'completeness_score', 'accuracy_score',
            'engagement_score', 'times_used', 'success_rate', 'user_ratings',
            'user_feedback', 'created_at', 'updated_at', 'last_used'
        ]
    
    def get_prerequisites_titles(self, obj):
        return [chunk.title for chunk in obj.prerequisites.all()]
    
    def get_related_concepts_titles(self, obj):
        return [chunk.title for chunk in obj.related_concepts.all()]

# =============== AI Knowledge Graph Serializers ===============
class AIKnowledgeGraphSerializer(serializers.ModelSerializer):
    """Serializer for AI knowledge graph edges"""
    
    source_concept_title = serializers.CharField(source='source_concept.title', read_only=True)
    target_concept_title = serializers.CharField(source='target_concept.title', read_only=True)
    
    class Meta:
        model = AIKnowledgeGraph
        fields = [
            'id', 'source_concept', 'source_concept_title', 'relationship_type',
            'target_concept', 'target_concept_title', 'strength', 'confidence',
            'source', 'ai_confirmed', 'needs_review', 'review_notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

# =============== User Course Progress Serializers ===============
class UserCourseProgressSerializer(serializers.ModelSerializer):
    """Serializer for user course progress"""
    
    course_title = serializers.CharField(source='course.title', read_only=True)
    course_thumbnail = serializers.ImageField(source='course.thumbnail', read_only=True)
    current_module_title = serializers.CharField(source='current_module.title', read_only=True, allow_null=True)
    current_lesson_title = serializers.CharField(source='current_lesson.title', read_only=True, allow_null=True)
    completed_modules_count = serializers.IntegerField(read_only=True)
    completed_lessons_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = UserCourseProgress
        fields = [
            'id', 'user', 'course', 'course_title', 'course_thumbnail',
            'current_module', 'current_module_title', 'current_lesson',
            'current_lesson_title', 'completion_percentage', 'started_at',
            'last_accessed', 'completed', 'completed_at', 'time_spent',
            'quiz_scores', 'weak_points', 'completed_modules',
            'completed_lessons', 'completed_modules_count',
            'completed_lessons_count', 'last_session_duration',
            'total_sessions', 'engagement_score', 'consistency_score',
            'user_notes', 'bookmarks'
        ]
        read_only_fields = [
            'completion_percentage', 'started_at', 'last_accessed',
            'completed_at', 'completed_modules_count', 'completed_lessons_count'
        ]

class CourseProgressUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating course progress"""
    
    class Meta:
        model = UserCourseProgress
        fields = [
            'current_module', 'current_lesson', 'quiz_scores', 'weak_points',
            'user_notes', 'bookmarks'
        ]

# =============== Course Search Serializers ===============
class CourseSearchSerializer(serializers.Serializer):
    """Serializer for course search"""
    
    query = serializers.CharField(required=False)
    category = serializers.CharField(required=False)
    difficulty = serializers.CharField(required=False)
    min_rating = serializers.FloatField(required=False, min_value=0.0, max_value=5.0)
    is_free = serializers.BooleanField(required=False)
    is_featured = serializers.BooleanField(required=False)
    sort_by = serializers.ChoiceField(
        required=False,
        choices=[
            ('relevance', 'Relevance'),
            ('newest', 'Newest'),
            ('rating', 'Highest Rating'),
            ('popular', 'Most Popular'),
            ('duration', 'Shortest Duration'),
        ],
        default='relevance'
    )
    page = serializers.IntegerField(required=False, min_value=1, default=1)
    page_size = serializers.IntegerField(required=False, min_value=1, max_value=100, default=20)

# =============== Course Import Serializers ===============
class CourseImportSerializer(serializers.Serializer):
    """Serializer for importing courses"""
    
    source_url = serializers.URLField(required=True)
    source_type = serializers.ChoiceField(
        required=True,
        choices=[
            ('khan_academy', 'Khan Academy'),
            ('youtube', 'YouTube Educational'),
            ('coursera', 'Coursera'),
            ('edx', 'edX'),
            ('openstax', 'OpenStax'),
            ('mit_ocw', 'MIT OpenCourseWare'),
            ('custom', 'Custom Upload'),
        ]
    )
    source_id = serializers.IntegerField(required=False, allow_null=True)
    generate_embeddings = serializers.BooleanField(default=True)
    analyze_with_ai = serializers.BooleanField(default=True)
    max_chunks = serializers.IntegerField(default=100, min_value=1, max_value=1000)