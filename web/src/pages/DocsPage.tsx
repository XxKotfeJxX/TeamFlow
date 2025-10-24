import Header from "../components/Header";
import Footer from "../components/Footer";
import { Code } from "lucide-react";
import { useTranslation } from "../components/useTranslations";

export default function DocsPage() {
  const { t } = useTranslation();
  const td = t("docs");

  const docsSections = [
    {
      title: td("authTitle"),
      description: td("authDesc"),
      example: `POST /api/auth/login
{
  "email": "user@mail.com",
  "password": "******"
}`,
    },
    {
      title: td("calendarTitle"),
      description: td("calendarDesc"),
      example: `GET /api/calendars/:id/events
Authorization: Bearer <token>`,
    },
    {
      title: td("tasksTitle"),
      description: td("tasksDesc"),
      example: `POST /api/tasks
{
  "title": "Design mockups",
  "dueDate": "2025-10-21T18:00"
}`,
    },
    {
      title: td("messagesTitle"),
      description: td("messagesDesc"),
      example: `POST /api/messages
{
  "teamId": "team-1",
  "text": "@Maria please review my PR"
}`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-10 text-center">{td("title")}</h1>

        <div className="space-y-10">
          {docsSections.map((section, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <Code className="text-indigo-500 w-6 h-6" />
                <h2 className="text-2xl font-semibold">{section.title}</h2>
              </div>
              <p className="text-gray-700 mb-4">{section.description}</p>
              <pre className="bg-gray-100 text-xs sm:text-sm p-4 rounded-lg overflow-x-auto max-w-full">
                <code>{section.example}</code>
              </pre>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-gray-600">
          <p>
            {td("version")}: <b>v1.0</b>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
