// src/pages/FeaturesPage.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/Card";
import {
  Calendar,
  CheckSquare,
  MessageSquare,
  Shield,
  Code,
  Cpu,
} from "lucide-react";
import { useTranslation } from "../components/useTranslations";
import { motion } from "framer-motion";

export default function FeaturesPage() {
  const { t, lang, translations } = useTranslation();
  const tf = t("features");

  const icons = [Calendar, CheckSquare, MessageSquare, Shield, Code, Cpu];

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

        <main className="relative z-10 flex-1 py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {/* HERO */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
          >
            {tf("title")}
          </motion.h1>

          {/* GRID */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {translations[lang].features.sections.map(
              (section: { title: string; points: string[] }, index: number) => {
                const Icon = icons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-white/70 backdrop-blur-md border border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform">
                      <CardContent className="pt-8 pb-6 px-6 text-center">
                        <Icon className="w-10 h-10 text-blue-600 mb-3 mx-auto" />
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                          {section.title}
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-2 text-left">
                          {section.points.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              }
            )}
          </div>

          {/* FOOTER NOTE */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-gray-500 mt-20 text-sm"
          >
            {tf("footerNote")}
          </motion.div>
        </main>
      </div>
      <Footer />
    </>
  );
}
