import asyncio
import json
from typing import List, Dict, Any
import requests
from bs4 import BeautifulSoup
from django.utils import timezone
from django.db import transaction
import openai
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
import numpy as np

from courses.models import CourseSource, AIKnowledgeChunk, CourseImportJob, AIKnowledgeGraph

class AICourseTrainingPipeline:
    """Pipeline to process courses and train the AI knowledge base"""
    
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(
            openai_api_key=settings.OPENAI_API_KEY,
            model="text-embedding-ada-002"
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
            separators=["\n\n", "\n", " ", ""]
        )
    
    def import_and_train_from_url(self, source_url: str, source_type: str) -> CourseImportJob:
        """Import course from URL and add to AI knowledge base"""
        
        # Create import job
        source, created = CourseSource.objects.get_or_create(
            base_url=source_url,
            defaults={'name': source_type, 'source_type': source_type}
        )
        
        job = CourseImportJob.objects.create(
            source=source,
            source_url=source_url,
            job_id=f"import_{timezone.now().timestamp()}",
            status='processing'
        )
        
        try:
            # Start async processing
            self._process_import_job(job)
            return job
            
        except Exception as e:
            job.status = 'failed'
            job.error_message = str(e)
            job.save()
            raise
    
    def _process_import_job(self, job: CourseImportJob):
        """Process the import job"""
        job.started_at = timezone.now()
        job.status = 'extracting'
        job.save()
        
        # Extract content based on source type
        if job.source.source_type == 'khan_academy':
            content = self._extract_khan_academy_content(job.source_url)
        elif job.source.source_type == 'youtube':
            content = self._extract_youtube_transcript(job.source_url)
        else:
            content = self._extract_generic_content(job.source_url)
        
        # Process content into knowledge chunks
        knowledge_chunks = self._extract_knowledge_chunks(content, job.source)
        
        job.status = 'embedding'
        job.save()
        
        # Generate embeddings for each chunk
        chunks_with_embeddings = self._generate_embeddings(knowledge_chunks)
        
        # Save to database
        with transaction.atomic():
            saved_chunks = []
            for chunk_data in chunks_with_embeddings:
                chunk = AIKnowledgeChunk.objects.create(
                    title=chunk_data['title'],
                    content=chunk_data['content'],
                    content_type=chunk_data['content_type'],
                    difficulty_level=chunk_data['difficulty_level'],
                    subject=chunk_data['subject'],
                    topic=chunk_data['topic'],
                    subtopics=chunk_data['subtopics'],
                    teaching_strategy=chunk_data.get('teaching_strategy', 'direct_instruction'),
                    source=job.source,
                    source_url=job.source_url,
                    source_metadata=chunk_data.get('metadata', {}),
                    embedding=chunk_data['embedding'].tobytes() if chunk_data.get('embedding') else None,
                    embedding_model='text-embedding-ada-002',
                    embedding_generated_at=timezone.now(),
                )
                saved_chunks.append(chunk)
            
            job.total_chunks_extracted = len(saved_chunks)
            job.status = 'completed'
            job.completed_at = timezone.now()
            job.save()
        
        # Analyze relationships between chunks
        self._build_knowledge_graph(saved_chunks)
        
        return job
    
    def _extract_knowledge_chunks(self, content: Dict, source: CourseSource) -> List[Dict]:
        """Extract structured knowledge chunks from content"""
        
        chunks = []
        
        # Use AI to identify and structure knowledge
        prompt = f"""
        Analyze this educational content and extract structured knowledge chunks:
        
        Content: {content.get('text', '')[:5000]}
        
        Extract knowledge chunks with:
        1. Title
        2. Content (concise explanation)
        3. Content type (concept, example, problem, definition, analogy, quiz, summary)
        4. Difficulty level (beginner, intermediate, advanced)
        5. Subject
        6. Topic
        7. Subtopics (list)
        8. Suggested teaching strategy
        
        Return as JSON list.
        """
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an educational content analyzer."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3
            )
            
            # Parse AI response
            extracted_data = json.loads(response.choices[0].message.content)
            
            for item in extracted_data:
                chunks.append({
                    'title': item['title'],
                    'content': item['content'],
                    'content_type': item['content_type'],
                    'difficulty_level': item['difficulty_level'],
                    'subject': item['subject'],
                    'topic': item['topic'],
                    'subtopics': item.get('subtopics', []),
                    'teaching_strategy': item.get('teaching_strategy', 'direct_instruction'),
                    'metadata': {
                        'source': source.name,
                        'extracted_by': 'gpt-4',
                        'original_title': content.get('title', '')
                    }
                })
                
        except Exception as e:
            # Fallback to simple text splitting
            print(f"AI extraction failed, using fallback: {e}")
            texts = self.text_splitter.split_text(content.get('text', ''))
            
            for i, text in enumerate(texts[:50]):  # Limit chunks
                chunks.append({
                    'title': f"Chunk {i+1} from {content.get('title', 'Unknown')}",
                    'content': text,
                    'content_type': 'concept',
                    'difficulty_level': 'intermediate',
                    'subject': 'general',
                    'topic': content.get('title', 'general'),
                    'subtopics': [],
                    'teaching_strategy': 'direct_instruction',
                    'metadata': {'extraction_method': 'fallback'}
                })
        
        return chunks
    
    def _generate_embeddings(self, chunks: List[Dict]) -> List[Dict]:
        """Generate embeddings for knowledge chunks"""
        
        texts = [chunk['content'] for chunk in chunks]
        
        try:
            # Generate embeddings in batches
            embeddings = self.embeddings.embed_documents(texts)
            
            for i, chunk in enumerate(chunks):
                if i < len(embeddings):
                    chunk['embedding'] = np.array(embeddings[i])
            
        except Exception as e:
            print(f"Embedding generation failed: {e}")
            # Chunks will be stored without embeddings initially
        
        return chunks
    
    def _build_knowledge_graph(self, chunks: List[AIKnowledgeChunk]):
        """Build relationships between knowledge chunks"""
        
        # Use AI to identify relationships
        chunk_texts = [f"{chunk.title}: {chunk.content[:200]}" for chunk in chunks]
        
        prompt = f"""
        Analyze these knowledge chunks and identify relationships:
        
        Chunks:
        {chr(10).join([f'{i+1}. {text}' for i, text in enumerate(chunk_texts)])}
        
        For each pair that has a relationship, identify:
        1. Source chunk number
        2. Target chunk number
        3. Relationship type (prerequisite, leads_to, similar_to, contrasts_with, example_of, part_of)
        4. Strength (0-1)
        
        Return as JSON list.
        """
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a knowledge graph builder."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.2
            )
            
            relationships = json.loads(response.choices[0].message.content)
            
            with transaction.atomic():
                for rel in relationships:
                    if (rel['source'] <= len(chunks) and rel['target'] <= len(chunks)):
                        source_chunk = chunks[rel['source'] - 1]
                        target_chunk = chunks[rel['target'] - 1]
                        
                        AIKnowledgeGraph.objects.create(
                            source_concept=source_chunk,
                            target_concept=target_chunk,
                            relationship_type=rel['relationship_type'],
                            strength=rel.get('strength', 0.5),
                            ai_confirmed=True
                        )
                        
        except Exception as e:
            print(f"Knowledge graph building failed: {e}")

