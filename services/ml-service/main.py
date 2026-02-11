from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config import get_settings
from models import EmbeddingModel, WhisperASR, OCRModel, NERModel
from routers import (
    embedding_router,
    transcription_router,
    ocr_router,
    ner_router
)
import routers.embedding as embedding_module
import routers.transcription as transcription_module
import routers.ocr as ocr_module
import routers.ner as ner_module

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("\n[1/4] Loading Embedding model...")
    embedding_model = EmbeddingModel(settings.embedding_model)
    embedding_module.embedding_model = embedding_model

    print("\n[2/4] Loading Whisper model...")
    whisper_model = WhisperASR(settings.whisper_model)
    transcription_module.whisper_model = whisper_model

    print("\n[3/4] Initializing OCR...")
    ocr_model = OCRModel()
    ocr_module.ocr_model = ocr_model

    print("\n[4/4] Loading NER model...")
    ner_model = NERModel(settings.spacy_model)
    ner_module.ner_model = ner_model

    print("\n" + "=" * 60)
    print("✅ All models loaded successfully!")
    print(f"📍 Server running: http://{settings.host}:{settings.port}")
    print(f"📖 Swagger UI: http://{settings.host}:{settings.port}/docs")
    print("=" * 60 + "\n")

    yield  

    print("\n🛑 ML Service is shutting down...")
    
app = FastAPI(
    title="Innuendo ML Service",
    description="""
    ML microservice for processing files:
    - 🧠 Embeddings (vector representations)
    - 🎤 Speech-to-Text (Whisper)
    - 🖼️ OCR (Tesseract)
    - 🏷️ Named Entity Recognition (spaCy)
    """,
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  
        "http://localhost:3001"   
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(embedding_router)
app.include_router(transcription_router)
app.include_router(ocr_router)
app.include_router(ner_router)

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "models": {
            "embeddings": {
                "model": settings.embedding_model,
                "dimension": 384
            },
            "whisper": {
                "model": settings.whisper_model
            },
            "ner": {
                "model": settings.spacy_model
            }
        }
    }
    
@app.get("/")
async def root():
    return {
        "service": "Innuendo ML Service",
        "version": "1.0.0",
        "docs": "/docs"
    }
    
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=False  
    )