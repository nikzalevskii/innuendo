# Innuendo - Multimodal Personal Knowledge Graph

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
- 🔧 **PgAdmin:** http://localhost:5050 (Database management)

## 🏗️ Project Structure

<details>
<summary>Expand project structure</summary>

```bash
innuendo/
├── .github/                  # GitHub Actions workflows
│   └── workflows/            # CI/CD pipeline configurations
├── docs/                     # Project documentation
│   ├── architecture/         # System design & architecture docs
│   │   ├── system-design.md
│   ├── development/          # Development setup & guidelines
│   │   ├── setup.md
│   │   ├── contributing.md
│   │   └── testing.md
│   ├── deployment/           # Deployment & infrastructure docs
│   │   ├── docker.md
│   │   ├── production.md
│   │   └── ci-cd.md
│   └── user-guide/           # User documentation & guides
│       ├── getting-started.md
│       ├── features.md
│       └── faq.md
├── infra/                    # Infrastructure configs
│   ├── database/             # DB init scripts
│   └── docker/               # Dockerfiles & compose profiles
├── packages/                 # Frontend & shared packages
│   ├── frontend/             # Next.js 15 application
│   │   ├── src/
│   │   │   ├── app/          # App Router pages
│   │   │   ├── components/   # React components
│   │   │   ├── lib/          # Utility functions
│   │   │   └── types/        # Local TypeScript defs
│   │   ├── public/           # Static assets
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   └── shared/               # Shared types & utilities
│       ├── src/
│       │   ├── types/        # Shared TS interfaces
│       │   └── utils/        # Shared helper funcs
│       ├── dist/             # Compiled output
│       ├── package.json
│       └── tsconfig.json
├── services/                 # Backend services
│   ├── api/                  # NestJS backend API
│   │   ├── src/
│   │   │   ├── modules/      # Feature modules
│   │   │   ├── common/       # Shared services & utils
│   │   │   ├── config/       # Config files
│   │   │   └── main.ts       # Application entry
│   │   ├── test/             # Test files
│   │   ├── package.json
│   │   ├── nest-cli.json
│   │   └── tsconfig.json
│   └── ml-service/           # Python ML service (future)
│       ├── src/
│       ├── requirements.txt
│       └── Dockerfile
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── docker-compose.yml        # Docker services configuration
├── package.json              # Monorepo root config
├── README.md                 # Project documentation
└── yarn.lock                 # Dependency lock file
```

</details>

## 🎯 Features

- 📝 **Multimodal Notes:** Text, voice recordings, and images
- 🧠 **AI Processing:** Whisper (ASR), Tesseract (OCR)
- 🔍 **Semantic Search:** Vector embeddings + similarity search
- 📊 **Knowledge Graph:** Visual representation of note connections
- ⚡ **Real-time Updates:** WebSocket synchronization
- 🎨 **Modern UI:** Responsive design with dark/light themes
- 🔐 **Secure:** JWT authentication and data validation

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15 with App Router
- **UI Library:** React 19 with TypeScript
- **Styling:** Tailwind CSS 4 + Shadcn/ui components
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React

### Backend

- **Framework:** NestJS with TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Cache:** Redis for sessions and caching
- **Queue:** BullMQ for background jobs
- **Validation:** class-validator + class-transformer

### AI/ML

- **Speech-to-Text:** OpenAI Whisper
- **OCR:** Tesseract.js
- **Embeddings:** Sentence Transformers
- **Vector Search:** FAISS/Milvus/Weaviate
- **NLP:** spaCy for entity extraction

### DevOps

- **Containerization:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Monorepo:** Yarn Workspaces
- **Code Quality:** ESLint, Prettier, TypeScript

## 📋 Prerequisites

- **Node.js:** 18.0.0 or higher
- **Yarn:** 1.22.0 or higher
- **Docker:** Latest version with Docker Compose
- **Git:** For version control

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nikzalevskii/innuendo
cd innuendo
```

### 2. Install Dependencies

```bash
# Install all workspace dependencies
yarn install
```

### 3. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configurations
# DATABASE_URL, REDIS_URL, API keys, etc.
```

### 4. Start Infrastructure

```bash
# Start PostgreSQL and Redis
yarn dev:db

# Optional: Start PgAdmin for database management
docker compose --profile tools up -d pgadmin
```

### 5. Build Shared Package

```bash
# Build shared types and utilities
yarn workspace @innuendo/shared build
```

### 6. Start Development

```bash
# Start all services
yarn dev

# Or start services individually:
yarn dev:frontend  # Next.js frontend only
yarn dev:api      # NestJS backend only
```

