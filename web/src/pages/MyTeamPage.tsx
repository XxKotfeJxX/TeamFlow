// src/pages/MyTeamPage.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useTranslation } from "../components/useTranslations";

export default function MyTeamPage() {
  const { t } = useTranslation();
  const mt = t("myTeam");

  const techStack = [
    { name: "C++", desc: mt("cpp") },
    { name: "React + TypeScript", desc: mt("react") },
    { name: "PostgreSQL 17", desc: mt("postgres") },
    { name: "JWT", desc: mt("jwt") },
    { name: "WebRTC", desc: mt("webrtc") },
    { name: "TailwindCSS", desc: mt("tailwind") },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-white text-gray-800">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-20">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-indigo-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {mt("title")}
        </motion.h1>

        <div className="flex justify-center">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src="images/andrii.jpg"
              alt={mt("name")}
              className="w-44 h-44 rounded-full object-cover mb-6 border-4 border-indigo-200 shadow-md"
            />
            <h2 className="text-3xl font-semibold mb-2">{mt("name")}</h2>
            <p className="text-indigo-600 font-medium text-lg mb-6">
              {mt("role")}
            </p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {mt("bio")}
            </p>
          </motion.div>
        </div>

        <section className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-8 text-indigo-700">
            {mt("stackTitle")}
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-xl font-semibold text-indigo-600 mb-1">
                  {tech.name}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {tech.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20 text-center text-gray-700 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
            {mt("aboutProjectTitle")}
          </h2>
          <p className="leading-relaxed text-lg">{mt("aboutProject")}</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
