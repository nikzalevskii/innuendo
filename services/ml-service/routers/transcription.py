from fastapi import APIRouter, HTTPException
from schemas import TranscribeRequest, TranscribeResponse
import os

router = APIRouter(prefix="/transcribe", tags=["Transcription"])

whisper_model = None

@router.post("", response_model=TranscribeResponse)
async def transcribe_audio(request: TranscribeRequest):
    if whisper_model is None:
        raise HTTPException(
            status_code=503,
            detail="Whisper model not initialized"
        )

    if not os.path.exists(request.file_path):
        raise HTTPException(
            status_code=404,
            detail=f"Audio file not found: {request.file_path}"
        )

    try:
        text, metadata = whisper_model.transcribe(
            request.file_path,
            language=request.language
        )

        return TranscribeResponse(
            text=text,
            metadata=metadata
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Transcription failed: {str(e)}"
        )