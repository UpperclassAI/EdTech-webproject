from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.views import View
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

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
    path('api/auth/', include('rest_framework.urls')),
    path('api/users/', include('users.urls')),
    path('api/courses/', include('courses.urls')),
    path('api/ai-tutor/', include('ai_tutor.urls')),
    path('api/chatbot/', include('chatbot.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


