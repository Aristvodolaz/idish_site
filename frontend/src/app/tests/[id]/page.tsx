'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { testsApi } from '@/lib/api';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function TestTakePage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAuthStore();
  const [test, setTest] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [startTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const questions: Question[] = Array.isArray(test?.questionsJson)
    ? test.questionsJson
    : [];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadTest();
  }, [isAuthenticated, router, params.id]);

  const loadTest = async () => {
    try {
      const { data } = await testsApi.getById(params.id as string);
      setTest(data);
      setAnswers(new Array(Array.isArray(data?.questionsJson) ? data.questionsJson.length : 0).fill(-1));
    } catch (error) {
      console.error('Failed to load test:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setAnswer = (choiceIndex: number) => {
    const next = [...answers];
    next[currentIndex] = choiceIndex;
    setAnswers(next);
  };

  const handleSubmit = async () => {
    const correct = answers.reduce(
      (acc, userAnswer, i) =>
        userAnswer === questions[i]?.correctAnswer ? acc + 1 : acc,
      0
    );
    const score = questions.length ? Math.round((correct / questions.length) * 100) : 0;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    setIsSubmitting(true);
    try {
      await testsApi.submitResult(params.id as string, {
        score,
        answers: answers.map((a, i) => ({
          questionIndex: i,
          selectedAnswer: a,
          correct: a === questions[i]?.correctAnswer,
        })),
        timeSpent,
      });
      router.push(
        `/tests/${params.id}/result?score=${score}&passed=${score >= (test?.passingScore ?? 70)}`
      );
    } catch (error) {
      console.error('Failed to submit test:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Загрузка теста...</div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Тест не найден</h2>
          <Link href="/tests" className="text-blue-600 hover:underline">
            ← К списку тестов
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const canSubmit = questions.length > 0 && answers.every((a) => a >= 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/tests" className="text-blue-600 hover:text-blue-700">
            ← Назад
          </Link>
          <h1 className="text-xl font-bold text-gray-900">
            {test.titleRu || test.titleEn}
          </h1>
          <span className="text-sm text-gray-600">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {questions.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-gray-600 mb-4">В этом тесте нет вопросов.</p>
            <Link href="/tests" className="text-blue-600 hover:underline">
              ← К списку тестов
            </Link>
          </div>
        ) : currentQuestion ? (
          <>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {currentIndex + 1}. {currentQuestion.question}
              </h2>
              <div className="space-y-3">
                {currentQuestion.options?.map((opt: string, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAnswer(idx)}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition ${
                      answers[currentIndex] === idx
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              {currentIndex > 0 && (
                <button
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  ← Назад
                </button>
              )}
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Далее →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Отправка...' : 'Завершить тест'}
                </button>
              )}
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
