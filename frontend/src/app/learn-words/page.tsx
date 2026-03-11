'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { wordsApi, progressApi } from '@/lib/api';

interface Word {
  id: string;
  hebrew: string;
  transcription: string;
  translationEn: string;
  translationRu: string;
  category?: string;
  level: number;
}

export default function LearnWordsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadWords();
  }, [isAuthenticated, router]);

  const loadWords = async () => {
    setIsLoading(true);
    try {
      const { data } = await wordsApi.getAll({ limit: 20 });
      setWords(data.words || []);
    } catch (error) {
      console.error('Failed to load words:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowTranslation(false);
    }
  };

  const handleKnow = async () => {
    try {
      await progressApi.reviewFlashcard(words[currentIndex].id, 4); // 4 = Good
      setLearnedCount(learnedCount + 1);
      handleNext();
    } catch (e) {
      console.error(e);
      // Proceed even if network fails
      setLearnedCount(learnedCount + 1);
      handleNext();
    }
  };

  const handleDontKnow = async () => {
    try {
      await progressApi.reviewFlashcard(words[currentIndex].id, 1); // 1 = Hard/Again
      setShowTranslation(true);
    } catch (e) {
      console.error(e);
      setShowTranslation(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Загрузка слов...</div>
      </div>
    );
  }

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            ← Назад
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Учить Слова</h1>
          <div className="text-sm text-gray-600">
            {currentIndex + 1} / {words.length}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm font-semibold text-green-600">
              Выучено: {learnedCount}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        {words.length === 0 ? (
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Слова не найдены
            </h2>
            <p className="text-gray-600 mb-6">
              Добавьте слова в базу данных
            </p>
          </div>
        ) : currentWord ? (
          <>
            {/* Word Card */}
            <div
              className="bg-white rounded-2xl shadow-2xl p-12 mb-8 min-h-[400px] flex flex-col items-center justify-center cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {!isFlipped ? (
                <div className="text-center">
                  <div className="text-7xl font-bold hebrew-text mb-6 text-blue-600">
                    {currentWord.hebrew}
                  </div>
                  <div className="text-2xl text-gray-500 mb-4">
                    {currentWord.transcription}
                  </div>
                  {currentWord.category && (
                    <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {currentWord.category}
                    </div>
                  )}
                  <div className="mt-8 text-gray-400 text-sm">
                    Нажмите, чтобы увидеть перевод
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-600 mb-4">
                    {currentWord.translationRu}
                  </div>
                  <div className="text-3xl text-gray-600 mb-6">
                    {currentWord.translationEn}
                  </div>
                  <div className="text-2xl text-gray-400 mb-4">
                    {currentWord.transcription}
                  </div>
                  <div className="text-4xl hebrew-text text-gray-500">
                    {currentWord.hebrew}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {!showTranslation ? (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleDontKnow}
                  className="bg-red-500 text-white py-6 rounded-xl font-bold text-xl hover:bg-red-600 transition shadow-lg"
                >
                  ❌ Не знаю
                </button>
                <button
                  onClick={handleKnow}
                  className="bg-green-500 text-white py-6 rounded-xl font-bold text-xl hover:bg-green-600 transition shadow-lg"
                >
                  ✓ Знаю
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-900 mb-2">
                    {currentWord.translationRu}
                  </div>
                  <div className="text-xl text-blue-700">
                    {currentWord.translationEn}
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-blue-600 text-white py-6 rounded-xl font-bold text-xl hover:bg-blue-700 transition shadow-lg"
                >
                  Следующее Слово →
                </button>
              </div>
            )}

            {/* Hint */}
            <div className="mt-6 text-center text-gray-500 text-sm">
              Совет: Нажмите на карточку, чтобы перевернуть её
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Отличная работа!
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              Вы прошли все {words.length} слов
            </p>
            <p className="text-lg text-green-600 font-semibold mb-8">
              Выучено: {learnedCount} из {words.length}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setLearnedCount(0);
                  setShowTranslation(false);
                  setIsFlipped(false);
                }}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
              >
                🔄 Повторить
              </button>
              <Link
                href="/dashboard"
                className="bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-300 transition inline-block"
              >
                Вернуться на главную
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
