from fastapi import APIRouter, HTTPException
from schemas import NERRequest, NERResponse

router = APIRouter(prefix="/ner", tags=["NER"])

ner_model = None

@router.post("", response_model=NERResponse)
async def extract_entities(request: NERRequest):
    if ner_model is None:
        raise HTTPException(
            status_code=503,
            detail="NER model not initialized"
        )

    try:
        entities = ner_model.extract_entities(request.text)

        return NERResponse(
            entities=entities,
            count=len(entities)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"NER extraction failed: {str(e)}"
        )