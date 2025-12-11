from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'tutor', views.TutorViewSet, basename='tutor')

urlpatterns = [
    path('', include(router.urls)),
    
    # Additional endpoints
    path('personalities/', views.get_available_personalities, name='personalities'),
    path('strategies/', views.get_teaching_strategies, name='strategies'),
    path('stream-explanation/', views.stream_explanation, name='stream_explanation'),
]