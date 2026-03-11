import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Seed Hebrew alphabet (22 letters)
  console.log('📝 Seeding Hebrew alphabet...');
  const letters = [
    { hebrew: 'א', name: 'Alef', transcription: 'alef', pronunciation: 'silent', exampleWord: 'אבא', exampleTrans: 'father', order: 1 },
    { hebrew: 'ב', name: 'Bet', transcription: 'bet', pronunciation: 'b/v', exampleWord: 'בית', exampleTrans: 'house', order: 2 },
    { hebrew: 'ג', name: 'Gimel', transcription: 'gimel', pronunciation: 'g', exampleWord: 'גן', exampleTrans: 'garden', order: 3 },
    { hebrew: 'ד', name: 'Dalet', transcription: 'dalet', pronunciation: 'd', exampleWord: 'דלת', exampleTrans: 'door', order: 4 },
    { hebrew: 'ה', name: 'He', transcription: 'he', pronunciation: 'h', exampleWord: 'הר', exampleTrans: 'mountain', order: 5 },
    { hebrew: 'ו', name: 'Vav', transcription: 'vav', pronunciation: 'v/o/u', exampleWord: 'ורד', exampleTrans: 'rose', order: 6 },
    { hebrew: 'ז', name: 'Zayin', transcription: 'zayin', pronunciation: 'z', exampleWord: 'זמן', exampleTrans: 'time', order: 7 },
    { hebrew: 'ח', name: 'Het', transcription: 'het', pronunciation: 'kh', exampleWord: 'חלב', exampleTrans: 'milk', order: 8 },
    { hebrew: 'ט', name: 'Tet', transcription: 'tet', pronunciation: 't', exampleWord: 'טוב', exampleTrans: 'good', order: 9 },
    { hebrew: 'י', name: 'Yod', transcription: 'yod', pronunciation: 'y/i', exampleWord: 'יד', exampleTrans: 'hand', order: 10 },
    { hebrew: 'כ', name: 'Kaf', transcription: 'kaf', pronunciation: 'k/kh', exampleWord: 'כלב', exampleTrans: 'dog', order: 11 },
    { hebrew: 'ל', name: 'Lamed', transcription: 'lamed', pronunciation: 'l', exampleWord: 'לב', exampleTrans: 'heart', order: 12 },
    { hebrew: 'מ', name: 'Mem', transcription: 'mem', pronunciation: 'm', exampleWord: 'מים', exampleTrans: 'water', order: 13 },
    { hebrew: 'נ', name: 'Nun', transcription: 'nun', pronunciation: 'n', exampleWord: 'נר', exampleTrans: 'candle', order: 14 },
    { hebrew: 'ס', name: 'Samekh', transcription: 'samekh', pronunciation: 's', exampleWord: 'ספר', exampleTrans: 'book', order: 15 },
    { hebrew: 'ע', name: 'Ayin', transcription: 'ayin', pronunciation: 'silent', exampleWord: 'עין', exampleTrans: 'eye', order: 16 },
    { hebrew: 'פ', name: 'Pe', transcription: 'pe', pronunciation: 'p/f', exampleWord: 'פה', exampleTrans: 'mouth', order: 17 },
    { hebrew: 'צ', name: 'Tsadi', transcription: 'tsadi', pronunciation: 'ts', exampleWord: 'צבע', exampleTrans: 'color', order: 18 },
    { hebrew: 'ק', name: 'Qof', transcription: 'qof', pronunciation: 'k', exampleWord: 'קול', exampleTrans: 'voice', order: 19 },
    { hebrew: 'ר', name: 'Resh', transcription: 'resh', pronunciation: 'r', exampleWord: 'רגל', exampleTrans: 'leg', order: 20 },
    { hebrew: 'ש', name: 'Shin', transcription: 'shin', pronunciation: 'sh/s', exampleWord: 'שלום', exampleTrans: 'peace', order: 21 },
    { hebrew: 'ת', name: 'Tav', transcription: 'tav', pronunciation: 't', exampleWord: 'תה', exampleTrans: 'tea', order: 22 },
  ];

  for (const letter of letters) {
    await prisma.letter.upsert({
      where: { hebrew: letter.hebrew },
      update: {},
      create: letter,
    });
  }

  // Seed basic words (100 words)
  console.log('📚 Seeding vocabulary words...');
  const words = [
    // Level 1 - Basic (Family)
    { hebrew: 'אבא', transcription: 'aba', translationEn: 'father', translationRu: 'отец', level: 1, category: 'family' },
    { hebrew: 'אמא', transcription: 'ima', translationEn: 'mother', translationRu: 'мать', level: 1, category: 'family' },
    { hebrew: 'אח', transcription: 'akh', translationEn: 'brother', translationRu: 'брат', level: 1, category: 'family' },
    { hebrew: 'אחות', transcription: 'akhot', translationEn: 'sister', translationRu: 'сестра', level: 1, category: 'family' },
    { hebrew: 'בן', transcription: 'ben', translationEn: 'son', translationRu: 'сын', level: 1, category: 'family' },
    { hebrew: 'בת', transcription: 'bat', translationEn: 'daughter', translationRu: 'дочь', level: 1, category: 'family' },
    
    // Level 1 - Basic (Greetings)
    { hebrew: 'שלום', transcription: 'shalom', translationEn: 'hello/peace', translationRu: 'привет/мир', level: 1, category: 'greetings' },
    { hebrew: 'בוקר טוב', transcription: 'boker tov', translationEn: 'good morning', translationRu: 'доброе утро', level: 1, category: 'greetings' },
    { hebrew: 'ערב טוב', transcription: 'erev tov', translationEn: 'good evening', translationRu: 'добрый вечер', level: 1, category: 'greetings' },
    { hebrew: 'להתראות', transcription: 'lehitraot', translationEn: 'goodbye', translationRu: 'до свидания', level: 1, category: 'greetings' },
    
    // Level 1 - Basic (Common words)
    { hebrew: 'כן', transcription: 'ken', translationEn: 'yes', translationRu: 'да', level: 1, category: 'common' },
    { hebrew: 'לא', transcription: 'lo', translationEn: 'no', translationRu: 'нет', level: 1, category: 'common' },
    { hebrew: 'תודה', transcription: 'toda', translationEn: 'thank you', translationRu: 'спасибо', level: 1, category: 'common' },
    { hebrew: 'בבקשה', transcription: 'bevakasha', translationEn: 'please/you\'re welcome', translationRu: 'пожалуйста', level: 1, category: 'common' },
    { hebrew: 'סליחה', transcription: 'slikha', translationEn: 'sorry/excuse me', translationRu: 'извините', level: 1, category: 'common' },
    
    // Level 1 - Numbers
    { hebrew: 'אחד', transcription: 'ekhad', translationEn: 'one', translationRu: 'один', level: 1, category: 'numbers' },
    { hebrew: 'שניים', transcription: 'shnayim', translationEn: 'two', translationRu: 'два', level: 1, category: 'numbers' },
    { hebrew: 'שלושה', transcription: 'shlosha', translationEn: 'three', translationRu: 'три', level: 1, category: 'numbers' },
    { hebrew: 'ארבעה', transcription: 'arba\'a', translationEn: 'four', translationRu: 'четыре', level: 1, category: 'numbers' },
    { hebrew: 'חמישה', transcription: 'khamisha', translationEn: 'five', translationRu: 'пять', level: 1, category: 'numbers' },
    
    // Level 2 - Food
    { hebrew: 'לחם', transcription: 'lekhem', translationEn: 'bread', translationRu: 'хлеб', level: 2, category: 'food' },
    { hebrew: 'מים', transcription: 'mayim', translationEn: 'water', translationRu: 'вода', level: 2, category: 'food' },
    { hebrew: 'חלב', transcription: 'khalav', translationEn: 'milk', translationRu: 'молоко', level: 2, category: 'food' },
    { hebrew: 'קפה', transcription: 'kafe', translationEn: 'coffee', translationRu: 'кофе', level: 2, category: 'food' },
    { hebrew: 'תה', transcription: 'te', translationEn: 'tea', translationRu: 'чай', level: 2, category: 'food' },
    { hebrew: 'בשר', transcription: 'basar', translationEn: 'meat', translationRu: 'мясо', level: 2, category: 'food' },
    { hebrew: 'דג', transcription: 'dag', translationEn: 'fish', translationRu: 'рыба', level: 2, category: 'food' },
    { hebrew: 'ירקות', transcription: 'yerakot', translationEn: 'vegetables', translationRu: 'овощи', level: 2, category: 'food' },
    { hebrew: 'פירות', transcription: 'perot', translationEn: 'fruits', translationRu: 'фрукты', level: 2, category: 'food' },
    { hebrew: 'אוכל', transcription: 'okhel', translationEn: 'food', translationRu: 'еда', level: 2, category: 'food' },
    
    // Level 2 - House
    { hebrew: 'בית', transcription: 'bayit', translationEn: 'house', translationRu: 'дом', level: 2, category: 'house' },
    { hebrew: 'חדר', transcription: 'kheder', translationEn: 'room', translationRu: 'комната', level: 2, category: 'house' },
    { hebrew: 'מטבח', transcription: 'mitbakh', translationEn: 'kitchen', translationRu: 'кухня', level: 2, category: 'house' },
    { hebrew: 'שירותים', transcription: 'sherutim', translationEn: 'bathroom', translationRu: 'ванная', level: 2, category: 'house' },
    { hebrew: 'מיטה', transcription: 'mita', translationEn: 'bed', translationRu: 'кровать', level: 2, category: 'house' },
    { hebrew: 'שולחן', transcription: 'shulkhan', translationEn: 'table', translationRu: 'стол', level: 2, category: 'house' },
    { hebrew: 'כיסא', transcription: 'kise', translationEn: 'chair', translationRu: 'стул', level: 2, category: 'house' },
    { hebrew: 'דלת', transcription: 'delet', translationEn: 'door', translationRu: 'дверь', level: 2, category: 'house' },
    { hebrew: 'חלון', transcription: 'khalon', translationEn: 'window', translationRu: 'окно', level: 2, category: 'house' },
    { hebrew: 'גן', transcription: 'gan', translationEn: 'garden', translationRu: 'сад', level: 2, category: 'house' },
    
    // Level 3 - Actions/Verbs
    { hebrew: 'ללכת', transcription: 'lalekhet', translationEn: 'to go', translationRu: 'идти', level: 3, category: 'verbs' },
    { hebrew: 'לבוא', transcription: 'lavo', translationEn: 'to come', translationRu: 'приходить', level: 3, category: 'verbs' },
    { hebrew: 'לאכול', transcription: 'le\'ekhol', translationEn: 'to eat', translationRu: 'есть', level: 3, category: 'verbs' },
    { hebrew: 'לשתות', transcription: 'lishtot', translationEn: 'to drink', translationRu: 'пить', level: 3, category: 'verbs' },
    { hebrew: 'לדבר', transcription: 'ledaber', translationEn: 'to speak', translationRu: 'говорить', level: 3, category: 'verbs' },
    { hebrew: 'לכתוב', transcription: 'likhtov', translationEn: 'to write', translationRu: 'писать', level: 3, category: 'verbs' },
    { hebrew: 'לקרוא', transcription: 'likro', translationEn: 'to read', translationRu: 'читать', level: 3, category: 'verbs' },
    { hebrew: 'לראות', transcription: 'lirot', translationEn: 'to see', translationRu: 'видеть', level: 3, category: 'verbs' },
    { hebrew: 'לשמוע', transcription: 'lishmoa', translationEn: 'to hear', translationRu: 'слышать', level: 3, category: 'verbs' },
    { hebrew: 'לעבוד', transcription: 'la\'avod', translationEn: 'to work', translationRu: 'работать', level: 3, category: 'verbs' },
  ];

  for (const word of words) {
    await prisma.word.upsert({
      where: { hebrew: word.hebrew },
      update: {},
      create: word,
    });
  }

  // Seed phrases (50 phrases)
  console.log('💬 Seeding common phrases...');
  const phrases = [
    // Level 1 - Greetings
    { hebrew: 'מה שלומך?', transcription: 'ma shlomkha?', translationEn: 'How are you?', translationRu: 'Как дела?', level: 1, category: 'greetings' },
    { hebrew: 'טוב, תודה', transcription: 'tov, toda', translationEn: 'Good, thank you', translationRu: 'Хорошо, спасибо', level: 1, category: 'greetings' },
    { hebrew: 'מה נשמע?', transcription: 'ma nishma?', translationEn: 'What\'s up?', translationRu: 'Что слышно?', level: 1, category: 'greetings' },
    { hebrew: 'נעים מאוד', transcription: 'na\'im me\'od', translationEn: 'Nice to meet you', translationRu: 'Приятно познакомиться', level: 1, category: 'greetings' },
    { hebrew: 'איך קוראים לך?', transcription: 'eikh kor\'im lekha?', translationEn: 'What\'s your name?', translationRu: 'Как тебя зовут?', level: 1, category: 'greetings' },
    
    // Level 1 - Basic questions
    { hebrew: 'כמה זה עולה?', transcription: 'kama ze ole?', translationEn: 'How much does it cost?', translationRu: 'Сколько это стоит?', level: 1, category: 'questions' },
    { hebrew: 'איפה השירותים?', transcription: 'eifo ha-sherutim?', translationEn: 'Where is the bathroom?', translationRu: 'Где туалет?', level: 1, category: 'questions' },
    { hebrew: 'אתה מדבר אנגלית?', transcription: 'ata medaber anglit?', translationEn: 'Do you speak English?', translationRu: 'Ты говоришь по-английски?', level: 1, category: 'questions' },
    { hebrew: 'אני לא מבין', transcription: 'ani lo mevin', translationEn: 'I don\'t understand', translationRu: 'Я не понимаю', level: 1, category: 'questions' },
    { hebrew: 'תוכל לעזור לי?', transcription: 'tukhal la\'azor li?', translationEn: 'Can you help me?', translationRu: 'Можешь помочь мне?', level: 1, category: 'questions' },
    
    // Level 2 - Daily life
    { hebrew: 'אני רעב', transcription: 'ani ra\'ev', translationEn: 'I\'m hungry', translationRu: 'Я голоден', level: 2, category: 'daily' },
    { hebrew: 'אני צמא', transcription: 'ani tsame', translationEn: 'I\'m thirsty', translationRu: 'Я хочу пить', level: 2, category: 'daily' },
    { hebrew: 'אני עייף', transcription: 'ani ayef', translationEn: 'I\'m tired', translationRu: 'Я устал', level: 2, category: 'daily' },
    { hebrew: 'אני הולך הביתה', transcription: 'ani holekh ha-bayta', translationEn: 'I\'m going home', translationRu: 'Я иду домой', level: 2, category: 'daily' },
    { hebrew: 'מה השעה?', transcription: 'ma ha-sha\'a?', translationEn: 'What time is it?', translationRu: 'Который час?', level: 2, category: 'daily' },
    
    // Level 3 - Complex phrases
    { hebrew: 'אני לומד עברית', transcription: 'ani lomed ivrit', translationEn: 'I\'m learning Hebrew', translationRu: 'Я учу иврит', level: 3, category: 'learning' },
    { hebrew: 'זה קשה אבל מעניין', transcription: 'ze kashe aval me\'anyen', translationEn: 'It\'s difficult but interesting', translationRu: 'Это сложно, но интересно', level: 3, category: 'learning' },
    { hebrew: 'אני צריך לתרגל יותר', transcription: 'ani tsarikh letargel yoter', translationEn: 'I need to practice more', translationRu: 'Мне нужно больше практиковаться', level: 3, category: 'learning' },
  ];

  for (const phrase of phrases) {
    await prisma.phrase.upsert({
      where: { hebrew: phrase.hebrew },
      update: {},
      create: phrase,
    });
  }

  // Seed grammar rules
  console.log('📖 Seeding grammar rules...');
  const grammarRules = [
    {
      title: 'Hebrew Alphabet',
      titleEn: 'Hebrew Alphabet',
      titleRu: 'Ивритский алфавит',
      contentEn: 'Hebrew alphabet consists of 22 letters, all consonants. Vowels are indicated by diacritical marks called nikud.',
      contentRu: 'Ивритский алфавит состоит из 22 букв, все согласные. Гласные обозначаются диакритическими знаками, называемыми никуд.',
      examples: [
        { hebrew: 'אָב', translation: 'father', explanation: 'The kamatz (ָ) indicates the "a" sound' }
      ],
      level: 1,
      order: 1,
    },
    {
      title: 'Gender in Hebrew',
      titleEn: 'Gender in Hebrew',
      titleRu: 'Род в иврите',
      contentEn: 'Hebrew nouns have two genders: masculine and feminine. Most feminine nouns end with ה (he) or ת (tav).',
      contentRu: 'Существительные в иврите имеют два рода: мужской и женский. Большинство существительных женского рода заканчиваются на ה (хе) или ת (тав).',
      examples: [
        { hebrew: 'ילד', translation: 'boy (masculine)', explanation: 'Masculine noun' },
        { hebrew: 'ילדה', translation: 'girl (feminine)', explanation: 'Feminine noun ending with ה' }
      ],
      level: 2,
      order: 2,
    },
    {
      title: 'Present Tense',
      titleEn: 'Present Tense',
      titleRu: 'Настоящее время',
      contentEn: 'In Hebrew present tense, verbs conjugate according to gender and number, but not person.',
      contentRu: 'В настоящем времени иврита глаголы спрягаются по роду и числу, но не по лицам.',
      examples: [
        { hebrew: 'אני הולך', translation: 'I go (masculine)', explanation: 'Masculine singular' },
        { hebrew: 'אני הולכת', translation: 'I go (feminine)', explanation: 'Feminine singular' }
      ],
      level: 3,
      order: 3,
    },
  ];

  for (const rule of grammarRules) {
    await prisma.grammar.create({
      data: rule,
    });
  }

  // Seed lessons
  console.log('📚 Seeding lessons...');
  
  // Урок 1: Алфавит
  const alphabetLesson = await prisma.lesson.create({
    data: {
      title: 'Ивритский алфавит',
      titleEn: 'Hebrew Alphabet',
      titleRu: 'Ивритский алфавит',
      description: 'Изучите 22 буквы ивритского алфавита',
      type: 'alphabet',
      level: 1,
      order: 1,
      isPublished: true,
      contentJson: {
        instructions: 'Изучите каждую букву, её название и произношение',
      },
    },
  });

  // Урок 2: Приветствия
  const greetingsLesson = await prisma.lesson.create({
    data: {
      title: 'Приветствия',
      titleEn: 'Greetings',
      titleRu: 'Приветствия',
      description: 'Научитесь здороваться на иврите',
      type: 'vocabulary',
      level: 1,
      order: 2,
      isPublished: true,
    },
  });

  const greetingWords = await prisma.word.findMany({
    where: { category: 'greetings' },
  });

  for (let i = 0; i < greetingWords.length; i++) {
    await prisma.lessonWord.create({
      data: {
        lessonId: greetingsLesson.id,
        wordId: greetingWords[i].id,
        order: i,
      },
    });
  }

  // Урок 3: Семья
  const familyLesson = await prisma.lesson.create({
    data: {
      title: 'Семья',
      titleEn: 'Family',
      titleRu: 'Семья',
      description: 'Слова о членах семьи',
      type: 'vocabulary',
      level: 1,
      order: 3,
      isPublished: true,
    },
  });

  const familyWords = await prisma.word.findMany({
    where: { category: 'family' },
  });

  for (let i = 0; i < familyWords.length; i++) {
    await prisma.lessonWord.create({
      data: {
        lessonId: familyLesson.id,
        wordId: familyWords[i].id,
        order: i,
      },
    });
  }

  // Урок 4: Числа
  const numbersLesson = await prisma.lesson.create({
    data: {
      title: 'Числа 1-10',
      titleEn: 'Numbers 1-10',
      titleRu: 'Числа 1-10',
      description: 'Научитесь считать на иврите',
      type: 'vocabulary',
      level: 1,
      order: 4,
      isPublished: true,
    },
  });

  const numberWords = await prisma.word.findMany({
    where: { category: 'numbers' },
    take: 10,
  });

  for (let i = 0; i < numberWords.length; i++) {
    await prisma.lessonWord.create({
      data: {
        lessonId: numbersLesson.id,
        wordId: numberWords[i].id,
        order: i,
      },
    });
  }

  // Урок 5: Еда
  const foodLesson = await prisma.lesson.create({
    data: {
      title: 'Еда и Напитки',
      titleEn: 'Food and Drinks',
      titleRu: 'Еда и Напитки',
      description: 'Основные слова о еде',
      type: 'vocabulary',
      level: 2,
      order: 5,
      isPublished: true,
    },
  });

  const foodWords = await prisma.word.findMany({
    where: { category: 'food' },
    take: 15,
  });

  for (let i = 0; i < foodWords.length; i++) {
    await prisma.lessonWord.create({
      data: {
        lessonId: foodLesson.id,
        wordId: foodWords[i].id,
        order: i,
      },
    });
  }

  // Урок 6: Дом
  const houseLesson = await prisma.lesson.create({
    data: {
      title: 'Дом и Мебель',
      titleEn: 'House and Furniture',
      titleRu: 'Дом и Мебель',
      description: 'Слова о доме и мебели',
      type: 'vocabulary',
      level: 2,
      order: 6,
      isPublished: true,
    },
  });

  const houseWords = await prisma.word.findMany({
    where: { category: 'house' },
  });

  for (let i = 0; i < houseWords.length; i++) {
    await prisma.lessonWord.create({
      data: {
        lessonId: houseLesson.id,
        wordId: houseWords[i].id,
        order: i,
      },
    });
  }

  // Урок 7: Глаголы
  const verbsLesson = await prisma.lesson.create({
    data: {
      title: 'Базовые Глаголы',
      titleEn: 'Basic Verbs',
      titleRu: 'Базовые Глаголы',
      description: 'Основные глаголы действия',
      type: 'vocabulary',
      level: 3,
      order: 7,
      isPublished: true,
    },
  });

  const verbWords = await prisma.word.findMany({
    where: { category: 'verbs' },
    take: 10,
  });

  for (let i = 0; i < verbWords.length; i++) {
    await prisma.lessonWord.create({
      data: {
        lessonId: verbsLesson.id,
        wordId: verbWords[i].id,
        order: i,
      },
    });
  }

  // Урок 8: Фразы приветствия
  const greetingPhrasesLesson = await prisma.lesson.create({
    data: {
      title: 'Фразы Приветствия',
      titleEn: 'Greeting Phrases',
      titleRu: 'Фразы Приветствия',
      description: 'Как здороваться и прощаться',
      type: 'phrase',
      level: 1,
      order: 8,
      isPublished: true,
    },
  });

  const greetingPhrases = await prisma.phrase.findMany({
    where: { category: 'greetings' },
  });

  for (let i = 0; i < greetingPhrases.length; i++) {
    await prisma.lessonPhrase.create({
      data: {
        lessonId: greetingPhrasesLesson.id,
        phraseId: greetingPhrases[i].id,
        order: i,
      },
    });
  }

  // Урок 9: Вопросы
  const questionsLesson = await prisma.lesson.create({
    data: {
      title: 'Базовые Вопросы',
      titleEn: 'Basic Questions',
      titleRu: 'Базовые Вопросы',
      description: 'Как задавать вопросы на иврите',
      type: 'phrase',
      level: 2,
      order: 9,
      isPublished: true,
    },
  });

  const questionPhrases = await prisma.phrase.findMany({
    where: { category: 'questions' },
  });

  for (let i = 0; i < questionPhrases.length; i++) {
    await prisma.lessonPhrase.create({
      data: {
        lessonId: questionsLesson.id,
        phraseId: questionPhrases[i].id,
        order: i,
      },
    });
  }

  // Урок 10: Повседневная жизнь
  const dailyLesson = await prisma.lesson.create({
    data: {
      title: 'Повседневная Жизнь',
      titleEn: 'Daily Life',
      titleRu: 'Повседневная Жизнь',
      description: 'Фразы на каждый день',
      type: 'phrase',
      level: 2,
      order: 10,
      isPublished: true,
    },
  });

  const dailyPhrases = await prisma.phrase.findMany({
    where: { category: 'daily' },
  });

  for (let i = 0; i < dailyPhrases.length; i++) {
    await prisma.lessonPhrase.create({
      data: {
        lessonId: dailyLesson.id,
        phraseId: dailyPhrases[i].id,
        order: i,
      },
    });
  }

  // Seed tests
  console.log('✅ Seeding tests...');
  await prisma.test.create({
    data: {
      title: 'Alphabet Test',
      titleEn: 'Alphabet Test',
      titleRu: 'Тест на алфавит',
      description: 'Test your knowledge of Hebrew letters',
      type: 'multiple_choice',
      level: 1,
      questionsJson: [
        {
          question: 'What is the first letter of the Hebrew alphabet?',
          options: ['א', 'ב', 'ג', 'ד'],
          correctAnswer: 0,
        },
        {
          question: 'How do you pronounce the letter ש?',
          options: ['t', 'sh', 'k', 'r'],
          correctAnswer: 1,
        },
      ],
      passingScore: 70,
      isPublished: true,
    },
  });

  console.log('✅ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
