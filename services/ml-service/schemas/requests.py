from pydantic import BaseModel, Field
from typing import Optional

class EmbedRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=1,
        max_length=50000,
        description="Text for embedding generation"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "text": "This is a test text for embedding generation"
            }
        }
        
class TranscribeRequest(BaseModel):
    file_path: str = Field(
        ...,
        description="Path to audio file relative to uploads/"
    )
    language: Optional[str] = Field(
        None,
        description="Language code (ru, en, ...). None = auto-detection"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "file_path": "uploads/audio_123.mp3",
                "language": "ru"
            }
        }
        
class OCRRequest(BaseModel):
    file_path: str = Field(
        ...,
        description="Path to image file relative to uploads/"
    )
    language: str = Field(
        default="eng+rus",
        description="Languages for OCR (eng+rus, eng, rus, ...)"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "file_path": "uploads/screenshot_456.png",
                "language": "ru"
            }
        }
    
class NERRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=1,
        max_length=50000,
        description="Text for analysis"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "text": "Apple Inc. was founded by Steve Jobs in Cupertino."
            }
        }