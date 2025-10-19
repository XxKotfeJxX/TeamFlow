import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/Card";
import { Calendar, CheckSquare, MessageSquare, Shield, Code, Cpu } from "lucide-react";

export default function FeaturesPage() {
  const sections = [
    {
      title: "Календар",
      icon: Calendar,
      points: [
        "Особистий і командний календар в одному місці.",
        "Перевірка конфліктів між подіями.",
        "Кольори, пріоритети, теги та підтвердження участі.",
      ],
    },
    {
      title: "Завдання",
      icon: CheckSquare,
      points: [
        "Таск-лісти на день, тиждень або спринт.",
        "Система балів і досягнень.",
        "Коментарі, дедлайни та спільна робота.",
      ],
    },
    {
      title: "Комунікація",
      icon: MessageSquare,
      points: [
        "Текстові чати для команд і проєктів.",
        "Миттєві повідомлення, згадки й реакції (у розробці).",
        "Без потреби сторонніх месенджерів.",
      ],
    },
    {
      title: "Безпека",
      icon: Shield,
      points: [
        "Аутентифікація через JWT токени.",
        "Хешування паролів і шифрування з’єднання.",
        "Розмежування доступу до приватних даних.",
      ],
    },
    {
      title: "Інтеграції",
      icon: Code,
      points: [
        "GitHub — автоматичне оновлення задач за комітами.",
        "Редактори коду — спільна робота в реальному часі (планується).",
        "Google Calendar, Slack — майбутні інтеграції.",
      ],
    },
    {
      title: "Технічний стек",
      icon: Cpu,
      points: [
        "Frontend: React + TypeScript",
        "Backend: C++",
        "Database: PostgreSQL 17",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Функції TeamFlow</h1>

        <div className="grid gap-8 max-w-6xl mx-auto px-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((s, i) => (
            <Card key={i} className="shadow-md hover:shadow-lg transition">
              <CardContent className="pt-8 pb-6">
                <s.icon className="w-10 h-10 text-indigo-600 mb-3" />
                <h3 className="text-xl font-medium mb-3">{s.title}</h3>
                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                  {s.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
