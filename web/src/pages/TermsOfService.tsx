// src/pages/TermsOfService.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useTranslation } from "../components/useTranslations";

export default function TermsOfService() {
  const { t } = useTranslation();
  const tt = t("terms");

  const sections = Array.from({ length: 10 }, (_, i) => ({
    titleKey: `sec${i + 1}Title` as const,
    textKey: `sec${i + 1}Text` as const,
  }));

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 text-gray-800 leading-relaxed">
        {/* 🔹 Градієнтні плями */}
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

        <main className="relative z-10 flex-1 max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-24">
          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900"
          >
            {tt("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-gray-500 mb-16 italic"
          >
            {tt("updated")}
          </motion.p>

          {/* CONTENT SECTIONS */}
          <div className="space-y-12">
            {sections.map((s, i) => {
              const title = tt(s.titleKey as keyof typeof tt);
              const text = tt(s.textKey as keyof typeof tt);
              const paragraphs = Array.isArray(text) ? text : [text];

              return (
                <motion.section
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-md p-8 hover:shadow-lg transition"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    {title}
                  </h2>

                  <div className="space-y-3 text-gray-700 text-base">
                    {paragraphs.map((p, idx) => (
                      <p
                        key={idx}
                        className={
                          typeof p === "string" && p.startsWith("*gray")
                            ? "text-gray-500 italic text-sm"
                            : ""
                        }
                        dangerouslySetInnerHTML={{
                          __html:
                            typeof p === "string"
                              ? p.replace("*gray", "")
                              : String(p),
                        }}
                      />
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </div>

          {/* FOOTER */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-gray-600 mt-20"
            dangerouslySetInnerHTML={{
              __html: `⚖️ ${tt("footer")}`,
            }}
          />
        </main>
      </div>
      <Footer />
    </>
  );
}
