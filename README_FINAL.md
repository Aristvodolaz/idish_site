# 🇮🇱 Ulpan AI - Hebrew Learning Platform

> AI-powered platform for learning Hebrew from scratch to conversational level

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com/)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Screenshots](#screenshots)
- [API Reference](#api-reference)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Ulpan AI** is a modern, AI-powered Hebrew learning platform designed to help users learn Hebrew from absolute beginner to conversational level. Inspired by Duolingo and Memrise, but with a unique AI tutor that provides personalized help, explanations, and corrections.

### Why Ulpan AI?

- 🤖 **AI-Powered Tutor**: Get instant help from GPT-4 powered Hebrew teacher
- 📚 **Comprehensive Content**: Alphabet, vocabulary, phrases, grammar
- 🔄 **Smart Repetition**: SRS algorithm for optimal memory retention
- 🌍 **Multi-language**: Interface in English and Russian
- 📊 **Progress Tracking**: Detailed statistics and learning analytics
- 🎨 **Beautiful UI**: Clean, modern, Duolingo-inspired design
- 🚀 **Production Ready**: Docker deployment, scalable architecture

---

## ✨ Features

### Core Learning Features

#### 🔤 Hebrew Alphabet
- Learn all 22 Hebrew letters
- Pronunciation guides
- Example words for each letter
- Interactive lessons

#### 📚 Vocabulary Builder
- 100+ pre-loaded words
- Categorized by topic (family, food, house, etc.)
- Multiple difficulty levels
- Audio pronunciation (ready for integration)
- Example sentences

#### 💬 Common Phrases
- 50+ essential Hebrew phrases
- Greetings, questions, daily conversations
- Context and usage explanations
- Pronunciation guides

#### 📖 Grammar Lessons
- Hebrew grammar rules
- Clear explanations in EN/RU
- Examples and exercises
- Progressive difficulty

### Advanced Features

#### 🤖 AI Tutor
- Chat with GPT-4 powered Hebrew teacher
- Ask any question about Hebrew
- Get word explanations
- Hebrew text correction
- Personalized exercise generation
- Context-aware responses

#### 🎴 SRS Flashcards
- Spaced Repetition System (SM-2 algorithm)
- Smart scheduling based on your performance
- Four difficulty levels: Again, Hard, Good, Easy
- Track learned words
- Daily review reminders

#### ✅ Tests & Quizzes
- Multiple choice questions
- Fill-in-the-blank exercises
- Listening comprehension (ready)
- Speaking practice (ready)
- Instant feedback
- Score tracking

#### 📊 Statistics & Analytics
- Study streaks tracking
- Total study time
- Words learned
- Lessons completed
- Test scores history
- Progress over time charts

### User Experience

#### 🌍 Multi-language Support
- Interface in English and Russian
- All content translated
- User can choose preferred language

#### 📱 Responsive Design
- Mobile-first approach
- Works on all devices
- Touch-friendly interface

#### ↔️ RTL Support
- Proper Hebrew text direction
- Right-to-left layout for Hebrew
- Seamless language switching

---

## 🚀 Quick Start

### Prerequisites

- Docker Desktop
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ulpan-ai
```

2. **Setup environment**
```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

3. **Start the application**
```bash
docker-compose up
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api

That's it! The database will be automatically migrated and seeded with initial content.

### First Steps

1. Open http://localhost:3000
2. Click "Get Started Free"
3. Create your account
4. Start learning Hebrew!

For more detailed instructions, see [QUICKSTART.md](QUICKSTART.md)

---

## 🛠️ Tech Stack

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
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Cache**: Redis 7
- **Search**: Meilisearch
- **Authentication**: JWT + Passport

### AI & External Services
- **AI Model**: OpenAI GPT-4

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: Ready for GitHub Actions

---

## 📁 Project Structure

```
ulpan-ai/
├── backend/                    # NestJS Backend API
│   ├── src/
│   │   ├── modules/           # Feature modules
│   │   │   ├── auth/          # Authentication & JWT
│   │   │   ├── users/         # User management
│   │   │   ├── lessons/       # Lesson content
│   │   │   ├── words/         # Vocabulary
│   │   │   ├── phrases/       # Common phrases
│   │   │   ├── grammar/       # Grammar rules
│   │   │   ├── tests/         # Quizzes & tests
│   │   │   ├── progress/      # Progress & SRS
│   │   │   ├── ai/            # AI Tutor
│   │   │   └── statistics/    # Analytics
│   │   ├── prisma/
│   │   │   ├── schema.prisma  # Database schema
│   │   │   └── seed.ts        # Seed data
│   │   ├── common/            # Shared utilities
│   │   ├── config/            # Configuration
│   │   └── main.ts            # Entry point
│   └── package.json
│
├── frontend/                   # Next.js Frontend
│   ├── src/
│   │   ├── app/               # Pages (App Router)
│   │   │   ├── page.tsx       # Landing page
│   │   │   ├── login/         # Login page
│   │   │   ├── register/      # Registration
│   │   │   ├── dashboard/     # Main dashboard
│   │   │   ├── lessons/       # Lessons browser
│   │   │   ├── flashcards/    # SRS flashcards
│   │   │   ├── ai-tutor/      # AI chat
│   │   │   ├── tests/         # Tests
│   │   │   └── statistics/    # Progress stats
│   │   ├── components/        # React components
│   │   ├── lib/
│   │   │   ├── api.ts         # API client
│   │   │   └── utils.ts       # Utilities
│   │   ├── store/             # Zustand stores
│   │   │   ├── authStore.ts
│   │   │   ├── lessonStore.ts
│   │   │   └── progressStore.ts
│   │   └── types/             # TypeScript types
│   └── package.json
│
├── docker/                     # Docker configurations
│   ├── backend.Dockerfile
│   └── frontend.Dockerfile
│
├── docker-compose.yml          # Service orchestration
├── .env.example                # Environment template
├── README.md                   # This file
├── SETUP.md                    # Detailed setup guide
├── QUICKSTART.md               # Quick start guide
├── ARCHITECTURE.md             # System architecture
└── PROJECT_SUMMARY.md          # Project summary
```

---

## 📚 Documentation

- **[README.md](README.md)** - Project overview (this file)
- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and design
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project summary

---

## 🖼️ Screenshots

### Landing Page
Modern, clean landing page with feature highlights

### Dashboard
Central hub for all learning activities with progress overview

### AI Tutor
Interactive chat interface with GPT-4 powered Hebrew teacher

### Flashcards
SRS flashcard system with smart scheduling

### Lessons
Browse and complete lessons by type and difficulty

---

## 🔌 API Reference

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "interfaceLang": "en"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Content

#### Get Lessons
```http
GET /api/lessons?type=vocabulary&level=1
Authorization: Bearer {token}
```

#### Get Words
```http
GET /api/words?category=family&level=1
Authorization: Bearer {token}
```

### Learning

#### Update Progress
```http
POST /api/progress/lesson/{lessonId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "completed": true,
  "score": 85,
  "timeSpent": 300
}
```

#### Review Flashcard
```http
POST /api/progress/flashcards/{wordId}/review
Authorization: Bearer {token}
Content-Type: application/json

{
  "quality": 4
}
```

### AI

#### Chat with AI Tutor
```http
POST /api/ai/chat
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "How do I say hello in Hebrew?",
  "context": "learning greetings"
}
```

For complete API documentation, see [ARCHITECTURE.md](ARCHITECTURE.md)

---

## 💻 Development

### Backend Development

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

Backend runs on http://localhost:4000

### Frontend Development

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with API URL
npm run dev
```

Frontend runs on http://localhost:3000

### Database Management

```bash
# Run migrations
npx prisma migrate dev

# Seed database
npx prisma db seed

# Open Prisma Studio (Database GUI)
npx prisma studio
```

### Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

---

## 🚀 Deployment

### Docker Deployment (Recommended)

```bash
# Production build
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Deployment

#### Backend
```bash
cd backend
npm run build
npm run start:prod
```

#### Frontend
```bash
cd frontend
npm run build
npm run start
```

### Environment Variables

**Backend** (`.env`):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/ulpan_ai
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
OPENAI_API_KEY=sk-your-api-key
REDIS_HOST=localhost
REDIS_PORT=6379
MEILISEARCH_HOST=http://localhost:7700
```

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- TypeScript strict mode
- ESLint + Prettier
- Conventional commits
- Clear variable names
- Comprehensive comments

### Testing

- Write unit tests for new features
- Ensure all tests pass
- Add integration tests where appropriate

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by Duolingo and Memrise
- Powered by OpenAI GPT-4
- Built with modern open-source technologies

---

## 📞 Support

### Getting Help

1. Check the [QUICKSTART.md](QUICKSTART.md) guide
2. Review [SETUP.md](SETUP.md) for detailed instructions
3. Read [ARCHITECTURE.md](ARCHITECTURE.md) for system design
4. Check existing issues
5. Create a new issue if needed

### Common Issues

**Port already in use**
```bash
docker-compose down
# Change ports in docker-compose.yml if needed
docker-compose up
```

**Database connection error**
```bash
docker-compose restart postgres
docker-compose logs postgres
```

**AI features not working**
- Verify OPENAI_API_KEY in `.env`
- Check API key has credits
- Review backend logs

---

## 🎯 Roadmap

### Phase 1 - MVP ✅ (Current)
- [x] Core learning features
- [x] AI tutor integration
- [x] SRS flashcard system
- [x] Progress tracking
- [x] Multi-language support
- [x] Docker deployment

### Phase 2 - Enhancement
- [ ] Mobile app (React Native)
- [ ] Voice recognition
- [ ] Advanced analytics
- [ ] Social features
- [ ] Gamification

### Phase 3 - Scale
- [ ] Live lessons
- [ ] Community features
- [ ] Premium subscriptions
- [ ] More languages
- [ ] Advanced AI features

---

## 📊 Stats

- **Lines of Code**: 10,000+
- **Files**: 100+
- **Modules**: 10
- **API Endpoints**: 30+
- **Database Tables**: 15
- **Pre-loaded Content**:
  - 22 Hebrew letters
  - 100+ vocabulary words
  - 50+ common phrases
  - Grammar lessons
  - Sample tests

---

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

---

## 👨‍💻 Author

**Principal Software Architect & AI Product Designer**

Built with ❤️ for Hebrew learners worldwide

---

## 🎉 Ready to Learn Hebrew?

```bash
docker-compose up
```

Open http://localhost:3000 and start your Hebrew learning journey!

**שלום! (Shalom!)** 🇮🇱
