# Ulpan AI - System Architecture

## Overview

Ulpan AI is a full-stack web application for learning Hebrew from scratch, featuring AI-powered tutoring capabilities.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
│                  (Next.js Frontend)                      │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS/REST API
                     ↓
┌─────────────────────────────────────────────────────────┐
│                  Backend API Layer                       │
│                    (NestJS)                              │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │   Auth   │  │  Lessons │  │   Words  │             │
│  │  Module  │  │  Module  │  │  Module  │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Progress │  │   Tests  │  │    AI    │             │
│  │  Module  │  │  Module  │  │  Module  │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└────────┬──────────────┬──────────────┬─────────────────┘
         │              │              │
         ↓              ↓              ↓
┌─────────────┐  ┌──────────┐  ┌─────────────┐
│ PostgreSQL  │  │  Redis   │  │ Meilisearch │
│  Database   │  │  Cache   │  │   Search    │
└─────────────┘  └──────────┘  └─────────────┘
         │
         ↓
┌─────────────────────────────────────────────┐
│          External Services                   │
│  - OpenAI GPT-4 (AI Tutor)                  │
└─────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: Next.js App Router

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Runtime**: Node.js 18+
- **ORM**: Prisma
- **Authentication**: JWT + Passport
- **Validation**: class-validator

### Database & Storage
- **Primary Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Search Engine**: Meilisearch
- **File Storage**: Local (can be extended to S3)

### External APIs
- **AI**: OpenAI GPT-4

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: (Ready for GitHub Actions)

---

## Database Schema

### Core Tables

#### users
- User accounts and authentication
- Fields: id, email, passwordHash, firstName, lastName, interfaceLang

#### user_statistics
- Learning progress and statistics
- Fields: userId, completedLessons, learnedWords, currentStreak, totalStudyTime

#### letters
- Hebrew alphabet (22 letters)
- Fields: hebrew, name, transcription, pronunciation, exampleWord

#### words
- Vocabulary database
- Fields: hebrew, transcription, translationEn, translationRu, level, category

#### phrases
- Common Hebrew phrases
- Fields: hebrew, transcription, translationEn, translationRu, level, category

#### grammar
- Grammar rules and explanations
- Fields: title, contentEn, contentRu, examples, level

#### lessons
- Learning lessons (alphabet, vocabulary, phrases, grammar)
- Fields: title, type, level, contentJson, isPublished

#### progress
- User lesson completion tracking
- Fields: userId, lessonId, completed, score, timeSpent

#### flashcards
- SRS (Spaced Repetition System) flashcards
- Fields: userId, wordId, nextReview, interval, easeFactor, repetitions

#### tests
- Quizzes and assessments
- Fields: title, type, questionsJson, passingScore

#### test_results
- User test submissions
- Fields: userId, testId, score, answersJson, passed

#### ai_chats
- AI tutor conversation history
- Fields: userId, messages (JSON), context

---

## Module Architecture

### Backend Modules

#### 1. Auth Module
**Purpose**: User authentication and authorization

**Components**:
- `auth.service.ts` - JWT token generation, user validation
- `auth.controller.ts` - Login, register, refresh endpoints
- `jwt.strategy.ts` - JWT authentication strategy
- `jwt-auth.guard.ts` - Route protection

