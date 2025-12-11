"""
Vector Database Manager - Now using FAISS instead of ChromaDB
"""

import numpy as np
from typing import List, Dict, Any, Optional
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

# Try to import FAISS, fallback to simple implementation
try:
    from .faiss_manager import FAISSVectorDB
    VectorDBClass = FAISSVectorDB
    logger.info("Using FAISS vector database")
except ImportError:
    from .faiss_manager import SimpleVectorDB
    VectorDBClass = SimpleVectorDB
    logger.warning("FAISS not installed, using simple in-memory vector database")

class VectorDBManager:
    """Manage vector database for knowledge chunks"""
    
    def __init__(self, collection_name: str = "upperclass_knowledge"):
        self.collection_name = collection_name
        self.vector_db = VectorDBClass(
            index_path=f"{settings.BASE_DIR}/data/faiss_{collection_name}",
            dimension=1536  # OpenAI ada-002 embedding dimension
        )
    
    def add_knowledge_chunks(self, chunks: List[Dict[str, Any]]):
        """Add knowledge chunks to vector database"""
        
        if not chunks:
            return
        
        # Prepare data for vector DB
        embeddings = []
        metadatas = []
        ids = []
        
        for i, chunk in enumerate(chunks):
            if chunk.get('embedding') is None:
                continue
            
            # Convert embedding to numpy array
            embedding = np.array(chunk['embedding'])
            
            # Prepare metadata
            metadata = {
                'title': chunk.get('title', ''),
                'content_type': chunk.get('content_type', 'concept'),
                'difficulty_level': chunk.get('difficulty_level', 'intermediate'),
                'subject': chunk.get('subject', 'general'),
                'topic': chunk.get('topic', 'general'),
                'concept': chunk.get('concept', ''),
                'teaching_strategy': chunk.get('teaching_strategy', 'direct_instruction'),
                'source': chunk.get('source_metadata', {}).get('source', 'unknown'),
                'ai_analyzed': str(chunk.get('ai_analyzed', False))
            }
            
            # Add additional metadata
            if chunk.get('subtopics'):
                metadata['subtopics'] = ', '.join(chunk['subtopics'])
            
            # Generate unique ID
            chunk_id = chunk.get('id', f"chunk_{i}_{hash(str(chunk))}")
            
            embeddings.append(embedding)
            metadatas.append(metadata)
            ids.append(chunk_id)
        
        # Add to vector database in batches
        batch_size = 100
        for i in range(0, len(ids), batch_size):
            batch_end = min(i + batch_size, len(ids))
            
            self.vector_db.add_embeddings(
                embeddings=embeddings[i:batch_end],
                metadatas=metadatas[i:batch_end],
                ids=ids[i:batch_end]
            )
            
            logger.info(f"Added batch {i//batch_size + 1} to vector DB ({batch_end}/{len(ids)})")
        
        logger.info(f"Successfully added {len(ids)} chunks to vector database")
    
    def search_similar(self, query_embedding: List[float], 
                      filters: Optional[Dict] = None,
                      limit: int = 10) -> List[Dict[str, Any]]:
        """Search for similar knowledge chunks"""
        
        try:
            # Convert to numpy array
            query_array = np.array(query_embedding)
            
            # Search in vector database
            results = self.vector_db.search(
                query_embedding=query_array,
                k=limit,
                filters=filters
            )
            
            # Format results
            formatted_results = []
            for result in results:
                formatted_results.append({
                    'id': result['id'],
                    'metadata': result['metadata'],
                    'content': self._get_content_for_id(result['id']),  # You'll need to implement this
                    'similarity_score': result['similarity_score'],
                    'relevance': self._calculate_relevance(result['metadata'], filters)
                })
            
            # Sort by relevance
            formatted_results.sort(key=lambda x: x['relevance'], reverse=True)
            
            return formatted_results
            
        except Exception as e:
            logger.error(f"Vector DB search failed: {e}")
            return []
    
    def _get_content_for_id(self, chunk_id: str) -> str:
        """Get content for a chunk ID"""
        # This should retrieve content from your database
        # For now, return empty string - you'll need to implement this
        # based on how you store your knowledge chunks
        return ""
    
    def _calculate_relevance(self, metadata: Dict, filters: Dict) -> float:
        """Calculate relevance score for search results"""
        
        relevance = 1.0
        
        if not filters:
            return relevance
        
        # Penalize mismatches with filters
        for key, filter_value in filters.items():
            if key in metadata and filter_value:
                metadata_value = metadata[key]
                if isinstance(metadata_value, str) and isinstance(filter_value, str):
                    if filter_value.lower() != metadata_value.lower():
                        relevance *= 0.7  # Penalize mismatch
        
        return relevance
    
    def get_collection_stats(self) -> Dict[str, Any]:
        """Get statistics about the collection"""
        
        try:
            stats = self.vector_db.get_stats()
            stats['collection_name'] = self.collection_name
            return stats
            
        except Exception as e:
            logger.error(f"Failed to get collection stats: {e}")
            return {'error': str(e)}
    
    def delete_chunks_by_source(self, source: str) -> int:
        """Delete chunks by source"""
        
        # Note: FAISS doesn't support efficient deletion
        # This would require recreating the index
        # For now, just mark them as deleted in metadata
        
        logger.warning("Delete by source not fully implemented for FAISS")
        return 0
    
    def persist(self):
        """Persist the vector database to disk"""
        # FAISS auto-saves, but we can call save if needed
        pass