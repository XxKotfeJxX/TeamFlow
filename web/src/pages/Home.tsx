import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { userDb } from "../models/mockDB/users";
import { useTranslation } from "../components/useTranslations";

export default function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<ReturnType<
    typeof userDb.getById
  > | null>(null);

  const { t, lang, translations } = useTranslation();
  const th = t("home");

  const featureImages = {
    0: "images/kanban-board.png",
    1: "images/calendar.png",
    2: "images/chat.png",
  };

  useEffect(() => {
    const localId = localStorage.getItem("currentUserId");
    if (localId) {
      const localUser = userDb.getById(localId);
      if (localUser) setCurrentUser(localUser);
    }
  }, []);

  const handleTryFree = () => {
    if (currentUser) navigate(`/profile/${currentUser.id}`);
    else navigate("/login");
  };

  const handleLearnMore = () => navigate("/support");

  const handleCreateAccount = () => {
    if (currentUser) navigate(`/profile/${currentUser.id}`);
    else navigate("/register");
  };

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50">
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

        <main className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-start overflow-x-hidden">
          <section className="relative z-10 w-full pt-32 pb-20 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                <span
                  dangerouslySetInnerHTML={{
                    __html: th("heroTitle").replace(
                      /<highlight>(.*?)<\/highlight>/g,
                      '<span class="text-blue-600">$1</span>'
                    ),
                  }}
                />
              </h1>
              <p className="text-gray-600 text-lg mb-8">{th("heroText")}</p>

              <div className="flex gap-4 flex-wrap">
                <Button
                  className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transition"
                  onClick={handleTryFree}
                >
                  {th("tryFree")}
                </Button>
                <Button
                  variant="outline"
                  className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-lg font-medium text-blue-600 border-blue-600 hover:bg-blue-50 shadow-sm hover:shadow-md transition"
                  onClick={handleLearnMore}
                >
                  {th("learnMore")}
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <img
                src="images/Dashboard.png"
                alt="TeamFlow preview"
                className="w-full rounded-2xl shadow-xl border border-gray-100"
              />
            </motion.div>
          </section>

          <section className="w-full py-20 px-6 md:px-12 lg:px-24 flex flex-col gap-24">
            {translations[lang].home.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col-reverse lg:flex-row ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                } items-center gap-10 bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]`}
              >
                <div className="flex-1">
                  <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                    {f.title}
                  </h2>
                  <p className="text-gray-600 text-lg">{f.desc}</p>
                </div>
                <div className="flex-1">
                  <img
                    src={featureImages[i as keyof typeof featureImages]}
                    alt={f.title}
                    className="w-full rounded-xl shadow-lg border border-gray-100"
                  />
                </div>
              </motion.div>
            ))}
          </section>

          <section className="relative w-full overflow-hidden bg-gradient-to-r from-blue-600 to-violet-600 text-white py-20 px-6 md:px-12 lg:px-24 text-center rounded-t-[2rem]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-4 tracking-tight">
                {th("ctaTitle")}
              </h2>
              <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                {th("ctaText")}
              </p>
              <Button
                size="lg"
                variant={null}
                className="rounded-2xl px-8 py-3 text-lg bg-white text-blue-700 font-semibold hover:bg-gray-100 shadow-md hover:shadow-lg transition"
                onClick={handleCreateAccount}
              >
                {th("createAccount")}
              </Button>
            </motion.div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
