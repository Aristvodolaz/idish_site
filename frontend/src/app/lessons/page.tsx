'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { lessonsApi } from '@/lib/api';

interface Lesson {
  id: string;
  title: string;
  titleEn: string;
  titleRu: string;
  description?: string;
  type: string;
  level: number;
  order: number;
}

export default function LessonsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>(
    searchParams.get('type') || 'all'
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadLessons();
  }, [isAuthenticated, router, selectedType]);

  const loadLessons = async () => {
    setIsLoading(true);
    try {
      const params = selectedType !== 'all' ? { type: selectedType } : {};
      const { data } = await lessonsApi.getAll(params);
      setLessons(data.lessons || []);
    } catch (error) {
      console.error('Failed to load lessons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const lessonTypes = [
    { id: 'all', name: 'Все Уроки', icon: '📚' },
    { id: 'alphabet', name: 'Алфавит', icon: '🔤' },
    { id: 'vocabulary', name: 'Словарь', icon: '📖' },
    { id: 'phrase', name: 'Фразы', icon: '💬' },
    { id: 'grammar', name: 'Грамматика', icon: '📝' },
  ];

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-green-100 text-green-800',
      'bg-blue-100 text-blue-800',
      'bg-yellow-100 text-yellow-800',
      'bg-orange-100 text-orange-800',
      'bg-red-100 text-red-800',
    ];
    return colors[level - 1] || colors[0];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            ← Назад
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Уроки</h1>
          <div className="w-32"></div>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {lessonTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                selectedType === type.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {type.icon} {type.name}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons Grid */}
      <main className="container mx-auto px-4 pb-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Loading lessons...</div>
          </div>
        ) : lessons.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Уроки не найдены
            </h2>
            <p className="text-gray-600">
              Уроки появятся здесь после публикации
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(
                      lesson.level
                    )}`}
                  >
                    Уровень {lesson.level}
                  </span>
                  <span className="text-2xl">
                    {lesson.type === 'alphabet' && '🔤'}
                    {lesson.type === 'vocabulary' && '📖'}
                    {lesson.type === 'phrase' && '💬'}
                    {lesson.type === 'grammar' && '📝'}
                    {lesson.type === 'mixed' && '🎯'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {lesson.titleRu || lesson.titleEn}
                </h3>

                {lesson.description && (
                  <p className="text-gray-600 text-sm mb-4">
                    {lesson.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 capitalize">{lesson.type}</span>
                  <span className="text-blue-600 font-semibold">
                    Начать Урок →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
