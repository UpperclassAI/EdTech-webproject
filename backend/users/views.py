from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ValidationError
from django.db import transaction

from .models import UpperclassUser, School, UserLearningProfile
from .serializers import (
    RegisterSerializer, LoginSerializer, UserSerializer, 
    UserUpdateSerializer, PasswordChangeSerializer,
    SchoolCreateSerializer, SchoolSerializer
)

class RegisterAPIView(generics.CreateAPIView):
    """Register a new user"""
    
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        with transaction.atomic():
            user = serializer.save()
            
            # Create auth token
            token, created = Token.objects.get_or_create(user=user)
            
            # Return response
            return Response({
                'user': UserSerializer(user, context=self.get_serializer_context()).data,
                'token': token.key,
                'message': 'User created successfully'
            }, status=status.HTTP_201_CREATED)

class LoginAPIView(APIView):
    """Login a user"""
    
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data['user']
        
        # Create or get token
        token, created = Token.objects.get_or_create(user=user)
        
        # Login the user (for session authentication)
        login(request, user)
        
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
            'message': 'Login successful'
        })

class LogoutAPIView(APIView):
    """Logout a user"""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        # Delete token if using token auth
        try:
            request.user.auth_token.delete()
        except (AttributeError, Token.DoesNotExist):
            pass
        
        # Logout for session auth
        logout(request)
        
        return Response({
            'message': 'Logout successful'
        })

class UserProfileAPIView(generics.RetrieveUpdateAPIView):
    """Get or update user profile"""
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user

class UserUpdateAPIView(generics.UpdateAPIView):
    """Update user profile details"""
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserUpdateSerializer
    
    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        self.perform_update(serializer)
        
        return Response({
            'user': UserSerializer(instance).data,
            'message': 'Profile updated successfully'
        })

class PasswordChangeAPIView(APIView):
    """Change user password"""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        old_password = serializer.validated_data['old_password']
        new_password = serializer.validated_data['new_password']
        
        # Check old password
        if not user.check_password(old_password):
            return Response(
                {'error': 'Old password is incorrect'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Set new password
        user.set_password(new_password)
        user.save()
        
        # Update token
        Token.objects.filter(user=user).delete()
        token = Token.objects.create(user=user)
        
        return Response({
            'message': 'Password changed successfully',
            'token': token.key
        })

class SchoolCreateAPIView(generics.CreateAPIView):
    """Create a new school"""
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SchoolCreateSerializer
    
    def perform_create(self, serializer):
        # Check if user can create a school
        user = self.request.user
        if user.user_type not in ['school', 'teacher']:
            raise ValidationError("Only school or teacher accounts can create schools.")
        
        serializer.save()

class SchoolListAPIView(generics.ListAPIView):
    """List schools for the current user"""
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SchoolSerializer
    
    def get_queryset(self):
        user = self.request.user
        
        if user.user_type == 'individual':
            # Individuals can only see schools they're members of
            return School.objects.filter(
                id__in=user.student_at_schools.all() | 
                user.teacher_at_schools.all() |
                user.admin_of_school.all()
            ).distinct()
        else:
            # Schools and teachers can see all schools
            return School.objects.all()

class SchoolDetailAPIView(generics.RetrieveUpdateAPIView):
    """Get or update school details"""
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SchoolSerializer
    queryset = School.objects.all()
    
    def check_object_permissions(self, request, obj):
        # Check if user has permission to access this school
        user = request.user
        
        if user.user_type == 'individual':
            # Individuals can only access schools they're members of
            if not (user in obj.students.all() or 
                   user in obj.teachers.all() or 
                   user == obj.admin):
                self.permission_denied(request, "You don't have permission to access this school.")
        
        super().check_object_permissions(request, obj)

class LearningProfileAPIView(generics.RetrieveAPIView):
    """Get user's learning profile"""
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        try:
            profile = UserLearningProfile.objects.get(user=request.user)
            
            # Calculate some stats
            from courses.models import UserCourseProgress
            progresses = UserCourseProgress.objects.filter(user=request.user)
            
            data = {
                'user': request.user.username,
                'completion_rate': profile.completion_rate,
                'average_session_time': profile.average_session_time,
                'total_learning_time': profile.total_learning_time,
                'strong_areas': profile.strong_areas,
                'weak_areas': profile.weak_areas,
                'current_streak': profile.current_streak,
                'longest_streak': profile.longest_streak,
                'weekly_goal': profile.weekly_goal,
                'progress_percentage': (profile.total_learning_time / profile.weekly_goal * 100) if profile.weekly_goal > 0 else 0,
                'total_courses_enrolled': progresses.count(),
                'completed_courses': progresses.filter(completed=True).count(),
                'average_quiz_score': profile.average_quiz_score,
                'last_assessment_date': profile.last_assessment_date,
                'preferred_teaching_strategy': profile.preferred_teaching_strategy,
                'difficulty_preference': profile.difficulty_preference
            }
            
            return Response(data)
            
        except UserLearningProfile.DoesNotExist:
            # Create profile if it doesn't exist
            profile = UserLearningProfile.objects.create(user=request.user)
            return Response({
                'message': 'Learning profile created',
                'profile': {
                    'completion_rate': 0.0,
                    'average_session_time': 0.0,
                    'total_learning_time': 0.0
                }
            })

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def check_username(request):
    """Check if username is available"""
    username = request.GET.get('username', '')
    
    if not username:
        return Response({'error': 'Username parameter is required'}, status=400)
    
    exists = UpperclassUser.objects.filter(username__iexact=username).exists()
    
    return Response({
        'username': username,
        'available': not exists,
        'exists': exists
    })

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def check_email(request):
    """Check if email is available"""
    email = request.GET.get('email', '')
    
    if not email:
        return Response({'error': 'Email parameter is required'}, status=400)
    
    exists = UpperclassUser.objects.filter(email__iexact=email).exists()
    
    return Response({
        'email': email,
        'available': not exists,
        'exists': exists
    })