**Endpoints**:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`

#### 2. Users Module
**Purpose**: User profile management

**Components**:
- `users.service.ts` - CRUD operations for users
- `users.controller.ts` - Profile endpoints

**Endpoints**:
- `GET /api/users/me`
- `PUT /api/users/me`

#### 3. Lessons Module
**Purpose**: Lesson content management

**Components**:
- `lessons.service.ts` - Lesson retrieval and filtering
- `lessons.controller.ts` - Lesson endpoints

**Endpoints**:
- `GET /api/lessons`
- `GET /api/lessons/:id`
- `GET /api/lessons/type/:type`

#### 4. Words Module
**Purpose**: Vocabulary management

**Components**:
- `words.service.ts` - Word retrieval, search, random selection
- `words.controller.ts` - Word endpoints

**Endpoints**:
- `GET /api/words`
- `GET /api/words/:id`
- `GET /api/words/random/:count`

#### 5. Phrases Module
**Purpose**: Phrase management

**Components**:
- `phrases.service.ts` - Phrase retrieval and filtering
- `phrases.controller.ts` - Phrase endpoints

**Endpoints**:
- `GET /api/phrases`
- `GET /api/phrases/:id`

#### 6. Grammar Module
**Purpose**: Grammar rules management

**Components**:
- `grammar.service.ts` - Grammar rule retrieval
- `grammar.controller.ts` - Grammar endpoints

**Endpoints**:
- `GET /api/grammar`
- `GET /api/grammar/:id`

#### 7. Progress Module
**Purpose**: User learning progress tracking

**Components**:
- `progress.service.ts` - Progress tracking, SRS algorithm
- `progress.controller.ts` - Progress endpoints

**Key Features**:
- Lesson completion tracking
- SRS flashcard scheduling (SM-2 algorithm)
- Review intervals calculation

**Endpoints**:
- `GET /api/progress/me`
- `POST /api/progress/lesson/:lessonId`
- `GET /api/progress/flashcards/due`
- `POST /api/progress/flashcards/:wordId/review`

#### 8. Tests Module
**Purpose**: Quiz and test management

**Components**:
- `tests.service.ts` - Test retrieval, result submission
- `tests.controller.ts` - Test endpoints

**Endpoints**:
- `GET /api/tests`
- `GET /api/tests/:id`
- `POST /api/tests/:id/submit`

#### 9. AI Module
**Purpose**: AI-powered tutoring features

**Components**:
- `ai.service.ts` - OpenAI integration, chat management
- `ai.controller.ts` - AI endpoints

**Key Features**:
- Conversational AI tutor
- Word explanations
- Text correction
- Exercise generation

**Endpoints**:
- `POST /api/ai/chat`
- `POST /api/ai/explain`
- `POST /api/ai/correct`
- `POST /api/ai/exercises`

#### 10. Statistics Module
**Purpose**: Learning analytics and statistics

**Components**:
- `statistics.service.ts` - Stats calculation, streak tracking
- `statistics.controller.ts` - Statistics endpoints

**Key Features**:
- Study streaks
- Progress over time
- Test results history

**Endpoints**:
- `GET /api/statistics/me`
- `POST /api/statistics/streak`
- `POST /api/statistics/study-time`

---

## Frontend Architecture

### Page Structure

```
app/
├── page.tsx                    # Landing page
├── login/page.tsx              # Login page
├── register/page.tsx           # Registration page
├── dashboard/page.tsx          # Main dashboard
├── lessons/page.tsx            # Lessons list
├── flashcards/page.tsx         # SRS flashcards
├── ai-tutor/page.tsx           # AI chat interface
├── tests/page.tsx              # Tests list
└── statistics/page.tsx         # Progress statistics
```

### State Management (Zustand)

#### authStore
- User authentication state
- Login/logout actions
- Token management

#### lessonStore
- Lessons list
- Current lesson
- Lesson fetching

#### progressStore
- User progress
- Flashcard statistics
- Progress updates

### API Client

**Location**: `src/lib/api.ts`

**Features**:
- Axios instance with base URL
- Automatic JWT token injection
- Token refresh on 401
- Organized API methods by module

---

## Key Features Implementation

### 1. Spaced Repetition System (SRS)

**Algorithm**: SM-2 (SuperMemo 2)

**Implementation**: `backend/src/modules/progress/progress.service.ts`

**Flow**:
1. User reviews flashcard
2. User rates difficulty (0-5)
3. Algorithm calculates next review date
4. Ease factor and interval updated

**Formula**:
- If quality ≥ 3: interval increases
- If quality < 3: interval resets to 1 day
- Ease factor adjusts based on quality

### 2. AI Tutor

**Implementation**: `backend/src/modules/ai/ai.service.ts`

**Features**:
- Conversational chat with context
- Word explanations with examples
- Hebrew text correction
- Personalized exercise generation

**OpenAI Integration**:
- Model: GPT-4
- Temperature: 0.7 (chat), 0.3 (corrections)
- Max tokens: 300-600
- System prompt: Hebrew tutor persona

### 3. Multi-language Support

**Languages**: English, Russian

**Implementation**:
- Database: separate columns (titleEn, titleRu, translationEn, translationRu)
- Frontend: user.interfaceLang determines display language
- Backend: returns all language versions

### 4. RTL Support

**Implementation**: `frontend/src/app/globals.css`

**Features**:
- Hebrew text direction: RTL
- CSS class: `.hebrew-text`
- Automatic text alignment

---

## Security

### Authentication
- JWT tokens with expiration
- Refresh tokens for session extension
- Password hashing with bcrypt (10 rounds)

### Authorization
- JWT Auth Guard on protected routes
- User ID extraction from token
- Role-based access (future enhancement)

### API Security
- CORS configuration
- Rate limiting (Throttler)
- Input validation (class-validator)
- SQL injection prevention (Prisma)

---

## Performance Optimizations

### Backend
- Redis caching for frequent queries
- Database indexing on foreign keys
- Prisma query optimization
- Connection pooling

### Frontend
- Next.js SSR/SSG
- Code splitting
- Image optimization
- Lazy loading

### Database
- Indexed columns: email, hebrew, userId
- Efficient queries with Prisma
- Connection pooling

---

## Scalability Considerations

### Horizontal Scaling
- Stateless backend (JWT)
- Redis for shared sessions
- Load balancer ready

### Vertical Scaling
- Database connection pooling
- Caching layer (Redis)
- CDN for static assets

### Future Enhancements
- Microservices architecture
- Message queue (RabbitMQ/Kafka)
- Separate AI service
- CDN for media files

---

## Deployment

### Docker Compose
- Single command deployment
- Service orchestration
- Volume persistence
- Health checks

### Production Considerations
- Environment variables
- SSL/TLS certificates
- Database backups
- Monitoring and logging
- CI/CD pipeline

---

## Testing Strategy

### Backend
- Unit tests (Jest)
- Integration tests
- E2E tests
- API endpoint tests

### Frontend
- Component tests (React Testing Library)
- Integration tests
- E2E tests (Playwright/Cypress)

---

## Monitoring & Logging

### Backend Logging
- Prisma query logging
- Error logging
- Request/response logging

### Frontend Logging
- Error boundaries
- Console logging (development)
- Analytics (production)

---

## Future Roadmap

### Phase 1 (MVP) - Current
- ✅ Core learning features
- ✅ AI tutor
- ✅ SRS flashcards
- ✅ Progress tracking

### Phase 2
- Mobile app (React Native)
- Voice recognition
- Advanced analytics
- Social features

### Phase 3
- Gamification
- Live lessons
- Community features
- Premium subscriptions

---

## License

MIT
