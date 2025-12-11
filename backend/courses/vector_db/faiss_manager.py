"""
FAISS Vector Database Manager as alternative to ChromaDB
"""

import numpy as np
import faiss
import pickle
import json
from typing import List, Dict, Any, Optional
from django.conf import settings
import os
import logging

logger = logging.getLogger(__name__)

class FAISSVectorDB:
    """FAISS-based vector database manager"""
    
    def __init__(self, index_path: str = None, dimension: int = 1536):
        self.dimension = dimension  # OpenAI ada-002 embedding dimension
        self.index_path = index_path or os.path.join(settings.BASE_DIR, 'data/faiss_index')
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(self.index_path), exist_ok=True)
        
        # Initialize index and metadata
        self.index = None
        self.metadata = []
        self.id_to_index = {}
        self.index_to_id = {}
        
        # Load existing index if exists
        self._load_index()
    
    def _load_index(self):
        """Load existing FAISS index from disk"""
        try:
            index_file = f"{self.index_path}.index"
            metadata_file = f"{self.index_path}.metadata"
            
            if os.path.exists(index_file) and os.path.exists(metadata_file):
                # Load index
                self.index = faiss.read_index(index_file)
                
                # Load metadata
                with open(metadata_file, 'rb') as f:
                    data = pickle.load(f)
                    self.metadata = data['metadata']
                    self.id_to_index = data['id_to_index']
                    self.index_to_id = data['index_to_id']
                
                logger.info(f"Loaded FAISS index with {self.index.ntotal} vectors")
            else:
                # Create new index
                self._create_new_index()
                
        except Exception as e:
            logger.error(f"Failed to load FAISS index: {e}")
            self._create_new_index()
    
    def _create_new_index(self):
        """Create a new FAISS index"""
        # Using IndexFlatIP (Inner Product) for cosine similarity
        # Since OpenAI embeddings are normalized, inner product = cosine similarity
        self.index = faiss.IndexFlatIP(self.dimension)
        self.metadata = []
        self.id_to_index = {}
        self.index_to_id = {}
        logger.info("Created new FAISS index")
    
    def _save_index(self):
        """Save FAISS index to disk"""
        try:
            # Save index
            index_file = f"{self.index_path}.index"
            faiss.write_index(self.index, index_file)
            
            # Save metadata
            metadata_file = f"{self.index_path}.metadata"
            data = {
                'metadata': self.metadata,
                'id_to_index': self.id_to_index,
                'index_to_id': self.index_to_id
            }
            
            with open(metadata_file, 'wb') as f:
                pickle.dump(data, f)
            
            logger.info(f"Saved FAISS index with {self.index.ntotal} vectors")
            
        except Exception as e:
            logger.error(f"Failed to save FAISS index: {e}")
    
    def add_embeddings(self, embeddings: List[np.ndarray], metadatas: List[Dict], ids: List[str]):
        """Add embeddings to the index"""
        
        if len(embeddings) != len(metadatas) or len(embeddings) != len(ids):
            raise ValueError("Embeddings, metadatas, and ids must have the same length")
        
        # Convert embeddings to numpy array
        embeddings_array = np.array(embeddings).astype('float32')
        
        # Normalize embeddings for cosine similarity
        faiss.normalize_L2(embeddings_array)
        
        # Add to index
        start_idx = self.index.ntotal
        self.index.add(embeddings_array)
        
        # Update metadata and id mappings
        for i, (metadata, vector_id) in enumerate(zip(metadatas, ids)):
            idx = start_idx + i
            self.metadata.append(metadata)
            self.id_to_index[vector_id] = idx
            self.index_to_id[idx] = vector_id
        
        # Save index
        self._save_index()
        
        logger.info(f"Added {len(embeddings)} embeddings to FAISS index")
    
    def search(self, query_embedding: np.ndarray, k: int = 10, filters: Optional[Dict] = None) -> List[Dict[str, Any]]:
        """Search for similar vectors"""
        
        if self.index.ntotal == 0:
            return []
        
        # Prepare query
        query_array = np.array([query_embedding]).astype('float32')
        faiss.normalize_L2(query_array)
        
        # Search
        distances, indices = self.index.search(query_array, min(k, self.index.ntotal))
        
        # Prepare results
        results = []
        for distance, idx in zip(distances[0], indices[0]):
            if idx == -1:  # No more results
                continue
            
            # Get metadata
            metadata = self.metadata[idx]
            vector_id = self.index_to_id.get(idx, f"idx_{idx}")
            
            # Apply filters if provided
            if filters and not self._passes_filters(metadata, filters):
                continue
            
            results.append({
                'id': vector_id,
                'metadata': metadata,
                'similarity_score': float(distance),  # Cosine similarity (0-1)
                'index': idx
            })
        
        # Sort by similarity score (descending)
        results.sort(key=lambda x: x['similarity_score'], reverse=True)
        
        return results[:k]
    
    def _passes_filters(self, metadata: Dict, filters: Dict) -> bool:
        """Check if metadata passes all filters"""
        for key, value in filters.items():
            if value is None:
                continue
            
            metadata_value = metadata.get(key)
            if metadata_value is None:
                return False
            
            # Simple equality check for now
            if isinstance(value, str) and isinstance(metadata_value, str):
                if value.lower() != metadata_value.lower():
                    return False
            elif value != metadata_value:
                return False
        
        return True
    
    def delete_by_ids(self, ids: List[str]) -> int:
        """Delete vectors by IDs (FAISS doesn't support deletion, so we recreate)"""
        
        if not ids:
            return 0
        
        # Get indices to keep
        indices_to_keep = []
        new_metadata = []
        new_id_to_index = {}
        new_index_to_id = {}
        
        new_idx = 0
        for old_idx, metadata in enumerate(self.metadata):
            vector_id = self.index_to_id.get(old_idx)
            
            if vector_id not in ids:
                # Keep this vector
                indices_to_keep.append(old_idx)
                new_metadata.append(metadata)
                new_id_to_index[vector_id] = new_idx
                new_index_to_id[new_idx] = vector_id
                new_idx += 1
        
        if len(indices_to_keep) == len(self.metadata):
            # Nothing to delete
            return 0
        
        # Reconstruct index with only kept vectors
        # Get all embeddings
        all_embeddings = self.index.reconstruct_n(0, self.index.ntotal)
        
        # Keep only selected embeddings
        kept_embeddings = all_embeddings[indices_to_keep]
        
        # Create new index
        new_index = faiss.IndexFlatIP(self.dimension)
        faiss.normalize_L2(kept_embeddings)
        new_index.add(kept_embeddings)
        
        # Update instance variables
        self.index = new_index
        self.metadata = new_metadata
        self.id_to_index = new_id_to_index
        self.index_to_id = new_index_to_id
        
        # Save
        self._save_index()
        
        deleted_count = len(ids) - (len(self.metadata) - len(indices_to_keep))
        logger.info(f"Deleted {deleted_count} vectors from FAISS index")
        
        return deleted_count
    
    def get_stats(self) -> Dict[str, Any]:
        """Get index statistics"""
        
        return {
            'total_vectors': self.index.ntotal,
            'dimension': self.dimension,
            'index_type': 'IndexFlatIP',
            'is_trained': self.index.is_trained,
            'metadata_count': len(self.metadata)
        }
    
    def clear(self):
        """Clear all vectors from index"""
        self._create_new_index()
        self._save_index()
        logger.info("Cleared FAISS index")

