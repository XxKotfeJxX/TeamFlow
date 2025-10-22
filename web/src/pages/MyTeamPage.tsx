// src/pages/MyTeamPage.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";

const teamMembers = [
  {
    name: "Андрій Андрусевич",
    role: "Fullstack Developer",
    bio: "Розробник TeamFlow: займається архітектурою бекенду на C++, фронтендом на React і проєктуванням бази даних PostgreSQL.",
    avatar: "/images/andrii.jpg", // 🔹 локальне фото у /public/images/
  },
];

export default function MyTeamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-12 text-center">Наша команда</h1>

        <div className="flex justify-center">
          {teamMembers.map((m) => (
            <div
              key={m.name}
              className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={m.avatar}
                alt={m.name}
                className="w-40 h-40 rounded-full object-cover mb-5 border-4 border-indigo-100 shadow-sm"
              />
              <h2 className="text-2xl font-semibold">{m.name}</h2>
              <p className="text-indigo-600 font-medium">{m.role}</p>
              <p className="text-gray-600 mt-4 text-sm leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>

        <section className="mt-20 text-center text-lg">
          <h2 className="text-2xl font-semibold mb-4">Мій стек технологій</h2>
          <p className="text-gray-700">
            <strong>C++</strong> (backend), <strong>React</strong> (frontend),{" "}
            <strong>PostgreSQL 17</strong>, <strong>JWT</strong>,{" "}
            <strong>WebRTC</strong>, <strong>TailwindCSS</strong>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
