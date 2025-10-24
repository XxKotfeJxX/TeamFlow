// src/pages/PrivacyPolicy.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useTranslation } from "../components/useTranslations";

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const tp = t("privacy");

  const sections = Array.from({ length: 9 }, (_, i) => ({
    titleKey: `sec${i + 1}Title` as const,
    textKey: `sec${i + 1}Text` as const,
  }));

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 text-gray-800 leading-relaxed">
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

        {/* 🔹 Основний контент */}
        <main className="relative z-10 flex-1 max-w-4xl mx-auto px-6 md:px-12 lg:px-24 pb-20 pt-32">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900"
          >
            {tp("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-gray-500 mb-12 italic"
          >
            {tp("updated")}
          </motion.p>

          {/* 🔹 Контейнер з ефектом скла */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-10 md:p-12 space-y-10">
            {sections.map((s, i) => {
              const title = tp(s.titleKey as keyof typeof tp);
              const text = tp(s.textKey as keyof typeof tp);
              const paragraphs = Array.isArray(text) ? text : [text];

              return (
                <motion.section
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-blue-700">
                    {title}
                  </h2>

                  {paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className={
                        typeof p === "string" && p.startsWith("*gray")
                          ? "text-gray-500 italic text-sm"
                          : "text-gray-700"
                      }
                      dangerouslySetInnerHTML={{
                        __html:
                          typeof p === "string"
                            ? p.replace("*gray", "")
                            : String(p),
                      }}
                    />
                  ))}
                </motion.section>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-gray-600 mt-16"
            dangerouslySetInnerHTML={{ __html: `🖋️ ${tp("footer")}` }}
          />
        </main>
      </div>

      <Footer />
    </>
  );
}
