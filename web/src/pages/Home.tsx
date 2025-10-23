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

  // ✅ переклад
  const { t, lang, translations } = useTranslation();
  const th = t("home");

  // 🔹 картинки для фіч
  const featureImages = {
    0: "/images/kanban-board.png",
    1: "/images/calendar.png",
    2: "/images/chat.png",
  };

  // 🔹 Перевірка на авторизацію
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
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-start overflow-x-hidden drop-shadow-2xl">
        {/* Hero Section */}
        <section className="w-full bg-white pt-32 pb-20 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: th("heroTitle").replace(
                    /<highlight>(.*?)<\/highlight>/g,
                    '<span class="text-blue-600">$1</span>'
                  ),
                }}
              />
            </motion.h1>

            <p className="text-gray-600 text-lg mb-8">{th("heroText")}</p>
            <div className="flex gap-4">
              <Button
                className="px-6 py-3 text-lg text-white bg-blue-600 hover:bg-blue-700"
                onClick={handleTryFree}
              >
                {th("tryFree")}
              </Button>
              <Button
                variant="outline"
                className="px-6 py-3 text-lg text-blue-600 border-blue-600 hover:bg-blue-50"
                onClick={handleLearnMore}
              >
                {th("learnMore")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <img
              src="/images/Dashboard.png"
              alt="TeamFlow preview"
              className="w-full rounded-2xl shadow-xl"
            />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-gray-50 py-20 px-6 md:px-12 lg:px-24 flex flex-col gap-24">
          {translations[lang].home.features.map((f, i) => (
            <div
              key={i}
              className={`flex flex-col-reverse lg:flex-row ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              } items-center gap-10`}
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
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="w-full bg-gray-800 text-white py-16 px-6 md:px-12 lg:px-24 text-center">
          <h2 className="text-4xl font-bold mb-4">{th("ctaTitle")}</h2>
          <p className="text-lg mb-8">{th("ctaText")}</p>
          <Button
            size="lg"
            className="text-lg bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleCreateAccount}
          >
            {th("createAccount")}
          </Button>
        </section>
      </div>

      <Footer />
    </>
  );
}
