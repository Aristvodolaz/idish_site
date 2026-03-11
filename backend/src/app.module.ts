import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { WordsModule } from './modules/words/words.module';
import { PhrasesModule } from './modules/phrases/phrases.module';
import { GrammarModule } from './modules/grammar/grammar.module';
import { LettersModule } from './modules/letters/letters.module';
import { TestsModule } from './modules/tests/tests.module';
import { ProgressModule } from './modules/progress/progress.module';
import { AiModule } from './modules/ai/ai.module';
import { StatisticsModule } from './modules/statistics/statistics.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.THROTTLE_TTL) || 60,
        limit: parseInt(process.env.THROTTLE_LIMIT) || 10,
      },
    ]),

    // Database
    PrismaModule,

    // Feature modules
    AuthModule,
    UsersModule,
    LessonsModule,
    WordsModule,
    PhrasesModule,
    GrammarModule,
    LettersModule,
    TestsModule,
    ProgressModule,
    AiModule,
    StatisticsModule,
  ],
})
export class AppModule {}
