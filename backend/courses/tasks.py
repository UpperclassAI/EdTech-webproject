from celery import shared_task
from celery.utils.log import get_task_logger
from django.utils import timezone
from django.db import transaction
import time

from .models import CourseSource, CourseImportJob, AIKnowledgeChunk
from .extractors.khan_academy import KhanAcademyExtractor
from .extractors.youtube_educational import YouTubeEducationalExtractor
from .processors.knowledge_chunker import KnowledgeChunker
from .processors.embedding_generator import EmbeddingGenerator
from .vector_db.manager import VectorDBManager

logger = get_task_logger(__name__)

@shared_task(bind=True, max_retries=3)
def import_course_from_url(self, source_url: str, source_type: str, user_id: int = None):
    """Celery task to import course from URL"""
    
    # Create import job record
    source, created = CourseSource.objects.get_or_create(
        base_url=source_url,
        defaults={
            'name': source_type,
            'source_type': source_type,
            'is_active': True
        }
    )
    
    job = CourseImportJob.objects.create(
        source=source,
        source_url=source_url,
        job_id=self.request.id,
        status='processing',
        started_at=timezone.now()
    )
    
    try:
        # Step 1: Extract content
        logger.info(f"Starting extraction for {source_url}")
        job.status = 'extracting'
        job.save()
        
        extractor = None
        if source_type == 'khan_academy':
            extractor = KhanAcademyExtractor(source_url)
        elif source_type in ['youtube', 'youtube_educational']:
            extractor = YouTubeEducationalExtractor(source_url)
        else:
            # Try generic extractor
            extractor = KhanAcademyExtractor(source_url)  # Fallback
        
        if not extractor.validate_source():
            raise ValueError(f"Invalid source URL: {source_url}")
        
        course_data = extractor.extract_course_content()
        
        # Step 2: Process into knowledge chunks
        logger.info(f"Processing {len(course_data.get('lessons', []))} lessons")
        job.status = 'processing'
        job.save()
        
        chunker = KnowledgeChunker()
        knowledge_chunks = chunker.process_course_content(course_data)
        
        job.total_chunks_extracted = len(knowledge_chunks)
        job.save()
        
        # Step 3: Generate embeddings
        logger.info(f"Generating embeddings for {len(knowledge_chunks)} chunks")
        job.status = 'embedding'
        job.save()
        
        embedding_generator = EmbeddingGenerator()
        chunks_with_embeddings = embedding_generator.generate_embeddings(knowledge_chunks)
        
        # Step 4: Save to database
        logger.info("Saving chunks to database")
        
        saved_chunks = []
        with transaction.atomic():
            for chunk_data in chunks_with_embeddings:
                # Convert embedding to bytes for storage
                embedding_bytes = None
                if chunk_data.get('embedding'):
                    embedding_bytes = np.array(chunk_data['embedding']).tobytes()
                
                # Create knowledge chunk
                chunk = AIKnowledgeChunk.objects.create(
                    title=chunk_data['title'][:200],
                    content=chunk_data['content'],
                    content_type=chunk_data['content_type'],
                    difficulty_level=chunk_data['difficulty_level'],
                    subject=chunk_data['subject'],
                    topic=chunk_data['topic'],
                    subtopics=chunk_data.get('subtopics', []),
                    teaching_strategy=chunk_data.get('teaching_strategy', 'direct_instruction'),
                    concept=chunk_data.get('concept', ''),
                    learning_objectives=chunk_data.get('learning_objectives', []),
                    common_misconceptions=chunk_data.get('common_misconceptions', []),
                    suggested_analogies=chunk_data.get('suggested_analogies', []),
                    source=source,
                    source_url=source_url,
                    source_metadata=chunk_data.get('source_metadata', {}),
                    embedding=embedding_bytes,
                    embedding_model=chunk_data.get('embedding_model'),
                    embedding_generated_at=timezone.now(),
                    ai_analyzed=chunk_data.get('ai_analyzed', False)
                )
                saved_chunks.append(chunk)
        
        # Step 5: Add to vector database
        logger.info("Adding chunks to vector database")
        
        vector_db = VectorDBManager()
        
        # Prepare chunks for vector DB
        vector_chunks = []
        for chunk in saved_chunks:
            vector_chunk = {
                'id': str(chunk.id),
                'title': chunk.title,
                'content': chunk.content,
                'content_type': chunk.content_type,
                'difficulty_level': chunk.difficulty_level,
                'subject': chunk.subject,
                'topic': chunk.topic,
                'subtopics': chunk.subtopics,
                'concept': chunk.concept,
                'teaching_strategy': chunk.teaching_strategy,
                'source_metadata': {
                    'source': source.name,
                    'source_url': source_url
                },
                'embedding': np.frombuffer(chunk.embedding) if chunk.embedding else None
            }
            vector_chunks.append(vector_chunk)
        
        vector_db.add_knowledge_chunks(vector_chunks)
        
        # Step 6: Update job status
        job.status = 'completed'
        job.completed_at = timezone.now()
        job.save()
        
        logger.info(f"Successfully imported course from {source_url}")
        
        return {
            'job_id': self.request.id,
            'source_url': source_url,
            'chunks_extracted': len(saved_chunks),
            'status': 'completed'
        }
        
    except Exception as e:
        logger.error(f"Import failed: {e}")
        job.status = 'failed'
        job.error_message = str(e)
        job.save()
        
        # Retry logic
        if self.request.retries < self.max_retries:
            raise self.retry(exc=e, countdown=60 * (2 ** self.request.retries))
        else:
            raise

