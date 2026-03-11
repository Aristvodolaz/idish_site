import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Ulpan AI
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            Учите иврит с AI-репетитором
          </p>
          <p className="text-xl text-gray-500 mb-12">
            От алфавита до свободного владения - ваш личный путь изучения иврита
          </p>
          
          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Начать Бесплатно
            </Link>
            <Link
              href="/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              Войти
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🔤</div>
            <h3 className="text-xl font-bold mb-2">Изучение Алфавита</h3>
            <p className="text-gray-600">
              Освойте все 22 буквы иврита с интерактивными уроками и руководствами по произношению
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Словарный Запас</h3>
            <p className="text-gray-600">
              Учите важные слова и фразы с системой интервальных повторений
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Репетитор</h3>
            <p className="text-gray-600">
              Получайте персональную помощь, исправления и объяснения от AI репетитора
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">Разговорная Практика</h3>
            <p className="text-gray-600">
              Тренируйте разговорные навыки с интерактивными диалоговыми упражнениями
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-bold mb-2">Уроки Грамматики</h3>
            <p className="text-gray-600">
              Понимайте грамматику иврита с понятными объяснениями и примерами
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Отслеживание Прогресса</h3>
            <p className="text-gray-600">
              Следите за своим обучением с подробной статистикой и аналитикой
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center bg-blue-600 text-white p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Начните Учить Иврит Сегодня
          </h2>
          <p className="text-xl mb-8">
            Присоединяйтесь к тысячам студентов, изучающих иврит с AI
          </p>
          <Link
            href="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Создать Бесплатный Аккаунт
          </Link>
        </div>
      </div>
    </main>
  )
}
