# 🚀 START HERE - Ulpan AI

## Welcome to Ulpan AI!

This is your complete Hebrew learning platform with AI tutor.

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create account if needed
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### Step 2: Setup Environment

Open terminal in this folder and run:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

Open `.env` file and paste your API key:

```env
OPENAI_API_KEY=sk-paste-your-key-here
```

### Step 3: Start Application

```bash
docker-compose up
```

**Wait 3-5 minutes** for first-time setup.

### Step 4: Open Application

When you see:
```
✓ Ready in 2.5s
🚀 Ulpan AI Backend running
```

Open: **http://localhost:3000**

---

## 📖 What You Get

### Pre-loaded Content
- ✅ 22 Hebrew alphabet letters
- ✅ 100+ vocabulary words
- ✅ 50+ common phrases
- ✅ Grammar lessons
- ✅ Sample tests

### Features
- 🤖 AI Tutor (ask anything!)
- 🎴 Smart Flashcards
- 📚 Interactive Lessons
- ✅ Tests & Quizzes
- 📊 Progress Tracking

---

## 🎯 Your First Steps

1. **Create Account**
   - Click "Get Started Free"
   - Enter email & password
   - Choose interface language (EN/RU)

2. **Start with Alphabet**
   - Dashboard → Alphabet
   - Learn 22 Hebrew letters

3. **Build Vocabulary**
   - Dashboard → Vocabulary
   - Study basic words

4. **Try AI Tutor**
   - Dashboard → AI Tutor
   - Ask: "How do I say hello in Hebrew?"

5. **Practice with Flashcards**
   - Dashboard → Flashcards
   - Review words daily

---

## 🆘 Troubleshooting

### "Port already in use"
```bash
docker-compose down
docker-compose up
```

### "Cannot connect to backend"
Wait 1 more minute, backend is still starting.

### "AI not working"
Check your OPENAI_API_KEY in `.env` file.

### Need more help?
Read **QUICKSTART.md** for detailed guide.

---

## 📚 Documentation

- **QUICKSTART.md** - Detailed 5-min guide
- **SETUP.md** - Full setup instructions
- **ARCHITECTURE.md** - Technical details
- **PROJECT_SUMMARY.md** - Complete overview

---

## 🎓 Learning Path

**Week 1**: Alphabet + Basic Words  
**Week 2**: Common Phrases + Grammar  
**Week 3**: Daily Flashcard Practice  
**Week 4**: Tests + AI Tutor Sessions

---

## 💡 Pro Tips

1. **Study Daily** - Even 10 minutes helps
2. **Use AI Tutor** - Ask questions freely
3. **Review Flashcards** - Follow SRS schedule
4. **Track Progress** - Check statistics page
5. **Stay Consistent** - Build study streaks

---

## 🎉 You're Ready!

```bash
docker-compose up
```

Open http://localhost:3000

**Start Learning Hebrew Today!**

**שלום! (Shalom!)** 🇮🇱

---

## 📞 Quick Links

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api
- Database GUI: `cd backend && npx prisma studio`

---

**Built with ❤️ for Hebrew learners**
