import json
from typing import List, Dict, Any
import openai
from django.conf import settings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
import logging

logger = logging.getLogger(__name__)

class KnowledgeChunker:
    """Process raw course content into structured knowledge chunks"""
    
    def __init__(self):
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=100,
            length_function=len,
            separators=["\n\n", "\n", ". ", " ", ""]
        )
        
        openai.api_key = settings.OPENAI_API_KEY
    
    def process_course_content(self, course_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Process course content into knowledge chunks"""
        
        chunks = []
        
        # Extract lessons or content segments
        if 'lessons' in course_data:
            # Process each lesson
            for lesson in course_data['lessons']:
                lesson_chunks = self._process_lesson(lesson, course_data)
                chunks.extend(lesson_chunks)
        elif 'structured_content' in course_data:
            # Process structured content
            for segment in course_data['structured_content']:
                segment_chunks = self._process_content_segment(segment, course_data)
                chunks.extend(segment_chunks)
        else:
            # Fallback: process description as single chunk
            chunks = self._process_text_content(course_data)
        
        # Enrich chunks with AI analysis
        enriched_chunks = self._enrich_chunks_with_ai(chunks)
        
        return enriched_chunks
    
    def _process_lesson(self, lesson: Dict, course_data: Dict) -> List[Dict]:
        """Process a lesson into knowledge chunks"""
        
        chunks = []
        
        # Combine lesson content
        content_parts = []
        if lesson.get('title'):
            content_parts.append(f"Title: {lesson['title']}")
        if lesson.get('description'):
            content_parts.append(f"Description: {lesson['description']}")
        if lesson.get('content'):
            content_parts.append(lesson['content'])
        if lesson.get('transcript'):
            content_parts.append(lesson['transcript'])
        
        full_content = "\n\n".join(content_parts)
        
        # Split into text chunks
        text_chunks = self.text_splitter.split_text(full_content)
        
        for i, text in enumerate(text_chunks):
            chunk = {
                'title': f"{lesson.get('title', 'Lesson')} - Part {i+1}",
                'content': text,
                'content_type': self._determine_content_type(lesson),
                'difficulty_level': lesson.get('difficulty', course_data.get('difficulty', 'intermediate')),
                'subject': course_data.get('subject', 'general'),
                'topic': course_data.get('title', 'general'),
                'subtopics': lesson.get('key_concepts', []),
                'source_metadata': {
                    'lesson_title': lesson.get('title', ''),
                    'order': lesson.get('order', i),
                    'source': course_data.get('source', 'unknown')
                }
            }
            chunks.append(chunk)
        
        return chunks
    
    def _process_content_segment(self, segment: Dict, course_data: Dict) -> List[Dict]:
        """Process a content segment into knowledge chunks"""
        
        chunk = {
            'title': segment.get('segment_title', f"Segment {segment.get('segment_number', 1)}"),
            'content': segment.get('content', ''),
            'content_type': 'concept',
            'difficulty_level': course_data.get('difficulty', 'intermediate'),
            'subject': course_data.get('subject', 'general'),
            'topic': course_data.get('title', 'general'),
            'subtopics': segment.get('key_terms', []),
            'source_metadata': {
                'segment_number': segment.get('segment_number', 1),
                'estimated_duration': segment.get('estimated_duration', 0)
            }
        }
        
        return [chunk]
    
    def _process_text_content(self, course_data: Dict) -> List[Dict]:
        """Fallback text processing"""
        
        content = f"{course_data.get('title', '')}\n\n{course_data.get('description', '')}"
        
        if not content.strip():
            return []
        
        text_chunks = self.text_splitter.split_text(content)
        
        chunks = []
        for i, text in enumerate(text_chunks):
            chunk = {
                'title': f"{course_data.get('title', 'Course')} - Part {i+1}",
                'content': text,
                'content_type': 'concept',
                'difficulty_level': course_data.get('difficulty', 'intermediate'),
                'subject': course_data.get('subject', 'general'),
                'topic': course_data.get('title', 'general'),
                'subtopics': [],
                'source_metadata': {
                    'source': course_data.get('source', 'unknown')
                }
            }
            chunks.append(chunk)
        
        return chunks
    
    def _determine_content_type(self, lesson: Dict) -> str:
        """Determine content type from lesson data"""
        
        content_type = lesson.get('content_type', '').lower()
        
        type_mapping = {
            'video': 'lecture',
            'exercise': 'practice',
            'quiz': 'assessment',
            'example': 'worked_example',
            'problem': 'practice_problem'
        }
        
        return type_mapping.get(content_type, 'concept')
    
    def _enrich_chunks_with_ai(self, chunks: List[Dict]) -> List[Dict]:
        """Use AI to enrich knowledge chunks with metadata"""
        
        enriched_chunks = []
        
        for chunk in chunks:
            try:
                # Generate educational metadata using GPT
                enriched = self._analyze_with_gpt(chunk)
                enriched_chunks.append(enriched)
            except Exception as e:
                logger.warning(f"AI enrichment failed for chunk: {e}")
                # Use original chunk if AI fails
                enriched_chunks.append(chunk)
        
        return enriched_chunks
    
    def _analyze_with_gpt(self, chunk: Dict) -> Dict:
        """Analyze chunk with GPT to extract educational metadata"""
        
        prompt = f"""
        Analyze this educational content and extract structured information:
        
        TITLE: {chunk['title']}
        CONTENT: {chunk['content'][:1000]}
        
        Please provide:
        1. Primary educational concept (1-3 words)
        2. Difficulty adjustment (beginner/intermediate/advanced)
        3. Best teaching strategy (direct_instruction, socratic, worked_example, discovery, analogy)
        4. Key learning objectives (list 2-3)
        5. Common student misconceptions (list 1-3)
        6. Suggested analogies (list 1-2)
        
        Return as JSON with these keys: concept, difficulty, teaching_strategy, 
        learning_objectives, misconceptions, analogies.
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert educational content analyst."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=500
        )
        
        try:
            analysis = json.loads(response.choices[0].message.content)
            
            # Update chunk with AI analysis
            chunk.update({
                'concept': analysis.get('concept', ''),
                'difficulty_level': analysis.get('difficulty', chunk['difficulty_level']),
                'teaching_strategy': analysis.get('teaching_strategy', 'direct_instruction'),
                'learning_objectives': analysis.get('learning_objectives', []),
                'common_misconceptions': analysis.get('misconceptions', []),
                'suggested_analogies': analysis.get('analogies', []),
                'ai_analyzed': True
            })
            
        except json.JSONDecodeError:
            # Keep original if parsing fails
            chunk['ai_analyzed'] = False
        
        return chunk