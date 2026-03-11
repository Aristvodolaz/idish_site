'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useProgressStore } from '@/store/progressStore';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { flashcardStats, fetchFlashcardStats } = useProgressStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchFlashcardStats();
  }, [isAuthenticated, router, fetchFlashcardStats]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Ulpan AI</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              {user.firstName || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700"
            >
              Выход
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            С возвращением, {user.firstName || 'Студент'}!
          </h2>
          <p className="text-gray-600">Продолжайте изучать иврит</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-blue-600 text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold text-gray-900">
              {flashcardStats?.total || 0}
            </div>
            <div className="text-gray-600">Всего Слов</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-green-600 text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-gray-900">
              {flashcardStats?.learned || 0}
            </div>
            <div className="text-gray-600">Выучено</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-orange-600 text-3xl mb-2">⏰</div>
            <div className="text-2xl font-bold text-gray-900">
              {flashcardStats?.due || 0}
            </div>
            <div className="text-gray-600">На Повторение</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-purple-600 text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-gray-600">Дней Подряд</div>
          </div>
        </div>

        {/* Learning Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/lessons?type=alphabet"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">🔤</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Алфавит</h3>
            <p className="text-gray-600">
              Учите 22 буквы ивритского алфавита
            </p>
          </Link>

          <Link
            href="/learn-words"
            className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition text-white"
          >
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-2">Учить Слова</h3>
            <p className="text-green-50">
              Интерактивное изучение с карточками
            </p>
          </Link>

          <Link
            href="/lessons?type=vocabulary"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Словарь
            </h3>
            <p className="text-gray-600">Пополняйте словарный запас</p>
          </Link>

          <Link
            href="/lessons?type=phrase"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Фразы</h3>
            <p className="text-gray-600">Учите распространённые фразы</p>
          </Link>

          <Link
            href="/lessons?type=grammar"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Грамматика</h3>
            <p className="text-gray-600">Изучайте правила иврита</p>
          </Link>

          <Link
            href="/flashcards"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">🎴</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Карточки
            </h3>
            <p className="text-gray-600">Повторение с интервалами</p>
          </Link>

          <Link
            href="/ai-tutor"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Репетитор</h3>
            <p className="text-gray-600">Чат с AI учителем иврита</p>
          </Link>

          <Link
            href="/tests"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Тесты</h3>
            <p className="text-gray-600">Проверьте свои знания</p>
          </Link>

          <Link
            href="/statistics"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Статистика
            </h3>
            <p className="text-gray-600">Отслеживайте прогресс</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
