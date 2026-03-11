# 🇮🇱 Ulpan AI - Платформа для Изучения Иврита

> AI-платформа для изучения иврита с нуля до разговорного уровня

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com/)

> **🆕 ОБНОВЛЕНИЕ:** Полностью русский интерфейс + 250+ слов + интерактивное обучение!

---

## 🎯 Обзор

**Ulpan AI** - современная full-stack платформа для изучения иврита с AI-репетитором. Учите иврит от начального до разговорного уровня с персональной помощью AI, умными карточками и комплексными уроками.

### ✨ Ключевые Возможности

- 🤖 **AI Репетитор** - учитель иврита на базе GPT-4
- 🎴 **Умные Карточки** - алгоритм интервальных повторений (SM-2)
- 📚 **Богатый Контент** - 250+ слов, 48+ фраз, грамматика
- 📊 **Отслеживание Прогресса** - статистика и серии дней
- 🌍 **Русский Интерфейс** - полностью на русском языке
- 🎨 **Красивый UI** - дизайн в стиле Duolingo
- 🚀 **Готов к Продакшену** - развёртывание через Docker
- ✨ **Интерактивное Обучение** - новая страница с карточками

---

## 🚀 Быстрый Старт

### Требования
- Docker Desktop
- OpenAI API ключ ([Получить здесь](https://platform.openai.com/api-keys))

### Установка

```bash
# 1. Настройка окружения
cp .env.example .env
# Добавьте ваш OPENAI_API_KEY в .env

# 2. Запуск всех сервисов
docker-compose up

# 3. Откройте приложение
# Frontend: http://localhost:3000
# Backend: http://localhost:4000/api
```

**Готово!** База данных автоматически мигрирует и заполнится данными.

### 🆕 Новое: Расширенный Контент

Для добавления 200+ дополнительных слов:

```bash
docker exec -it ulpan-backend sh
npm run prisma:seed:extended
exit
```

📖 **Подробнее:** См. `QUICKSTART_RU.md` и `FINAL_REPORT.md`

For detailed instructions, see [QUICKSTART.md](QUICKSTART.md)

---

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP.md](SETUP.md)** - Detailed setup guide
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete overview

---

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (React 18)
- TypeScript
- Tailwind CSS
- Zustand

### Backend
- NestJS
- PostgreSQL + Prisma
- Redis + Meilisearch
- JWT Authentication

### AI
- OpenAI GPT-4

---

## 📁 Project Structure

```
ulpan-ai/
├── backend/          # NestJS API (10 modules)
│   ├── src/modules/  # Auth, Users, Lessons, AI, etc.
│   └── prisma/       # Database schema & seed
├── frontend/         # Next.js App
│   └── src/app/      # Pages & components
├── docker/           # Docker configs
└── docker-compose.yml
```

---

## 🎓 Features

### Core Learning
- ✅ Hebrew Alphabet (22 letters)
- ✅ Vocabulary (100+ words)
- ✅ Common Phrases (50+ phrases)
- ✅ Grammar Lessons
- ✅ Tests & Quizzes

### Advanced
- ✅ AI Tutor (chat, explain, correct)
- ✅ SRS Flashcards (smart scheduling)
- ✅ Progress Tracking (streaks, stats)
- ✅ Multi-language (EN/RU)
- ✅ RTL Support for Hebrew

---

## 💻 Development

### Backend
```bash
cd backend
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Database GUI
```bash
cd backend
npx prisma studio
```

---

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Content
- `GET /api/lessons` - Get lessons
- `GET /api/words` - Get vocabulary
- `GET /api/phrases` - Get phrases

### Learning
- `POST /api/progress/lesson/:id` - Update progress
- `POST /api/progress/flashcards/:id/review` - Review card

### AI
- `POST /api/ai/chat` - Chat with tutor
- `POST /api/ai/explain` - Explain word
- `POST /api/ai/correct` - Correct text

See [ARCHITECTURE.md](ARCHITECTURE.md) for complete API reference.

---

## 🗄️ Database

### Tables
- users, user_statistics
- letters, words, phrases, grammar
- lessons, progress, flashcards
- tests, test_results
- ai_chats

### Seeded Data
- 22 Hebrew letters
- 100+ vocabulary words
- 50+ common phrases
- Grammar lessons
- Sample lessons & tests

---

## 🚀 Deployment

### Docker (Recommended)
```bash
docker-compose up -d
```

### Manual
```bash
# Backend
cd backend && npm run build && npm run start:prod

# Frontend
cd frontend && npm run build && npm run start
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📄 License

MIT License - Free to use and modify

---

## 🌟 Highlights

- **Production Ready** - Docker, TypeScript, tests
- **Scalable** - Modular architecture, Redis cache
- **Secure** - JWT auth, input validation
- **Modern** - Latest Next.js & NestJS
- **Documented** - Comprehensive docs

---

## 🎯 Roadmap

### Phase 1 - MVP ✅
- [x] Core features
- [x] AI tutor
- [x] SRS flashcards
- [x] Docker deployment

### Phase 2
- [ ] Mobile app
- [ ] Voice recognition
- [ ] Social features

---

## 📞 Support

- Check [QUICKSTART.md](QUICKSTART.md) for setup help
- Review [SETUP.md](SETUP.md) for troubleshooting
- Read [ARCHITECTURE.md](ARCHITECTURE.md) for technical details

---

## 👨‍💻 Author

Built by Principal Software Architect & AI Product Designer

---

## 🎉 Ready to Learn Hebrew?

```bash
docker-compose up
```

Open http://localhost:3000 and start your journey!

**שלום! (Shalom!)** 🇮🇱
# idish_site
