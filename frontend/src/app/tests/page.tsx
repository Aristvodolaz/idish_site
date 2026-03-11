'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { testsApi } from '@/lib/api';

interface TestItem {
  id: string;
  title: string;
  titleEn: string;
  titleRu: string;
  description?: string;
  type: string;
  level: number;
  passingScore: number;
}

export default function TestsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [tests, setTests] = useState<TestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadTests();
  }, [isAuthenticated, router]);

  const loadTests = async () => {
    try {
      const { data } = await testsApi.getAll();
      setTests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load tests:', error);
      setTests([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Загрузка тестов...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            ← Назад
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Тесты</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {tests.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✍️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Тесты пока не добавлены
            </h2>
            <p className="text-gray-600 mb-6">
              Скоро здесь появятся тесты для проверки знаний
            </p>
            <Link
              href="/dashboard"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← На главную
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 max-w-2xl mx-auto">
            {tests.map((test) => (
              <Link
                key={test.id}
                href={`/tests/${test.id}`}
                className="block bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {test.titleRu || test.titleEn}
                </h3>
                {test.description && (
                  <p className="text-gray-600 text-sm mb-2">{test.description}</p>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Уровень {test.level}</span>
                  <span>•</span>
                  <span>Проходной балл: {test.passingScore}%</span>
                </div>
                <div className="mt-3 text-blue-600 font-semibold">
                  Пройти тест →
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
