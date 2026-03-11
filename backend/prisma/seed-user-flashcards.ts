import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedUserFlashcards() {
    console.log('Seeding default user and flashcards...');

    const email = 'test@ulpan.ai';
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        const passwordHash = await bcrypt.hash('password123', 10);
        user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                firstName: 'Test',
                lastName: 'User',
                interfaceLang: 'ru'
            }
        });
        console.log(`User created: ${email} (pass: password123)`);
    } else {
        console.log(`User already exists: ${email}`);
    }

    // Assign flashcards if none exist
    const flashcardCount = await prisma.flashcard.count({ where: { userId: user.id } });
    if (flashcardCount === 0) {
        const words = await prisma.word.findMany({ take: 50 });
        console.log(`Found ${words.length} words to add to flashcards...`);

        // Get tomorrow for next review
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const data = words.map((w, index) => ({
            userId: user.id,
            wordId: w.id,
            nextReview: tomorrow,
            interval: 1,
            easeFactor: 2.5,
            repetitions: 0,
            lastReview: new Date()
        }));

        const result = await prisma.flashcard.createMany({
            data,
            skipDuplicates: true
        });

        console.log(`Created ${result.count} flashcards for test user!`);
    } else {
        console.log(`User already has ${flashcardCount} flashcards.`);
    }

    // Create user stats if missing
    let stat = await prisma.userStatistics.findUnique({ where: { userId: user.id } });
    if (!stat) {
        await prisma.userStatistics.create({
            data: {
                userId: user.id,
                totalWords: 50,
                learnedWords: 0
            }
        });
    }

    console.log('User and flashcards seeded successfully!');
}

seedUserFlashcards()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
