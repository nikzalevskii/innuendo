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
    