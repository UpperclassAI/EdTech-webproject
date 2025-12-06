from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

from .models import TutorSession
from .services.ai_tutor import AITutorService
from curriculum.models import Topic

class TutorViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['post'])
    def start_session(self, request):
        """Start a new tutoring session."""
        topic_id = request.data.get('topic_id')
        difficulty = request.data.get('difficulty', 'beginner')
        
        # Get or create active session
        active_session = TutorSession.objects.filter(
            user=request.user,
            is_active=True
        ).first()
        
        if active_session:
            # Reactivate existing session
            active_session.is_active = True
            active_session.save()
            session_id = active_session.id
        else:
            # Create new session
            topic = Topic.objects.get(id=topic_id) if topic_id else None
            new_session = TutorSession.objects.create(
                user=request.user,
                current_topic=topic,
                difficulty_level=difficulty
            )
            session_id = new_session.id
        
        return Response({
            'session_id': session_id,
            'message': 'Session started',
            'difficulty': difficulty
        })
    
    @action(detail=False, methods=['post'])
    def send_message(self, request):
        """Send a message to the tutor and get response."""
        session_id = request.data.get('session_id')
        user_message = request.data.get('message')
        
        try:
            session = TutorSession.objects.get(id=session_id, user=request.user)
            
            # Get curriculum context
            curriculum_context = {}
            if session.current_topic:
                curriculum_context = {
                    'topic_title': session.current_topic.title,
                    'topic_content': session.current_topic.content,
                    'difficulty': session.current_topic.difficulty_level
                }
            
            # Initialize AI tutor
            tutor_service = AITutorService()
            
            # Prepare session data
            session_data = {
                'difficulty_level': session.difficulty_level,
                'conversation_history': session.conversation_history[-10:]  # Last 10 messages
            }
            
            # Get AI response
            ai_response = tutor_service.generate_response(
                user_message,
                session_data,
                curriculum_context
            )
            
            # Update conversation history
            session.conversation_history.append({
                'role': 'user',
                'message': user_message,
                'timestamp': str(timezone.now())
            })
            session.conversation_history.append({
                'role': 'tutor',
                'message': ai_response['text'],
                'expression': ai_response['expression'],
                'timestamp': str(timezone.now())
            })
            
            session.save()
            
            return Response({
                'response': ai_response['text'],
                'expression': ai_response['expression'],
                'suggested_action': ai_response['suggested_action'],
                'requires_response': ai_response['requires_response'],
                'session_id': session_id
            })
            
        except TutorSession.DoesNotExist:
            return Response(
                {'error': 'Session not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )