from typing import Dict, List, Any, Optional
from django.conf import settings
from django.utils import timezone
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationSummaryBufferMemory
from langchain.prompts import PromptTemplate
import numpy as np
from scipy.spatial.distance import cosine

from courses.services.ai_training_pipeline import AIModelTrainer
from courses.models import AIKnowledgeChunk

class UpperclassAITutor:
    """Main AI Tutor that uses the trained knowledge base"""
    
    def __init__(self, user_level: str = 'beginner', user_id: str = None):
        self.user_level = user_level
        self.user_id = user_id
        self.knowledge_trainer = AIModelTrainer()
        self.knowledge_trainer.load_knowledge_base()
        
        # Initialize conversation memory
        self.memory = ConversationSummaryBufferMemory(
            llm=ChatOpenAI(
                model="gpt-3.5-turbo",
                temperature=0,
                openai_api_key=settings.OPENAI_API_KEY
            ),
            max_token_limit=2000,
            return_messages=True
        )
        
        # Main teaching LLM
        self.llm = ChatOpenAI(
            model="gpt-4" if settings.USE_GPT4 else "gpt-3.5-turbo",
            temperature=0.7,
            openai_api_key=settings.OPENAI_API_KEY,
            streaming=True
        )
        
        # Track teaching session
        self.teaching_strategy = 'adaptive'
        self.current_topic = None
        self.concepts_covered = []
        self.user_understanding = {}  # {concept: understanding_score}
        
    def start_teaching_session(self, learning_goal: str, subject: str) -> Dict:
        """Start a new teaching session based on user's learning goal"""
        
        # Find relevant knowledge
        relevant_knowledge = self.knowledge_trainer.find_relevant_knowledge(
            query=learning_goal,
            subject=subject,
            difficulty=self.user_level,
            limit=15
        )
        
        # Create learning path
        learning_path = self._create_learning_path(relevant_knowledge, learning_goal)
        
        self.current_topic = learning_goal
        self.teaching_strategy = self._select_teaching_strategy(self.user_level)
        
        # Generate initial greeting and plan
        initial_message = self._generate_session_intro(learning_goal, learning_path)
        
        return {
            'status': 'session_started',
            'learning_goal': learning_goal,
            'subject': subject,
            'user_level': self.user_level,
            'learning_path': learning_path,
            'initial_message': initial_message,
            'estimated_time': self._estimate_time(learning_path),
            'teaching_strategy': self.teaching_strategy
        }
    
    def teach_concept(self, concept_request: str = None, user_confusion: str = None) -> Dict:
        """Teach a concept using the knowledge base"""
        
        # If no specific concept requested, follow learning path
        if concept_request:
            # Find best matching concept from knowledge base
            concept_data = self._find_best_concept_match(concept_request)
        else:
            # Get next concept from learning path
            concept_data = self._get_next_concept()
        
        if not concept_data:
            return {
                'error': 'Could not find relevant concept to teach',
                'suggestion': 'Please rephrase or ask about a different topic'
            }
        
        # Retrieve teaching materials for this concept
        teaching_materials = self._prepare_teaching_materials(concept_data)
        
        # Generate explanation based on user level and teaching strategy
        explanation = self._generate_explanation(
            concept_data, 
            teaching_materials, 
            user_confusion
        )
        
        # Track progress
        self.concepts_covered.append(concept_data['id'])
        
        # Determine if we need to assess understanding
        should_assess = self._should_assess_understanding(concept_data)
        
        return {
            'concept': concept_data['title'],
            'explanation': explanation['text'],
            'explanation_style': explanation['style'],
            'examples': teaching_materials.get('examples', []),
            'analogies': teaching_materials.get('analogies', []),
            'difficulty_level': concept_data['difficulty'],
            'should_assess': should_assess,
            'assessment_type': 'question' if should_assess else None,
            'next_steps': self._suggest_next_steps(concept_data),
            'graphical_cues': self._generate_graphical_cues(explanation['style'])
        }
    
    def assess_understanding(self, user_response: str, concept_id: str) -> Dict:
        """Assess user's understanding of a concept"""
        
        # Get concept from knowledge base
        try:
            chunk = AIKnowledgeChunk.objects.get(id=concept_id)
        except AIKnowledgeChunk.DoesNotExist:
            return {'error': 'Concept not found'}
        
        # Use AI to assess understanding
        assessment_prompt = f"""
        Assess the student's understanding of this concept:
        
        Concept: {chunk.title}
        Concept Content: {chunk.content}
        
        Student's response: {user_response}
        
        Assess:
        1. Understanding level (0-100)
        2. Key misunderstandings (if any)
        3. Confidence in assessment (0-1)
        4. Suggested next action (reteach, move_on, give_exercise)
        
        Return as JSON.
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert educational assessor."},
                {"role": "user", "content": assessment_prompt}
            ],
            temperature=0.3
        )
        
        try:
            assessment = json.loads(response.choices[0].message.content)
            
            # Update user understanding tracking
            if self.user_id:
                self._update_user_understanding(concept_id, assessment['understanding_level'])
            
            return {
                'understanding_level': assessment['understanding_level'],
                'misunderstandings': assessment.get('key_misunderstandings', []),
                'assessment_confidence': assessment.get('confidence', 0.7),
                'next_action': assessment.get('suggested_next_action', 'move_on'),
                'feedback': self._generate_feedback(assessment),
                'adjust_difficulty': self._should_adjust_difficulty(assessment['understanding_level'])
            }
            
        except json.JSONDecodeError:
            # Fallback assessment
            return {
                'understanding_level': 50,
                'misunderstandings': [],
                'next_action': 'move_on',
                'feedback': 'Thanks for your response. Let me know if you need clarification.'
            }
    
    def _find_best_concept_match(self, query: str) -> Optional[Dict]:
        """Find the best matching concept from knowledge base"""
        
        # First try vector similarity if embeddings exist
        relevant = self.knowledge_trainer.find_relevant_knowledge(
            query=query,
            difficulty=self.user_level,
            limit=5
        )
        
        if relevant:
            # Return the most relevant
            best_match = relevant[0]['chunk']
            
            # Convert to dict format
            return {
                'id': best_match['id'],
                'title': best_match['title'],
                'content': best_match['content'],
                'difficulty': best_match['difficulty'],
                'subject': best_match['subject'],
                'topic': best_match['topic']
            }
        
        return None
    
    def _prepare_teaching_materials(self, concept_data: Dict) -> Dict:
        """Prepare teaching materials for a concept"""
        
        # Get related chunks from knowledge base
        related_chunks = AIKnowledgeChunk.objects.filter(
            topic=concept_data['topic'],
            difficulty_level=self.user_level
        )[:10]
        
        materials = {
            'examples': [],
            'analogies': [],
            'problems': [],
            'definitions': []
        }
        
        for chunk in related_chunks:
            if chunk.content_type == 'example':
                materials['examples'].append({
                    'text': chunk.content,
                    'difficulty': chunk.difficulty_level
                })
            elif chunk.content_type == 'analogy':
                materials['analogies'].append({
                    'text': chunk.content,
                    'source_concept': chunk.title
                })
            elif chunk.content_type == 'problem':
                materials['problems'].append({
                    'text': chunk.content,
                    'difficulty': chunk.difficulty_level
                })
            elif chunk.content_type == 'definition':
                materials['definitions'].append({
                    'text': chunk.content,
                    'concept': chunk.title
                })
        
        return materials
    
    def _generate_explanation(self, concept_data: Dict, materials: Dict, 
                            user_confusion: str = None) -> Dict:
        """Generate explanation using appropriate teaching strategy"""
        
        prompt_template = PromptTemplate(
            input_variables=["concept", "content", "user_level", "teaching_strategy", 
                           "examples", "analogies", "user_confusion"],
            template="""
            You are Upperclass AI Tutor, an expert teacher.
            
            TEACHING STRATEGY: {teaching_strategy}
            STUDENT LEVEL: {user_level}
            
            Concept to teach: {concept}
            Concept content: {content}
            
            Available teaching materials:
            Examples: {examples}
            Analogies: {analogies}
            
            Student's specific confusion (if any): {user_confusion}
            
            Generate an explanation that:
            1. Addresses the specific confusion if provided
            2. Uses the teaching strategy effectively
            3. Matches the student's level
            4. Includes relevant examples or analogies
            5. Checks for understanding implicitly
            
            Make it engaging and conversational.
            
            Explanation:"""
        )
        
        prompt = prompt_template.format(
            concept=concept_data['title'],
            content=concept_data['content'],
            user_level=self.user_level,
            teaching_strategy=self.teaching_strategy,
            examples=str(materials['examples'][:2]) if materials['examples'] else "No examples available",
            analogies=str(materials['analogies'][:2]) if materials['analogies'] else "No analogies available",
            user_confusion=user_confusion or "None"
        )
        
        response = self.llm.predict(prompt)
        
        # Determine explanation style based on teaching strategy
        if self.teaching_strategy == 'socratic':
            style = 'questioning'
        elif self.teaching_strategy == 'worked_example':
            style = 'demonstrative'
        elif self.teaching_strategy == 'analogy':
            style = 'metaphorical'
        else:
            style = 'explanatory'
        
        return {
            'text': response,
            'style': style,
            'strategy_used': self.teaching_strategy
        }
    
    def _generate_graphical_cues(self, explanation_style: str) -> Dict:
        """Generate cues for the graphical tutor animation"""
        
        cues = {
            'facial_expression': 'neutral',
            'gestures': [],
            'props': [],
            'background': 'classroom'
        }
        
        style_mappings = {
            'questioning': {
                'facial_expression': 'curious',
                'gestures': ['raise_eyebrow', 'lean_forward'],
                'props': ['question_mark']
            },
            'demonstrative': {
                'facial_expression': 'explaining',
                'gestures': ['point_at_board', 'write_on_board'],
                'props': ['whiteboard', 'marker']
            },
            'metaphorical': {
                'facial_expression': 'enthusiastic',
                'gestures': ['open_arms', 'illustrate'],
                'props': ['thought_bubble']
            },
            'explanatory': {
                'facial_expression': 'friendly',
                'gestures': ['explain_with_hands', 'nod'],
                'props': []
            }
        }
        
        if explanation_style in style_mappings:
            cues.update(style_mappings[explanation_style])
        
        return cues