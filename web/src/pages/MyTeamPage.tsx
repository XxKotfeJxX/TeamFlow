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
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 text-gray-800">
        {/* 🔹 Градієнтні бліки */}
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
          {/* Hero */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-20 text-center text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {mt("title")}
          </motion.h1>

          {/* Author Card */}
          <div className="flex justify-center">
            <motion.div
              className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl p-10 w-full max-w-lg flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src="images/andrii.jpg"
                alt={mt("name")}
                className="w-44 h-44 rounded-full object-cover mb-6 border-4 border-blue-200 shadow-md"
              />
              <h2 className="text-3xl font-semibold mb-2 text-gray-800">
                {mt("name")}
              </h2>
              <p className="text-blue-600 font-medium text-lg mb-6">
                {mt("role")}
              </p>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                {mt("bio")}
              </p>
            </motion.div>
          </div>

          {/* Tech Stack */}
          <section className="mt-24 text-center">
            <h2 className="text-3xl font-bold mb-10 text-gray-900">
              {mt("stackTitle")}
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/70 backdrop-blur-md border border-gray-100 p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold text-blue-600 mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {tech.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* About Project */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 text-center text-gray-700 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">
              {mt("aboutProjectTitle")}
            </h2>
            <p className="leading-relaxed text-lg">{mt("aboutProject")}</p>
          </motion.section>
        </main>
      </div>
      <Footer />
    </>
  );
}
