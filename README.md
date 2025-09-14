# 🧠 Innuendo - Multimodal Knowledge Graph

AI-powered personal knowledge management system that transforms notes, voice recordings, and images into a searchable, interconnected knowledge graph.

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/nikzalevskii/innuendo
cd innuendo

# Install dependencies
yarn install

# Start infrastructure
yarn dev:db

# Start development servers
yarn dev
```

## 📊 Services

- 🌐 **Frontend:** http://localhost:3000 (Next.js + Tailwind)
- 🚀 **Backend:** http://localhost:3001 (NestJS + TypeScript)
- 🗄️ **Database:** localhost:5432 (PostgreSQL)
- 🔴 **Cache:** localhost:6379 (Redis)

## 🏗️ Project Structure

## �� Getting Started

### Prerequisites

- Node.js 18+
- Yarn 1.22+
- Docker & Docker Compose

### Installation

```bash
# Клонируем репозиторий
git clone https://github.com/nikzalevskii/innuendo
cd innuendo

# Устанавливаем зависимости
yarn install

# Запускаем базы данных
yarn dev:db

# Запускаем все сервисы
yarn dev
```

## 🎯 Features

- 📝 **Multimodal Notes:** Текст, голос, изображения
- �� **AI Processing:** Whisper (ASR), Tesseract (OCR)
- �� **Semantic Search:** Vector embeddings + similarity search
- 📊 **Knowledge Graph:** Визуализация связей между заметками
- �� **Real-time:** WebSocket обновления

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS, TypeScript
- **Backend:** NestJS, Prisma, PostgreSQL, Redis, TypeScript
- **AI/ML:** Whisper (ASR), Tesseract (OCR), Vector search
- **DevOps:** Docker Compose, Yarn Workspaces, GitHub Actions

## 📝 Development

```bash
yarn dev              # Start all services
yarn dev:frontend     # Frontend only
yarn dev:api         # Backend only
yarn dev:db          # Database only
yarn build           # Build all packages
yarn test            # Run all tests
```

```

---
```
