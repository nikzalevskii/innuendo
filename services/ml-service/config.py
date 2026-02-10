from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    host: str = "0.0.0.0"
    port: int = 8000
    
    embedding_model: str = "all-MiniLM-L6-v2"
    whisper_model: str = "base"
    spacy_model: str = "en_core_web_sm"
    
    uploads_dir: str = "./uploads"
    models_cache_dir: str = "./models_cache"
    
    class Config:
        env_file = ".env"
        env_prefix = "ML_"
        case_sensitive = False
        
@lru_cache()
def get_settings() -> Settings:
    return Settings()
    