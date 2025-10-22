import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/Button";
import { VideoEmbed } from "../../components/ui/VideoEmbed";

export default function FocusPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      {/* Hero */}
      <section className="relative h-[420px] bg-gradient-to-r from-violet-600 to-indigo-500 text-white flex flex-col justify-center items-center text-center px-4">
        <img
          src="/images/focus.jpg"
          alt="Фокусування в команді"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Психологія фокусування: як не відволікатись у команді
          </h1>
          <p className="text-lg opacity-90">1 серпня 2025 · TeamFlow Team</p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 space-y-16 leading-relaxed">
        <section>
          <p className="text-lg text-gray-700 mb-6">
            В епоху постійних повідомлень, чатів і відеодзвінків головна
            суперсила — це фокус. Команди, які вміють концентруватися, досягають
            більшого з меншими зусиллями. У TeamFlow ми вирішили дослідити, як
            допомогти людям увійти в стан глибокої концентрації, навіть коли
            навколо кипить спільна робота.
          </p>
          <img
            src="/images/focus-team.jpg"
            alt="Зосереджена команда"
            className="rounded-xl mt-4 shadow-lg"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            1. Вхід у “зону фокусу”
          </h2>
          <p>
            Ми створили режим “Focus Mode” — 90 хвилин повного занурення без
            повідомлень і нагадувань. Система автоматично повідомляє команду, що
            ти зараз у фокусі, щоб уникнути переривань.
          </p>

          <VideoEmbed
            videoId="xm3YgoEiEDc"
            previewImage="/images/team-working.png"
            title="TeamFlow Focus Mode Demo"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Ритуали початку дня
          </h2>
          <p>
            Ми помітили, що короткий командний “check-in” на початку дня
            допомагає сфокусуватись на пріоритетах. TeamFlow дозволяє робити це
            прямо в календарі — позначай свої головні цілі на день, і система
            нагадає тобі про них перед стартом роботи.
          </p>
          <img
            src="/images/morning-checkin.png"
            alt="Ритуали фокусування"
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. Мікропаузи між задачами
          </h2>
          <p>
            Парадоксально, але щоб залишатись сфокусованим — потрібно вчасно
            розфокусуватись. TeamFlow пропонує короткі мікропаузи між задачами:
            розтяжка, подих, або просто зміна візуального контенту.
          </p>
          <img
            src="/images/microbreaks.png"
            alt="Мікропаузи між задачами"
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Візуальна тиша</h2>
          <p>
            Ми також переглянули сам інтерфейс. Мінімалізм у кольорах і
            структурі допомагає мозку обробляти менше шуму. У “Focus Mode”
            прибираються усі другорядні панелі, залишається лише те, що дійсно
            важливо — завдання, час, і мета.
          </p>
          <img
            src="/images/focus-ui.png"
            alt="Інтерфейс у режимі фокусу"
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            5. Командна культура спокою
          </h2>
          <p>
            Фокус — це не лише інструменти, а й культура. У TeamFlow ми
            експериментуємо з "quiet Fridays" — днем без зустрічей і чатів.
            Результат: на 27% більше виконаних задач і вдвічі менше перерваних
            спринтів.
          </p>
        </section>

        <section className="text-lg italic text-gray-600 border-l-4 border-violet-500 pl-4">
          <p>
            “Справжній фокус — це не вимушена ізоляція, а добровільний вибір
            бути присутнім у тому, що робиш. Ми лише допомагаємо створити для
            цього простір.”
          </p>
        </section>

        <div className="flex justify-center mt-12">
          <Button
            onClick={() => navigate("/blog")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            ← Повернутись до блогу
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
