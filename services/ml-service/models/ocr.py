import pytesseract
from PIL import Image
from typing import Tuple, Dict
import os

class OCRModel:
    def __init__(self):
        try:
            version = pytesseract.get_tesseract_version()
            print(f"[OCR] Tesseract version: {version}")
        except Exception as e:
            print(f"[OCR] Error: Tesseract is not installed ({e})")
            raise
        
    def extract_text(
        self,
        image_path: str,
        language: str = "eng+rus"
    ) -> Tuple[str, Dict]:
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"File not found: {image_path}")
        
        print(f"[OCR] Processing: {image_path}")
        
        image = Image.open(image_path)
        
        width, height = image.size
        format_type = image.format
        
        config = "--psm 1 --oem 3"
        
        text = pytesseract.image_to_string(
            image,
            lang=language,
            config=config
        ).strip()
        
        data = pytesseract.image_to_data(
            image,
            lang=language,
            output_type=pytesseract.Output.DICT
        )
        
        confidences = [
            int(conf) for conf in data['conf']
            if conf != '-1'
        ]
        
        avg_confidence = (
            sum(confidences) / len(confidences)
            if confidences else 0
        )
        
        metadata = {
            "image_width": width,
            "image_height": height,
            "format": format_type,
            "language": language,
            "confidence": round(avg_confidence, 2),
            "words_detected": len([w for w in data['text'] if w.strip()])
        }
        
        print(f"[OCR] Done. Words: {metadata['words_detected']}, "
              f"Confidence: {metadata['confidence']}%")

        return text, metadata