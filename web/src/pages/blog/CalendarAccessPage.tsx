import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/Button";

export default function CalendarAccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      {/* Hero */}
      <section className="relative h-[420px] bg-gradient-to-r from-blue-600 to-teal-500 text-white flex flex-col justify-center items-center text-center px-4">
        <img
          src="/images/calendar.png"
          alt="Календар TeamFlow"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Як ми створили календар з подвійним рівнем доступу
          </h1>
          <p className="text-lg opacity-90">25 вересня 2025 · TeamFlow Team</p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 space-y-16 leading-relaxed">
        <section>
          <p className="text-lg text-gray-700 mb-6">
            У TeamFlow ми прагнули створити календар, який буде не просто
            списком подій, а інтелектуальним помічником команди. Головна ідея —
            дати користувачам змогу керувати **особистими** і **командними**
            подіями в одному місці, не жертвуючи приватністю.
          </p>
          <img
            src="/images/calendar-access-diagram.png"
            alt="Схема рівнів доступу"
            className="rounded-xl mt-4 shadow-lg"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            1. Два рівні видимості — прозоро, але без вторгнень
          </h2>
          <p>
            Ми розділили події на два рівні: <b>особисті</b> (видимі лише
            користувачу) і <b>командні</b> (спільні для всіх). При цьому
            календар дозволяє іншим бачити, що ти зайнятий, але не показує
            деталі приватної події. Це як «невидимий режим», але з повагою до
            колег.
          </p>
          <img
            src="/images/private-public-calendar.png"
            alt="Приватні та командні події"
            className="rounded-xl mt-6 shadow-md"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Автоматичне виявлення конфліктів
          </h2>
          <p>
            Якщо ти додаєш подію, що перетинається з іншою — система одразу
            сповістить. Це особливо корисно для великих команд: ніхто не
            призначить зустріч, коли ти на важливому дзвінку.
          </p>
          <div className="aspect-video mt-6 rounded-xl overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/MfIsunvTTQw"
              title="TeamFlow Calendar Access Demo"
              allowFullScreen
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. Кольори, теги та фільтри
          </h2>
          <p>
            Для зручності ми додали візуальні маркери — кольори та теги. Тепер
            ти можеш бачити, де “Work”, де “Personal”, а де “Focus time”.
            Фільтри дозволяють швидко перемикатися між поглядами, наприклад
            «Лише командні зустрічі» або «Мої події цього тижня».
          </p>
          <img
            src="/images/calendar-tags.png"
            alt="Кольори та теги подій"
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. Підтвердження участі
          </h2>
          <p>
            Коли хтось створює командну подію, усі учасники отримують запрошення
            у календар. Можна підтвердити участь або відхилити її. Це допомагає
            синхронізувати графіки без безкінечних чатів у стилі “Тобі зручно в
            п’ятницю?”
          </p>
          <img
            src="/images/calendar-confirmation.png"
            alt="Підтвердження участі"
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            5. Інтеграція з іншими інструментами
          </h2>
          <p>
            Ми плануємо інтеграцію календаря з GitHub, Google Calendar та
            Notion. Ідея — щоб усі твої зобов’язання збиралися в одному
            вікні TeamFlow, без необхідності перемикатись між платформами.
          </p>
        </section>

        <section className="text-lg italic text-gray-600 border-l-4 border-teal-500 pl-4">
          <p>
            “Календар — це не просто список подій. Це дзеркало твоєї уваги.
            І якщо правильно його організувати — команда працює як годинник.”
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
