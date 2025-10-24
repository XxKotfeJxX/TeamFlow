import Header from "../components/Header";
import Footer from "../components/Footer";
import { Code } from "lucide-react";
import { motion } from "framer-motion";
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
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 text-gray-800">
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        </motion.div>

        <main className="relative z-10 flex-1 max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-24">
          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {td("title")}
            </h1>
          </motion.section>

          <div className="space-y-10">
            {docsSections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Code className="text-blue-600 w-6 h-6" />
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                </div>
                <p className="text-gray-700 mb-5">{section.description}</p>
                <pre className="bg-gray-100/80 text-sm md:text-base p-4 rounded-xl overflow-x-auto font-mono text-gray-800 shadow-inner">
                  <code>{section.example}</code>
                </pre>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16 text-gray-600"
          >
            <p>
              {td("version")}: <b>v1.0</b>
            </p>
          </motion.div>
        </main>
      </div>
      <Footer />
    </>
  );
}
