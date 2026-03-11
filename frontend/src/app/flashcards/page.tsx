'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { progressApi } from '@/lib/api';

interface FlashcardData {
  id: string;
  wordId: string;
  word: {
    id: string;
    hebrew: string;
    transcription: string;
    translationEn: string;
    translationRu: string;
  };
}

export default function FlashcardsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, due: 0, learned: 0 });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadFlashcards();
    loadStats();
  }, [isAuthenticated, router]);

  const loadFlashcards = async () => {
    setIsLoading(true);
    try {
      const { data } = await progressApi.getDueFlashcards(20);
      setFlashcards(data);
    } catch (error) {
      console.error('Failed to load flashcards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const { data } = await progressApi.getFlashcardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleReview = async (quality: number) => {
    if (currentIndex >= flashcards.length) return;

    const currentCard = flashcards[currentIndex];

    try {
      await progressApi.reviewFlashcard(currentCard.wordId || currentCard.word.id, quality);
      
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
      } else {
        loadFlashcards();
        setCurrentIndex(0);
        setIsFlipped(false);
      }
      
      loadStats();
    } catch (error) {
      console.error('Failed to review flashcard:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading flashcards...</div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            ← Назад
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Карточки</h1>
          <div className="w-32"></div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Всего Карточек</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.due}</div>
            <div className="text-sm text-gray-600">На Сегодня</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-green-600">{stats.learned}</div>
            <div className="text-sm text-gray-600">Выучено</div>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {flashcards.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Всё повторено!
            </h2>
            <p className="text-gray-600 mb-6">
              Вы повторили все карточки на сегодня. Возвращайтесь позже для новых повторений.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              На Главную
            </Link>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="mb-4 text-center text-gray-600">
              Карточка {currentIndex + 1} из {flashcards.length}
            </div>

            {/* Card */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-white rounded-xl shadow-lg p-12 cursor-pointer hover:shadow-xl transition min-h-[400px] flex flex-col items-center justify-center"
            >
              {!isFlipped ? (
                <div className="text-center">
                  <div className="text-6xl font-bold hebrew-text mb-4">
                    {currentCard.word.hebrew}
                  </div>
                  <div className="text-xl text-gray-500 mb-8">
                    {currentCard.word.transcription}
                  </div>
                  <div className="text-sm text-gray-400">
                    Нажмите, чтобы увидеть перевод
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {currentCard.word.translationEn}
                  </div>
                  <div className="text-2xl text-gray-600 mb-8">
                    {currentCard.word.translationRu}
                  </div>
                  <div className="text-xl text-gray-400 mb-2">
                    {currentCard.word.transcription}
                  </div>
                  <div className="text-3xl hebrew-text text-gray-500">
                    {currentCard.word.hebrew}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            {isFlipped && (
              <div className="mt-6 grid grid-cols-4 gap-4">
                <button
                  onClick={() => handleReview(0)}
                  className="bg-red-500 text-white py-4 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  Снова
                </button>
                <button
                  onClick={() => handleReview(2)}
                  className="bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Сложно
                </button>
                <button
                  onClick={() => handleReview(3)}
                  className="bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  Хорошо
                </button>
                <button
                  onClick={() => handleReview(5)}
                  className="bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                  Легко
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
