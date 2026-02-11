from faster_whisper import WhisperModel
from typing import Optional, Tuple, Dict
import os

class WhisperASR:
    def __init__(self, model_size: str = "base"):
        print(f"[Whisper] Downloading model: {model_size}")
        self.model = WhisperModel(
            model_size,
            device="cpu",  
            compute_type="int8"
        )
        print(f"[Whisper] model '{model_size}' is loaded.")
        
    def transcribe(
        self,
        audio_path: str,
        language: Optional[str] = None
    ) -> Tuple[str, Dict]:
        if not os.path.exists(audio_path):
            raise FileNotFoundError(f"File not found: {audio_path}")

        print(f"[Whisper] Transcribbing: {audio_path}")
        
        segments, info = self.model.transcribe(
            audio_path,
            language=language,
            beam_size=5,
            vad_filter=True
        )
        
        text_parts = []
        segment_count = 0
        
        for segment in segments:
            text_parts.append(segment.text.strip())
            segment_count += 1

        full_text = " ".join(text_parts)
        
        metadata = {
            "language": info.language,
            "language_probability": round(info.language_probability, 2),
            "duration": round(info.duration, 2),
            "segments": segment_count
        }
        
        print(f"[Whisper] is ready. Language: {info.language}, "
              f"Duration: {metadata['duration']}s, "
              f"Segments: {segment_count}")

        return full_text, metadata