from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.views import View

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tutor.views import TutorViewSet

router = DefaultRouter()
router.register(r'tutor', TutorViewSet, basename='tutor')

class RootView(View):
    def get(self, request):
        return JsonResponse({
            "message": "UpperclassAI web API is running!",
            "endpoints": {
                "admin": "/admin/",
                "api": "/api/",  # if you have API routes
            },
            "status": "active"
        })
    
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('courses.urls')),
    path('api/', include('users.urls')),
    path('api/', include(router.urls)),
    path('api/auth/', include('rest_framework.urls')),
]


