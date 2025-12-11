from abc import ABC, abstractmethod
from typing import Dict, List, Any
import logging

logger = logging.getLogger(__name__)

class BaseCourseExtractor(ABC):
    """Base class for all course extractors"""
    
    def __init__(self, source_url: str, api_key: str = None):
        self.source_url = source_url
        self.api_key = api_key
        self.session = None
    
    @abstractmethod
    def extract_course_content(self) -> Dict[str, Any]:
        """Extract course content from the source"""
        pass
    
    @abstractmethod
    def get_course_structure(self) -> List[Dict[str, Any]]:
        """Get the structure/modules of the course"""
        pass
    
    @abstractmethod
    def extract_lesson_content(self, lesson_url: str) -> Dict[str, Any]:
        """Extract content from a specific lesson"""
        pass
    
    def validate_source(self) -> bool:
        """Validate that the source URL is accessible and valid"""
        import requests
        try:
            response = requests.head(self.source_url, timeout=10)
            return response.status_code == 200
        except Exception as e:
            logger.error(f"Source validation failed: {e}")
            return False
    
    def cleanup(self):
        """Cleanup resources"""
        if self.session:
            self.session.close()