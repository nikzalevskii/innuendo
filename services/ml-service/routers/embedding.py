from fastapi import APIRouter, HTTPException
from schemas import EmbedRequest, EmbedResponse

router = APIRouter(prefix="/embed", tags=["Embeddings"])

embedding_model = None
@router.post("", response_model=EmbedResponse)
async def create_embedding(request: EmbedRequest):    
    if embedding_model is None:
        raise HTTPException(
            status_code=503,
            detail="Embedding model not initialized"
        )

    try:
        vector = embedding_model.encode_single(request.text)

        return EmbedResponse(
            vector=vector,
            dimension=embedding_model.dimension,
            model="all-MiniLM-L6-v2"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Embedding failed: {str(e)}"
        )
    