@shared_task
def sync_popular_courses():
    """Periodic task to sync popular courses"""
    
    # Define popular courses to sync
    popular_courses = [
        {
            'url': 'https://www.khanacademy.org/math/algebra',
            'type': 'khan_academy',
            'subject': 'mathematics'
        },
        {
            'url': 'https://www.khanacademy.org/science/physics',
            'type': 'khan_academy',
            'subject': 'physics'
        },
        {
            'url': 'https://www.khanacademy.org/computing/computer-programming',
            'type': 'khan_academy',
            'subject': 'programming'
        }
    ]
    
    logger.info(f"Syncing {len(popular_courses)} popular courses")
    
    for course in popular_courses:
        try:
            import_course_from_url.delay(
                course['url'],
                course['type']
            )
            logger.info(f"Queued sync for {course['url']}")
            time.sleep(2)  # Avoid rate limiting
        except Exception as e:
            logger.error(f"Failed to queue {course['url']}: {e}")
    
    return f"Queued {len(popular_courses)} courses for sync"

@shared_task
def cleanup_old_import_jobs(days_old: int = 7):
    """Clean up old import jobs"""
    
    from datetime import timedelta
    cutoff_date = timezone.now() - timedelta(days=days_old)
    
    # Delete completed jobs older than cutoff
    deleted_count, _ = CourseImportJob.objects.filter(
        status='completed',
        completed_at__lt=cutoff_date
    ).delete()
    
    logger.info(f"Cleaned up {deleted_count} old import jobs")
    return deleted_count

@shared_task
def rebuild_vector_db_index():
    """Rebuild vector database index from all knowledge chunks"""
    
    logger.info("Starting vector DB index rebuild")
    
    # Get all knowledge chunks
    chunks = AIKnowledgeChunk.objects.all().select_related('source')
    
    if not chunks.exists():
        logger.warning("No knowledge chunks found to index")
        return 0
    
    # Initialize vector DB
    vector_db = VectorDBManager()
    
    # Clear existing collection
    try:
        vector_db.client.delete_collection(vector_db.collection_name)
        logger.info(f"Deleted old collection: {vector_db.collection_name}")
    except:
        pass
    
    # Recreate collection
    vector_db.collection = vector_db._get_or_create_collection()
    
    # Prepare and add chunks
    vector_chunks = []
    for chunk in chunks:
        vector_chunk = {
            'id': str(chunk.id),
            'title': chunk.title,
            'content': chunk.content,
            'content_type': chunk.content_type,
            'difficulty_level': chunk.difficulty_level,
            'subject': chunk.subject,
            'topic': chunk.topic,
            'subtopics': chunk.subtopics,
            'concept': chunk.concept,
            'teaching_strategy': chunk.teaching_strategy,
            'source_metadata': {
                'source': chunk.source.name if chunk.source else 'unknown',
                'source_url': chunk.source_url
            },
            'embedding': np.frombuffer(chunk.embedding) if chunk.embedding else None
        }
        vector_chunks.append(vector_chunk)
    
    # Add in batches
    vector_db.add_knowledge_chunks(vector_chunks)
    vector_db.persist()
    
    logger.info(f"Successfully rebuilt vector DB with {len(vector_chunks)} chunks")
    return len(vector_chunks)