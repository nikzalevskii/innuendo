from pydantic import BaseModel, Field
from typing import List, Dict, Any

class EmbedResponse(BaseModel):
    vector: List[float] = Field(
        ...,
        description="Embedding vector (384 numbers)"
    )
    dimension: int = Field(
        ...,
        description="Vector dimensionality"
    )
    model: str = Field(
        ...,
        description="Model name"
    )
    
class TranscribeResponse(BaseModel):
    text: str = Field(
        ...,
        description="Recognized text"
    )
    metadata: Dict[str, Any] = Field(
        ...,
        description="Metadata (language, duration, ...)"
    )
    
class OCRResponse(BaseModel):
    text: str = Field(
        ...,
        description="Extracted text"
    )
    metadata: Dict[str, Any] = Field(
        ...,
        description="Metadata (size, confidence, ...)"
    )
    
class EntityItem(BaseModel):
    text: str = Field(..., description="Extracted entity text")
    type: str = Field(..., description="Entity type (PERSON, ORG, LOC, ...)")
    start_pos: int = Field(..., description="Start position in text")
    end_pos: int = Field(..., description="End position in text")
    
class NERResponse(BaseModel):
    entities: List[EntityItem] = Field(
        ...,
        description="List of extracted entities"
    )
    count: int = Field(
        ...,
        description="Number of entities"
    )
    
class HealthResponse(BaseModel):
    status: str = Field(..., description="Service status")
    models: Dict[str, Any] = Field(..., description="Loaded models")