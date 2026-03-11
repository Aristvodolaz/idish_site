import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedGrammar() {
    console.log('Adding more grammar rules...');
    const grammarData = [
        {
            title: 'Personal Pronouns',
            titleEn: 'Personal Pronouns',
            titleRu: 'Личные местоимения',
            contentEn: 'Personal pronouns in Hebrew differ by gender in the 2nd and 3rd person singular and plural. Ani (I) and Anakhnu (We) are gender-neutral.',
            contentRu: 'Личные местоимения в иврите отличаются по роду во 2-м и 3-м лице единственного и множественного числа. Ани (Я) и Анахну (Мы) общие для обоих родов.',
            examples: [
                { hebrew: 'אני', translation: 'I', explanation: 'ani' },
                { hebrew: 'אתה', translation: 'You (masc. sg.)', explanation: 'ata' },
                { hebrew: 'את', translation: 'You (fem. sg.)', explanation: 'at' }
            ],
            level: 1,
            order: 6,
        },
        {
            title: 'Inseparable Prepositions',
            titleEn: 'Inseparable Prepositions',
            titleRu: 'Слитные предлоги',
            contentEn: 'In Hebrew, some prepositions consist of a single letter and are attached to the beginning of a word. Examples: ב (in/at), ל (to/for), מ (from), כ (like/as).',
            contentRu: 'В иврите некоторые предлоги состоят из одной буквы и пишутся слитно со следующим словом. Примеры: ב (в/на), ל (кому/к/для), מ (из/от), כ (как).',
            examples: [
                { hebrew: 'בבית', translation: 'in the house', explanation: 'b-bayit (ב + בית)' },
                { hebrew: 'לילד', translation: 'to the boy', explanation: 'l-yeled (ל + ילד)' }
            ],
            level: 1,
            order: 7,
        },
        {
            title: 'Smikhut (Construct State)',
            titleEn: 'Smikhut (Construct State)',
            titleRu: 'Смихут (Сопряженное состояние)',
            contentEn: 'Smikhut is used to express noun-noun relationships like "the X of Y". The first noun often changes its form, especially if it ends in "ה" or "ים".',
            contentRu: 'Смихут используется для соединения двух существительных (часто соответствует родительному падежу в русском). Первое слово может изменить окончание (например, ה меняется на ת).',
            examples: [
                { hebrew: 'עוגת שוקולד', translation: 'chocolate cake', explanation: 'uga (cake) -> ugat (cake of)' },
                { hebrew: 'בית ספר', translation: 'school (house of book)', explanation: 'bayit -> beit' }
            ],
            level: 2,
            order: 8,
        },
        {
            title: 'Past Tense Basics',
            titleEn: 'Past Tense Basics',
            titleRu: 'Начало работы с прошедшим временем',
            contentEn: 'In the past tense, verbs are conjugated by adding suffixes that indicate person, gender, and number. The root of the verb is the 3rd person masculine singular (he did).',
            contentRu: 'В прошедшем времени глаголы спрягаются путем добавления окончаний, указывающих на лицо, род и число. За основу берется форма 3-го лица ед.ч. м.р. (он делал).',
            examples: [
                { hebrew: 'למדתי', translation: 'I studied', explanation: 'lamad-ti' },
                { hebrew: 'הוא למד', translation: 'He studied', explanation: 'hu lamad' }
            ],
            level: 3,
            order: 9,
        },
        {
            title: 'Binyanim (Verb Stems)',
            titleEn: 'Binyanim (Verb Stems)',
            titleRu: 'Биньяны (Породы глаголов)',
            contentEn: 'Hebrew verbs are divided into seven groups called Binyanim. Each binyan has its own conjugation pattern and usually gives a specific meaning flavor to the root.',
            contentRu: 'Глаголы в иврите делятся на семь групп, называемых биньянами. Каждый биньян имеет свою модель спряжения и придает корню свой смысловой оттенок.',
            examples: [
                { hebrew: 'פָּעַל (Pa\'al)', translation: 'Simple active', explanation: 'e.g., kotev (writes)' },
                { hebrew: 'פִּעֵל (Pi\'el)', translation: 'Intensive active', explanation: 'e.g., medaber (speaks)' }
            ],
            level: 3,
            order: 10,
        }
    ];

    for (const g of grammarData) {
        await prisma.grammar.create({ data: g });
    }
    console.log('Grammar rules seeded successfully!');
}

seedGrammar()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
