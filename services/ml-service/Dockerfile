FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-rus \
    tesseract-ocr-eng \
    ffmpeg \
    curl \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN python -m spacy download en_core_web_sm

COPY . .

RUN mkdir -p /app/uploads /app/models_cache

EXPOSE 8000

CMD ["python", "main.py"]