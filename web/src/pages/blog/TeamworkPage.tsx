import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/Button";

export default function TeamworkPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      {/* Hero */}
      <section className="relative h-[420px] bg-gradient-to-r from-indigo-600 to-blue-500 text-white flex flex-col justify-center items-center text-center px-4">
        <img
          src="/images/Dashboard.png"
          alt="Командна робота"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            5 способів уникнути хаосу в командній роботі
          </h1>
          <p className="text-lg opacity-90">10 жовтня 2025 · TeamFlow Team</p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 space-y-16 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            1. Єдина точка правди для завдань
          </h2>
          <p>
            Найчастіша причина хаосу — коли кожен веде свій список справ:
            хтось у нотатках, хтось у Telegram, а хтось просто в голові.
            TeamFlow дозволяє створити спільний таск-лист із дедлайнами,
            пріоритетами та відповідальними. Це усуває плутанину та зберігає
            прозорість процесу.
          </p>
          <img
            src="/images/tasks-example.png"
            alt="Список завдань TeamFlow"
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Прозорий календар подій
          </h2>
          <p>
            Ми створили календар, який поєднує особисті та командні події. 
            Ти бачиш, коли колеги зайняті, і система автоматично попереджає про конфлікти.
            Кольори та теги допомагають швидко зорієнтуватись у пріоритетах.
          </p>
          <div className="aspect-video mt-6 rounded-xl overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/kYB8IZa5AuE"
              title="Календар TeamFlow демо"
              allowFullScreen
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. Асинхронна комунікація без шуму
          </h2>
          <p>
            Замість нескінченних чатів у месенджерах ми запровадили внутрішні
            треди з темами. Обговорення можна згортати, позначати як “вирішені”
            та повертатись до них у будь-який момент. Так команда не тоне у
            хаосі повідомлень.
          </p>
          <img
            src="/images/chat-clean.png"
            alt="Комунікація без шуму"
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. Візуальний прогрес і командні бали
          </h2>
          <p>
            У TeamFlow кожне виконане завдання додає команді бали. Це проста
            гейміфікація, що мотивує до результату. Ми навіть тестуємо систему
            сезонних челенджів — хто набере більше балів за місяць.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            5. Ритуали фокусування
          </h2>
          <p>
            Ми впровадили “режим тиші” — 90 хвилин без повідомлень, дзвінків і
            нотифікацій. Дослідження показують, що такий фокус підвищує
            ефективність роботи на 40%.
          </p>
          <img
            src="/images/focus.jpg"
            alt="Фокусування в роботі"
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        <section className="text-lg italic text-gray-600 border-l-4 border-indigo-500 pl-4">
          <p>
            “Уникнути хаосу можна лише тоді, коли команда бачить одну картину
            — завдання, події, комунікацію і результат. TeamFlow допомагає саме в цьому.”
          </p>
        </section>

        <div className="flex justify-center mt-12">
                  <Button
                      onClick={() => navigate("/blog")}
                      className="bg-blue-600 hover:bg-blue-700 text-white">
            ← Повернутись до блогу
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
