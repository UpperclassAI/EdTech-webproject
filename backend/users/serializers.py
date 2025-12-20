from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import UpperclassUser, School, UserLearningProfile

class SchoolSerializer(serializers.ModelSerializer):
    """Serializer for School model"""
    
    class Meta:
        model = School
        fields = [
            'id', 'name', 'license_key', 'subscription_tier', 
            'max_users', 'website', 'is_active'
        ]
        read_only_fields = ['id', 'license_key']

class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True, 
        required=True,
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = UpperclassUser
        fields = [
            'username', 'email', 'password', 'password2',
            'first_name', 'last_name', 'user_type',
            'school_name', 'grade_level'
        ]
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
        }
    
    def validate(self, attrs):
        # Check if passwords match
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields don't match."})
        
        # Check if email already exists
        if UpperclassUser.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "A user with this email already exists."})
        
        # Check if username already exists
        if UpperclassUser.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({"username": "A user with this username already exists."})
        
        return attrs
    
    def create(self, validated_data):
        # Remove password2 from validated data
        validated_data.pop('password2')
        
        # Create user
        user = UpperclassUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            user_type=validated_data.get('user_type', 'individual'),
            school_name=validated_data.get('school_name', ''),
            grade_level=validated_data.get('grade_level', '')
        )
        
        # Create learning profile for the user
        UserLearningProfile.objects.create(user=user)
        
        return user

class LoginSerializer(serializers.Serializer):
    """Serializer for user login"""
    
    username = serializers.CharField(required=True)
    password = serializers.CharField(
        required=True,
        style={'input_type': 'password'},
        write_only=True
    )
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            # Try to authenticate
            user = authenticate(request=self.context.get('request'),
                               username=username, password=password)
            
            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "username" and "password".'
            raise serializers.ValidationError(msg, code='authorization')
        
        attrs['user'] = user
        return attrs

class UserSerializer(serializers.ModelSerializer):
    """Serializer for user details"""
    
    school = SchoolSerializer(source='admin_of_school', read_only=True)
    learning_profile = serializers.SerializerMethodField()
    
    class Meta:
        model = UpperclassUser
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'user_type', 'avatar', 'bio', 'preferred_learning_style',
            'proficiency_level', 'interests', 'school_name', 'grade_level',
            'school', 'learning_profile', 'date_joined', 'last_login'
        ]
        read_only_fields = ['id', 'date_joined', 'last_login']
    
    def get_learning_profile(self, obj):
        """Get user's learning profile"""
        try:
            profile = obj.learning_profile
            return {
                'completion_rate': profile.completion_rate,
                'average_session_time': profile.average_session_time,
                'strong_areas': profile.strong_areas,
                'weak_areas': profile.weak_areas,
                'current_streak': profile.current_streak,
                'longest_streak': profile.longest_streak
            }
        except UserLearningProfile.DoesNotExist:
            return None

class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile"""
    
    class Meta:
        model = UpperclassUser
        fields = [
            'first_name', 'last_name', 'bio', 'avatar',
            'preferred_learning_style', 'proficiency_level',
            'interests', 'grade_level'
        ]
    
    def validate_interests(self, value):
        """Validate interests array"""
        if len(value) > 10:
            raise serializers.ValidationError("You can have at most 10 interests.")
        return value

class PasswordChangeSerializer(serializers.Serializer):
    """Serializer for password change"""
    
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(
        required=True, 
        write_only=True,
        validators=[validate_password]
    )
    new_password2 = serializers.CharField(required=True, write_only=True)
    
    def validate(self, attrs):
        # Check if new passwords match
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({"new_password": "Password fields don't match."})
        
        return attrs

class SchoolCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating a school"""
    
    class Meta:
        model = School
        fields = ['name', 'address', 'website', 'phone', 'email', 'max_users']
    
    def create(self, validated_data):
        # Get the user creating the school (should be the admin)
        user = self.context['request'].user
        
        # Generate a unique license key
        import uuid
        license_key = f"SCH-{uuid.uuid4().hex[:12].upper()}"
        
        # Create school
        school = School.objects.create(
            **validated_data,
            license_key=license_key,
            admin=user
        )
        
        # Add the user as admin to the school
        school.save()
        
        return school