import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AiService {
  private openai: OpenAI | null = null;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const apiKey = this.configService.get('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  // Chat with AI tutor
  async chat(userId: string, message: string, context?: string) {
    if (!this.openai) {
      throw new BadRequestException(
        'OpenAI API key is not configured. Add OPENAI_API_KEY to backend .env',
      );
    }

    // Get or create chat session
    let chat = await this.prisma.aiChat.findFirst({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });

    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [];

    // System prompt
    messages.push({
      role: 'system',
      content: `You are an expert Hebrew language tutor. Help students learn Hebrew by:
- Explaining words and phrases
- Teaching grammar rules
- Correcting mistakes
- Providing examples
- Encouraging practice
Always respond in a friendly and supportive manner. Use both Hebrew and the student's language (English or Russian) for explanations.`,
    });

    // Add context if provided
    if (context) {
      messages.push({
        role: 'system',
        content: `Context: ${context}`,
      });
    }

    // Add chat history (only role and content for OpenAI API)
    if (chat && chat.messages) {
      const history = chat.messages as any[];
      const last10 = history.slice(-10);
      for (const m of last10) {
        if (m && typeof m.role === 'string' && typeof m.content === 'string') {
          messages.push({ role: m.role, content: m.content });
        }
      }
    }

    // Add user message
    messages.push({
      role: 'user',
      content: message,
    });

    try {
      // Call OpenAI API
      const completion = await this.openai.chat.completions.create({
        model: this.configService.get('OPENAI_MODEL') || 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      const choice = completion.choices?.[0];
      const aiResponse = choice?.message?.content ?? 'No response from the tutor.';

      // Update chat history
      const updatedMessages = [
        ...(chat?.messages as any[] || []),
        { role: 'user', content: message, timestamp: new Date() },
        { role: 'assistant', content: aiResponse, timestamp: new Date() },
      ];

      if (chat) {
        await this.prisma.aiChat.update({
          where: { id: chat.id },
          data: {
            messages: updatedMessages,
            context,
          },
        });
      } else {
        await this.prisma.aiChat.create({
          data: {
            userId,
            messages: updatedMessages,
            context,
          },
        });
      }

      return {
        message: aiResponse,
        timestamp: new Date(),
      };
    } catch (err: any) {
      const msg = err?.message || String(err);
      if (msg.includes('API key') || msg.includes('401') || msg.includes('429')) {
        throw new BadRequestException(
          'Ошибка доступа к AI. Проверьте OPENAI_API_KEY в настройках сервера.',
        );
      }
      throw new BadRequestException(
        'Сервис AI временно недоступен. Попробуйте позже.',
      );
    }
  }

  private ensureOpenAI() {
    if (!this.openai) {
      throw new BadRequestException(
        'OpenAI API key is not configured. Add OPENAI_API_KEY to backend .env',
      );
    }
  }

  // Explain a Hebrew word or phrase
  async explainWord(word: string, targetLang: string = 'en') {
    this.ensureOpenAI();
    const prompt = targetLang === 'ru'
      ? `Объясни значение и использование ивритского слова "${word}". Дай перевод, транскрипцию и примеры использования.`
      : `Explain the meaning and usage of the Hebrew word "${word}". Provide translation, transcription, and usage examples.`;

    const completion = await this.openai.chat.completions.create({
      model: this.configService.get('OPENAI_MODEL') || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a Hebrew language expert.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 300,
    });

    return completion.choices[0].message.content;
  }

  // Correct user's Hebrew text
  async correctText(text: string, targetLang: string = 'en') {
    this.ensureOpenAI();
    const prompt = targetLang === 'ru'
      ? `Проверь и исправь ошибки в следующем ивритском тексте: "${text}". Объясни ошибки и дай правильный вариант.`
      : `Check and correct errors in the following Hebrew text: "${text}". Explain the mistakes and provide the correct version.`;

    const completion = await this.openai.chat.completions.create({
      model: this.configService.get('OPENAI_MODEL') || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a Hebrew language teacher who corrects student mistakes.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 400,
    });

    return completion.choices[0].message.content;
  }

  // Generate practice exercises
  async generateExercises(topic: string, level: number, targetLang: string = 'en') {
    this.ensureOpenAI();
    const prompt = targetLang === 'ru'
      ? `Создай 5 упражнений для изучения иврита на тему "${topic}" для уровня ${level}. Включи разные типы заданий.`
      : `Create 5 Hebrew learning exercises on the topic "${topic}" for level ${level}. Include different types of tasks.`;

    const completion = await this.openai.chat.completions.create({
      model: this.configService.get('OPENAI_MODEL') || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a Hebrew language curriculum designer.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 600,
    });

    return completion.choices[0].message.content;
  }

  // Get chat history
  async getChatHistory(userId: string) {
    const chats = await this.prisma.aiChat.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      take: 10,
    });

    return chats;
  }

  // Clear chat history
  async clearChatHistory(userId: string) {
    await this.prisma.aiChat.deleteMany({
      where: { userId },
    });

    return { message: 'Chat history cleared' };
  }
}
