'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { aiApi } from '@/lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AiTutorPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await aiApi.chat(input);
      const aiMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(data.timestamp),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            ← Назад
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">AI Репетитор Иврита</h1>
          <div className="w-32"></div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg h-[calc(100vh-200px)] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-12">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">
                  Привет! Я твой репетитор иврита
                </h3>
                <p>Задавай мне любые вопросы об иврите!</p>
                <div className="mt-8 grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <button
                    onClick={() =>
                      setInput('Как сказать "привет" на иврите?')
                    }
                    className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-left"
                  >
                    <div className="font-semibold text-blue-900 mb-1">
                      Приветствия
                    </div>
                    <div className="text-sm text-gray-600">
                      Научись здороваться
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      setInput('Объясни ивритский алфавит')
                    }
                    className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-left"
                  >
                    <div className="font-semibold text-blue-900 mb-1">
                      Алфавит
                    </div>
                    <div className="text-sm text-gray-600">
                      Изучи буквы иврита
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      setInput('В чём разница между ב и ו?')
                    }
                    className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-left"
                  >
                    <div className="font-semibold text-blue-900 mb-1">
                      Различия Букв
                    </div>
                    <div className="text-sm text-gray-600">
                      Сравни похожие буквы
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      setInput('Как работают глаголы в иврите?')
                    }
                    className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-left"
                  >
                    <div className="font-semibold text-blue-900 mb-1">
                      Грамматика
                    </div>
                    <div className="text-sm text-gray-600">
                      Пойми спряжение глаголов
                    </div>
                  </button>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === 'user'
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Задай любой вопрос об иврите..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
