"""
Manages active tutor sessions
"""

import threading
import time
from typing import Dict, Optional
from django.utils import timezone
from django.core.cache import cache
from django.db import transaction

from ai_tutor.models import UpperclassTutorSession
from .tutor_engine import UpperclassTutorEngine

class TutorSessionManager:
    """Manages active tutor sessions"""
    
    def __init__(self):
        self.active_sessions = {}
        self.session_lock = threading.Lock()
        self.cleanup_thread = threading.Thread(target=self._cleanup_inactive_sessions, daemon=True)
        self.cleanup_thread.start()
    
    def get_or_create_session(self, user_id: str, learning_goal: str, 
                            subject: str, proficiency: str) -> Dict[str, Any]:
        """Get existing session or create new one"""
        
        session_key = f"tutor_session_{user_id}"
        
        with self.session_lock:
            # Check cache first
            cached_session = cache.get(session_key)
            
            if cached_session and cached_session.get('status') == 'active':
                return cached_session
            
            # Check database for active session
            active_session = UpperclassTutorSession.objects.filter(
                user_id=user_id,
                status='active',
                learning_goal__icontains=learning_goal[:50]
            ).first()
            
            if active_session:
                # Load session from database
                session_data = self._load_session_data(active_session)
                cache.set(session_key, session_data, timeout=3600)  # 1 hour
                self.active_sessions[active_session.id] = session_data
                return session_data
            
            # Create new session
            return self._create_new_session(user_id, learning_goal, subject, proficiency)
    
    def _create_new_session(self, user_id: str, learning_goal: str,
                          subject: str, proficiency: str) -> Dict[str, Any]:
        """Create a new tutor session"""
        
        with transaction.atomic():
            # Create session in database
            session = UpperclassTutorSession.objects.create(
                user_id=user_id,
                learning_goal=learning_goal,
                subject=subject,
                user_proficiency=proficiency,
                status='active'
            )
            
            # Initialize tutor engine
            tutor_engine = UpperclassTutorEngine(str(session.id), user_id)
            
            # Start session
            session_data = tutor_engine.start_session(
                learning_goal=learning_goal,
                subject=subject,
                proficiency=proficiency
            )
            
            # Update session with initial data
            session.current_concept = learning_goal
            session.conversation_history = [{
                'role': 'tutor',
                'content': session_data['greeting'],
                'timestamp': str(timezone.now())
            }]
            session.save()
            
            # Prepare session data for cache
            full_session_data = {
                'session_id': str(session.id),
                'user_id': user_id,
                'learning_goal': learning_goal,
                'subject': subject,
                'proficiency': proficiency,
                'tutor_engine': tutor_engine,
                'conversation_history': session.conversation_history,
                'status': 'active',
                'created_at': str(session.start_time),
                'last_activity': str(timezone.now())
            }
            
            # Cache session
            cache_key = f"tutor_session_{user_id}"
            cache.set(cache_key, full_session_data, timeout=3600)
            
            # Store in active sessions
            self.active_sessions[session.id] = full_session_data
            
            return full_session_data
    
    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        """Get session by ID"""
        
        with self.session_lock:
            # Check active sessions
            if session_id in self.active_sessions:
                return self.active_sessions[session_id]
            
            # Check database
            try:
                session = UpperclassTutorSession.objects.get(id=session_id)
                session_data = self._load_session_data(session)
                
                # Add to active sessions
                self.active_sessions[session_id] = session_data
                
                return session_data
            except UpperclassTutorSession.DoesNotExist:
                return None
    
    def update_session_activity(self, session_id: str):
        """Update session last activity"""
        
        with self.session_lock:
            if session_id in self.active_sessions:
                self.active_sessions[session_id]['last_activity'] = str(timezone.now())
                
                # Update in cache
                cache_key = f"tutor_session_{self.active_sessions[session_id]['user_id']}"
                cache.set(cache_key, self.active_sessions[session_id], timeout=3600)
            
            # Update database
            try:
                session = UpperclassTutorSession.objects.get(id=session_id)
                session.save()  # This updates last_activity field
            except:
                pass
    
    def end_session(self, session_id: str):
        """End a tutor session"""
        
        with self.session_lock:
            if session_id in self.active_sessions:
                # Remove from active sessions
                session_data = self.active_sessions.pop(session_id)
                
                # Remove from cache
                cache_key = f"tutor_session_{session_data['user_id']}"
                cache.delete(cache_key)
            
            # Update database
            try:
                session = UpperclassTutorSession.objects.get(id=session_id)
                session.status = 'completed'
                session.save()
            except:
                pass
    
    def _load_session_data(self, session: UpperclassTutorSession) -> Dict[str, Any]:
        """Load session data from database model"""
        
        tutor_engine = UpperclassTutorEngine(str(session.id), str(session.user_id))
        
        # Reconstruct tutor engine state from session data
        if session.ai_state:
            # Load saved AI state if available
            pass
        
        return {
            'session_id': str(session.id),
            'user_id': str(session.user_id),
            'learning_goal': session.learning_goal,
            'subject': session.subject,
            'proficiency': session.user_proficiency,
            'tutor_engine': tutor_engine,
            'conversation_history': session.conversation_history,
            'current_concept': session.current_concept,
            'status': session.status,
            'progress': session.progress,
            'created_at': str(session.start_time),
            'last_activity': str(session.last_activity)
        }
    
    def _cleanup_inactive_sessions(self):
        """Background thread to cleanup inactive sessions"""
        
        while True:
            time.sleep(300)  # Run every 5 minutes
            
            try:
                with self.session_lock:
                    current_time = timezone.now()
                    
                    # Cleanup sessions inactive for more than 30 minutes
                    sessions_to_remove = []
                    
                    for session_id, session_data in list(self.active_sessions.items()):
                        last_activity = timezone.datetime.fromisoformat(
                            session_data['last_activity'].replace('Z', '+00:00')
                        )
                        
                        if (current_time - last_activity).total_seconds() > 1800:  # 30 minutes
                            sessions_to_remove.append(session_id)
                    
                    for session_id in sessions_to_remove:
                        self.end_session(session_id)
                        
            except Exception as e:
                print(f"Session cleanup error: {e}")

# Global session manager instance
session_manager = TutorSessionManager()