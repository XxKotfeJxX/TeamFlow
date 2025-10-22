import Header from "../components/Header";
import Footer from "../components/Footer";
import { Code } from "lucide-react";

const docsSections = [
  {
    title: "🔑 Аутентифікація",
    description: "JWT токени, логін, реєстрація, оновлення токенів.",
    example: `POST /api/auth/login
{
  "email": "user@mail.com",
  "password": "******"
}`,
  },
  {
    title: "📅 Календар API",
    description:
      "Створення, редагування і видалення подій у командному календарі.",
    example: `GET /api/calendars/:id/events
Authorization: Bearer <token>`,
  },
  {
    title: "✅ Завдання",
    description: "Робота із задачами, дедлайнами і командними балами.",
    example: `POST /api/tasks
{
  "title": "Design mockups",
  "dueDate": "2025-10-21T18:00"
}`,
  },
  {
    title: "💬 Повідомлення",
    description: "Текстові чати з можливістю згадування користувачів.",
    example: `POST /api/messages
{
  "teamId": "team-1",
  "text": "@Maria please review my PR"
}`,
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Документація API
        </h1>

        <div className="space-y-10">
          {docsSections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <Code className="text-indigo-500 w-6 h-6" />
                <h2 className="text-2xl font-semibold">{section.title}</h2>
              </div>
              <p className="text-gray-700 mb-4">{section.description}</p>
              <pre className="bg-gray-100 text-sm p-4 rounded-lg overflow-x-auto">
                <code>{section.example}</code>
              </pre>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-gray-600">
          <p>
            Версія API: <b>v1.0</b>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
