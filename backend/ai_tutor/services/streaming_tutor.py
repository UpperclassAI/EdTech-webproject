"""
Real-time streaming tutor using OpenAI API directly (no LangChain)
"""

import json
import asyncio
from typing import AsyncGenerator, Dict, Any
import openai
from django.conf import settings

class StreamingTutor:
    """Tutor with streaming responses for real-time interaction"""
    
    def __init__(self, session_id: str, user_id: str):
        self.session_id = session_id
        self.user_id = user_id
        
        # Set OpenAI API key
        openai.api_key = settings.OPENAI_API_KEY
    
    async def stream_explanation(self, concept: str, context: str = '') -> AsyncGenerator[str, None]:
        """Stream explanation in real-time"""
        
        # Create prompt
        messages = [
            {"role": "system", "content": "You are Upperclass AI Tutor. Explain concepts clearly and conversationally."},
            {"role": "user", "content": f"Explain: {concept}\n\nContext: {context}"}
        ]
        
        try:
            # Stream from OpenAI
            stream = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=messages,
                temperature=0.7,
                stream=True,
                max_tokens=500
            )
            
            # Stream responses
            async for chunk in stream:
                if 'choices' in chunk:
                    for choice in chunk['choices']:
                        if 'delta' in choice and 'content' in choice['delta']:
                            content = choice['delta']['content']
                            if content:
                                yield json.dumps({
                                    'type': 'chunk',
                                    'content': content,
                                    'concept': concept
                                })
            
            # Send completion signal
            yield json.dumps({
                'type': 'complete',
                'concept': concept
            })
            
        except Exception as e:
            yield json.dumps({
                'type': 'error',
                'message': f'Error: {str(e)}'
            })
    
    async def stream_conversation(self, user_message: str, 
                                conversation_history: List[Dict]) -> AsyncGenerator[str, None]:
        """Stream conversational response"""
        
        # Prepare messages
        messages = [
            {"role": "system", "content": "You are Upperclass AI Tutor. Have a natural, helpful conversation."}
        ]
        
        # Add conversation history (last 5 messages)
        for msg in conversation_history[-5:]:
            messages.append({
                "role": msg['role'],
                "content": msg['content']
            })
        
        # Add current user message
        messages.append({"role": "user", "content": user_message})
        
        try:
            # Stream response
            stream = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=messages,
                temperature=0.7,
                stream=True,
                max_tokens=500
            )
            
            async for chunk in stream:
                if 'choices' in chunk:
                    for choice in chunk['choices']:
                        if 'delta' in choice and 'content' in choice['delta']:
                            content = choice['delta']['content']
                            if content:
                                yield json.dumps({
                                    'type': 'message_chunk',
                                    'content': content
                                })
            
            yield json.dumps({'type': 'message_complete'})
            
        except Exception as e:
            yield json.dumps({
                'type': 'error',
                'message': f'Error: {str(e)}'
            })

class SimpleStreamingTutor:
    """
    Simple streaming tutor for development (no async)
    """
    
    def __init__(self, session_id: str, user_id: str):
        self.session_id = session_id
        self.user_id = user_id
        
        # Set OpenAI API key
        openai.api_key = settings.OPENAI_API_KEY
    
    def stream_explanation_sync(self, concept: str, context: str = ''):
        """Synchronous version of stream explanation"""
        
        messages = [
            {"role": "system", "content": "You are Upperclass AI Tutor. Explain concepts clearly."},
            {"role": "user", "content": f"Explain: {concept}\n\nContext: {context}"}
        ]
        
        try:
            # Create non-streaming response for simplicity
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages,
                temperature=0.7,
                max_tokens=300
            )
            
            content = response.choices[0].message.content
            
            # Simulate streaming by splitting into chunks
            words = content.split()
            chunks = []
            
            # Create chunks of 3 words each
            for i in range(0, len(words), 3):
                chunk = ' '.join(words[i:i+3])
                chunks.append(chunk)
            
            return chunks
            
        except Exception as e:
            return [f"Error: {str(e)}"]