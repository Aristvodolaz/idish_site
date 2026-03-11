import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const DATA_DIR = path.join(__dirname, 'data');

function loadLocal(filename: string): any[] {
    try {
        return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8'));
    } catch {
        return [];
    }
}

async function seedData() {
    console.log('Seeding from JSON files...');

    const words = loadLocal('words.json');
    if (words.length > 0) {
        console.log(`Seeding ${words.length} words...`);
        const created = await prisma.word.createMany({
            data: words.map(w => ({
                hebrew: w.hebrew,
                transcription: w.transcription,
                translationEn: w.translationEn,
                translationRu: w.translationRu,
                level: Number(w.level) || 1,
                category: w.category,
                exampleSentence: w.exampleSentence,
                exampleTransEn: w.exampleTransEn,
                exampleTransRu: w.exampleTransRu,
            })),
            skipDuplicates: true
        });
        console.log(`Created ${created.count} words.`);
    }

    const phrases = loadLocal('phrases.json');
    if (phrases.length > 0) {
        console.log(`Seeding ${phrases.length} phrases...`);
        const created = await prisma.phrase.createMany({
            data: phrases.map(p => ({
                hebrew: p.hebrew,
                transcription: p.transcription,
                translationEn: p.translationEn,
                translationRu: p.translationRu,
                level: Number(p.level) || 1,
                category: p.category,
                context: p.context,
            })),
            skipDuplicates: true
        });
        console.log(`Created ${created.count} phrases.`);
    }

    const dialogues = loadLocal('dialogues.json');
    if (dialogues.length > 0) {
        console.log(`Seeding ${dialogues.length} dialogues...`);
        let count = 0;
        for (const d of dialogues) {
            if (!d.title) continue;
            await prisma.dialogue.create({
                data: {
                    title: d.title,
                    titleEn: d.titleEn || d.title,
                    titleRu: d.titleRu || d.title,
                    level: Number(d.level) || 1,
                    category: d.category,
                    contentJson: d.contentJson || [],
                    vocabularyJson: d.vocabularyJson || [],
                }
            });
            count++;
        }
        console.log(`Created ${count} dialogues.`);
    }

    const grammar = loadLocal('grammar.json');
    if (grammar.length > 0) {
        console.log(`Seeding ${grammar.length} grammar rules...`);
        let count = 0;
        for (const g of grammar) {
            await prisma.grammar.create({
                data: {
                    title: g.title,
                    titleEn: g.titleEn || g.title,
                    titleRu: g.titleRu || g.title,
                    contentEn: g.contentEn || '',
                    contentRu: g.contentRu || '',
                    level: Number(g.level) || 1,
                    order: Number(g.order) || 1,
                    examples: g.examples || []
                }
            });
            count++;
        }
        console.log(`Created ${count} grammar rules.`);
    }

    const tests = loadLocal('tests.json');
    if (tests.length > 0) {
        console.log(`Seeding ${tests.length} tests...`);
        let count = 0;
        for (const t of tests) {
            await prisma.test.create({
                data: {
                    title: t.title,
                    titleEn: t.titleEn || t.title,
                    titleRu: t.titleRu || t.title,
                    description: t.description || '',
                    type: t.type || 'multiple_choice',
                    level: Number(t.level) || 1,
                    passingScore: Number(t.passingScore) || 70,
                    timeLimit: Number(t.timeLimit) || 15,
                    isPublished: t.isPublished || true,
                    questionsJson: t.questionsJson || []
                }
            });
            count++;
        }
        console.log(`Created ${count} tests.`);
    }

    console.log('✅ JSON seeding fully completed. (Data available in DB for lessons to be created from)');
}

if (require.main === module) {
    seedData()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}