## 📝 Development Scripts

```bash
# Development
yarn dev              # Start all services
yarn dev:frontend     # Frontend only
yarn dev:api         # Backend only
yarn dev:db          # Database services only

# Building
yarn build           # Build all packages
yarn workspace @innuendo/frontend build
yarn workspace @innuendo/api build
yarn workspace @innuendo/shared build

# Testing
yarn test            # Run all tests
yarn test:frontend   # Frontend tests only
yarn test:api       # Backend tests only

# Code Quality
yarn lint           # Lint all packages
yarn lint:fix       # Fix linting issues
yarn format         # Format code with Prettier
yarn type-check     # TypeScript type checking

# Docker
yarn docker:up      # Start all services with Docker
yarn docker:down    # Stop all Docker services
yarn docker:logs    # View Docker logs

# Utilities
yarn clean          # Clean all build artifacts
yarn install:all    # Reinstall all dependencies
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://innuendo_user:innuendo_pass@localhost:5432/innuendo"
POSTGRES_DB=innuendo
POSTGRES_USER=innuendo_user
POSTGRES_PASSWORD=innuendo_pass

# Redis Configuration
REDIS_URL="redis://localhost:6379"
REDIS_HOST=localhost
REDIS_PORT=6379

# Application Configuration
NODE_ENV=development
API_PORT=3001
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:3001

# File Upload Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,audio/wav,audio/mp3

# JWT Configuration (add when implementing auth)
# JWT_SECRET=your-super-secret-jwt-key
# JWT_EXPIRES_IN=7d

# ML Service Configuration (add when implementing)
# ML_SERVICE_URL=http://localhost:8000
# OPENAI_API_KEY=your-openai-api-key

# Vector Database Configuration (add when implementing)
# VECTOR_DB_URL=http://localhost:19530
# VECTOR_DB_COLLECTION=notes_embeddings
```

## 🧪 Testing

### Running Tests

```bash
# All tests
yarn test

# Specific package tests
yarn workspace @innuendo/frontend test
yarn workspace @innuendo/api test

# Watch mode
yarn workspace @innuendo/frontend test:watch
yarn workspace @innuendo/api test:watch

# Coverage
yarn workspace @innuendo/api test:cov
```

### Test Structure

- **Unit Tests:** Individual component/service testing
- **Integration Tests:** API endpoint testing
- **E2E Tests:** Full user workflow testing

## 🐳 Docker Deployment

### Development

```bash
# Start all services
yarn docker:up

# View logs
yarn docker:logs

# Stop services
yarn docker:down
```

### Production

```bash
# Build production images
docker compose -f docker-compose.prod.yml build

# Deploy to production
docker compose -f docker-compose.prod.yml up -d
```

## 📚 API Documentation

### Notes API

```bash
GET    /api/notes           # Get all notes
POST   /api/notes           # Create new note
GET    /api/notes/:id       # Get specific note
PUT    /api/notes/:id       # Update note
DELETE /api/notes/:id       # Delete note
```

### Search API

```bash
GET    /api/search?q=query          # Text search
POST   /api/search/semantic         # Semantic search
GET    /api/search/similar/:id      # Find similar notes
```

### Upload API

```bash
POST   /api/upload/image            # Upload image for OCR
POST   /api/upload/audio            # Upload audio for transcription
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow **TypeScript** best practices
- Write **tests** for new features
- Use **conventional commits**
- Update **documentation** when needed
- Follow **ESLint** and **Prettier** configurations

## 📖 Documentation

Detailed documentation is available in the `docs/` directory:

- **Architecture:** System design and technical decisions
- **Development:** Setup guides and coding standards
- **Deployment:** Production deployment instructions
- **User Guide:** Feature documentation and tutorials

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Check what's using the port
lsof -i :3000
lsof -i :3001

# Kill the process
kill -9 <PID>
```

**Docker issues:**

```bash
# Reset Docker environment
yarn docker:down
docker system prune -f
yarn docker:up
```

**Yarn workspace issues:**

```bash
# Clean and reinstall
yarn clean
yarn install
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nikita Zalevskii**

- Email: nik.zalevskii@gmail.com
- GitHub: [@nikzalevskii](https://github.com/nikzalevskii)

## 🙏 Acknowledgments

- **OpenAI** for Whisper ASR technology
- **Tesseract** team for OCR capabilities
- **NestJS** and **Next.js** communities
- **Prisma** team for excellent ORM
- All open-source contributors

---

**Built with ❤️ for the future of personal knowledge management**