class AIModelTrainer:
    """Train AI models on the knowledge base"""
    
    def __init__(self):
        self.knowledge_base = []
        
    def load_knowledge_base(self):
        """Load all knowledge chunks for training"""
        chunks = AIKnowledgeChunk.objects.all().select_related('source')
        
        for chunk in chunks:
            self.knowledge_base.append({
                'id': str(chunk.id),
                'title': chunk.title,
                'content': chunk.content,
                'content_type': chunk.content_type,
                'difficulty': chunk.difficulty_level,
                'subject': chunk.subject,
                'topic': chunk.topic,
                'embedding': np.frombuffer(chunk.embedding) if chunk.embedding else None
            })
        
        return len(self.knowledge_base)
    
    def train_teaching_strategy_model(self):
        """Train model to select optimal teaching strategies"""
        # This would use scikit-learn or similar
        # For now, we'll use rule-based with AI enhancement
        pass
    
    def find_relevant_knowledge(self, query: str, subject: str = None, 
                                difficulty: str = 'beginner', limit: int = 10) -> List[Dict]:
        """Find relevant knowledge chunks for a query"""
        
        if not self.knowledge_base:
            self.load_knowledge_base()
        
        # Simple keyword matching (would be replaced with vector search)
        query_lower = query.lower()
        relevant = []
        
        for chunk in self.knowledge_base:
            score = 0
            
            # Keyword matching
            if query_lower in chunk['content'].lower():
                score += 2
            if query_lower in chunk['title'].lower():
                score += 3
            if subject and subject.lower() in chunk['subject'].lower():
                score += 1
            if difficulty == chunk['difficulty']:
                score += 1
            
            if score > 0:
                relevant.append({
                    'chunk': chunk,
                    'score': score,
                    'relevance': 'keyword'
                })
        
        # Sort by score
        relevant.sort(key=lambda x: x['score'], reverse=True)
        
        return relevant[:limit]