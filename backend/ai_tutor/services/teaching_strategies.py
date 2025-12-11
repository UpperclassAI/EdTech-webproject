"""
Concrete implementations of different teaching strategies
"""

from abc import ABC, abstractmethod
from typing import Dict, List, Any
import json

class TeachingStrategy(ABC):
    """Abstract base class for teaching strategies"""
    
    @abstractmethod
    def generate_explanation(self, concept: str, knowledge_chunks: List[Dict], 
                           context: Dict[str, Any]) -> str:
        """Generate explanation using this strategy"""
        pass
    
    @abstractmethod
    def generate_assessment(self, concept: str, user_response: str,
                          knowledge_chunks: List[Dict]) -> Dict[str, Any]:
        """Generate assessment using this strategy"""
        pass
    
    @abstractmethod
    def get_strategy_name(self) -> str:
        """Get the name of this strategy"""
        pass

class DirectInstructionStrategy(TeachingStrategy):
    """Direct instruction: clear, structured explanations"""
    
    def generate_explanation(self, concept: str, knowledge_chunks: List[Dict], 
                           context: Dict[str, Any]) -> str:
        
        proficiency = context.get('proficiency', 'beginner')
        
        prompt = f"""
        Provide a direct, structured explanation of: {concept}
        
        Target audience: {proficiency} level
        
        Structure your explanation as:
        1. Clear definition
        2. Key characteristics
        3. Simple example
        4. Common applications
        
        Be concise and avoid unnecessary details.
        """
        
        return prompt
    
    def generate_assessment(self, concept: str, user_response: str,
                          knowledge_chunks: List[Dict]) -> Dict[str, Any]:
        
        prompt = f"""
        Assess the student's understanding of: {concept}
        
        Student's response: {user_response}
        
        Provide a binary assessment (correct/incorrect) with specific feedback.
        """
        
        return {'type': 'binary', 'prompt': prompt}
    
    def get_strategy_name(self) -> str:
        return "Direct Instruction"

class SocraticStrategy(TeachingStrategy):
    """Socratic questioning: guide to discovery through questions"""
    
    def generate_explanation(self, concept: str, knowledge_chunks: List[Dict], 
                           context: Dict[str, Any]) -> str:
        
        prompt = f"""
        Guide the student to understand: {concept}
        
        Use the Socratic method:
        1. Start with a thought-provoking question
        2. Ask follow-up questions based on their answers
        3. Guide them to discover the concept themselves
        4. Summarize their discoveries
        
        Don't give direct answers. Ask guiding questions instead.
        """
        
        return prompt
    
    def generate_assessment(self, concept: str, user_response: str,
                          knowledge_chunks: List[Dict]) -> Dict[str, Any]:
        
        prompt = f"""
        Assess the student's thought process about: {concept}
        
        Student's response: {user_response}
        
        Focus on:
        1. Quality of reasoning
        2. Critical thinking demonstrated
        3. Assumptions made
        4. Logical consistency
        
        Provide feedback on their thinking process, not just correctness.
        """
        
        return {'type': 'process', 'prompt': prompt}
    
    def get_strategy_name(self) -> str:
        return "Socratic Questioning"

class WorkedExampleStrategy(TeachingStrategy):
    """Worked examples: show step-by-step solutions"""
    
    def generate_explanation(self, concept: str, knowledge_chunks: List[Dict], 
                           context: Dict[str, Any]) -> str:
        
        # Find example chunks
        example_chunks = [c for c in knowledge_chunks 
                         if c['metadata'].get('content_type') == 'example']
        
        examples = "\n".join([c['content'][:300] for c in example_chunks[:2]])
        
        prompt = f"""
        Teach: {concept} using worked examples.
        
        Available examples:
        {examples}
        
        Structure:
        1. Present a problem/scenario
        2. Explain the thought process step-by-step
        3. Show the solution with explanations at each step
        4. Highlight key takeaways
        
        Make sure each step is clearly explained.
        """
        
        return prompt
    
    def generate_assessment(self, concept: str, user_response: str,
                          knowledge_chunks: List[Dict]) -> Dict[str, Any]:
        
        prompt = f"""
        Give the student a practice problem about: {concept}
        
        The problem should:
        1. Be similar to worked examples shown
        2. Test understanding of key steps
        3. Have a clear solution path
        
        Provide the problem and ask them to solve it step-by-step.
        """
        
        return {'type': 'practice_problem', 'prompt': prompt}
    
    def get_strategy_name(self) -> str:
        return "Worked Examples"

class StrategyFactory:
    """Factory for creating teaching strategies"""
    
    @staticmethod
    def create_strategy(strategy_type: str) -> TeachingStrategy:
        """Create a teaching strategy instance"""
        
        strategies = {
            'direct': DirectInstructionStrategy,
            'socratic': SocraticStrategy,
            'worked_example': WorkedExampleStrategy,
        }
        
        strategy_class = strategies.get(strategy_type, DirectInstructionStrategy)
        return strategy_class()