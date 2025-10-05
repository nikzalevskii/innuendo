# 🏗️ System Design

## Архитектура системы

┌─────────────────┐
│ Frontend │
│ Next.js 15 │ ← Пользовательский интерфейс
│ React 19 │
└────────┬────────┘
│ HTTP/REST
↓
┌─────────────────┐
│ Backend API │
│ NestJS │ ← Бизнес-логика, CRUD операции
│ Prisma ORM │
└────────┬────────┘
│
↓
┌─────────────────┐
│ PostgreSQL │ ← Основное хранилище данных
│ Database │
└─────────────────┘
(Будущее расширение):
Backend API ←→ ML Service (Python/FastAPI)
↓
Vector Database

## Модули системы

### 1. Frontend (packages/frontend/)

**Ответственность:** Пользовательский интерфейс

- Отображение заметок
- Формы создания/редактирования
- Навигация между страницами

### 2. Backend API (services/api/)

**Ответственность:** Бизнес-логика и доступ к данным

- REST API endpoints
- Валидация входных данных
- Работа с базой через Prisma

### 3. Database (PostgreSQL)

**Ответственность:** Хранение данных

- Заметки (notes)
- Пользователи (users) - planned
- Векторные представления (embeddings) - planned

### 4. ML Service (services/ml-service/) - PLANNED

**Ответственность:** AI обработка

- Создание embeddings (Sentence Transformers)
- Транскрипция аудио (Whisper)
- Извлечение сущностей (spaCy)

## Паттерны проектирования

### Frontend

- **Component Pattern** - переиспользуемые UI компоненты
- **Custom Hooks Pattern** - инкапсуляция логики
- **Compound Components** - сложные составные компоненты

### Backend

- **Module Pattern (NestJS)** - модульная архитектура
- **Service Layer Pattern** - бизнес-логика в сервисах
- **Repository Pattern** - доступ к данным через Prisma

## Принципы разработки

1. **Separation of Concerns** - разделение ответственности
2. **DRY (Don't Repeat Yourself)** - избегаем дублирования
3. **SOLID принципы** - чистая архитектура
4. **Type Safety** - строгая типизация везде
