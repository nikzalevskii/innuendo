# 🛠️ Development Setup

## Требования

- **Node.js:** >= 18.x
- **Yarn:** >= 1.22.x
- **Docker:** >= 20.x (для PostgreSQL)
- **PostgreSQL:** >= 14.x

## Установка

### 1. Клонирование репозитория

```bash
git clone <repo-url>
cd innuendo
```

### 2. Установка зависимостей

```bash
yarn install
```

### 3. Запуск базы данных

```bash
docker-compose up -d postgres
```

### 4. Настройка переменных окружения

```bash
# services/api/.env
DATABASE_URL="postgresql://user:password@localhost:5432/innuendo"
```

### 5. Миграция базы данных

```bash
cd services/api
yarn prisma migrate dev
```

### 6. Запуск сервисов

**Backend:**

```bash
cd services/api
yarn start:dev
```

**Frontend:**

```bash
cd packages/frontend
yarn dev
```

## Структура workspaces

```json
{
  "workspaces": ["packages/*", "services/*"]
}
```

## Полезные команды

```bash
# Установка зависимости в конкретный workspace
yarn workspace @innuendo/frontend add <package>
yarn workspace @innuendo/api add <package>

# Запуск команды во всех workspaces
yarn workspaces run build
yarn workspaces run test

# Prisma команды
yarn workspace @innuendo/api prisma generate
yarn workspace @innuendo/api prisma studio
```
