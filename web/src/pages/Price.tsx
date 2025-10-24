import { useState, useEffect } from "react";
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

  // 🔹 Локалізація
  const { t, lang, translations } = useTranslation();
  const tp = t("pricing");

  // 🔹 Отримуємо користувача
  useEffect(() => {
    const id = localStorage.getItem("currentUserId");
    if (id) {
      const user = userDb.getById(id);
      if (user) setCurrentUser(user);
    }
  }, []);

  const plans = translations[lang].pricing.plans as Plan[];

  // 🔹 Обробка кліку на план
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
userDb.update(currentUser.id, {
  plan: selectedPlan.name as PlanType,
});
setCurrentUser({
  ...currentUser,
  plan: selectedPlan.name as PlanType,
});

    }
    setShowPayment(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <main className="flex-1 px-4 py-24 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">{tp("title")}</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const isCurrent = currentUser?.plan === plan.name;

            return (
              <Card
                key={plan.name}
                className="border-gray-300 bg-white shadow-md flex flex-col"
              >
                <CardContent className="flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-center pt-4 mb-0 text-gray-800">
                    {plan.name}
                  </h2>

                  {/* 🔹 Ціна */}
                  <div className="mb-4 text-gray-900 text-left">
                    <p className="text-lg font-bold">
                      {plan.priceMonth
                        ? `$${plan.priceMonth}${tp("perMonth")}`
                        : plan.priceMonth === 0
                        ? tp("free")
                        : ""}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {plan.priceYear
                        ? tp("perYear").replace(
                            "{{price}}",
                            String(plan.priceYear)
                          )
                        : ""}
                    </p>
                    <p className="text-blue-600 text-sm mt-1">
                      {plan.studentDiscount ? tp("studentDiscount") : "\u00A0"}
                    </p>
                  </div>

                  {/* 🔹 Фічі */}
                  <ul className="mb-4 space-y-1 flex-1">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <span className="flex-none w-4">
                          {feature.includes("— недоступ") ||
                          feature.includes("unavailable") ||
                          feature.includes("niedostęp") ? (
                            <FaTimes className="text-red-600" />
                          ) : (
                            <FaCheck className="text-green-600" />
                          )}
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 🔹 Кнопка */}
                  <div className="mt-auto text-center">
                    <Button
                      className={`w-full ${
                        isCurrent
                          ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      } transition`}
                      onClick={() => handleSelectPlan(plan)}
                      disabled={isCurrent}
                    >
                      {isCurrent ? tp("currentPlan") : tp("select")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

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
    </div>
  );
}
