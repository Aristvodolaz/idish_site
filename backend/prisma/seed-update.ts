import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateSeed() {
    console.log('Updating letters with transcription in translation...');
    const lettersUpdates = [
        { hebrew: 'א', exampleTrans: 'father (aba)' },
        { hebrew: 'ב', exampleTrans: 'house (bayit)' },
        { hebrew: 'ג', exampleTrans: 'garden (gan)' },
        { hebrew: 'ד', exampleTrans: 'door (delet)' },
        { hebrew: 'ה', exampleTrans: 'mountain (har)' },
        { hebrew: 'ו', exampleTrans: 'rose (vered)' },
        { hebrew: 'ז', exampleTrans: 'time (zman)' },
        { hebrew: 'ח', exampleTrans: 'milk (khalav)' },
        { hebrew: 'ט', exampleTrans: 'good (tov)' },
        { hebrew: 'י', exampleTrans: 'hand (yad)' },
        { hebrew: 'כ', exampleTrans: 'dog (kelev)' },
        { hebrew: 'ל', exampleTrans: 'heart (lev)' },
        { hebrew: 'מ', exampleTrans: 'water (mayim)' },
        { hebrew: 'נ', exampleTrans: 'candle (ner)' },
        { hebrew: 'ס', exampleTrans: 'book (sefer)' },
        { hebrew: 'ע', exampleTrans: 'eye (ayin)' },
        { hebrew: 'פ', exampleTrans: 'mouth (pe)' },
        { hebrew: 'צ', exampleTrans: 'color (tseva)' },
        { hebrew: 'ק', exampleTrans: 'voice (kol)' },
        { hebrew: 'ר', exampleTrans: 'leg (regel)' },
        { hebrew: 'ש', exampleTrans: 'peace (shalom)' },
        { hebrew: 'ת', exampleTrans: 'tea (te)' },
    ];

    for (const l of lettersUpdates) {
        await prisma.letter.updateMany({
            where: { hebrew: l.hebrew },
            data: { exampleTrans: l.exampleTrans }
        });
    }

    console.log('Updating/Creating tests in Russian...');
    // Delete old tests to prevent duplicates for this demo
    await prisma.test.deleteMany();

    await prisma.test.create({
        data: {
            title: 'Тест на алфавит',
            titleEn: 'Alphabet Test',
            titleRu: 'Тест на алфавит',
            description: 'Проверьте свои знания ивритских букв',
            type: 'multiple_choice',
            level: 1,
            questionsJson: [
                {
                    question: 'Какая первая буква ивритского алфавита?',
                    options: ['א', 'ב', 'ג', 'ד'],
                    correctAnswer: 0,
                },
                {
                    question: 'Как произносится буква ש?',
                    options: ['t', 'sh/s', 'k', 'r'],
                    correctAnswer: 1,
                },
                {
                    question: 'Какая буква обозначает звук "m"?',
                    options: ['נ', 'מ', 'ל', 'ס'],
                    correctAnswer: 1,
                },
                {
                    question: 'Какая из этих букв не произносится (тихая)?',
                    options: ['ע', 'ר', 'ק', 'פ'],
                    correctAnswer: 0,
                },
                {
                    question: 'Как пишется буква, которая читается как "v" или "b"?',
                    options: ['ב', 'ו', 'פ', 'מ'],
                    correctAnswer: 0,
                }
            ],
            passingScore: 70,
            isPublished: true,
        },
    });

    await prisma.test.create({
        data: {
            title: 'Тест на базовые слова',
            titleEn: 'Basic Words Test',
            titleRu: 'Тест на базовые слова',
            description: 'Проверьте свои знания базовых слов',
            type: 'multiple_choice',
            level: 1,
            questionsJson: [
                {
                    question: 'Как сказать "Привет/Мир" на иврите?',
                    options: ['תודה', 'שלום', 'להתראות', 'כן'],
                    correctAnswer: 1,
                },
                {
                    question: 'Как будет "Семья" (Отец)?',
                    options: ['אמא', 'בן', 'אבא', 'אח'],
                    correctAnswer: 2,
                },
                {
                    question: 'Переведите слово "מים" (mayim)',
                    options: ['хлеб', 'молоко', 'вода', 'чай'],
                    correctAnswer: 2,
                },
                {
                    question: 'Как переводится "תודה"?',
                    options: ['пожалуйста', 'спасибо', 'извините', 'привет'],
                    correctAnswer: 1,
                },
                {
                    question: 'Как сказать "Нет" на иврите?',
                    options: ['לא (lo)', 'כן (ken)', 'טוב (tov)', 'רע (ra)'],
                    correctAnswer: 0,
                }
            ],
            passingScore: 70,
            isPublished: true,
        },
    });

    console.log('Adding more grammar rules...');
    const newGrammar = [
        {
            title: 'The Definite Article in Hebrew',
            titleEn: 'The Definite Article',
            titleRu: 'Определенный артикль',
            contentEn: 'The definite article in Hebrew is the letter ה (He). It is attached as a prefix to the noun it defines. The vowel under it is generally patakh (a) and the consonant following it receives a dagesh hazak (strong dot).',
            contentRu: 'Определенный артикль в иврите — это буква ה (Хе). Она прикрепляется как префикс к существительному, которое она определяет.',
            examples: [
                { hebrew: 'ילד -> הילד', translation: 'boy -> the boy', explanation: 'Adding ה to a noun makes it definite.' }
            ],
            level: 1,
            order: 4,
        },
        {
            title: 'Plural nouns',
            titleEn: 'Plural Nouns',
            titleRu: 'Множественное число',
            contentEn: 'Masculine plural nouns generally end in ים (-im). Feminine plural nouns generally end in ות (-ot).',
            contentRu: 'Существительные мужского рода во множественном числе обычно заканчиваются на ים (-им). Женского рода — на ות (-от).',
            examples: [
                { hebrew: 'ספר -> ספרים', translation: 'book -> books', explanation: 'Masculine' },
                { hebrew: 'מחברת -> מחברות', translation: 'notebook -> notebooks', explanation: 'Feminine' }
            ],
            level: 1,
            order: 5,
        }
    ];
    for (const g of newGrammar) {
        await prisma.grammar.create({ data: g });
    }

    console.log('Update complete!');
}

updateSeed()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
