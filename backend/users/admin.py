from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UpperclassUser, School, UserLearningProfile

@admin.register(UpperclassUser)
class UpperclassUserAdmin(UserAdmin):
    """Admin configuration for Upperclass User"""
    
    list_display = ('username', 'email', 'user_type', 'school_name', 'is_staff', 'is_active')
    list_filter = ('user_type', 'is_staff', 'is_active', 'date_joined')
    search_fields = ('username', 'email', 'school_name', 'first_name', 'last_name')
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'email', 'bio', 'avatar')}),
        ('User Type', {'fields': ('user_type', 'school_name', 'grade_level')}),
        ('Learning Preferences', {'fields': ('preferred_learning_style', 'proficiency_level', 'interests')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'user_type'),
        }),
    )
    
    ordering = ('-date_joined',)

@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'license_key', 'subscription_tier', 'max_users', 'admin')
    list_filter = ('subscription_tier',)
    search_fields = ('name', 'license_key', 'admin__username')
    raw_id_fields = ('admin', 'teachers', 'students')

@admin.register(UserLearningProfile)
class UserLearningProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'completion_rate', 'average_session_time', 'last_assessment_date')
    search_fields = ('user__username', 'user__email')
    readonly_fields = ('created_at', 'updated_at')