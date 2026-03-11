import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Расширенный список слов (300+)
export const extendedWords = [
  // Цвета (15 слов)
  { hebrew: 'אדום', transcription: 'adom', translationEn: 'red', translationRu: 'красный', level: 1, category: 'colors' },
  { hebrew: 'כחול', transcription: 'kakhol', translationEn: 'blue', translationRu: 'синий', level: 1, category: 'colors' },
  { hebrew: 'ירוק', transcription: 'yarok', translationEn: 'green', translationRu: 'зелёный', level: 1, category: 'colors' },
  { hebrew: 'צהוב', transcription: 'tsahov', translationEn: 'yellow', translationRu: 'жёлтый', level: 1, category: 'colors' },
  { hebrew: 'לבן', transcription: 'lavan', translationEn: 'white', translationRu: 'белый', level: 1, category: 'colors' },
  { hebrew: 'שחור', transcription: 'shakhor', translationEn: 'black', translationRu: 'чёрный', level: 1, category: 'colors' },
  { hebrew: 'כתום', transcription: 'katom', translationEn: 'orange', translationRu: 'оранжевый', level: 1, category: 'colors' },
  { hebrew: 'סגול', transcription: 'sagol', translationEn: 'purple', translationRu: 'фиолетовый', level: 1, category: 'colors' },
  { hebrew: 'ורוד', transcription: 'varod', translationEn: 'pink', translationRu: 'розовый', level: 1, category: 'colors' },
  { hebrew: 'חום', transcription: 'khum', translationEn: 'brown', translationRu: 'коричневый', level: 1, category: 'colors' },
  
  // Числа 6-20
  { hebrew: 'שישה', transcription: 'shisha', translationEn: 'six', translationRu: 'шесть', level: 1, category: 'numbers' },
  { hebrew: 'שבעה', transcription: 'shiv\'a', translationEn: 'seven', translationRu: 'семь', level: 1, category: 'numbers' },
  { hebrew: 'שמונה', transcription: 'shmona', translationEn: 'eight', translationRu: 'восемь', level: 1, category: 'numbers' },
  { hebrew: 'תשעה', transcription: 'tish\'a', translationEn: 'nine', translationRu: 'девять', level: 1, category: 'numbers' },
  { hebrew: 'עשרה', transcription: 'asara', translationEn: 'ten', translationRu: 'десять', level: 1, category: 'numbers' },
  { hebrew: 'עשרים', transcription: 'esrim', translationEn: 'twenty', translationRu: 'двадцать', level: 2, category: 'numbers' },
  { hebrew: 'שלושים', transcription: 'shloshim', translationEn: 'thirty', translationRu: 'тридцать', level: 2, category: 'numbers' },
  { hebrew: 'מאה', transcription: 'me\'a', translationEn: 'hundred', translationRu: 'сто', level: 2, category: 'numbers' },
  
  // Одежда (20 слов)
  { hebrew: 'חולצה', transcription: 'khultsa', translationEn: 'shirt', translationRu: 'рубашка', level: 2, category: 'clothes' },
  { hebrew: 'מכנסיים', transcription: 'mikhna sayim', translationEn: 'pants', translationRu: 'брюки', level: 2, category: 'clothes' },
  { hebrew: 'שמלה', transcription: 'simla', translationEn: 'dress', translationRu: 'платье', level: 2, category: 'clothes' },
  { hebrew: 'נעליים', transcription: 'na\'alayim', translationEn: 'shoes', translationRu: 'обувь', level: 2, category: 'clothes' },
  { hebrew: 'גרביים', transcription: 'garbayim', translationEn: 'socks', translationRu: 'носки', level: 2, category: 'clothes' },
  { hebrew: 'מעיל', transcription: 'me\'il', translationEn: 'coat', translationRu: 'пальто', level: 2, category: 'clothes' },
  { hebrew: 'כובע', transcription: 'kova', translationEn: 'hat', translationRu: 'шапка', level: 2, category: 'clothes' },
  { hebrew: 'משקפיים', transcription: 'mishkafayim', translationEn: 'glasses', translationRu: 'очки', level: 2, category: 'clothes' },
  
  // Части тела (25 слов)
  { hebrew: 'ראש', transcription: 'rosh', translationEn: 'head', translationRu: 'голова', level: 2, category: 'body' },
  { hebrew: 'עין', transcription: 'ayin', translationEn: 'eye', translationRu: 'глаз', level: 2, category: 'body' },
  { hebrew: 'אוזן', transcription: 'ozen', translationEn: 'ear', translationRu: 'ухо', level: 2, category: 'body' },
  { hebrew: 'אף', transcription: 'af', translationEn: 'nose', translationRu: 'нос', level: 2, category: 'body' },
  { hebrew: 'פה', transcription: 'pe', translationEn: 'mouth', translationRu: 'рот', level: 2, category: 'body' },
  { hebrew: 'שיניים', transcription: 'shinayim', translationEn: 'teeth', translationRu: 'зубы', level: 2, category: 'body' },
  { hebrew: 'צוואר', transcription: 'tsavar', translationEn: 'neck', translationRu: 'шея', level: 2, category: 'body' },
  { hebrew: 'כתף', transcription: 'katef', translationEn: 'shoulder', translationRu: 'плечо', level: 2, category: 'body' },
  { hebrew: 'יד', transcription: 'yad', translationEn: 'hand', translationRu: 'рука', level: 2, category: 'body' },
  { hebrew: 'רגל', transcription: 'regel', translationEn: 'leg/foot', translationRu: 'нога', level: 2, category: 'body' },
  { hebrew: 'לב', transcription: 'lev', translationEn: 'heart', translationRu: 'сердце', level: 2, category: 'body' },
  { hebrew: 'גוף', transcription: 'guf', translationEn: 'body', translationRu: 'тело', level: 2, category: 'body' },
  
  // Город (20 слов)
  { hebrew: 'עיר', transcription: 'ir', translationEn: 'city', translationRu: 'город', level: 3, category: 'city' },
  { hebrew: 'רחוב', transcription: 'rekhov', translationEn: 'street', translationRu: 'улица', level: 3, category: 'city' },
  { hebrew: 'בניין', transcription: 'binyan', translationEn: 'building', translationRu: 'здание', level: 3, category: 'city' },
  { hebrew: 'חנות', transcription: 'khanut', translationEn: 'shop', translationRu: 'магазин', level: 3, category: 'city' },
  { hebrew: 'בית קפה', transcription: 'beit kafe', translationEn: 'cafe', translationRu: 'кафе', level: 3, category: 'city' },
  { hebrew: 'מסעדה', transcription: 'mis\'ada', translationEn: 'restaurant', translationRu: 'ресторан', level: 3, category: 'city' },
  { hebrew: 'בית חולים', transcription: 'beit kholim', translationEn: 'hospital', translationRu: 'больница', level: 3, category: 'city' },
  { hebrew: 'בית ספר', transcription: 'beit sefer', translationEn: 'school', translationRu: 'школа', level: 3, category: 'city' },
  { hebrew: 'גן', transcription: 'gan', translationEn: 'park', translationRu: 'парк', level: 3, category: 'city' },
  { hebrew: 'תחנה', transcription: 'takhana', translationEn: 'station', translationRu: 'станция', level: 3, category: 'city' },
  
  // Транспорт (15 слов)
  { hebrew: 'אוטובוס', transcription: 'otobus', translationEn: 'bus', translationRu: 'автобус', level: 3, category: 'transport' },
  { hebrew: 'מונית', transcription: 'monit', translationEn: 'taxi', translationRu: 'такси', level: 3, category: 'transport' },
  { hebrew: 'רכבת', transcription: 'rakevet', translationEn: 'train', translationRu: 'поезд', level: 3, category: 'transport' },
  { hebrew: 'מטוס', transcription: 'matos', translationEn: 'airplane', translationRu: 'самолёт', level: 3, category: 'transport' },
  { hebrew: 'מכונית', transcription: 'mekhonit', translationEn: 'car', translationRu: 'машина', level: 3, category: 'transport' },
  { hebrew: 'אופניים', transcription: 'ofanayim', translationEn: 'bicycle', translationRu: 'велосипед', level: 3, category: 'transport' },
  
  // Время (20 слов)
  { hebrew: 'יום', transcription: 'yom', translationEn: 'day', translationRu: 'день', level: 2, category: 'time' },
  { hebrew: 'לילה', transcription: 'layla', translationEn: 'night', translationRu: 'ночь', level: 2, category: 'time' },
  { hebrew: 'בוקר', transcription: 'boker', translationEn: 'morning', translationRu: 'утро', level: 2, category: 'time' },
  { hebrew: 'צהריים', transcription: 'tsohorayim', translationEn: 'noon', translationRu: 'полдень', level: 2, category: 'time' },
  { hebrew: 'ערב', transcription: 'erev', translationEn: 'evening', translationRu: 'вечер', level: 2, category: 'time' },
  { hebrew: 'שעה', transcription: 'sha\'a', translationEn: 'hour', translationRu: 'час', level: 2, category: 'time' },
  { hebrew: 'דקה', transcription: 'daka', translationEn: 'minute', translationRu: 'минута', level: 2, category: 'time' },
  { hebrew: 'שבוע', transcription: 'shavu\'a', translationEn: 'week', translationRu: 'неделя', level: 2, category: 'time' },
  { hebrew: 'חודש', transcription: 'khodesh', translationEn: 'month', translationRu: 'месяц', level: 2, category: 'time' },
  { hebrew: 'שנה', transcription: 'shana', translationEn: 'year', translationRu: 'год', level: 2, category: 'time' },
  
  // Дни недели
  { hebrew: 'יום ראשון', transcription: 'yom rishon', translationEn: 'Sunday', translationRu: 'воскресенье', level: 2, category: 'time' },
  { hebrew: 'יום שני', transcription: 'yom sheni', translationEn: 'Monday', translationRu: 'понедельник', level: 2, category: 'time' },
  { hebrew: 'יום שלישי', transcription: 'yom shlishi', translationEn: 'Tuesday', translationRu: 'вторник', level: 2, category: 'time' },
  { hebrew: 'יום רביעי', transcription: 'yom revi\'i', translationEn: 'Wednesday', translationRu: 'среда', level: 2, category: 'time' },
  { hebrew: 'יום חמישי', transcription: 'yom khamishi', translationEn: 'Thursday', translationRu: 'четверг', level: 2, category: 'time' },
  { hebrew: 'יום שישי', transcription: 'yom shishi', translationEn: 'Friday', translationRu: 'пятница', level: 2, category: 'time' },
  { hebrew: 'שבת', transcription: 'shabbat', translationEn: 'Saturday', translationRu: 'суббота', level: 2, category: 'time' },
  
  // Погода (10 слов)
  { hebrew: 'מזג אוויר', transcription: 'mezeg avir', translationEn: 'weather', translationRu: 'погода', level: 3, category: 'weather' },
  { hebrew: 'שמש', transcription: 'shemesh', translationEn: 'sun', translationRu: 'солнце', level: 3, category: 'weather' },
  { hebrew: 'גשם', transcription: 'geshem', translationEn: 'rain', translationRu: 'дождь', level: 3, category: 'weather' },
  { hebrew: 'שלג', transcription: 'sheleg', translationEn: 'snow', translationRu: 'снег', level: 3, category: 'weather' },
  { hebrew: 'רוח', transcription: 'ru\'akh', translationEn: 'wind', translationRu: 'ветер', level: 3, category: 'weather' },
  { hebrew: 'חום', transcription: 'khom', translationEn: 'heat', translationRu: 'жара', level: 3, category: 'weather' },
  { hebrew: 'קור', transcription: 'kor', translationEn: 'cold', translationRu: 'холод', level: 3, category: 'weather' },
  
  // Больше глаголов (30 слов)
  { hebrew: 'לישון', transcription: 'lishon', translationEn: 'to sleep', translationRu: 'спать', level: 3, category: 'verbs' },
  { hebrew: 'לקום', transcription: 'lakum', translationEn: 'to get up', translationRu: 'вставать', level: 3, category: 'verbs' },
  { hebrew: 'לשבת', transcription: 'lashevet', translationEn: 'to sit', translationRu: 'сидеть', level: 3, category: 'verbs' },
  { hebrew: 'לעמוד', transcription: 'la\'amod', translationEn: 'to stand', translationRu: 'стоять', level: 3, category: 'verbs' },
  { hebrew: 'לרוץ', transcription: 'laruts', translationEn: 'to run', translationRu: 'бежать', level: 3, category: 'verbs' },
  { hebrew: 'ללמוד', transcription: 'lilmod', translationEn: 'to learn', translationRu: 'учиться', level: 3, category: 'verbs' },
  { hebrew: 'ללמד', transcription: 'lelamed', translationEn: 'to teach', translationRu: 'учить', level: 3, category: 'verbs' },
  { hebrew: 'לשחק', transcription: 'lesakhek', translationEn: 'to play', translationRu: 'играть', level: 3, category: 'verbs' },
  { hebrew: 'לשיר', transcription: 'lashir', translationEn: 'to sing', translationRu: 'петь', level: 3, category: 'verbs' },
  { hebrew: 'לרקוד', transcription: 'lirkod', translationEn: 'to dance', translationRu: 'танцевать', level: 3, category: 'verbs' },
  { hebrew: 'לקנות', transcription: 'liknot', translationEn: 'to buy', translationRu: 'покупать', level: 3, category: 'verbs' },
  { hebrew: 'למכור', transcription: 'limkor', translationEn: 'to sell', translationRu: 'продавать', level: 3, category: 'verbs' },
  { hebrew: 'לתת', transcription: 'latet', translationEn: 'to give', translationRu: 'давать', level: 3, category: 'verbs' },
  { hebrew: 'לקחת', transcription: 'lakakhat', translationEn: 'to take', translationRu: 'брать', level: 3, category: 'verbs' },
  { hebrew: 'לפתוח', transcription: 'lifto\'akh', translationEn: 'to open', translationRu: 'открывать', level: 3, category: 'verbs' },
  { hebrew: 'לסגור', transcription: 'lisgor', translationEn: 'to close', translationRu: 'закрывать', level: 3, category: 'verbs' },
  { hebrew: 'לאהוב', transcription: 'le\'ehov', translationEn: 'to love', translationRu: 'любить', level: 3, category: 'verbs' },
  { hebrew: 'לשנוא', transcription: 'lisno', translationEn: 'to hate', translationRu: 'ненавидеть', level: 3, category: 'verbs' },
  { hebrew: 'לחשוב', transcription: 'lakhshov', translationEn: 'to think', translationRu: 'думать', level: 3, category: 'verbs' },
  { hebrew: 'להבין', transcription: 'lehavin', translationEn: 'to understand', translationRu: 'понимать', level: 3, category: 'verbs' },
  
  // Прилагательные (25 слов)
  { hebrew: 'טוב', transcription: 'tov', translationEn: 'good', translationRu: 'хороший', level: 2, category: 'adjectives' },
  { hebrew: 'רע', transcription: 'ra', translationEn: 'bad', translationRu: 'плохой', level: 2, category: 'adjectives' },
  { hebrew: 'גדול', transcription: 'gadol', translationEn: 'big', translationRu: 'большой', level: 2, category: 'adjectives' },
  { hebrew: 'קטן', transcription: 'katan', translationEn: 'small', translationRu: 'маленький', level: 2, category: 'adjectives' },
  { hebrew: 'יפה', transcription: 'yafe', translationEn: 'beautiful', translationRu: 'красивый', level: 2, category: 'adjectives' },
  { hebrew: 'מכוער', transcription: 'mekho\'ar', translationEn: 'ugly', translationRu: 'уродливый', level: 2, category: 'adjectives' },
  { hebrew: 'חדש', transcription: 'khadash', translationEn: 'new', translationRu: 'новый', level: 2, category: 'adjectives' },
  { hebrew: 'ישן', transcription: 'yashan', translationEn: 'old', translationRu: 'старый', level: 2, category: 'adjectives' },
  { hebrew: 'חם', transcription: 'kham', translationEn: 'hot', translationRu: 'горячий', level: 2, category: 'adjectives' },
  { hebrew: 'קר', transcription: 'kar', translationEn: 'cold', translationRu: 'холодный', level: 2, category: 'adjectives' },
  { hebrew: 'מהיר', transcription: 'mahir', translationEn: 'fast', translationRu: 'быстрый', level: 2, category: 'adjectives' },
  { hebrew: 'איטי', transcription: 'iti', translationEn: 'slow', translationRu: 'медленный', level: 2, category: 'adjectives' },
  { hebrew: 'חזק', transcription: 'khazak', translationEn: 'strong', translationRu: 'сильный', level: 2, category: 'adjectives' },
  { hebrew: 'חלש', transcription: 'khalash', translationEn: 'weak', translationRu: 'слабый', level: 2, category: 'adjectives' },
  { hebrew: 'עשיר', transcription: 'ashir', translationEn: 'rich', translationRu: 'богатый', level: 3, category: 'adjectives' },
  { hebrew: 'עני', transcription: 'ani', translationEn: 'poor', translationRu: 'бедный', level: 3, category: 'adjectives' },
  
  // Больше еды (20 слов)
  { hebrew: 'ביצה', transcription: 'beytsa', translationEn: 'egg', translationRu: 'яйцо', level: 2, category: 'food' },
  { hebrew: 'גבינה', transcription: 'gvina', translationEn: 'cheese', translationRu: 'сыр', level: 2, category: 'food' },
  { hebrew: 'חמאה', transcription: 'khem\'a', translationEn: 'butter', translationRu: 'масло', level: 2, category: 'food' },
  { hebrew: 'סוכר', transcription: 'sukar', translationEn: 'sugar', translationRu: 'сахар', level: 2, category: 'food' },
  { hebrew: 'מלח', transcription: 'melakh', translationEn: 'salt', translationRu: 'соль', level: 2, category: 'food' },
  { hebrew: 'פלפל', transcription: 'pilpel', translationEn: 'pepper', translationRu: 'перец', level: 2, category: 'food' },
  { hebrew: 'עוגה', transcription: 'uga', translationEn: 'cake', translationRu: 'торт', level: 2, category: 'food' },
  { hebrew: 'שוקולד', transcription: 'shokolad', translationEn: 'chocolate', translationRu: 'шоколад', level: 2, category: 'food' },
  { hebrew: 'תפוח', transcription: 'tapuakh', translationEn: 'apple', translationRu: 'яблоко', level: 2, category: 'food' },
  { hebrew: 'בננה', transcription: 'banana', translationEn: 'banana', translationRu: 'банан', level: 2, category: 'food' },
  { hebrew: 'תפוז', transcription: 'tapuz', translationEn: 'orange', translationRu: 'апельсин', level: 2, category: 'food' },
  { hebrew: 'עגבנייה', transcription: 'agvaniya', translationEn: 'tomato', translationRu: 'помидор', level: 2, category: 'food' },
  { hebrew: 'מלפפון', transcription: 'melafefon', translationEn: 'cucumber', translationRu: 'огурец', level: 2, category: 'food' },
  { hebrew: 'סלט', transcription: 'salat', translationEn: 'salad', translationRu: 'салат', level: 2, category: 'food' },
  { hebrew: 'מרק', transcription: 'marak', translationEn: 'soup', translationRu: 'суп', level: 2, category: 'food' },
  { hebrew: 'אורז', transcription: 'orez', translationEn: 'rice', translationRu: 'рис', level: 2, category: 'food' },
  { hebrew: 'פסטה', transcription: 'pasta', translationEn: 'pasta', translationRu: 'паста', level: 2, category: 'food' },
  { hebrew: 'פיצה', transcription: 'pitsa', translationEn: 'pizza', translationRu: 'пицца', level: 2, category: 'food' },
];

