from sentence_transformers import SentenceTransformer
from typing import List
import numpy as np

class EmbeddingModel:
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        print(f"[Embeddings] Downloading model: {model_name}")
        self.model = SentenceTransformer(model_name)
        self.dimension = self.model.get_sentence_embedding_dimension()
        print(f"[Embeddings] Модель загружена. Размерность: {self.dimension}")
        
    def encode_single(self, text: str) -> List[float]:
        embedding = self.model.encode([text])[0]
        return embedding.tolist()
    
    def encode_batch(self, texts: List[str]) -> List[List[float]]:
        embeddings = self.model.encode(texts)
        return [emb.tolist() for emb in embeddings]
         