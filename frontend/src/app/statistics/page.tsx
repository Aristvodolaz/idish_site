'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { statisticsApi } from '@/lib/api';

export default function StatisticsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadStatistics();
  }, [isAuthenticated, router]);

  const loadStatistics = async () => {
    setIsLoading(true);
    try {
      const { data } = await statisticsApi.getMyStatistics();
      setStats(data);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Загрузка статистики...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Не удалось загрузить статистику</p>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            ← Назад
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            ← Назад
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Статистика</h1>
          <div className="w-32"></div>
        </div>
      </header>

      {/* Stats Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-blue-600 text-4xl mb-3">📚</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats?.completedLessons || 0}
            </div>
            <div className="text-gray-600">Уроков Пройдено</div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-green-600 text-4xl mb-3">✅</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats?.learnedWords || 0}
            </div>
            <div className="text-gray-600">Слов Выучено</div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-orange-600 text-4xl mb-3">🔥</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats?.currentStreak || 0}
            </div>
            <div className="text-gray-600">Дней Подряд</div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-purple-600 text-4xl mb-3">⏱️</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats?.totalStudyTime || 0}м
            </div>
            <div className="text-gray-600">Время Обучения</div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Прогресс Обучения
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Всего Слов</span>
                  <span className="font-semibold">{stats?.totalWords || 0}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{
                      width: `${
                        stats?.totalWords
                          ? ((stats?.learnedWords || 0) / stats.totalWords) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Прогресс Уроков</span>
                  <span className="font-semibold">
                    {stats?.completedLessons || 0} / {stats?.totalLessons || 0}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600"
                    style={{
                      width: `${
                        stats?.totalLessons
                          ? ((stats?.completedLessons || 0) / stats.totalLessons) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Достижения
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🎯</div>
                <div>
                  <div className="font-semibold text-gray-900">Первый Урок</div>
                  <div className="text-sm text-gray-600">
                    Пройди свой первый урок
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-3xl">🔥</div>
                <div>
                  <div className="font-semibold text-gray-900">7 Дней Подряд</div>
                  <div className="text-sm text-gray-600">
                    Занимайся 7 дней подряд
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-3xl">📚</div>
                <div>
                  <div className="font-semibold text-gray-900">100 Слов</div>
                  <div className="text-sm text-gray-600">Выучи 100 слов</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Streak Calendar */}
        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Дни Подряд
          </h2>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🔥</div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {stats?.currentStreak || 0} Дней
            </div>
            <div className="text-gray-600">
              Лучший результат: {stats?.longestStreak || 0} дней
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
