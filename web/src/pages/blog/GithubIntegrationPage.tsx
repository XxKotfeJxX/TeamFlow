import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/Button";

export default function GithubIntegrationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      {/* Hero */}
      <section className="relative h-[420px] bg-gradient-to-r from-gray-800 to-gray-700 text-white flex flex-col justify-center items-center text-center px-4">
        <img
          src="/images/github.jpg"
          alt="GitHub інтеграція"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            TeamFlow + GitHub: перша інтеграція вже працює
          </h1>
          <p className="text-lg opacity-90">3 вересня 2025 · TeamFlow Team</p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 space-y-16 leading-relaxed">
        <section>
          <p className="text-lg text-gray-700 mb-6">
            Ми запустили першу версію інтеграції з GitHub — тепер ти можеш
            бачити активність репозиторію, статус pull requests та комітів
            безпосередньо у TeamFlow. Це ще один крок до того, щоб твій робочий
            день не розривався між десятками вкладок.
          </p>
          <img
            src="/images/github-preview.png"
            alt="Інтеграція TeamFlow + GitHub"
            className="rounded-xl mt-4 shadow-lg"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            1. Коміти поруч із задачами
          </h2>
          <p>
            Ми синхронізували GitHub API із системою тасків TeamFlow. Тепер біля
            кожної задачі відображається, які коміти її стосуються. Якщо ти
            закрив задачу — TeamFlow автоматично перевірить, чи зміни вже
            запушені у відповідну гілку.
          </p>
          <img
            src="/images/github-commits.png"
            alt="Коміти в задачах TeamFlow"
            className="rounded-xl mt-6 shadow-md"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Pull Requests прямо у твоєму просторі
          </h2>
          <p>
            Ми додали панель “Pull Requests”, яка показує усі відкриті PR-и для
            твоєї команди. Можна залишати коментарі, бачити статус CI, та навіть
            приймати або відхиляти реквест без переходу на GitHub.
          </p>
          <div className="aspect-video mt-6 rounded-xl overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/xC9p4M6aMxs"
              title="TeamFlow GitHub Integration Demo"
              allowFullScreen
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. Сповіщення без шуму
          </h2>
          <p>
            Усі події GitHub — нові коміти, рев’ю, коментарі — відображаються у
            твоєму внутрішньому потоці активності. Ми фільтруємо лише релевантне:
            якщо подія не стосується тебе чи твоєї команди — ти її не побачиш.
          </p>
          <img
            src="/images/github-notifications.png"
            alt="GitHub сповіщення в TeamFlow"
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. Архітектура інтеграції
          </h2>
          <p>
            Для інтеграції ми використали офіційний GitHub REST API та
            webhook-и. Кожен запит проходить через наш <b>API Gateway</b> на
            C++, який обробляє авторизацію через OAuth 2.0, зберігає токен
            доступу користувача та кешує відповіді в PostgreSQL.
          </p>
          <pre className="bg-gray-900 text-green-300 text-sm rounded-xl p-4 mt-6 overflow-x-auto">
            {`POST /api/github/webhook
{
  "event": "pull_request",
  "repository": "teamflow/frontend",
  "status": "merged"
}`}
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            5. Плани на наступні інтеграції
          </h2>
          <p>
            Наступним кроком стане підтримка GitLab і Bitbucket. Ми хочемо
            зробити TeamFlow універсальним центром управління проєктами — де
            код, задачі, обговорення і календар живуть в одній екосистемі.
          </p>
        </section>

        <section className="text-lg italic text-gray-600 border-l-4 border-gray-600 pl-4">
          <p>
            “Інтеграція — це не про кількість кнопок. Це про те, наскільки менше
            часу ти витрачаєш на перемикання. GitHub + TeamFlow — саме про це.”
          </p>
        </section>

        <div className="flex justify-center mt-12">
          <Button onClick={() => navigate("/blog")} className="bg-blue-600 hover:bg-blue-700 text-white">
            ← Повернутись до блогу
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
