import Header from "../components/Header";
import Footer from "../components/Footer";

const teamMembers = [
  {
    name: "Андрій Андрусевич",
    role: "Fullstack Developer",
    bio: "Займається архітектурою бекенду на C++ і інтеграцією з React-фронтендом.",
    avatar: "https://i.pravatar.cc/200?u=andriy",
  },
  {
    name: "Марія Коваль",
    role: "UI/UX Designer",
    bio: "Відповідає за дизайн інтерфейсу та зручність користування додатком.",
    avatar: "https://i.pravatar.cc/200?u=maria",
  },
  {
    name: "Іван Петренко",
    role: "Frontend Engineer",
    bio: "Розробляє інтерактивні компоненти на React та оптимізує продуктивність.",
    avatar: "https://i.pravatar.cc/200?u=ivan",
  },
];

export default function MyTeamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center">Наша команда</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((m) => (
            <div
              key={m.name}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <img
                src={m.avatar}
                alt={m.name}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{m.name}</h2>
              <p className="text-indigo-600 font-medium">{m.role}</p>
              <p className="text-sm text-gray-600 mt-3">{m.bio}</p>
            </div>
          ))}
        </div>

        <section className="mt-16 text-center text-lg">
          <h2 className="text-2xl font-semibold mb-4">Наш стек технологій</h2>
          <p>
            C++ (backend), React (frontend), PostgreSQL 17, JWT, WebRTC, TailwindCSS
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
