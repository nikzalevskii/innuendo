from .embedding import router as embedding_router
from .transcription import router as transcription_router
from .ocr import router as ocr_router
from .ner import router as ner_router

__all__ = [
    "embedding_router",
    "transcription_router",
    "ocr_router",
    "ner_router"
]