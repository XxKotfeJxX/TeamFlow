import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { userDb } from "../models/mockDB/users";

export default function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<ReturnType<
    typeof userDb.getById
  > | null>(null);

  // ============================
  // 🔹 Перевірка на авторизацію
  // ============================
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
              Робота в команді —{" "}
              <span className="text-blue-600">без хаосу</span>
            </motion.h1>
            <p className="text-gray-600 text-lg mb-8">
              TeamFlow об'єднує задачі, календарі, чати та інструменти в єдиному
              просторі для продуктивної командної роботи.
            </p>
            <div className="flex gap-4">
              <Button
                className="px-6 py-3 text-lg text-white bg-blue-600 hover:bg-blue-700"
                onClick={handleTryFree}
              >
                Спробувати безкоштовно
              </Button>
              <Button
                variant="outline"
                className="px-6 py-3 text-lg text-blue-600 border-blue-600 hover:bg-blue-50"
                onClick={handleLearnMore}
              >
                Дізнатися більше
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
              src="/public/images/Dashboard.png"
              alt="TeamFlow preview"
              className="w-full rounded-2xl shadow-xl"
            />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-gray-50 py-20 px-6 md:px-12 lg:px-24 flex flex-col gap-24">
          {[
            {
              title: "Потужний таск-менеджер",
              desc: "Гнучкий Kanban, дедлайни, призначення та трекінг виконання — усе в одному вікні.",
              image: "/images/kanban-board.png",
            },
            {
              title: "Інтерактивні календарі",
              desc: "Персональні та командні події з синхронізацією. Працюйте та плануйте легко.",
              image: "/images/calendar.png",
            },
            {
              title: "Вбудований чат і дзвінки",
              desc: "Спілкуйтесь у реальному часі з підтримкою групових дзвінків та повідомлень.",
              image: "/images/chat.png",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col-reverse lg:flex-row ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              } items-center gap-10`}
            >
              <div className="flex-1">
                <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                  {feature.title}
                </h2>
                <p className="text-gray-600 text-lg">{feature.desc}</p>
              </div>
              <div className="flex-1">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="w-full bg-gray-800 text-white py-16 px-6 md:px-12 lg:px-24 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Готові приєднатись до TeamFlow?
          </h2>
          <p className="text-lg mb-8">
            Зареєструйтесь сьогодні та почніть керувати своїми проєктами як
            професіонал.
          </p>
          <Button
            size="lg"
            className="text-lg bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleCreateAccount}
          >
            Створити акаунт
          </Button>
        </section>
      </div>

      <Footer />
    </>
  );
}
