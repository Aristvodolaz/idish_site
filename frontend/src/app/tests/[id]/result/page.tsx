'use client';

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function TestResultPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const score = searchParams.get('score') || '0';
  const passed = searchParams.get('passed') === 'true';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">{passed ? '🎉' : '📝'}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {passed ? 'Тест пройден!' : 'Тест не пройден'}
        </h1>
        <p className="text-4xl font-bold text-blue-600 mb-6">Ваш результат: {score}%</p>
        <p className="text-gray-600 mb-8">
          {passed
            ? 'Отличная работа! Продолжайте в том же духе.'
            : 'Повторите материал и попробуйте снова.'}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href={`/tests/${params.id}`}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
          >
            Пройти снова
          </Link>
          <Link
            href="/tests"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            К списку тестов
          </Link>
        </div>
      </div>
    </div>
  );
}
