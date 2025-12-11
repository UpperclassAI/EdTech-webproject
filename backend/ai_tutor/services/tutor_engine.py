"""
Upperclass AI Tutor Engine - The brain of the tutoring system
"""

import json
import time
import numpy as np
from typing import Dict, List, Any, Optional, Tuple
from django.conf import settings
from django.utils import timezone
from django.db import transaction

import openai

# Try different import paths for LangChain compatibility
try:
    # Newer versions of LangChain
    from langchain_openai import ChatOpenAI
    from langchain_openai import OpenAIEmbeddings
    from langchain.schema import HumanMessage, SystemMessage, AIMessage
    from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
    from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
except ImportError:
    try:
        # Older versions of LangChain
        from langchain.chat_models import ChatOpenAI
        from langchain.embeddings import OpenAIEmbeddings
        from langchain.schema import HumanMessage, SystemMessage, AIMessage
        from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
        from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
    except ImportError as e:
        print(f"LangChain import error: {e}")
        # Create dummy classes for development
        class ChatOpenAI:
            def __init__(self, **kwargs):
                pass
            def __call__(self, *args, **kwargs):
                return type('obj', (object,), {'content': 'Mock response'})
            def predict(self, *args, **kwargs):
                return 'Mock response'
        
        class OpenAIEmbeddings:
            def __init__(self, **kwargs):
                pass
            def embed_documents(self, *args, **kwargs):
                return [[0.1] * 1536]
            def embed_query(self, *args, **kwargs):
                return [0.1] * 1536
        
        HumanMessage = SystemMessage = AIMessage = type('obj', (object,), {})
        StreamingStdOutCallbackHandler = type('obj', (object,), {})
        ChatPromptTemplate = MessagesPlaceholder = type('obj', (object,), {})

from courses.vector_db.manager import VectorDBManager
from courses.models import AIKnowledgeChunk
from ai_tutor.models import TutorPersonality, TeachingStrategy, TutorInteractionLog, KnowledgeRetrievalLog

