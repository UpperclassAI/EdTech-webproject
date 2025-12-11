from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

# Register viewsets
router.register(r'categories', views.CourseCategoryViewSet, basename='category')
router.register(r'sources', views.CourseSourceViewSet, basename='source')
router.register(r'import-jobs', views.CourseImportJobViewSet, basename='import-job')
router.register(r'courses', views.CourseViewSet, basename='course')
router.register(r'modules', views.ModuleViewSet, basename='module')
router.register(r'lessons', views.LessonViewSet, basename='lesson')
router.register(r'knowledge-chunks', views.AIKnowledgeChunkViewSet, basename='knowledge-chunk')
router.register(r'progress', views.UserCourseProgressViewSet, basename='progress')

# Additional URL patterns
urlpatterns = [
    path('', include(router.urls)),
    
    # Dashboard
    path('dashboard/', views.UserDashboardView.as_view(), name='dashboard'),
    
    # Knowledge base stats
    path('knowledge-base-stats/', views.KnowledgeBaseStatsView.as_view(), name='knowledge-base-stats'),
]