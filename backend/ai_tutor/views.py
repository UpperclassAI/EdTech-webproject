"""
API views for AI Tutor
"""

import json
from django.http import StreamingHttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework import viewsets, status 
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
import asyncio

from .models import UpperclassTutorSession, TutorPersonality, TeachingStrategy
from .services.simple_tutor import SimpleTutorEngine as UpperclassTutorEngine
from .services.session_manager import session_manager
from .services.streaming_tutor import StreamingTutor
from .serializers import TutorSessionSerializer

class TutorViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, FormParser, MultiPartParser]
    
    @action(detail=False, methods=['POST'])
    def start_session(self, request):
        """Start a new tutoring session"""
        
        learning_goal = request.data.get('learning_goal', '').strip()
        subject = request.data.get('subject', 'general')
        proficiency = request.data.get('proficiency', 'beginner')
        
        if not learning_goal:
            return Response(
                {'error': 'Please specify what you want to learn'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get or create session
        session_data = session_manager.get_or_create_session(
            user_id=str(request.user.id),
            learning_goal=learning_goal,
            subject=subject,
            proficiency=proficiency
        )
        
        return Response({
            'session_id': session_data['session_id'],
            'greeting': session_data.get('greeting', 'Welcome to Upperclass AI Tutor!'),
            'learning_plan': session_data.get('learning_plan', {}),
            'personality': session_data.get('personality', 'Adaptive'),
            'teaching_strategy': session_data.get('teaching_strategy', 'Direct Instruction'),
            'message': 'Session started successfully'
        })
    
    @action(detail=False, methods=['POST'])
    def teach_concept(self, request):
        """Teach a specific concept"""
        
        session_id = request.data.get('session_id')
        concept = request.data.get('concept', '').strip()
        context = request.data.get('context', '')
        
        if not session_id or not concept:
            return Response(
                {'error': 'Session ID and concept are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get session
        session_data = session_manager.get_session(session_id)
        
        if not session_data or session_data['user_id'] != str(request.user.id):
            return Response(
                {'error': 'Session not found or access denied'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Update session activity
        session_manager.update_session_activity(session_id)
        
        # Teach concept
        tutor_engine = session_data['tutor_engine']
        result = tutor_engine.teach_concept(concept, context)
        
        # Update conversation history
        session_data['conversation_history'].append({
            'role': 'user',
            'content': f"Teach me about: {concept}" + (f"\nContext: {context}" if context else ""),
            'timestamp': str(timezone.now())
        })
        
        session_data['conversation_history'].append({
            'role': 'tutor',
            'content': result['explanation'],
            'timestamp': str(timezone.now())
        })
        
        # Update session in database
        try:
            session = UpperclassTutorSession.objects.get(id=session_id)
            session.current_concept = concept
            session.conversation_history = session_data['conversation_history']
            session.total_messages += 2
            session.save()
        except:
            pass
        
        return Response(result)
    
    @action(detail=False, methods=['POST'])
    def ask_question(self, request):
        """Ask the tutor a question"""
        
        session_id = request.data.get('session_id')
        question = request.data.get('question', '').strip()
        
        if not session_id or not question:
            return Response(
                {'error': 'Session ID and question are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get session
        session_data = session_manager.get_session(session_id)
        
        if not session_data or session_data['user_id'] != str(request.user.id):
            return Response(
                {'error': 'Session not found or access denied'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Update session activity
        session_manager.update_session_activity(session_id)
        
        # Answer question
        tutor_engine = session_data['tutor_engine']
        result = tutor_engine.answer_question(question)
        
        # Update conversation history
        session_data['conversation_history'].append({
            'role': 'user',
            'content': question,
            'timestamp': str(timezone.now())
        })
        
        session_data['conversation_history'].append({
            'role': 'tutor',
            'content': result['answer'],
            'timestamp': str(timezone.now())
        })
        
        # Update session in database
        try:
            session = UpperclassTutorSession.objects.get(id=session_id)
            session.conversation_history = session_data['conversation_history']
            session.total_messages += 2
            session.save()
        except:
            pass
        
        return Response(result)
    
    @action(detail=False, methods=['POST'])
    def assess_understanding(self, request):
        """Assess user's understanding"""
        
        session_id = request.data.get('session_id')
        concept = request.data.get('concept', '').strip()
        user_response = request.data.get('response', '').strip()
        
        if not all([session_id, concept, user_response]):
            return Response(
                {'error': 'Session ID, concept, and response are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get session
        session_data = session_manager.get_session(session_id)
        
        if not session_data or session_data['user_id'] != str(request.user.id):
            return Response(
                {'error': 'Session not found or access denied'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Update session activity
        session_manager.update_session_activity(session_id)
        
        # Assess understanding
        tutor_engine = session_data['tutor_engine']
        result = tutor_engine.assess_understanding(concept, user_response)
        
        return Response(result)
    
    @action(detail=False, methods=['GET'])
    def get_conversation(self, request):
        """Get conversation history"""
        
        session_id = request.query_params.get('session_id')
        
        if not session_id:
            return Response(
                {'error': 'Session ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get session
        session_data = session_manager.get_session(session_id)
        
        if not session_data or session_data['user_id'] != str(request.user.id):
            return Response(
                {'error': 'Session not found or access denied'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        return Response({
            'conversation': session_data['conversation_history'],
            'session_id': session_id,
            'current_concept': session_data.get('current_concept', ''),
            'progress': session_data.get('progress', 0)
        })
    
    @action(detail=False, methods=['POST'])
    def end_session(self, request):
        """End a tutoring session"""
        
        session_id = request.data.get('session_id')
        
        if not session_id:
            return Response(
                {'error': 'Session ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # End session
        session_manager.end_session(session_id)
        
        return Response({
            'message': 'Session ended successfully',
            'session_id': session_id
        })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_available_personalities(request):
    """Get available tutor personalities"""
    
    personalities = TutorPersonality.objects.filter(is_active=True)
    
    data = []
    for personality in personalities:
        data.append({
            'id': personality.id,
            'name': personality.name,
            'description': personality.description,
            'traits': {
                'formality': personality.formality,
                'enthusiasm': personality.enthusiasm,
                'patience': personality.patience,
                'humor': personality.humor
            }
        })
    
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_teaching_strategies(request):
    """Get available teaching strategies"""
    
    strategies = TeachingStrategy.objects.filter(is_active=True)
    
    data = []
    for strategy in strategies:
        data.append({
            'id': strategy.id,
            'name': strategy.name,
            'type': strategy.get_strategy_type_display(),
            'description': strategy.description,
            'best_for': {
                'beginners': strategy.best_for_beginners,
                'intermediate': strategy.best_for_intermediate,
                'advanced': strategy.best_for_advanced
            },
            'success_rate': strategy.average_success_rate
        })
    
    return Response(data)

# Streaming endpoints
@csrf_exempt
@require_http_methods(["POST"])
def stream_explanation(request):
    """Stream explanation in real-time"""
    
    data = json.loads(request.body)
    session_id = data.get('session_id')
    concept = data.get('concept', '').strip()
    context = data.get('context', '')
    
    if not session_id or not concept:
        return JsonResponse(
            {'error': 'Session ID and concept are required'},
            status=400
        )
    
    # Verify session exists and user has access
    try:
        session = UpperclassTutorSession.objects.get(id=session_id)
        if str(session.user_id) != str(request.user.id):
            return JsonResponse(
                {'error': 'Access denied'},
                status=403
            )
    except UpperclassTutorSession.DoesNotExist:
        return JsonResponse(
            {'error': 'Session not found'},
            status=404
        )
    
    # Create streaming tutor
    streaming_tutor = StreamingTutor(session_id, str(request.user.id))
    
    async def stream_generator():
        async for chunk in streaming_tutor.stream_explanation(concept, context):
            yield f"data: {chunk}\n\n"
    
    response = StreamingHttpResponse(
        stream_generator(),
        content_type='text/event-stream'
    )
    response['Cache-Control'] = 'no-cache'
    response['X-Accel-Buffering'] = 'no'
    
    return response