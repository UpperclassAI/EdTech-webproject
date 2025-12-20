import requests
import json
from typing import Dict, List, Any
from bs4 import BeautifulSoup
from .base import BaseCourseExtractor
import logging
import re

logger = logging.getLogger(__name__)

class KhanAcademyExtractor(BaseCourseExtractor):
    """Extractor for Khan Academy courses"""
    
    BASE_API_URL = "https://www.khanacademy.org/api/v1/"
    
    def __init__(self, source_url: str, api_key: str = None):
        super().__init__(source_url, api_key)
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def extract_course_content(self) -> Dict[str, Any]:
        """Extract full course content from Khan Academy"""
        
        # Parse the URL to get course slug
        slug = self._extract_slug_from_url()
        if not slug:
            raise ValueError("Invalid Khan Academy URL")
        
        try:
            # Get course metadata
            course_data = self._get_course_data(slug)
            
            # Get all topics/tutorials
            topics = self._get_topics(slug)
            
            # Extract content from each topic
            lessons = []
            for topic in topics[:10]:  # Limit for testing
                topic_lessons = self._extract_topic_content(topic)
                lessons.extend(topic_lessons)
            
            return {
                'title': course_data.get('title', slug),
                'description': course_data.get('description', ''),
                'subject': course_data.get('subject', 'general'),
                'grade_level': course_data.get('grade_level', 'all'),
                'total_lessons': len(lessons),
                'lessons': lessons,
                'source': 'khan_academy',
                'source_url': self.source_url,
                'metadata': course_data
            }
            
        except Exception as e:
            logger.error(f"Failed to extract Khan Academy content: {e}")
            raise
    
    def _extract_slug_from_url(self) -> str:
        """Extract course slug from URL"""
        patterns = [
            r'khanacademy\.org/(?:.*/)*([a-z-]+)(?:/.*)?$',
            r'khanacademy\.org/(?:.*/)?(?:.*/)?([a-z-]+)'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, self.source_url)
            if match:
                return match.group(1)
        
        return ''
    
    def _get_course_data(self, slug: str) -> Dict[str, Any]:
        """Get course metadata from Khan Academy API"""
        try:
            response = self.session.get(
                f"{self.BASE_API_URL}topic/{slug}",
                timeout=30
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.warning(f"API request failed, falling back to HTML: {e}")
            return self._scrape_course_data()
    
    def _scrape_course_data(self) -> Dict[str, Any]:
        """Scrape course data from HTML page"""
        try:
            response = self.session.get(self.source_url, timeout=30)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract metadata
            title_elem = soup.find('meta', property='og:title')
            description_elem = soup.find('meta', property='og:description')
            
            return {
                'title': title_elem['content'] if title_elem else 'Unknown Course',
                'description': description_elem['content'] if description_elem else '',
                'subject': self._infer_subject_from_url(),
                'grade_level': self._infer_grade_level()
            }
        except Exception as e:
            logger.error(f"Failed to scrape course data: {e}")
            return {'title': 'Unknown Course', 'description': ''}
    
    def _get_topics(self, slug: str) -> List[Dict[str, Any]]:
        """Get list of topics/tutorials in the course"""
        try:
            response = self.session.get(
                f"{self.BASE_API_URL}topic/{slug}/topics",
                timeout=30
            )
            response.raise_for_status()
            return response.json()
        except:
            return []
    
    def _extract_topic_content(self, topic: Dict) -> List[Dict[str, Any]]:
        """Extract content from a topic"""
        lessons = []
        topic_slug = topic.get('slug')
        
        if not topic_slug:
            return lessons
        
        try:
            # Get videos in this topic
            response = self.session.get(
                f"{self.BASE_API_URL}topic/{topic_slug}/videos",
                timeout=30
            )
            videos = response.json()
            
            for video in videos[:5]:  # Limit videos per topic
                lesson = {
                    'title': video.get('title', ''),
                    'description': video.get('description', ''),
                    'content_type': 'video',
                    'content': self._extract_video_transcript(video.get('youtube_id')),
                    'url': f"https://www.khanacademy.org{video.get('relative_url', '')}",
                    'duration': video.get('duration', 0),
                    'difficulty': self._estimate_difficulty(video),
                    'key_concepts': self._extract_keywords(video.get('description', ''))
                }
                lessons.append(lesson)
            
            # Get exercises in this topic
            response = self.session.get(
                f"{self.BASE_API_URL}topic/{topic_slug}/exercises",
                timeout=30
            )
            exercises = response.json()
            
            for exercise in exercises[:5]:  # Limit exercises per topic
                lesson = {
                    'title': exercise.get('title', ''),
                    'description': exercise.get('description', ''),
                    'content_type': 'exercise',
                    'content': self._extract_exercise_content(exercise),
                    'url': f"https://www.khanacademy.org{exercise.get('relative_url', '')}",
                    'difficulty': self._estimate_difficulty(exercise),
                    'key_concepts': self._extract_keywords(exercise.get('description', ''))
                }
                lessons.append(lesson)
                
        except Exception as e:
            logger.error(f"Failed to extract topic content: {e}")
        
        return lessons
    
    def _extract_video_transcript(self, youtube_id: str) -> str:
        """Extract transcript from YouTube video"""
        if not youtube_id:
            return ''
        
        try:
            from youtube_transcript_api import YouTubeTranscriptApi
            
            transcript = YouTubeTranscriptApi.get_transcript(youtube_id)
            return ' '.join([entry['text'] for entry in transcript])
        except Exception as e:
            logger.warning(f"Failed to get transcript for {youtube_id}: {e}")
            return ''
    
    def _extract_exercise_content(self, exercise: Dict) -> str:
        """Extract content from exercise"""
        # This would need more sophisticated extraction
        # For now, return the description
        return exercise.get('description', '') + ' ' + exercise.get('content', '')
    
    def _estimate_difficulty(self, content_item: Dict) -> str:
        """Estimate difficulty level"""
        # Simple heuristic based on Khan Academy's level system
        ka_level = content_item.get('ka_version', '').lower()
        
        if 'challenge' in ka_level or 'mastery' in ka_level:
            return 'advanced'
        elif 'foundation' in ka_level or 'basic' in ka_level:
            return 'beginner'
        else:
            return 'intermediate'
    
    def _infer_subject_from_url(self) -> str:
        """Infer subject from URL patterns"""
        url_lower = self.source_url.lower()
        
        subjects = {
            'math': ['math', 'algebra', 'calculus', 'geometry'],
            'science': ['science', 'physics', 'chemistry', 'biology'],
            'programming': ['programming', 'computer-science', 'cs'],
            'humanities': ['history', 'art', 'economics', 'grammar']
        }
        
        for subject, keywords in subjects.items():
            for keyword in keywords:
                if keyword in url_lower:
                    return subject
        
        return 'general'
    
    def _infer_grade_level(self) -> str:
        """Infer grade level from URL"""
        # Simple pattern matching
        if 'early-math' in self.source_url:
            return 'elementary'
        elif 'high-school' in self.source_url:
            return 'high-school'
        elif 'college' in self.source_url:
            return 'college'
        return 'all'