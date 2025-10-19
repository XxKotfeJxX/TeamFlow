import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/Card";
import { Calendar, CheckCircle, MessageSquare, Shield } from "lucide-react";

export default function OverviewPage() {
  const features = [
    {
      icon: Calendar,
      title: "Інтелектуальний календар",
      desc: "Плануй події без конфліктів між особистим і командним графіком.",
    },
    {
      icon: CheckCircle,
      title: "Мотиваційні задачі",
      desc: "Виконуй задачі, отримуй бали та прокачуй команду.",
    },
    {
      icon: MessageSquare,
      title: "Комунікація без шуму",
      desc: "Обговорюй усе вбудованими чатами без сторонніх месенджерів.",
    },
    {
      icon: Shield,
      title: "Безпечна платформа",
      desc: "JWT-токени, шифрування й контроль доступу гарантують захист.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 bg-gradient-to-b from-white to-gray-100">
          <h1 className="text-4xl font-bold mb-4">Командна робота без хаосу</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Календар, задачі, чати й дзвінки — усе в одному місці.  
            Працюй синхронно з командою будь-де.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg">Спробувати безкоштовно</Button>
            <Button size="lg" variant="outline">Демо-режим</Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <h2 className="text-3xl font-semibold text-center mb-12">Чому саме TeamFlow?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto px-6">
            {features.map((f, i) => (
              <Card key={i} className="text-center shadow-md">
                <CardContent className="pt-8 pb-6">
                  <f.icon className="w-10 h-10 mx-auto mb-4 text-indigo-600" />
                  <h3 className="text-xl font-medium mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-600 text-white text-center">
          <h2 className="text-3xl font-semibold mb-4">Готовий спробувати TeamFlow?</h2>
          <p className="text-indigo-100 mb-8">Почни працювати з командою ефективніше вже сьогодні.</p>
          <Button size="lg" variant="secondary">Приєднатися</Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
