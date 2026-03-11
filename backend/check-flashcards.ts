import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const count = await prisma.flashcard.count();
    console.log(`Flashcards in DB: ${count}`);
}
main().finally(() => prisma.$disconnect());
