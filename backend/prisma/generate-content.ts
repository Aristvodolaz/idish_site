import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

function saveLocal(filename: string, data: any) {
    fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

function loadLocal(filename: string): any[] {
    try {
        return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8'));
    } catch {
        return [];
    }
}

async function generateBatch(prompt: string, maxTokens = 3000) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o', // using high capability model
        messages: [
            { role: 'system', content: 'You are an expert Hebrew linguist and educator. Output ONLY valid JSON array format. Do not add markdown like ```json, just return raw JSON array.' },
            { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: maxTokens,
    });

    const content = response.choices[0].message.content?.trim() || '[]';
    let cleanContent = content.replace(/^```json/g, '').replace(/```$/g, '').trim();
    return JSON.parse(cleanContent);
}

async function generateWords() {
    const filename = 'words.json';
    const existing = loadLocal(filename);
    console.log(`Current words: ${existing.length}/2000`);
    if (existing.length >= 2000) return;

    const batchSize = 100;
    const limit = Math.min(2000 - existing.length, batchSize);

    const existingWordsList = existing.map((w: any) => w.hebrew).slice(-100).join(', ');

    const prompt = `Generate a JSON array of exactly ${limit} useful Hebrew words (levels A1-A2). DO NOT include these recently added words: [${existingWordsList}].
  Each object MUST have:
  "hebrew": (string),
  "transcription": (string in latin letters),
  "translationEn": (string),
  "translationRu": (string),
  "level": (number, 1 or 2),
  "category": (string, like 'food', 'verbs', 'time', 'adjectives', 'work', etc),
  "exampleSentence": (string in hebrew),
  "exampleTransEn": (string),
  "exampleTransRu": (string)
  Ensure valid JSON format.`;

    try {
        const newWords = await generateBatch(prompt, 3500);
        if (!Array.isArray(newWords)) throw new Error("API did not return an array.");
        existing.push(...newWords);
        saveLocal(filename, existing);
        console.log(`+${newWords.length} words added.`);
    } catch (e) {
        console.error('Word generation failed:', e);
    }
}

async function generatePhrases() {
    const filename = 'phrases.json';
    const existing = loadLocal(filename);
    console.log(`Current phrases: ${existing.length}/500`);
    if (existing.length >= 500) return;

    const limit = Math.min(500 - existing.length, 50);
    const existingList = existing.map((p: any) => p.hebrew).slice(-50).join(', ');

    const prompt = `Generate a JSON array of exactly ${limit} useful Hebrew daily phrases. DO NOT include these: [${existingList}].
  Each object MUST have:
  "hebrew": (string),
  "transcription": (string),
  "translationEn": (string),
  "translationRu": (string),
  "level": (number 1 to 3),
  "category": (string, e.g., 'greetings', 'shopping', 'transport', 'medical', 'slang', 'work'),
  "context": (string explaining when to use it, in English)
  Ensure valid JSON format.`;

    try {
        const newPhrases = await generateBatch(prompt, 3500);
        existing.push(...newPhrases);
        saveLocal(filename, existing);
        console.log(`+${newPhrases.length} phrases added.`);
    } catch (e) {
        console.error('Phrase generation failed:', e);
    }
}

async function generateDialogues() {
    const filename = 'dialogues.json';
    const existing = loadLocal(filename);
    console.log(`Current dialogues: ${existing.length}/100`);
    if (existing.length >= 100) return;

    const limit = Math.min(100 - existing.length, 10);
    const prompt = `Generate a JSON array of exactly ${limit} short conversational Hebrew dialogues suitable for language learners.
  Each object MUST have:
  "title": (string, identifying the topic, e.g., 'At the market'),
  "titleEn": (string),
  "titleRu": (string),
  "level": (number 1 to 3),
  "category": (string),
  "contentJson": (an array of objects, each representing a line in dialogue with "speaker" (string), "hebrew" (string), "translationRu" (string), "transcription" (string)),
  "vocabularyJson": (an array of 3-5 objects for new words in this dialogue with "hebrew", "translationRu", "transcription")
  Ensure valid JSON.`;

    try {
        const newData = await generateBatch(prompt, 4000);
        existing.push(...newData);
        saveLocal(filename, existing);
        console.log(`+${newData.length} dialogues added.`);
    } catch (e) {
        console.error('Dialogue generation failed:', e);
    }
}

async function generateGrammar() {
    const filename = 'grammar.json';
    const existing = loadLocal(filename);
    console.log(`Current grammar logic: ${existing.length}/50`);
    if (existing.length >= 50) return;

    const limit = Math.min(50 - existing.length, 5);
    const existingTitles = existing.map((g: any) => g.title).join(', ');

    const prompt = `Generate a JSON array of exactly ${limit} unique Hebrew grammar rules/lessons. DO NOT duplicate these: [${existingTitles}].
  Each object MUST have:
  "title": (string),
  "titleEn": (string),
  "titleRu": (string),
  "contentEn": (string, detailed explanation of the rule),
  "contentRu": (string, detailed explanation),
  "level": (number 1 to 3),
  "order": (number, sequential logic),
  "examples": (array of 3 objects with "hebrew", "translation", "explanation" (in Russian))
  Ensure valid JSON array.`;

    try {
        const newData = await generateBatch(prompt, 3500);
        existing.push(...newData);
        saveLocal(filename, existing);
        console.log(`+${newData.length} grammar lessons added.`);
    } catch (e) {
        console.error('Grammar generation failed:', e);
    }
}

async function generateTests() {
    const filename = 'tests.json';
    const existing = loadLocal(filename);
    console.log(`Current tests: ${existing.length}/12`);
    if (existing.length >= 12) return;

    const limit = Math.min(12 - existing.length, 3);
    const prompt = `Generate a JSON array of exactly ${limit} Hebrew tests. 
  Each test corresponds roughly to 1 week of learning.
  Each object MUST have:
  "title": (string, e.g. 'Week 5 Test: Verbs and Food'),
  "titleEn": (string),
  "titleRu": (string),
  "description": (string in Russian),
  "type": (string, usually 'multiple_choice'),
  "level": (number 1-3),
  "passingScore": 70,
  "timeLimit": 15,
  "isPublished": true,
  "questionsJson": (array of 10 objects. Each object has "question" (string in Russian), "options" (array of 4 string options, mix of Hebrew/Russian depending on question), "correctAnswer" (number 0-3 index of correct option))
  Ensure valid JSON format.`;

    try {
        const newData = await generateBatch(prompt, 4000);
        existing.push(...newData);
        saveLocal(filename, existing);
        console.log(`+${newData.length} tests added.`);
    } catch (e) {
        console.error('Test generation failed:', e);
    }
}

async function main() {
    const iter = process.argv[2] ? parseInt(process.argv[2]) : 1;
    console.log(`Running generation, iteration: ${iter}`);
    await generateWords();
    await generatePhrases();
    await generateDialogues();
    await generateGrammar();
    await generateTests();
}

main().catch(console.error);
