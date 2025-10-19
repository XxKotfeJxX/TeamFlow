import Header from "../components/Header";
import Footer from "../components/Footer";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/Accordion";
import { Button } from "../components/ui/button";

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-10 text-center">Підтримка</h1>

        <section className="space-y-6 mb-12">
          <p className="text-center text-lg text-gray-700">
            Тут ти знайдеш відповіді на часті запитання або можеш звернутись безпосередньо до нашої команди.
          </p>
        </section>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>Як створити нову команду?</AccordionTrigger>
            <AccordionContent>
              Увійди у свій профіль, натисни <b>«Створити команду»</b> та введи назву. Потім можеш запросити учасників за email.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Як запросити користувача?</AccordionTrigger>
            <AccordionContent>
              У вкладці <b>«Команда»</b> обери опцію «Запросити» та введи email. Користувач отримає посилання для приєднання.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Як змінити часовий пояс у календарі?</AccordionTrigger>
            <AccordionContent>
              Перейди в <b>«Налаштування профілю»</b> → «Часова зона» і вибери свій регіон. Усі події автоматично синхронізуються.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-700 mb-4">Не знайшов відповіді?</p>
          <Button
            variant="default"
            onClick={() => (window.location.href = "mailto:support@teamflow.com")}
          >
            Написати в підтримку
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