class UpperclassTutorEngine:
    """Main AI Tutor Engine that coordinates teaching"""
    
    def __init__(self, session_id: str = None, user_id: str = None):
        self.session_id = session_id
        self.user_id = user_id
        self.vector_db = VectorDBManager()
        
        # Initialize LLMs with different temperature settings
        self.explanation_llm = ChatOpenAI(
            model_name="gpt-4" if settings.USE_GPT4 else "gpt-3.5-turbo",
            temperature=0.7,
            openai_api_key=settings.OPENAI_API_KEY,
            streaming=True
        )
        
        self.assessment_llm = ChatOpenAI(
            model_name="gpt-3.5-turbo",
            temperature=0.3,  # Lower temperature for assessments
            openai_api_key=settings.OPENAI_API_KEY
        )
        
        self.strategy_llm = ChatOpenAI(
            model_name="gpt-3.5-turbo",
            temperature=0.5,
            openai_api_key=settings.OPENAI_API_KEY
        )
        
        # Initialize state
        self.conversation_history = []
        self.current_concept = None
        self.user_understanding = {}
        self.teaching_strategy = None
        self.personality = None
        
    def start_session(self, learning_goal: str, subject: str, 
                     proficiency: str = 'beginner') -> Dict[str, Any]:
        """Start a new tutoring session"""
        
        # Select appropriate personality and strategy
        self.personality = self._select_personality(proficiency, subject)
        self.teaching_strategy = self._select_teaching_strategy(proficiency, subject)
        
        # Create learning plan
        learning_plan = self._create_learning_plan(learning_goal, subject, proficiency)
        
        # Generate initial greeting
        greeting = self._generate_greeting(learning_goal, self.personality)
        
        # Log session start
        self._log_interaction(
            interaction_type='session_start',
            concept=learning_goal,
            tutor_response=greeting
        )
        
        return {
            'greeting': greeting,
            'learning_plan': learning_plan,
            'personality': self.personality.name if self.personality else 'Default',
            'teaching_strategy': self.teaching_strategy.name if self.teaching_strategy else 'Adaptive',
            'estimated_duration': self._estimate_session_duration(learning_plan),
            'session_id': self.session_id
        }
    
    def teach_concept(self, concept: str, user_context: str = '') -> Dict[str, Any]:
        """Teach a specific concept"""
        
        self.current_concept = concept
        
        # Retrieve relevant knowledge
        knowledge_chunks = self._retrieve_relevant_knowledge(concept, user_context)
        
        if not knowledge_chunks:
            return self._handle_no_knowledge_found(concept)
        
        # Select best teaching approach
        teaching_approach = self._select_teaching_approach(knowledge_chunks)
        
        # Generate explanation
        explanation = self._generate_explanation(
            concept, 
            knowledge_chunks, 
            teaching_approach,
            user_context
        )
        
        # Generate examples and analogies
        examples = self._generate_examples(concept, knowledge_chunks, teaching_approach)
        analogies = self._generate_analogies(concept, knowledge_chunks)
        
        # Determine if we should assess understanding
        should_assess = self._should_assess_understanding(concept, teaching_approach)
        
        # Log the interaction
        self._log_interaction(
            interaction_type='explanation',
            concept=concept,
            user_input=user_context,
            tutor_response=explanation,
            teaching_strategy_used=teaching_approach,
            knowledge_chunks_used=[chunk['id'] for chunk in knowledge_chunks[:3]]
        )
        
        return {
            'concept': concept,
            'explanation': explanation,
            'examples': examples,
            'analogies': analogies,
            'teaching_approach': teaching_approach,
            'should_assess': should_assess,
            'assessment_type': 'question' if should_assess else None,
            'next_suggestions': self._suggest_next_steps(concept),
            'graphical_cues': self._generate_graphical_cues(teaching_approach),
            'confidence_score': self._calculate_confidence(knowledge_chunks)
        }
    
    def assess_understanding(self, concept: str, user_response: str) -> Dict[str, Any]:
        """Assess user's understanding of a concept"""
        
        # Retrieve concept knowledge for context
        knowledge_chunks = self._retrieve_relevant_knowledge(concept, user_response)
        
        # Generate assessment
        assessment = self._generate_assessment(concept, user_response, knowledge_chunks)
        
        # Update user understanding
        self._update_user_understanding(concept, assessment['score'])
        
        # Determine next action
        next_action = self._determine_next_action(assessment['score'], concept)
        
        # Generate feedback
        feedback = self._generate_feedback(assessment, self.personality)
        
        # Log assessment
        self._log_interaction(
            interaction_type='assessment',
            concept=concept,
            user_input=user_response,
            tutor_response=feedback,
            understanding_gain=assessment.get('score', 0),
            was_effective=assessment.get('score', 0) > 0.6
        )
        
        return {
            'concept': concept,
            'assessment': assessment,
            'feedback': feedback,
            'next_action': next_action,
            'understanding_score': assessment['score'],
            'misconceptions_identified': assessment.get('misconceptions', []),
            'suggested_review': assessment.get('suggested_review', []),
            'ready_to_proceed': assessment['score'] >= 0.7
        }
    
    def answer_question(self, question: str, context: str = '') -> Dict[str, Any]:
        """Answer a user's question"""
        
        # Retrieve relevant knowledge
        knowledge_chunks = self._retrieve_relevant_knowledge(question, context)
        
        # Generate answer
        answer = self._generate_answer(question, knowledge_chunks, context)
        
        # Check if answer requires further explanation
        requires_further_explanation = self._check_if_needs_more_explanation(answer, question)
        
        # Log the interaction
        self._log_interaction(
            interaction_type='question',
            concept=self.current_concept or 'General',
            user_input=question,
            tutor_response=answer,
            knowledge_chunks_used=[chunk['id'] for chunk in knowledge_chunks[:3]]
        )
        
        return {
            'question': question,
            'answer': answer,
            'confidence': self._calculate_answer_confidence(knowledge_chunks),
            'sources_used': [chunk['metadata'].get('title', '') for chunk in knowledge_chunks[:3]],
            'suggested_followup': self._suggest_followup_questions(question, answer),
            'requires_further_explanation': requires_further_explanation
        }
    
    def _retrieve_relevant_knowledge(self, query: str, context: str = '') -> List[Dict[str, Any]]:
        """Retrieve relevant knowledge chunks from vector database"""
        
        start_time = time.time()
        
        # Prepare filters based on context
        filters = {}
        if self.current_concept:
            filters['topic'] = self.current_concept
        
        # Get user proficiency if available
        if hasattr(self, 'user_proficiency'):
            filters['difficulty_level'] = self.user_proficiency
        
        # Generate embedding for query
        query_embedding = self._generate_query_embedding(query, context)
        
        # Search vector database
        results = self.vector_db.search_similar(
            query_embedding=query_embedding,
            filters=filters,
            limit=15
        )
        
        retrieval_time = time.time() - start_time
        
        # Log retrieval
        self._log_retrieval(
            query=query,
            filters_applied=filters,
            chunks_retrieved=[r['id'] for r in results],
            retrieval_time=retrieval_time
        )
        
        return results
    
    def _generate_explanation(self, concept: str, knowledge_chunks: List[Dict],
                            teaching_approach: str, context: str = '') -> str:
        """Generate an explanation using retrieved knowledge and teaching approach"""
        
        # Prepare context from knowledge chunks
        knowledge_context = self._prepare_knowledge_context(knowledge_chunks)
        
        # Create prompt based on teaching approach
        prompt = self._create_explanation_prompt(
            concept=concept,
            knowledge_context=knowledge_context,
            teaching_approach=teaching_approach,
            user_context=context,
            personality=self.personality
        )
        
        # Generate explanation
        messages = [
            SystemMessage(content=prompt['system']),
            HumanMessage(content=prompt['user'])
        ]
        
        response = self.explanation_llm(messages)
        
        return response.content
    
    def _generate_assessment(self, concept: str, user_response: str, 
                           knowledge_chunks: List[Dict]) -> Dict[str, Any]:
        """Generate assessment of user's understanding"""
        
        # Prepare knowledge context
        knowledge_context = self._prepare_knowledge_context(knowledge_chunks)
        
        prompt = f"""
        You are Upperclass AI Tutor assessing a student's understanding.
        
        Concept being assessed: {concept}
        
        Key knowledge about this concept:
        {knowledge_context}
        
        Student's response: {user_response}
        
        Please assess:
        1. Understanding score (0-1, where 1 is complete understanding)
        2. Key misconceptions (if any)
        3. Strengths in their understanding
        4. Specific areas that need improvement
        5. Suggested review topics
        
        Return as JSON with these keys: score, misconceptions, strengths, 
        improvement_areas, suggested_review.
        """
        
        messages = [
            SystemMessage(content="You are an expert educational assessor."),
            HumanMessage(content=prompt)
        ]
        
        response = self.assessment_llm(messages)
        
        try:
            assessment = json.loads(response.content)
            return assessment
        except json.JSONDecodeError:
            # Fallback assessment
            return {
                'score': 0.5,
                'misconceptions': [],
                'strengths': ['Attempted to answer'],
                'improvement_areas': ['Need more detail'],
                'suggested_review': [concept]
            }
    
    def _select_teaching_approach(self, knowledge_chunks: List[Dict]) -> str:
        """Select the best teaching approach based on knowledge chunks"""
        
        if not self.teaching_strategy:
            return 'direct'
        
        # Analyze knowledge chunks to determine best approach
        chunk_types = [chunk['metadata'].get('content_type', '') for chunk in knowledge_chunks]
        
        # Count different content types
        example_count = chunk_types.count('example')
        analogy_count = chunk_types.count('analogy')
        problem_count = chunk_types.count('problem')
        
        # Determine approach
        if example_count >= 2:
            return 'worked_example'
        elif analogy_count >= 2:
            return 'analogy'
        elif problem_count >= 2:
            return 'problem_solving'
        else:
            return self.teaching_strategy.strategy_type
    
    def _prepare_knowledge_context(self, knowledge_chunks: List[Dict]) -> str:
        """Prepare knowledge context from retrieved chunks"""
        
        context_parts = []
        
        for i, chunk in enumerate(knowledge_chunks[:5]):  # Use top 5 chunks
            metadata = chunk['metadata']
            content = chunk['content'][:500]  # First 500 chars
            
            context_parts.append(
                f"Knowledge Source {i+1}:\n"
                f"Title: {metadata.get('title', 'Untitled')}\n"
                f"Type: {metadata.get('content_type', 'concept')}\n"
                f"Difficulty: {metadata.get('difficulty_level', 'intermediate')}\n"
                f"Content: {content}\n"
            )
        
        return "\n".join(context_parts)
    
    def _create_explanation_prompt(self, concept: str, knowledge_context: str,
                                 teaching_approach: str, user_context: str,
                                 personality: Optional[TutorPersonality]) -> Dict[str, str]:
        """Create prompt for explanation generation"""
        
        # Base system prompt
        system_prompt = f"""You are Upperclass AI Tutor, an expert teacher with the following personality:
        
        Teaching Style: {teaching_approach}
        
        Knowledge Context (use this information for accuracy):
        {knowledge_context}
        
        Guidelines:
        1. Be accurate and factually correct
        2. Adapt to the student's level
        3. Use examples when helpful
        4. Check for understanding implicitly
        5. Be encouraging and supportive
        
        Student's context: {user_context or 'No specific context provided'}
        
        Respond in a conversational, engaging style."""
        
        # Add personality traits if available
        if personality:
            system_prompt += f"""
            
            Personality Traits:
            - Formality level: {personality.formality}
            - Enthusiasm: {personality.enthusiasm}
            - Patience: {personality.patience}
            - Humor: {personality.humor}
            
            Teaching Preferences:
            - Uses examples: {'Yes' if personality.prefers_examples else 'No'}
            - Uses analogies: {'Yes' if personality.prefers_analogies else 'No'}
            - Uses visuals: {'Yes' if personality.prefers_visuals else 'No'}
            """
        
        user_prompt = f"""
        Please explain the concept: {concept}
        
        Use the {teaching_approach} teaching approach.
        Make sure your explanation is clear and tailored to the student's needs.
        """
        
        return {
            'system': system_prompt,
            'user': user_prompt
        }
    
    def _generate_query_embedding(self, query: str, context: str = '') -> List[float]:
        """Generate embedding for a query"""
        
        # Combine query and context
        full_query = f"{query} {context}".strip()
        
        # Use OpenAI embeddings
        response = openai.Embedding.create(
            model="text-embedding-ada-002",
            input=full_query
        )
        
        return response['data'][0]['embedding']
    
    def _select_personality(self, proficiency: str, subject: str) -> Optional[TutorPersonality]:
        """Select appropriate personality based on user and subject"""
        
        try:
            # Try to find a matching personality
            personalities = TutorPersonality.objects.filter(is_active=True)
            
            if not personalities.exists():
                return None
            
            # Simple selection logic (can be enhanced with ML)
            if proficiency == 'beginner':
                # More patient and enthusiastic for beginners
                return personalities.filter(patience__gte=0.7, enthusiasm__gte=0.7).first()
            elif proficiency == 'advanced':
                # More formal for advanced users
                return personalities.filter(formality__gte=0.7).first()
            else:
                return personalities.first()
                
        except Exception:
            return None
    
    def _select_teaching_strategy(self, proficiency: str, subject: str) -> Optional[TeachingStrategy]:
        """Select appropriate teaching strategy"""
        
        try:
            strategies = TeachingStrategy.objects.filter(is_active=True)
            
            if proficiency == 'beginner':
                strategies = strategies.filter(best_for_beginners=True)
            elif proficiency == 'intermediate':
                strategies = strategies.filter(best_for_intermediate=True)
            elif proficiency == 'advanced':
                strategies = strategies.filter(best_for_advanced=True)
            
            # Select based on success rate
            return strategies.order_by('-average_success_rate').first()
            
        except Exception:
            return None
    
    def _log_interaction(self, **kwargs):
        """Log tutor interaction"""
        
        if not self.session_id:
            return
        
        try:
            with transaction.atomic():
                TutorInteractionLog.objects.create(
                    session_id=self.session_id,
                    **kwargs
                )
        except Exception as e:
            print(f"Failed to log interaction: {e}")
    
    def _log_retrieval(self, **kwargs):
        """Log knowledge retrieval"""
        
        if not self.session_id:
            return
        
        try:
            with transaction.atomic():
                KnowledgeRetrievalLog.objects.create(
                    session_id=self.session_id,
                    **kwargs
                )
        except Exception as e:
            print(f"Failed to log retrieval: {e}")
    
    # =============== Helper Methods (Implement these) ===============
    
    def _create_learning_plan(self, learning_goal: str, subject: str, proficiency: str) -> Dict:
        """Create a learning plan for the session"""
        # TODO: Implement learning plan creation
        return {
            'goal': learning_goal,
            'estimated_time': '30 minutes',
            'topics': ['Introduction', 'Basic Concepts', 'Practice'],
            'difficulty': proficiency
        }
    
    def _generate_greeting(self, learning_goal: str, personality) -> str:
        """Generate greeting based on personality"""
        if personality and personality.greeting_template:
            return personality.greeting_template.format(goal=learning_goal)
        return f"Hello! I'm Upperclass AI Tutor. I'll help you learn about {learning_goal}."
    
    def _estimate_session_duration(self, learning_plan: Dict) -> str:
        """Estimate session duration"""
        return learning_plan.get('estimated_time', '30 minutes')
    
    def _handle_no_knowledge_found(self, concept: str) -> Dict:
        """Handle case when no knowledge is found"""
        return {
            'error': f"Sorry, I don't have enough information about '{concept}' in my knowledge base.",
            'suggestion': "Try asking about a related topic or rephrasing your question."
        }
    
    def _generate_examples(self, concept: str, knowledge_chunks: List[Dict], 
                          teaching_approach: str) -> List[str]:
        """Generate examples for the concept"""
        # Extract examples from knowledge chunks
        examples = []
        for chunk in knowledge_chunks:
            if chunk['metadata'].get('content_type') == 'example':
                examples.append(chunk['content'][:300])
        return examples[:3]  # Return top 3 examples
    
    def _generate_analogies(self, concept: str, knowledge_chunks: List[Dict]) -> List[str]:
        """Generate analogies for the concept"""
        # Extract analogies from knowledge chunks
        analogies = []
        for chunk in knowledge_chunks:
            if chunk['metadata'].get('content_type') == 'analogy':
                analogies.append(chunk['content'][:300])
        return analogies[:2]  # Return top 2 analogies
    
    def _should_assess_understanding(self, concept: str, teaching_approach: str) -> bool:
        """Determine if we should assess understanding"""
        # Simple logic: assess after explanations, not after questions
        return teaching_approach != 'questioning'
    
    def _suggest_next_steps(self, concept: str) -> List[str]:
        """Suggest next steps after teaching a concept"""
        return [
            f"Try practicing with some exercises about {concept}",
            f"Review the key points of {concept}",
            f"Ask me any questions you have about {concept}"
        ]
    
    def _generate_graphical_cues(self, teaching_approach: str) -> Dict:
        """Generate cues for the graphical tutor"""
        cues = {
            'facial_expression': 'neutral',
            'gestures': [],
            'background': 'classroom'
        }
        
        if teaching_approach == 'explaining':
            cues.update({
                'facial_expression': 'explaining',
                'gestures': ['point_at_board', 'explain_with_hands']
            })
        elif teaching_approach == 'questioning':
            cues.update({
                'facial_expression': 'curious',
                'gestures': ['raise_eyebrow', 'lean_forward']
            })
        
        return cues
    
    def _calculate_confidence(self, knowledge_chunks: List[Dict]) -> float:
        """Calculate confidence score based on knowledge chunks"""
        if not knowledge_chunks:
            return 0.0
        
        # Simple confidence calculation
        scores = []
        for chunk in knowledge_chunks[:3]:
            metadata = chunk['metadata']
            clarity = metadata.get('clarity_score', 0.5)
            accuracy = metadata.get('accuracy_score', 0.5)
            times_used = metadata.get('times_used', 0)
            
            # Weighted confidence
            confidence = (clarity * 0.4 + accuracy * 0.4 + min(times_used / 100, 1) * 0.2)
            scores.append(confidence)
        
        return sum(scores) / len(scores) if scores else 0.5
    
    def _update_user_understanding(self, concept: str, score: float):
        """Update user understanding tracking"""
        self.user_understanding[concept] = score
    
    def _determine_next_action(self, score: float, concept: str) -> str:
        """Determine next action based on assessment score"""
        if score >= 0.8:
            return 'proceed_to_next_topic'
        elif score >= 0.6:
            return 'give_practice_exercise'
        else:
            return 'reteach_concept'
    
    def _generate_feedback(self, assessment: Dict, personality) -> str:
        """Generate feedback based on assessment"""
        score = assessment.get('score', 0.5)
        
        if score >= 0.8:
            return "Excellent understanding! You've mastered this concept."
        elif score >= 0.6:
            return "Good job! You understand the main ideas, but let's work on some details."
        else:
            return "Let's review this concept together to build a stronger foundation."
    
    def _calculate_answer_confidence(self, knowledge_chunks: List[Dict]) -> float:
        """Calculate confidence in answer based on sources"""
        return self._calculate_confidence(knowledge_chunks)
    
    def _check_if_needs_more_explanation(self, answer: str, question: str) -> bool:
        """Check if answer needs further explanation"""
        # Simple heuristic: if answer is short, might need more
        return len(answer.split()) < 50 and '?' in question
    
    def _suggest_followup_questions(self, question: str, answer: str) -> List[str]:
        """Suggest follow-up questions"""
        return [
            "Would you like me to explain this in more detail?",
            "Do you want to see an example of this?",
            "Would you like to practice this concept?"
        ]