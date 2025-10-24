import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { Calendar, CheckCircle, MessageSquare, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "../components/useTranslations";

export default function OverviewPage() {
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("currentUserId");
  const isLoggedIn = Boolean(currentUserId);
  const { t, lang, translations } = useTranslation();
  const to = t("overview");

  const icons = [Calendar, CheckCircle, MessageSquare, Shield];

  const handleTryFree = () => {
    navigate(isLoggedIn ? `/profile/${currentUserId}` : "/login");
  };

  const handleDemo = () => {
    navigate(isLoggedIn ? "/price" : "/login");
  };

  const handleJoin = () => {
    navigate(isLoggedIn ? `/profile/${currentUserId}` : "/login");
  };

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

        <main className="relative z-10 flex-1">
          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-24 px-6 bg-transparent"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {to("heroTitle")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {to("heroText")}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="rounded-2xl px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition"
                onClick={handleTryFree}
              >
                {to("tryFree")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow-md transition"
                onClick={handleDemo}
              >
                {to("demo")}
              </Button>
            </div>
          </motion.section>

          <section className="py-24">
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-semibold text-center mb-16 text-gray-900"
            >
              {to("whyTitle")}
            </motion.h2>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto px-6">
              {translations[lang].overview.features.map(
                (f: { title: string; desc: string }, i: number) => {
                  const Icon = icons[i];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-all p-8 text-center"
                    >
                      <Icon className="w-10 h-10 mx-auto mb-4 text-blue-600" />
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {f.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {f.desc}
                      </p>
                    </motion.div>
                  );
                }
              )}
            </div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden text-center py-20 px-6 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-t-[2rem]"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {to("ctaTitle")}
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              {to("ctaText")}
            </p>
            <Button
              size="lg"
              className="rounded-2xl px-8 py-3 text-lg bg-white text-blue-700 font-semibold hover:bg-gray-100 shadow-md hover:shadow-lg transition"
              onClick={handleJoin}
            >
              {to("join")}
            </Button>
          </motion.section>
        </main>
      </div>

      <Footer />
    </>
  );
}
