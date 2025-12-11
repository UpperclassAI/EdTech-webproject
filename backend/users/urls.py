from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path('register/', views.RegisterAPIView.as_view(), name='register'),
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('logout/', views.LogoutAPIView.as_view(), name='logout'),
    
    # User Profile
    path('profile/', views.UserProfileAPIView.as_view(), name='profile'),
    path('profile/update/', views.UserUpdateAPIView.as_view(), name='profile-update'),
    path('password/change/', views.PasswordChangeAPIView.as_view(), name='password-change'),
    
    # Learning Profile
    path('learning-profile/', views.LearningProfileAPIView.as_view(), name='learning-profile'),
    
    # Schools
    path('schools/create/', views.SchoolCreateAPIView.as_view(), name='school-create'),
    path('schools/', views.SchoolListAPIView.as_view(), name='school-list'),
    path('schools/<int:pk>/', views.SchoolDetailAPIView.as_view(), name='school-detail'),
    
    # Validation
    path('check-username/', views.check_username, name='check-username'),
    path('check-email/', views.check_email, name='check-email'),
]