import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const letters = [
    { hebrew: 'א', name: 'Aleph', transcription: 'a/e/i/o/u/silent', pronunciation: 'Silent or Vowel', order: 1, exampleWord: 'אבא', exampleTrans: 'father (aba)' },
    { hebrew: 'ב', name: 'Bet/Vet', transcription: 'b/v', pronunciation: 'b as in boy / v as in van', order: 2, exampleWord: 'בית', exampleTrans: 'house (bayit)' },
    { hebrew: 'ג', name: 'Gimel', transcription: 'g', pronunciation: 'g as in girl', order: 3, exampleWord: 'גן', exampleTrans: 'garden (gan)' },
    { hebrew: 'ד', name: 'Dalet', transcription: 'd', pronunciation: 'd as in dog', order: 4, exampleWord: 'דלת', exampleTrans: 'door (delet)' },
    { hebrew: 'ה', name: 'He', transcription: 'h', pronunciation: 'h as in hat', order: 5, exampleWord: 'הר', exampleTrans: 'mountain (har)' },
    { hebrew: 'ו', name: 'Vav', transcription: 'v/o/u', pronunciation: 'v as in van / o / u', order: 6, exampleWord: 'ורד', exampleTrans: 'rose (vered)' },
    { hebrew: 'ז', name: 'Zayin', transcription: 'z', pronunciation: 'z as in zoo', order: 7, exampleWord: 'זמן', exampleTrans: 'time (zman)' },
    { hebrew: 'ח', name: 'Khet', transcription: 'kh', pronunciation: 'ch as in Bach', order: 8, exampleWord: 'חלב', exampleTrans: 'milk (khalav)' },
    { hebrew: 'ט', name: 'Tet', transcription: 't', pronunciation: 't as in tall', order: 9, exampleWord: 'טוב', exampleTrans: 'good (tov)' },
    { hebrew: 'י', name: 'Yod', transcription: 'y/i', pronunciation: 'y as in yes', order: 10, exampleWord: 'ילד', exampleTrans: 'boy (yeled)' },
    { hebrew: 'כ', name: 'Kaf/Khaf', transcription: 'k/kh', pronunciation: 'k as in kite / ch as in Bach', order: 11, exampleWord: 'כלב', exampleTrans: 'dog (kelev)' },
    { hebrew: 'ך', name: 'Khaf Sofit (Final Khaf)', transcription: 'kh', pronunciation: 'ch as in Bach (end of word)', order: 12, exampleWord: 'מלך', exampleTrans: 'king (melekh)' },
    { hebrew: 'ל', name: 'Lamed', transcription: 'l', pronunciation: 'l as in look', order: 13, exampleWord: 'לב', exampleTrans: 'heart (lev)' },
    { hebrew: 'מ', name: 'Mem', transcription: 'm', pronunciation: 'm as in mom', order: 14, exampleWord: 'מים', exampleTrans: 'water (mayim)' },
    { hebrew: 'ם', name: 'Mem Sofit (Final Mem)', transcription: 'm', pronunciation: 'm as in mom (end of word)', order: 15, exampleWord: 'ים', exampleTrans: 'sea (yam)' },
    { hebrew: 'נ', name: 'Nun', transcription: 'n', pronunciation: 'n as in no', order: 16, exampleWord: 'נר', exampleTrans: 'candle (ner)' },
    { hebrew: 'ן', name: 'Nun Sofit (Final Nun)', transcription: 'n', pronunciation: 'n as in no (end of word)', order: 17, exampleWord: 'בן', exampleTrans: 'son (ben)' },
    { hebrew: 'ס', name: 'Samekh', transcription: 's', pronunciation: 's as in sun', order: 18, exampleWord: 'ספר', exampleTrans: 'book (sefer)' },
    { hebrew: 'ע', name: 'Ayin', transcription: 'a/e/i/o/u/silent', pronunciation: 'Guttural stop / silent', order: 19, exampleWord: 'עין', exampleTrans: 'eye (ayin)' },
    { hebrew: 'פ', name: 'Pe/Fe', transcription: 'p/f', pronunciation: 'p as in pen / f as in far', order: 20, exampleWord: 'פה', exampleTrans: 'mouth (pe)' },
    { hebrew: 'ף', name: 'Fe Sofit (Final Fe)', transcription: 'f', pronunciation: 'f as in far (end of word)', order: 21, exampleWord: 'כסף', exampleTrans: 'money (kesef)' },
    { hebrew: 'צ', name: 'Tsadi', transcription: 'ts', pronunciation: 'ts as in cats', order: 22, exampleWord: 'צבע', exampleTrans: 'color (tseva)' },
    { hebrew: 'ץ', name: 'Tsadi Sofit (Final Tsadi)', transcription: 'ts', pronunciation: 'ts as in cats (end of word)', order: 23, exampleWord: 'עץ', exampleTrans: 'tree (ets)' },
    { hebrew: 'ק', name: 'Kof', transcription: 'k', pronunciation: 'k as in kite', order: 24, exampleWord: 'קול', exampleTrans: 'voice (kol)' },
    { hebrew: 'ר', name: 'Resh', transcription: 'r', pronunciation: 'r (guttural or rolled)', order: 25, exampleWord: 'רגל', exampleTrans: 'leg (regel)' },
    { hebrew: 'ש', name: 'Shin/Sin', transcription: 'sh/s', pronunciation: 'sh as in shoe / s as in sun', order: 26, exampleWord: 'שלום', exampleTrans: 'peace (shalom)' },
    { hebrew: 'ת', name: 'Tav', transcription: 't', pronunciation: 't as in tall', order: 27, exampleWord: 'תודה', exampleTrans: 'thanks (toda)' }
];

export async function seedAlphabet() {
    console.log('Seeding Hebrew alphabet including final (sofit) forms...');
    for (const letter of letters) {
        await prisma.letter.upsert({
            where: { hebrew: letter.hebrew },
            update: letter,
            create: letter,
        });
    }
    console.log('✅ Hebrew alphabet seeded successfully!');
}

if (require.main === module) {
    seedAlphabet()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}