class SimpleVectorDB:
    """
    Simple in-memory vector database for development/testing
    Uses numpy and scipy for similarity calculations
    """
    
    def __init__(self, dimension: int = 1536):
        self.dimension = dimension
        self.embeddings = []
        self.metadatas = []
        self.ids = []
        
    def add_embeddings(self, embeddings: List[np.ndarray], metadatas: List[Dict], ids: List[str]):
        """Add embeddings to the database"""
        
        if len(embeddings) != len(metadatas) or len(embeddings) != len(ids):
            raise ValueError("Embeddings, metadatas, and ids must have the same length")
        
        self.embeddings.extend(embeddings)
        self.metadatas.extend(metadatas)
        self.ids.extend(ids)
    
    def search(self, query_embedding: np.ndarray, k: int = 10, filters: Optional[Dict] = None) -> List[Dict[str, Any]]:
        """Search for similar vectors using cosine similarity"""
        
        if not self.embeddings:
            return []
        
        # Calculate cosine similarities
        from scipy.spatial.distance import cdist
        
        query_array = np.array([query_embedding])
        embeddings_array = np.array(self.embeddings)
        
        # Normalize for cosine similarity
        from numpy.linalg import norm
        query_norm = norm(query_array, axis=1, keepdims=True)
        embeddings_norm = norm(embeddings_array, axis=1, keepdims=True)
        
        query_normalized = query_array / query_norm
        embeddings_normalized = embeddings_array / embeddings_norm
        
        # Calculate cosine similarities
        similarities = np.dot(embeddings_normalized, query_normalized.T).flatten()
        
        # Get top k indices
        top_k = min(k, len(similarities))
        top_indices = np.argsort(similarities)[::-1][:top_k]
        
        # Prepare results
        results = []
        for idx in top_indices:
            similarity = float(similarities[idx])
            
            # Apply filters
            if filters and not self._passes_filters(self.metadatas[idx], filters):
                continue
            
            results.append({
                'id': self.ids[idx],
                'metadata': self.metadatas[idx],
                'similarity_score': similarity,
                'index': idx
            })
        
        return results
    
    def _passes_filters(self, metadata: Dict, filters: Dict) -> bool:
        """Check if metadata passes all filters"""
        for key, value in filters.items():
            if value is None:
                continue
            
            metadata_value = metadata.get(key)
            if metadata_value is None:
                return False
            
            if isinstance(value, str) and isinstance(metadata_value, str):
                if value.lower() != metadata_value.lower():
                    return False
            elif value != metadata_value:
                return False
        
        return True
    
    def get_stats(self) -> Dict[str, Any]:
        """Get database statistics"""
        return {
            'total_vectors': len(self.embeddings),
            'dimension': self.dimension,
            'type': 'SimpleVectorDB (in-memory)'
        }