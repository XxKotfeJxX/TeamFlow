import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/Accordion";
import { Button } from "../components/ui/Button";

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      {/* 🔹 основний контейнер з відступом зверху */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-900">
          Підтримка TeamFlow
        </h1>

        <section className="space-y-6 mb-12 text-center">
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Тут ти знайдеш відповіді на найпоширеніші запитання.  
            Якщо потрібна допомога — наша команда завжди поруч 💙
          </p>
        </section>

        {/* 🔹 FAQ */}
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>Як створити нову команду?</AccordionTrigger>
            <AccordionContent>
              Увійди у свій профіль, натисни <b>«Створити команду»</b> і введи її назву.
              Після цього можна запросити учасників за email.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Як запросити користувача?</AccordionTrigger>
            <AccordionContent>
              У вкладці <b>«Команда»</b> обери опцію «Запросити» та введи email.  
              Користувач отримає запрошення на пошту для приєднання.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Як змінити часовий пояс у календарі?</AccordionTrigger>
            <AccordionContent>
              Перейди в <b>«Налаштування профілю»</b> → «Часова зона»  
              і вибери свій регіон. Події автоматично синхронізуються.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Як змінити або скинути пароль?</AccordionTrigger>
            <AccordionContent>
              У формі входу натисни <b>«Забув пароль»</b>, введи свій email —  
              і ми надішлемо посилання для відновлення доступу.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Чому не приходить запрошення до команди?</AccordionTrigger>
            <AccordionContent>
              Перевір папку <b>“Спам”</b> у своїй пошті або попроси відправника  
              надіслати запрошення ще раз. Якщо проблема зберігається — напиши нам.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Чи можна використовувати TeamFlow безкоштовно?</AccordionTrigger>
            <AccordionContent>
              Так, базовий тариф <b>Base</b> повністю безкоштовний і включає основні функції:  
              календар, таски, чати та створення команд.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>Як оновити тариф до Pro або Enterprise?</AccordionTrigger>
            <AccordionContent>
              Перейди у вкладку <b>«Тарифи»</b> у верхньому меню та обери потрібний план.  
              Оплата виконується безпечно через вбудовану систему.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* 🔹 кнопка звернення */}
        <div className="text-center mt-16">
          <p className="text-gray-700 mb-4 text-lg">Не знайшов відповіді?</p>
          <Button
            onClick={() => (window.location.href = "mailto:support@teamflow.com")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl transition-transform hover:scale-105"
            style={{ border: "none" }}
          >
            Написати в підтримку
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
