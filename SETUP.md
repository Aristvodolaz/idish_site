# Ulpan AI - Setup Guide

## Quick Start with Docker

### Prerequisites
- Docker Desktop installed
- OpenAI API key (for AI features)

### Steps

1. **Clone or navigate to the project directory**
```bash
cd ulpan-ai
```

2. **Create environment file**
```bash
cp .env.example .env
```

3. **Add your OpenAI API key to `.env`**
```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

4. **Start all services**
```bash
docker-compose up
```

This will start:
- PostgreSQL database (port 5432)
- Redis cache (port 6379)
- Meilisearch (port 7700)
- Backend API (port 4000)
- Frontend (port 3010)

5. **Access the application**
- Frontend: http://localhost:3010
- Backend API: http://localhost:4000/api
- Meilisearch: http://localhost:7700

### First Time Setup

The database will be automatically:
- Migrated with Prisma
- Seeded with initial data:
  - 22 Hebrew alphabet letters
  - 100+ vocabulary words
  - 50+ common phrases
  - Grammar rules
  - Sample lessons
  - Tests

### О предупреждениях npm при сборке Docker

При первой сборке (`docker-compose up`) вы можете увидеть сообщения вида:
- `npm warn deprecated rimraf@3.0.2`  
- `npm warn deprecated glob@7.2.3`  
- `npm warn deprecated eslint@8.57.1`  
и т.п.

Это **предупреждения** об устаревших транзитивных зависимостях (зависимостях зависимостей). Они **не мешают** сборке и работе приложения. Контейнеры должны успешно подняться. Игнорировать их безопасно; при желании часть предупреждений можно уменьшить позже обновлением зависимостей в `package.json`.

---

## Manual Setup (Without Docker)

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup PostgreSQL**
- Install PostgreSQL 15+
- Create database: `ulpan_ai`

4. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env` with your database credentials and API keys.

5. **Run migrations and seed**
```bash
npx prisma migrate dev
npx prisma db seed
```

6. **Start backend**
```bash
npm run start:dev
```

Backend will run on http://localhost:4000

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.local.example .env.local
```

4. **Start frontend**
```bash
npm run dev
```

Frontend will run on http://localhost:3010

---

## Database Schema

### Main Tables
- **users** - User accounts
- **user_statistics** - Learning statistics
- **letters** - Hebrew alphabet (22 letters)
- **words** - Vocabulary words
- **phrases** - Common phrases
- **grammar** - Grammar rules
- **lessons** - Learning lessons
- **progress** - User lesson progress
- **flashcards** - SRS flashcards
- **tests** - Quizzes and tests
- **test_results** - User test results
- **ai_chats** - AI tutor chat history

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile

### Lessons
- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:id` - Get lesson by ID
- `GET /api/lessons/type/:type` - Get lessons by type

### Words
- `GET /api/words` - Get all words
- `GET /api/words/:id` - Get word by ID
- `GET /api/words/random/:count` - Get random words

### Phrases
- `GET /api/phrases` - Get all phrases
- `GET /api/phrases/:id` - Get phrase by ID

### Grammar
- `GET /api/grammar` - Get all grammar rules
- `GET /api/grammar/:id` - Get grammar by ID

### Progress
- `GET /api/progress/me` - Get user progress
- `POST /api/progress/lesson/:lessonId` - Update lesson progress
- `GET /api/progress/flashcards/due` - Get due flashcards
- `POST /api/progress/flashcards/:wordId/review` - Review flashcard

### Tests
- `GET /api/tests` - Get all tests
- `GET /api/tests/:id` - Get test by ID
- `POST /api/tests/:id/submit` - Submit test result

### AI
- `POST /api/ai/chat` - Chat with AI tutor
- `POST /api/ai/explain` - Explain Hebrew word
- `POST /api/ai/correct` - Correct Hebrew text
- `POST /api/ai/exercises` - Generate practice exercises

### Statistics
- `GET /api/statistics/me` - Get user statistics
- `POST /api/statistics/streak` - Update study streak
- `POST /api/statistics/study-time` - Add study time

---

## Tech Stack

### Backend
- **NestJS** - Node.js framework
- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - Database
- **Redis** - Caching
- **Meilisearch** - Search engine
- **JWT** - Authentication
- **OpenAI API** - AI features

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client

---

## Features

### Core Learning Features
1. **Alphabet Learning** - Learn 22 Hebrew letters
2. **Vocabulary** - Build word bank with translations
3. **Phrases** - Common Hebrew phrases
4. **Grammar** - Grammar rules and explanations
5. **Flashcards** - SRS (Spaced Repetition System)
6. **Tests** - Knowledge assessment
7. **Progress Tracking** - Statistics and streaks

### AI Features
1. **AI Tutor Chat** - Ask questions, get explanations
2. **Word Explanations** - Detailed word breakdowns
3. **Text Correction** - Hebrew text error correction
4. **Exercise Generation** - AI-generated practice

### UI Features
- RTL support for Hebrew text
- Mobile-friendly responsive design
- Duolingo-inspired UI
- Multi-language interface (English, Russian)

---

## Development

### Backend Development
```bash
cd backend
npm run start:dev  # Hot reload
npm run build      # Production build
npm run test       # Run tests
npx prisma studio  # Database GUI
```

### Frontend Development
```bash
cd frontend
npm run dev        # Development server
npm run build      # Production build
npm run lint       # Lint code
```

---

## Production Deployment

### Environment Variables
Set these in production:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Strong random secret
- `JWT_REFRESH_SECRET` - Strong random secret
- `OPENAI_API_KEY` - OpenAI API key
- `REDIS_HOST` - Redis host
- `MEILISEARCH_HOST` - Meilisearch host

### Build Commands
```bash
# Backend
cd backend
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
npm run start
```

---

## Troubleshooting

### Database Connection Issues
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Run `npx prisma migrate dev`

### Frontend Can't Connect to Backend
- Check backend is running on port 4000
- Verify NEXT_PUBLIC_API_URL in .env.local
- Check CORS settings in backend

### AI Features Not Working
- Verify OPENAI_API_KEY is set
- Check API key has credits
- Review backend logs for errors

---

## Support

For issues or questions:
1. Check this documentation
2. Review backend/frontend logs
3. Check Docker container logs: `docker-compose logs`

---

## License

MIT
