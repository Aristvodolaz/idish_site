export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  interfaceLang: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Word {
  id: string;
  hebrew: string;
  transcription: string;
  translationEn: string;
  translationRu: string;
  audioUrl?: string;
  level: number;
  category?: string;
  exampleSentence?: string;
  exampleTransEn?: string;
  exampleTransRu?: string;
  imageUrl?: string;
}

export interface Phrase {
  id: string;
  hebrew: string;
  transcription: string;
  translationEn: string;
  translationRu: string;
  audioUrl?: string;
  level: number;
  category?: string;
  context?: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleEn: string;
  titleRu: string;
  description?: string;
  type: 'alphabet' | 'vocabulary' | 'phrase' | 'grammar' | 'mixed';
  level: number;
  order: number;
  contentJson?: any;
  isPublished: boolean;
  lessonWords?: Array<{
    word: Word;
    order: number;
  }>;
  lessonPhrases?: Array<{
    phrase: Phrase;
    order: number;
  }>;
}

export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  timeSpent: number;
  completedAt?: Date;
  lesson?: Lesson;
}

export interface Flashcard {
  id: string;
  userId: string;
  wordId: string;
  nextReview: Date;
  interval: number;
  easeFactor: number;
  repetitions: number;
  lastReview?: Date;
  word?: Word;
}

export interface Test {
  id: string;
  title: string;
  titleEn: string;
  titleRu: string;
  description?: string;
  type: 'multiple_choice' | 'fill_blank' | 'listening' | 'speaking';
  level: number;
  questionsJson: any;
  passingScore: number;
  timeLimit?: number;
}

export interface TestResult {
  id: string;
  userId: string;
  testId: string;
  score: number;
  answersJson: any;
  timeSpent: number;
  passed: boolean;
  completedAt: Date;
  test?: Test;
}

export interface Statistics {
  totalLessons: number;
  completedLessons: number;
  totalWords: number;
  learnedWords: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyTime: number;
  lastStudyDate?: Date;
  testsPassed?: number;
}

export interface AiMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}
