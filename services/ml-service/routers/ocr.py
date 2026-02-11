from fastapi import APIRouter, HTTPException
from schemas import OCRRequest, OCRResponse
import os

router = APIRouter(prefix="/ocr", tags=["OCR"])

ocr_model = None

@router.post("", response_model=OCRResponse)
async def extract_text_from_image(request: OCRRequest):
    if ocr_model is None:
        raise HTTPException(
            status_code=503,
            detail="OCR model not initialized"
        )

    if not os.path.exists(request.file_path):
        raise HTTPException(
            status_code=404,
            detail=f"Image file not found: {request.file_path}"
        )

    try:
        text, metadata = ocr_model.extract_text(
            request.file_path,
            language=request.language
        )

        return OCRResponse(
            text=text,
            metadata=metadata
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"OCR failed: {str(e)}"
        )