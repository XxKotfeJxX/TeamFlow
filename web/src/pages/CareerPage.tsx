import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";

const roles = [
  {
    title: "Frontend Intern",
    description: "Розробка компонентів у React та оптимізація UI/UX.",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Backend Developer (C++)",
    description: "Розробка REST API, авторизації та обробки даних PostgreSQL.",
    tags: ["C++", "PostgreSQL", "JWT"],
  },
  {
    title: "QA Engineer",
    description: "Автоматизоване тестування клієнтських і серверних модулів.",
    tags: ["Testing", "Automation", "CI/CD"],
  },
];

export default function CareerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-6 pb-16 pt-28">
        <h1 className="text-4xl font-bold mb-8 text-center">Кар’єра</h1>

        <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          Ми шукаємо людей, які хочуть зростати разом із нами. Якщо тебе драйвить створення сучасних інструментів для командної роботи — долучайся до TeamFlow!
        </p>

        <div className="grid gap-8">
          {roles.map((role) => (
            <div
              key={role.title}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-2">{role.title}</h2>
              <p className="text-gray-600 mb-4">{role.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button
  onClick={() => (window.location.href = "mailto:hr@teamflow.com")}
  className="bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 px-6 py-3 text-lg rounded-xl transition-transform hover:scale-105"
  style={{ border: "none" }}
>
  Надіслати резюме
</Button>

            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
