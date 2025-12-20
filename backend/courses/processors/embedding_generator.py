import numpy as np
from typing import List, Dict, Any
import openai
from django.conf import settings
from sentence_transformers import SentenceTransformer
import logging

logger = logging.getLogger(__name__)

class EmbeddingGenerator:
    """Generate embeddings for knowledge chunks"""
    
    def __init__(self, use_openai: bool = True):
        self.use_openai = use_openai and settings.OPENAI_API_KEY
        
        if self.use_openai:
            openai.api_key = settings.OPENAI_API_KEY
            self.model = "text-embedding-ada-002"
        else:
            # Use open-source model as fallback
            self.model = SentenceTransformer('all-MiniLM-L6-v2')
    
    def generate_embeddings(self, chunks: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Generate embeddings for a list of chunks"""
        
        chunks_with_embeddings = []
        
        for i, chunk in enumerate(chunks):
            try:
                # Prepare text for embedding
                text = self._prepare_text_for_embedding(chunk)
                
                # Generate embedding
                if self.use_openai:
                    embedding = self._generate_openai_embedding(text)
                else:
                    embedding = self._generate_local_embedding(text)
                
                # Add embedding to chunk
                chunk['embedding'] = embedding.tolist() if hasattr(embedding, 'tolist') else embedding
                chunk['embedding_model'] = 'openai' if self.use_openai else 'sentence-transformers'
                
                chunks_with_embeddings.append(chunk)
                
                # Log progress
                if (i + 1) % 10 == 0:
                    logger.info(f"Generated embeddings for {i + 1}/{len(chunks)} chunks")
                    
            except Exception as e:
                logger.error(f"Failed to generate embedding for chunk {i}: {e}")
                # Add chunk without embedding
                chunk['embedding'] = None
                chunk['embedding_model'] = None
                chunks_with_embeddings.append(chunk)
        
        return chunks_with_embeddings
    
    def _prepare_text_for_embedding(self, chunk: Dict) -> str:
        """Prepare text for embedding generation"""
        
        parts = []
        
        # Add title and content
        parts.append(chunk.get('title', ''))
        parts.append(chunk.get('content', ''))
        
        # Add metadata for better context
        if chunk.get('concept'):
            parts.append(f"Concept: {chunk['concept']}")
        
        if chunk.get('learning_objectives'):
            parts.append(f"Learning objectives: {', '.join(chunk['learning_objectives'])}")
        
        if chunk.get('subtopics'):
            parts.append(f"Topics: {', '.join(chunk['subtopics'])}")
        
        return "\n".join(parts)
    
    def _generate_openai_embedding(self, text: str) -> np.ndarray:
        """Generate embedding using OpenAI API"""
        
        # Truncate text if too long
        if len(text) > 8000:
            text = text[:8000]
        
        response = openai.Embedding.create(
            model=self.model,
            input=text
        )
        
        return np.array(response['data'][0]['embedding'])
    
    def _generate_local_embedding(self, text: str) -> np.ndarray:
        """Generate embedding using local model"""
        
        # Encode the text
        embedding = self.model.encode(text)
        
        return embedding
    
    def batch_generate_embeddings(self, texts: List[str], batch_size: int = 32) -> List[np.ndarray]:
        """Generate embeddings in batches for efficiency"""
        
        embeddings = []
        
        if self.use_openai:
            # OpenAI handles batching internally
            for i in range(0, len(texts), batch_size):
                batch = texts[i:i + batch_size]
                
                # Truncate long texts
                batch = [text[:8000] for text in batch]
                
                response = openai.Embedding.create(
                    model=self.model,
                    input=batch
                )
                
                batch_embeddings = [np.array(item['embedding']) for item in response['data']]
                embeddings.extend(batch_embeddings)
                
                logger.info(f"Processed batch {i//batch_size + 1}/{(len(texts) + batch_size - 1)//batch_size}")
        else:
            # Local model batching
            for i in range(0, len(texts), batch_size):
                batch = texts[i:i + batch_size]
                batch_embeddings = self.model.encode(batch)
                embeddings.extend(batch_embeddings)
                
                logger.info(f"Processed batch {i//batch_size + 1}/{(len(texts) + batch_size - 1)//batch_size}")
        
        return embeddings