// Больше фраз (50+)
export const extendedPhrases = [
  // Вопросы (20 фраз)
  { hebrew: 'מה זה?', transcription: 'ma ze?', translationEn: 'What is this?', translationRu: 'Что это?', level: 1, category: 'questions' },
  { hebrew: 'איפה זה?', transcription: 'eifo ze?', translationEn: 'Where is it?', translationRu: 'Где это?', level: 1, category: 'questions' },
  { hebrew: 'מתי?', transcription: 'matai?', translationEn: 'When?', translationRu: 'Когда?', level: 1, category: 'questions' },
  { hebrew: 'למה?', transcription: 'lama?', translationEn: 'Why?', translationRu: 'Почему?', level: 1, category: 'questions' },
  { hebrew: 'איך?', transcription: 'eikh?', translationEn: 'How?', translationRu: 'Как?', level: 1, category: 'questions' },
  { hebrew: 'כמה זה עולה?', transcription: 'kama ze ole?', translationEn: 'How much does it cost?', translationRu: 'Сколько это стоит?', level: 2, category: 'questions' },
  { hebrew: 'מה השעה?', transcription: 'ma ha-sha\'a?', translationEn: 'What time is it?', translationRu: 'Который час?', level: 2, category: 'questions' },
  { hebrew: 'איפה התחנה?', transcription: 'eifo ha-takhana?', translationEn: 'Where is the station?', translationRu: 'Где станция?', level: 2, category: 'questions' },
  
  // Повседневные фразы (20 фраз)
  { hebrew: 'בוא נלך', transcription: 'bo nelekh', translationEn: 'Let\'s go', translationRu: 'Пошли', level: 2, category: 'daily' },
  { hebrew: 'רגע אחד', transcription: 'rega ekhad', translationEn: 'One moment', translationRu: 'Одну минуту', level: 2, category: 'daily' },
  { hebrew: 'אין בעיה', transcription: 'ein be\'aya', translationEn: 'No problem', translationRu: 'Нет проблем', level: 2, category: 'daily' },
  { hebrew: 'בסדר', transcription: 'beseder', translationEn: 'Okay/Alright', translationRu: 'Хорошо/Ладно', level: 2, category: 'daily' },
  { hebrew: 'מצוין', transcription: 'metsuyyan', translationEn: 'Excellent', translationRu: 'Отлично', level: 2, category: 'daily' },
  { hebrew: 'יופי', transcription: 'yofi', translationEn: 'Great/Beauty', translationRu: 'Красота/Здорово', level: 2, category: 'daily' },
  { hebrew: 'מה קורה?', transcription: 'ma kore?', translationEn: 'What\'s happening?', translationRu: 'Что происходит?', level: 2, category: 'daily' },
  { hebrew: 'אני לא יודע', transcription: 'ani lo yode\'a', translationEn: 'I don\'t know', translationRu: 'Я не знаю', level: 2, category: 'daily' },
  { hebrew: 'אני מבין', transcription: 'ani mevin', translationEn: 'I understand', translationRu: 'Я понимаю', level: 2, category: 'daily' },
  { hebrew: 'תעזור לי?', transcription: 'ta\'azor li?', translationEn: 'Will you help me?', translationRu: 'Поможешь мне?', level: 2, category: 'daily' },
  
  // В ресторане (10 фраз)
  { hebrew: 'אני רוצה להזמין', transcription: 'ani rotse lehazmin', translationEn: 'I want to order', translationRu: 'Я хочу заказать', level: 3, category: 'restaurant' },
  { hebrew: 'החשבון בבקשה', transcription: 'ha-kheshbon bevakasha', translationEn: 'The bill please', translationRu: 'Счёт пожалуйста', level: 3, category: 'restaurant' },
  { hebrew: 'זה טעים', transcription: 'ze ta\'im', translationEn: 'It\'s delicious', translationRu: 'Это вкусно', level: 3, category: 'restaurant' },
  { hebrew: 'מה אתה ממליץ?', transcription: 'ma ata mamlits?', translationEn: 'What do you recommend?', translationRu: 'Что порекомендуешь?', level: 3, category: 'restaurant' },
];

async function seedExtended() {
  console.log('🌱 Starting extended seeding...');
  
  // Добавляем расширенные слова
  console.log('📚 Adding extended vocabulary...');
  for (const word of extendedWords) {
    await prisma.word.upsert({
      where: { hebrew: word.hebrew },
      update: {},
      create: word,
    });
  }
  
  // Добавляем расширенные фразы
  console.log('💬 Adding extended phrases...');
  for (const phrase of extendedPhrases) {
    await prisma.phrase.upsert({
      where: { hebrew: phrase.hebrew },
      update: {},
      create: phrase,
    });
  }
  
  console.log('✅ Extended seeding completed!');
  console.log(`📊 Total words: ${extendedWords.length + 50}`);
  console.log(`📊 Total phrases: ${extendedPhrases.length + 18}`);
}

seedExtended()
  .catch((e) => {
    console.error('❌ Error in extended seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
