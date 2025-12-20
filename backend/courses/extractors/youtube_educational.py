import re
from typing import Dict, List, Any
import googleapiclient.discovery
from youtube_transcript_api import YouTubeTranscriptApi
from .base import BaseCourseExtractor
import logging

logger = logging.getLogger(__name__)

class YouTubeEducationalExtractor(BaseCourseExtractor):
    """Extractor for YouTube educational content"""
    
    def __init__(self, source_url: str, api_key: str = None):
        super().__init__(source_url, api_key)
        self.video_id = self._extract_video_id()
        self.youtube = None
        
        if api_key:
            self.youtube = googleapiclient.discovery.build(
                'youtube', 'v3', developerKey=api_key
            )
    
    def extract_course_content(self) -> Dict[str, Any]:
        """Extract educational content from YouTube video/playlist"""
        
        if 'playlist' in self.source_url:
            return self._extract_playlist_content()
        else:
            return self._extract_single_video_content()
    
    def _extract_video_id(self) -> str:
        """Extract video ID from YouTube URL"""
        patterns = [
            r'(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)',
            r'youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, self.source_url)
            if match:
                return match.group(1)
        
        raise ValueError("Invalid YouTube URL")
    
    def _extract_single_video_content(self) -> Dict[str, Any]:
        """Extract content from a single YouTube video"""
        
        try:
            # Get video metadata
            video_data = self._get_video_metadata(self.video_id)
            
            # Get transcript
            transcript = self._get_transcript(self.video_id)
            
            # Extract structured content from transcript
            structured_content = self._structure_transcript(transcript, video_data['title'])
            
            return {
                'title': video_data['title'],
                'description': video_data['description'],
                'channel': video_data['channel'],
                'duration': video_data['duration'],
                'subject': self._classify_subject(video_data),
                'difficulty': self._estimate_difficulty(video_data),
                'content_type': 'video_lecture',
                'transcript': transcript,
                'structured_content': structured_content,
                'key_concepts': self._extract_key_concepts(transcript),
                'source': 'youtube',
                'source_url': self.source_url,
                'metadata': video_data
            }
            
        except Exception as e:
            logger.error(f"Failed to extract YouTube video content: {e}")
            raise
    
    def _extract_playlist_content(self) -> Dict[str, Any]:
        """Extract content from YouTube playlist"""
        
        if not self.youtube:
            raise ValueError("YouTube API key required for playlist extraction")
        
        try:
            # Get playlist metadata
            playlist_request = self.youtube.playlists().list(
                part='snippet',
                id=self.video_id
            )
            playlist_response = playlist_request.execute()
            
            if not playlist_response['items']:
                raise ValueError("Playlist not found")
            
            playlist_data = playlist_response['items'][0]['snippet']
            
            # Get playlist items
            items_request = self.youtube.playlistItems().list(
                part='snippet,contentDetails',
                playlistId=self.video_id,
                maxResults=50
            )
            items_response = items_request.execute()
            
            lessons = []
            for item in items_response.get('items', []):
                video_id = item['contentDetails']['videoId']
                try:
                    video_data = self._get_video_metadata(video_id)
                    transcript = self._get_transcript(video_id)
                    
                    lesson = {
                        'title': video_data['title'],
                        'description': video_data['description'],
                        'video_id': video_id,
                        'duration': video_data['duration'],
                        'transcript': transcript,
                        'structured_content': self._structure_transcript(transcript, video_data['title']),
                        'order': item['snippet']['position'] + 1
                    }
                    lessons.append(lesson)
                except Exception as e:
                    logger.warning(f"Failed to extract video {video_id}: {e}")
                    continue
            
            # Classify overall subject
            all_descriptions = ' '.join([lesson['description'] for lesson in lessons])
            subject = self._classify_subject_from_text(all_descriptions)
            
            return {
                'title': playlist_data['title'],
                'description': playlist_data['description'],
                'channel': playlist_data['channelTitle'],
                'total_videos': len(lessons),
                'subject': subject,
                'difficulty': self._estimate_playlist_difficulty(lessons),
                'lessons': lessons,
                'source': 'youtube_playlist',
                'source_url': self.source_url
            }
            
        except Exception as e:
            logger.error(f"Failed to extract playlist content: {e}")
            raise
    
    def _get_video_metadata(self, video_id: str) -> Dict[str, Any]:
        """Get video metadata using YouTube API or fallback"""
        
        if self.youtube:
            try:
                request = self.youtube.videos().list(
                    part='snippet,contentDetails,statistics',
                    id=video_id
                )
                response = request.execute()
                
                if response['items']:
                    video = response['items'][0]
                    snippet = video['snippet']
                    content_details = video['contentDetails']
                    
                    return {
                        'title': snippet['title'],
                        'description': snippet['description'],
                        'channel': snippet['channelTitle'],
                        'duration': self._parse_duration(content_details['duration']),
                        'view_count': video['statistics'].get('viewCount', 0),
                        'like_count': video['statistics'].get('likeCount', 0),
                        'published_at': snippet['publishedAt']
                    }
            except Exception as e:
                logger.warning(f"YouTube API failed: {e}")
        
        # Fallback to minimal metadata
        return {
            'title': 'Unknown Video',
            'description': '',
            'channel': 'Unknown',
            'duration': 0,
            'view_count': 0
        }
    
    def _get_transcript(self, video_id: str) -> str:
        """Get transcript for YouTube video"""
        try:
            transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
            return ' '.join([entry['text'] for entry in transcript_list])
        except Exception as e:
            logger.warning(f"Could not get transcript for {video_id}: {e}")
            return ""
    
    def _structure_transcript(self, transcript: str, title: str) -> List[Dict[str, Any]]:
        """Structure transcript into logical segments"""
        
        # Simple segmentation by sentence groups
        sentences = transcript.split('. ')
        segments = []
        
        # Group sentences into segments
        segment_size = 5  # sentences per segment
        for i in range(0, len(sentences), segment_size):
            segment_text = '. '.join(sentences[i:i+segment_size])
            if segment_text.strip():
                segments.append({
                    'segment_number': len(segments) + 1,
                    'content': segment_text + '.',
                    'estimated_duration': len(segment_text.split()) / 150 * 60,  # Words per minute estimate
                    'key_terms': self._extract_keywords(segment_text)
                })
        
        return segments
    
    def _parse_duration(self, duration_str: str) -> int:
        """Parse ISO 8601 duration to seconds"""
        import re
        match = re.match(r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', duration_str)
        if match:
            hours = int(match.group(1) or 0)
            minutes = int(match.group(2) or 0)
            seconds = int(match.group(3) or 0)
            return hours * 3600 + minutes * 60 + seconds
        return 0
    
    def _classify_subject(self, video_data: Dict) -> str:
        """Classify video subject based on title and description"""
        text = f"{video_data['title']} {video_data['description']}".lower()
        return self._classify_subject_from_text(text)
    
    def _classify_subject_from_text(self, text: str) -> str:
        """Classify subject from text"""
        
        subject_keywords = {
            'mathematics': ['math', 'algebra', 'calculus', 'geometry', 'trigonometry', 'statistics'],
            'physics': ['physics', 'mechanics', 'thermodynamics', 'quantum', 'relativity'],
            'chemistry': ['chemistry', 'organic', 'inorganic', 'biochemistry', 'molecules'],
            'biology': ['biology', 'genetics', 'evolution', 'cells', 'anatomy'],
            'programming': ['programming', 'coding', 'python', 'javascript', 'java', 'algorithm'],
            'computer_science': ['computer science', 'cs', 'data structures', 'algorithms'],
            'history': ['history', 'historical', 'war', 'civilization', 'ancient'],
            'economics': ['economics', 'microeconomics', 'macroeconomics', 'market', 'finance'],
            'language': ['language', 'grammar', 'vocabulary', 'english', 'spanish'],
        }
        
        for subject, keywords in subject_keywords.items():
            for keyword in keywords:
                if keyword in text.lower():
                    return subject
        
        return 'general'