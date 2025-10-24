// src/pages/SupportPage.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/Accordion";
import { Button } from "../components/ui/Button";
import { motion } from "framer-motion";
import { useTranslation } from "../components/useTranslations";

export default function SupportPage() {
  const { t } = useTranslation();
  const ts = t("support");

  const faqs = [
    { q: ts("q1"), a: ts("a1") },
    { q: ts("q2"), a: ts("a2") },
    { q: ts("q3"), a: ts("a3") },
    { q: ts("q4"), a: ts("a4") },
    { q: ts("q5"), a: ts("a5") },
    { q: ts("q6"), a: ts("a6") },
    { q: ts("q7"), a: ts("a7") },
  ];

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 text-gray-800">
        {/* 🔹 Градієнтні світлові плями */}
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

        <main className="relative z-10 flex-1 max-w-3xl mx-auto px-6 py-24">
          {/* HERO */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-10 text-center text-gray-900"
          >
            {ts("title")}
          </motion.h1>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6 mb-16 text-center"
          >
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {ts("intro")}
            </p>
          </motion.section>

          {/* 🔹 Accordion (FAQ) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-md shadow-md border border-gray-100 rounded-2xl p-8 space-y-4"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-gray-100 rounded-xl bg-white/80 backdrop-blur-sm hover:shadow-md transition"
                >
                  <AccordionTrigger className="text-left font-medium text-gray-800">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      className="text-gray-600 leading-relaxed text-sm"
                      dangerouslySetInnerHTML={{ __html: f.a }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* 🔹 CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-20"
          >
            <p className="text-gray-700 mb-4 text-lg">{ts("noAnswer")}</p>
            <Button
              onClick={() =>
                (window.location.href = "mailto:support@teamflow.com")
              }
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-105"
            >
              {ts("contactButton")}
            </Button>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}
