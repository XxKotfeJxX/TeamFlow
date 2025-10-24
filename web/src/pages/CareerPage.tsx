import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { useTranslation } from "../components/useTranslations";

export default function CareerPage() {
  const { t } = useTranslation();
  const tc = t("career");

  const roles = [
    {
      title: tc("frontendTitle"),
      description: tc("frontendDesc"),
      tags: ["React", "TypeScript", "Tailwind"],
    },
    {
      title: tc("backendTitle"),
      description: tc("backendDesc"),
      tags: ["C++", "PostgreSQL", "JWT"],
    },
    {
      title: tc("qaTitle"),
      description: tc("qaDesc"),
      tags: ["Testing", "Automation", "CI/CD"],
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

        <main className="relative z-10 flex-1 max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {tc("title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {tc("subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/70 backdrop-blur-md shadow-md hover:shadow-xl rounded-2xl p-8 text-center border border-gray-100 
                           hover:-translate-y-1 transition-transform flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                    {role.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{role.description}</p>

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() =>
                    (window.location.href = "mailto:hr@teamflow.com")
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 text-lg font-medium shadow-sm hover:shadow-md transition-transform hover:scale-105"
                >
                  {tc("applyButton")}
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 text-center bg-gradient-to-r from-blue-600 to-violet-600 text-white py-16 px-8 rounded-[2rem] shadow-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {tc("ctaTitle")}
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {tc("ctaSubtitle")}
            </p>
            <Button
              size="lg"
              variant={null}
              onClick={() => (window.location.href = "mailto:hr@teamflow.com")}
              className="rounded-2xl px-8 py-3 text-lg bg-white text-blue-700 font-semibold hover:bg-gray-100 shadow-md hover:shadow-lg transition"
            >
              {tc("ctaButton")}
            </Button>
          </motion.div>
        </main>
      </div>
      <Footer />
    </>
  );
}
