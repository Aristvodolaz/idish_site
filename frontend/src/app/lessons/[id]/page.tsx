'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { lessonsApi, progressApi, lettersApi } from '@/lib/api';

export default function LessonDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAuthStore();
  const [lesson, setLesson] = useState<any>(null);
  const [letters, setLetters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadLesson();
  }, [isAuthenticated, router, params.id]);

  const loadLesson = async () => {
    setIsLoading(true);
    try {
      const { data } = await lessonsApi.getById(params.id as string);
      setLesson(data);
      if (data?.type === 'alphabet') {
        const { data: lettersData } = await lettersApi.getAll();
        setLetters(Array.isArray(lettersData) ? lettersData : []);
      }
    } catch (error) {
      console.error('Failed to load lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    try {
      await progressApi.updateProgress(params.id as string, {
        completed: true,
        score: 100,
        timeSpent,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Lesson not found
          </h2>
          <Link
            href="/lessons"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  const items =
    lesson.type === 'alphabet' && letters.length > 0
      ? letters.map((letter: any) => ({
          type: 'letter',
          data: {
            hebrew: letter.hebrew,
            transcription: letter.transcription,
            translationEn: letter.name,
            translationRu: letter.name,
            pronunciation: letter.pronunciation,
            exampleWord: letter.exampleWord,
            exampleTrans: letter.exampleTrans,
          },
        }))
      : [
          ...(lesson.lessonWords?.map((lw: any) => ({ type: 'word', data: lw.word })) || []),
          ...(lesson.lessonPhrases?.map((lp: any) => ({ type: 'phrase', data: lp.phrase })) || []),
        ];

  const currentItem = items[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/lessons" className="text-blue-600 hover:text-blue-700">
            ← Назад к Урокам
          </Link>
          <h1 className="text-xl font-bold text-gray-900">{lesson.titleRu || lesson.titleEn}</h1>
          <div className="text-sm text-gray-600">
            {currentIndex + 1} / {items.length}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / items.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {items.length === 0 ? (
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Содержание урока скоро появится
            </h2>
            <p className="text-gray-600 mb-6">
              Этот урок находится в разработке
            </p>
            <button
              onClick={() => router.push('/lessons')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Назад к Урокам
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg p-12 text-center mb-8">
              {currentItem && (
                <>
                  <div className="text-7xl font-bold hebrew-text mb-4 text-blue-600">
                    {currentItem.data.hebrew}
                  </div>
                  <div className="text-2xl text-gray-500 mb-2">
                    {currentItem.data.transcription}
                  </div>
                  {currentItem.type === 'letter' && currentItem.data.pronunciation && (
                    <div className="text-lg text-gray-400 mb-4">
                      Произношение: {currentItem.data.pronunciation}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-gray-700 mb-1">
                    {currentItem.data.translationEn}
                  </div>
                  <div className="text-xl text-gray-600 mb-2">
                    {currentItem.data.translationRu}
                  </div>
                  {currentItem.type === 'letter' && currentItem.data.exampleWord && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="text-sm text-gray-500 mb-1">Пример слова</div>
                      <div className="text-2xl hebrew-text font-semibold">
                        {currentItem.data.exampleWord}
                      </div>
                      <div className="text-gray-600">{currentItem.data.exampleTrans}</div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              {currentIndex > 0 && (
                <button
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  ← Назад
                </button>
              )}
              {currentIndex < items.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Далее →
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="flex-1 bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Завершить Урок ✓
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
