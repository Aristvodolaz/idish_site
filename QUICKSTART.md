# Ulpan AI - Quick Start Guide

## 🚀 Launch in 5 Minutes

### Prerequisites
- Docker Desktop installed and running
- OpenAI API key (get one at https://platform.openai.com/api-keys)

---

## Step 1: Setup Environment

Create `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

---

## Step 2: Start the Application

Run this single command:

```bash
docker-compose up
```

This will:
1. ✅ Start PostgreSQL database
2. ✅ Start Redis cache
3. ✅ Start Meilisearch
4. ✅ Build and start Backend API
5. ✅ Build and start Frontend
6. ✅ Run database migrations
7. ✅ Seed initial data

**First startup takes 3-5 minutes** (downloading images and building)

---

## Step 3: Access the Application

Once you see these logs:
```
ulpan-frontend  | ✓ Ready in 2.5s
ulpan-backend   | 🚀 Ulpan AI Backend running on http://localhost:4000
```

Open your browser:

**Frontend**: http://localhost:3000

**Backend API**: http://localhost:4000/api

---

## Step 4: Create Account

1. Click **"Get Started Free"**
2. Fill in registration form:
   - Email: your@email.com
   - Password: (min 6 characters)
   - First Name: (optional)
   - Interface Language: English or Русский
3. Click **"Create Account"**

You'll be automatically logged in and redirected to the dashboard!

---

## 🎯 What's Included

### Pre-seeded Data

The database comes with:
- ✅ **22 Hebrew alphabet letters** with pronunciation
- ✅ **50+ vocabulary words** (family, greetings, food, house, verbs)
- ✅ **18+ common phrases** (greetings, questions, daily life)
- ✅ **3 grammar lessons** (alphabet, gender, present tense)
- ✅ **Sample lessons** (alphabet, vocabulary)
- ✅ **1 test** (alphabet quiz)

### Features Ready to Use

1. **Alphabet Learning** - Learn 22 Hebrew letters
2. **Vocabulary** - Study words with translations
3. **Phrases** - Learn common expressions
4. **Grammar** - Understand Hebrew rules
5. **Flashcards** - SRS spaced repetition
6. **AI Tutor** - Chat with AI teacher
7. **Tests** - Quiz yourself
8. **Statistics** - Track your progress

---

## 📱 Quick Tour

### Dashboard
Your learning hub with:
- Study statistics
- Learning modules
- Quick access to all features

### AI Tutor
Ask questions like:
- "How do I say hello in Hebrew?"
- "Explain the Hebrew alphabet"
- "What's the difference between ב and ו?"
- "How do Hebrew verbs work?"

### Flashcards
- Review due words
- Rate difficulty: Again, Hard, Good, Easy
- Smart scheduling with SRS algorithm

### Lessons
- Browse by type: Alphabet, Vocabulary, Phrases, Grammar
- Track completion
- Earn scores

---

## 🛠️ Troubleshooting

### Port Already in Use

If you see "port already allocated" error:

**Option 1**: Stop conflicting services
```bash
# Check what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :4000
netstat -ano | findstr :5432

# Kill the process (Windows)
taskkill /PID <process-id> /F
```

**Option 2**: Change ports in `docker-compose.yml`

### Database Connection Error

```bash
# Restart just the database
docker-compose restart postgres

# Check database logs
docker-compose logs postgres
```

### Frontend Can't Connect to Backend

1. Check backend is running: http://localhost:4000/api
2. Check CORS settings in `backend/.env`
3. Restart frontend: `docker-compose restart frontend`

### AI Features Not Working

1. Verify OpenAI API key in `.env`
2. Check API key has credits
3. Check backend logs: `docker-compose logs backend`

---

## 🔄 Common Commands

### Stop All Services
```bash
docker-compose down
```

### Restart Services
```bash
docker-compose restart
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend

# Follow logs
docker-compose logs -f backend
```

### Rebuild After Code Changes
```bash
docker-compose down
docker-compose up --build
```

### Reset Database
```bash
docker-compose down -v  # Remove volumes
docker-compose up       # Recreate and reseed
```

### Access Database
```bash
# Connect to PostgreSQL
docker exec -it ulpan-postgres psql -U ulpan -d ulpan_ai

# View tables
\dt

# Query users
SELECT * FROM users;

# Exit
\q
```

### Run Prisma Studio (Database GUI)
```bash
cd backend
npx prisma studio
```

Opens at http://localhost:5555

---

## 📊 Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Web application |
| Backend API | http://localhost:4000/api | REST API |
| PostgreSQL | localhost:5432 | Database |
| Redis | localhost:6379 | Cache |
| Meilisearch | http://localhost:7700 | Search engine |

---

## 🔐 Default Credentials

### Database
- **User**: ulpan
- **Password**: ulpan_password
- **Database**: ulpan_ai

### Meilisearch
- **Master Key**: masterKey

---

## 📝 Test the API

### Register User
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "interfaceLang": "en"
  }'
```

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Words (with token)
```bash
curl http://localhost:4000/api/words \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🎓 Learning Path

### Recommended Order

1. **Start with Alphabet** (Dashboard → Alphabet)
   - Learn all 22 letters
   - Practice pronunciation

2. **Build Vocabulary** (Dashboard → Vocabulary)
   - Start with Level 1 words
   - Use flashcards daily

3. **Learn Phrases** (Dashboard → Phrases)
   - Common greetings
   - Basic questions

4. **Study Grammar** (Dashboard → Grammar)
   - Understand rules
   - See examples

5. **Practice with AI** (Dashboard → AI Tutor)
   - Ask questions
   - Get explanations
   - Practice conversation

6. **Test Yourself** (Dashboard → Tests)
   - Take quizzes
   - Track scores

7. **Review Daily** (Dashboard → Flashcards)
   - Spaced repetition
   - Reinforce learning

---

## 🆘 Need Help?

### Check Documentation
- `README.md` - Project overview
- `SETUP.md` - Detailed setup guide
- `ARCHITECTURE.md` - System architecture

### Common Issues
1. Docker not running → Start Docker Desktop
2. Port conflicts → Change ports or stop conflicting services
3. Database errors → Restart postgres container
4. API errors → Check backend logs

### Debug Mode

Enable detailed logging:

**Backend** (`backend/.env`):
```env
NODE_ENV=development
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_DEBUG=true
```

---

## 🎉 You're Ready!

Start learning Hebrew with AI-powered tutoring!

**Next Steps**:
1. Complete your profile
2. Start with alphabet lesson
3. Add your first flashcards
4. Chat with AI tutor
5. Track your progress

**Happy Learning! 🇮🇱**
