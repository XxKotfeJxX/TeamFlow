import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Про нас</h1>

        <section className="space-y-6 text-lg leading-relaxed">
          <p>
            Ми створюємо <strong>TeamFlow</strong> — платформу для командної роботи, 
            яка поєднує календар, завдання, чати та відео-дзвінки в одному місці.
          </p>
          <p>
            Ідея народилася з потреби зробити співпрацю в командах більш організованою 
            та зрозумілою. Ми віримо, що робочий процес має бути не хаотичним, 
            а мотивуючим і зручним.
          </p>
          <p>
            Наш фокус — <span className="font-medium">продуктивність, прозорість та простота</span>.  
            Ми прагнемо створювати інструменти, які надихають на ефективну співпрацю.
          </p>
        </section>

        <div className="text-center mt-12">
          <Button onClick={() => window.location.href = "/career"}>
            Приєднатися до нас
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
