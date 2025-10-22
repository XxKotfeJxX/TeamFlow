import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { Users, Target, Rocket } from "lucide-react";

export default function AboutPage() {
  const highlights = [
    {
      icon: Users,
      title: "Спільна робота без хаосу",
      desc: "Ми прагнемо зробити командну співпрацю простою, зручною та прозорою.",
    },
    {
      icon: Target,
      title: "Фокус на результат",
      desc: "Кожна функція TeamFlow створена, щоб допомогти досягати цілей ефективніше.",
    },
    {
      icon: Rocket,
      title: "Натхнення до розвитку",
      desc: "Ми будуємо продукт, який мотивує команди рости та вдосконалюватися разом.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 text-gray-800 pt-28 pb-0 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Про TeamFlow</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Платформа для команд, які хочуть працювати разом, а не просто поруч.
        </p>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16">
        <section className="text-center space-y-6 text-lg leading-relaxed max-w-3xl mx-auto">
          <p>
            Ми створюємо <strong>TeamFlow</strong> — платформу для командної
            роботи, яка поєднує календар, завдання, чати та відео-дзвінки в
            одному просторі.
          </p>
          <p>
            Ідея з’явилася з бажання зробити співпрацю в командах більш
            організованою та зрозумілою. Ми віримо, що ефективна комунікація —
            це ключ до успіху будь-якого проєкту.
          </p>
          <p>
            Наш фокус —{" "}
            <span className="font-semibold">
              продуктивність, прозорість і простота
            </span>
            . Ми прагнемо створювати інструменти, які не перевантажують, а
            надихають.
          </p>
        </section>

        {/* Highlights */}
        <section className="grid md:grid-cols-3 gap-8 mt-16">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-transform text-center"
            >
              <item.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div className="text-center mt-20">
          <Button
            onClick={() => (window.location.href = "/career")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl transition-transform hover:scale-105"
            style={{ border: "none" }}
          >
            Приєднатися до команди
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
