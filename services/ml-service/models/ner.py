import spacy
from typing import List, Dict

class NERModel:
    ENTITY_TYPE_MAP = {
        "PERSON": "PERSON", 
        "ORG": "ORG",        
        "GPE": "LOC",        
        "LOC": "LOC",        
        "DATE": "DATE",      
        "TIME": "TIME",      
        "MONEY": "MONEY",    
        "PERCENT": "PERCENT" 
    }
    
    def __init__(self, model_name: str = "en_core_web_sm"):
        print(f"[NER] Loading model: {model_name}")
        
        try:
            self.nlp = spacy.load(model_name)
        except OSError:
            print(f"[NER] Model {model_name} not found. Downloading...")
            import subprocess
            subprocess.run(["python", "-m", "spacy", "download", model_name])
            self.nlp = spacy.load(model_name)

        print(f"[NER] Model '{model_name}' loaded successfully")
        
    def extract_entities(self, text: str) -> List[Dict]:
        if not text or len(text.strip()) == 0:
            return []
        
        doc = self.nlp(text)

        entities = []
        
        for ent in doc.ents:
            if ent.label_ not in self.ENTITY_TYPE_MAP:
                continue

            entity = {
                "text": ent.text,
                "type": self.ENTITY_TYPE_MAP[ent.label_],
                "start_pos": ent.start_char,
                "end_pos": ent.end_char
            }

            entities.append(entity)
            
        print(f"[NER] Found entities: {len(entities)}")

        return entities