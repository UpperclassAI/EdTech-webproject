import os
import json
from typing import Dict, List, Any
from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage, AIMessage
from langchain.prompts import ChatPromptTemplate
from langchain.memory import ConversationBufferMemory
import openai
from django.conf import settings

class AITutorService:
    def __init__(self):
        # For cost control, we'll use gpt-3.5-turbo for MVP
        # You can upgrade to gpt-4 later for better reasoning
        self.llm = ChatOpenAI(
            model="gpt-3.5-turbo",
            temperature=0.7,
            openai_api_key=settings.OPENAI_API_KEY,
            streaming=True  # For real-time responses
        )
        self.system_prompt = self._create_system_prompt()
        
    def _create_system_prompt(self) -> str:
        """Create the system prompt that defines the tutor's personality and role."""
        return """You are Aura, an expert AI tutor specializing in personalized education.
        
        YOUR ROLE:
        1. Teach concepts based on the provided curriculum
        2. Adapt explanations to the student's level: {difficulty_level}
        3. Use the Socratic method - ask guiding questions instead of giving direct answers
        4. Provide examples and analogies when helpful
        5. Check for understanding regularly
        6. Be encouraging and patient
        
        TEACHING STYLE:
        - Break complex topics into digestible chunks
        - Use relatable analogies
        - Ask probing questions to assess understanding
        - Provide positive reinforcement
        - Admit when you don't know something
        
        CURRENT TOPIC: {current_topic}
        TOPIC CONTENT: {topic_content}
        
        IMPORTANT: Keep responses conversational and engaging. Match your language complexity to the student's level.
        """
    
    def generate_response(
        self,
        user_message: str,
        session_data: Dict[str, Any],
        curriculum_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Generate a tutor response based on user input and context."""
        
        # Create the prompt with context
        prompt_template = ChatPromptTemplate.from_messages([
            ("system", self.system_prompt),
            ("human", "{user_input}")
        ])
        
        # Format prompt with context
        formatted_prompt = prompt_template.format_messages(
            difficulty_level=session_data.get('difficulty_level', 'beginner'),
            current_topic=curriculum_context.get('topic_title', 'General Learning'),
            topic_content=curriculum_context.get('topic_content', ''),
            user_input=user_message
        )
        
        try:
            # Generate response
            response = self.llm(formatted_prompt)
            
            # Parse response and determine tutor expression
            tutor_response = response.content
            expression = self._determine_expression(tutor_response, user_message)
            
            return {
                "text": tutor_response,
                "expression": expression,
                "suggested_action": self._suggest_action(tutor_response),
                "requires_response": self._check_if_question(tutor_response)
            }
            
        except Exception as e:
            # Fallback response
            return {
                "text": "I'm having trouble processing that. Could you rephrase or ask about our current topic?",
                "expression": "confused",
                "suggested_action": "wait",
                "requires_response": True
            }
    
    def _determine_expression(self, response: str, user_input: str) -> str:
        """Determine the tutor's facial expression based on response content."""
        response_lower = response.lower()
        user_lower = user_input.lower()
        
        if any(word in response_lower for word in ['excellent', 'great', 'correct', 'well done']):
            return "happy"
        elif any(word in response_lower for word in ['think', 'consider', 'ponder']):
            return "thinking"
        elif '?' in response:
            return "questioning"
        elif any(word in user_lower for word in ['why', 'how', 'explain']):
            return "explaining"
        else:
            return "neutral"
    
    def _suggest_action(self, response: str) -> str:
        """Suggest an animation action for the graphical tutor."""
        if 'example' in response.lower():
            return "give_example"
        elif '?' in response:
            return "ask_question"
        elif 'diagram' in response.lower() or 'draw' in response.lower():
            return "draw_diagram"
        else:
            return "explain"
    
    def _check_if_question(self, response: str) -> bool:
        """Check if the tutor is asking a question back."""
        return '?' in response