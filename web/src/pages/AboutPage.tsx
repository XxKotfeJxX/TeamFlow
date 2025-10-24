// src/pages/AboutPage.tsx
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { Users, Target, Rocket } from "lucide-react";
import { useTranslation } from "../components/useTranslations";

export default function AboutPage() {
  const { t } = useTranslation();
  const ta = t("about");

  const highlights = [
    {
      icon: Users,
      title: ta("highlight1Title"),
      desc: ta("highlight1Desc"),
    },
    {
      icon: Target,
      title: ta("highlight2Title"),
      desc: ta("highlight2Desc"),
    },
    {
      icon: Rocket,
      title: ta("highlight3Title"),
      desc: ta("highlight3Desc"),
    },
  ];

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 text-gray-800">
        {/* Градієнтні бліки */}
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

        <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-24 flex flex-col items-center">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {ta("title")}
            </h1>
            <p className="text-lg text-gray-600">{ta("subtitle")}</p>
          </motion.section>

          {/* Text Section */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-md max-w-3xl text-lg leading-relaxed text-center space-y-6"
          >
            <p dangerouslySetInnerHTML={{ __html: ta("p1") }} />
            <p>{ta("p2")}</p>
            <p dangerouslySetInnerHTML={{ __html: ta("p3") }} />
          </motion.section>

          {/* Highlights */}
          <section className="grid md:grid-cols-3 gap-8 mt-20 w-full">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-8 text-center shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-transform"
              >
                <item.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-24"
          >
            <Button
              onClick={() => (window.location.href = "/career")}
              size="lg"
              className="rounded-2xl px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-transform hover:scale-105"
            >
              {ta("cta")}
            </Button>
          </motion.div>
        </main>
      </div>
      <Footer />
    </>
  );
}
