// src/pages/PricePage.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { FaCheck, FaTimes } from "react-icons/fa";
import { userDb } from "../models/mockDB/users";
import { useNavigate } from "react-router-dom";
import ConfirmDowngradeModal from "../components/pricing/ConfirmDowngradeModal";
import PaymentModal from "../components/pricing/PaymentModal";
import { useTranslation } from "../components/useTranslations";

export type PlanType = "Base" | "Lite" | "Pro" | "Enterprise";

interface Plan {
  name: PlanType;
  priceMonth?: number;
  priceYear?: number;
  features: string[];
  studentDiscount?: boolean;
}

const planOrder = ["Base", "Lite", "Pro", "Enterprise"];

export default function PricePage() {
  const [currentUser, setCurrentUser] = useState<ReturnType<
    typeof userDb.getById
  > | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();

  const { t, lang, translations } = useTranslation();
  const tp = t("pricing");

  useEffect(() => {
    const id = localStorage.getItem("currentUserId");
    if (id) {
      const user = userDb.getById(id);
      if (user) setCurrentUser(user);
    }
  }, []);

  const plans = translations[lang].pricing.plans as Plan[];

  const handleSelectPlan = (plan: Plan) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const currentPlanIndex = planOrder.indexOf(currentUser.plan);
    const newPlanIndex = planOrder.indexOf(plan.name);

    if (newPlanIndex < currentPlanIndex) {
      setSelectedPlan(plan);
      setShowConfirm(true);
    } else {
      setSelectedPlan(plan);
      setShowPayment(true);
    }
  };

  const confirmDowngrade = () => {
    if (currentUser && selectedPlan) {
      setShowConfirm(false);
      if (selectedPlan.name === "Base") {
        userDb.update(currentUser.id, { plan: selectedPlan.name });
        setCurrentUser({ ...currentUser, plan: selectedPlan.name });
        return;
      }
      setShowPayment(true);
    }
  };

  const handlePaymentComplete = () => {
    if (currentUser && selectedPlan) {
      userDb.update(currentUser.id, { plan: selectedPlan.name as PlanType });
      setCurrentUser({
        ...currentUser,
        plan: selectedPlan.name as PlanType,
      });
    }
    setShowPayment(false);
  };

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 text-gray-900">
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

        <main className="relative z-10 flex-1 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
          >
            {tp("title")}
          </motion.h1>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, i) => {
              const isCurrent = currentUser?.plan === plan.name;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card className="border border-gray-100 bg-white/70 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col">
                    <CardContent className="flex flex-col flex-1 p-8">
                      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                        {plan.name}
                      </h2>

                      {/* 🔹 Ціна */}
                      <div className="mb-6 text-center">
                        {plan.priceMonth ? (
                          <p className="text-3xl font-semibold text-gray-900">
                            ${plan.priceMonth}
                            <span className="text-base text-gray-600 ml-1">
                              {tp("perMonth")}
                            </span>
                          </p>
                        ) : (
                          <p className="text-2xl font-semibold text-blue-600">
                            {tp("free")}
                          </p>
                        )}
                        {plan.priceYear && (
                          <p className="text-sm text-gray-600 mt-1">
                            {tp("perYear").replace(
                              "{{price}}",
                              String(plan.priceYear)
                            )}
                          </p>
                        )}
                        {plan.studentDiscount && (
                          <p className="text-blue-600 text-sm mt-2">
                            {tp("studentDiscount")}
                          </p>
                        )}
                      </div>

                      {/* 🔹 Фічі */}
                      <ul className="space-y-2 flex-1 mb-6">
                        {plan.features.map((feature, j) => {
                          const unavailable =
                            feature.includes("— недоступ") ||
                            feature.includes("unavailable") ||
                            feature.includes("niedostęp");
                          return (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-gray-700 text-sm"
                            >
                              {unavailable ? (
                                <FaTimes className="text-red-500 mt-1" />
                              ) : (
                                <FaCheck className="text-green-600 mt-1" />
                              )}
                              <span>{feature}</span>
                            </li>
                          );
                        })}
                      </ul>

                      {/* 🔹 Кнопка */}
                      <Button
                        className={`w-full rounded-xl py-3 font-medium transition ${
                          isCurrent
                            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
                        }`}
                        onClick={() => handleSelectPlan(plan)}
                        disabled={isCurrent}
                      >
                        {isCurrent ? tp("currentPlan") : tp("select")}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>

      <Footer />

      {/* 🔹 Модалки */}
      {showConfirm && selectedPlan && (
        <ConfirmDowngradeModal
          plan={selectedPlan.name}
          onConfirm={confirmDowngrade}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {showPayment && selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setShowPayment(false)}
          onComplete={handlePaymentComplete}
        />
      )}
    </>
  );
}
