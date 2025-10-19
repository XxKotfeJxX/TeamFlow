import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { FaCcVisa, FaCcMastercard, FaPaypal, FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
  plan: { name: string; priceMonth?: number; priceYear?: number };
  onClose: () => void;
  onComplete: () => void;
}

// ✅ Алгоритм Луна
const isValidCardNumber = (num: string): boolean => {
  const digits = num.replace(/\D/g, "").split("").map(Number);
  let sum = 0;
  let double = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits[i];
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }

  return sum % 10 === 0;
};

export default function PaymentModal({ plan, onClose, onComplete }: Props) {
  const [method, setMethod] = useState<"card" | "paypal">("card");
  const [showCard, setShowCard] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [cardValid, setCardValid] = useState(true);

  // ==============================
  // 🔹 Форматування
  // ==============================
  const formatCardNumber = (val: string) => {
    const cleaned = val.replace(/[^\d]/g, "").slice(0, 16);
    const spaced = cleaned.replace(/(.{4})/g, "$1 ").trim();
    setCardValid(cleaned.length < 16 || isValidCardNumber(cleaned));
    return spaced;
  };

  const formatExpiry = (val: string) => {
    const cleaned = val.replace(/[^\d]/g, "").slice(0, 4);
    if (cleaned.length >= 3) return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    return cleaned;
  };

  const formatCvv = (val: string) => val.replace(/[^\d]/g, "").slice(0, 3);

  // ==============================
  // 🔹 Перевірка терміну дії
  // ==============================
  const validateExpiry = () => {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    const [mm, yy] = expiry.split("/").map(Number);
    const currentYear = Number(new Date().getFullYear().toString().slice(-2));
    if (mm < 1 || mm > 12) return false;
    if (yy < currentYear) return false;
    return true;
  };

  // ==============================
  // 🔹 Загальна валідація
  // ==============================
  const validateCard = () => {
    const plainNumber = cardNumber.replace(/\s/g, "");

    if (name.trim().length < 2) return "Введіть ім’я власника картки";
    if (plainNumber.length !== 16) return "Некоректний номер картки";
    if (!isValidCardNumber(plainNumber)) return "Номер картки невалідний (перевірка Луна)";
    if (!validateExpiry()) return "Картка не дійсна (перевірте дату)";
    if (cvv.length !== 3) return "CVV має складатися з 3 цифр";
    return "";
  };

  const handleSubmit = () => {
    if (method === "paypal") {
      onComplete();
      return;
    }

    const err = validateCard();
    if (err) {
      setError(err);
      return;
    }

    setError("");
    onComplete();
  };

  const handleExpiryBlur = () => {
    if (!validateExpiry()) setError("Картка не дійсна (перевірте дату)");
    else setError("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  // ==============================
  // 🔹 UI
  // ==============================
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onKeyDown={handleKeyPress}
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full relative">
        {/* Закриття */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                  onClick={onClose}
            style={{ border: "none" }}
        >
          ×
        </button>

        {/* Логотипи */}
        <div className="flex justify-center items-center gap-4 border-b pb-3 mb-4">
          <FaCcVisa size={40} className="text-blue-700" />
          <FaCcMastercard size={40} className="text-red-500" />
          <FaPaypal size={38} className="text-blue-500" />
        </div>

        <h2 className="text-xl font-semibold text-center mb-5">
          Оплата плану <span className="text-blue-600">{plan.name}</span>
        </h2>

        {/* Вибір способу оплати */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMethod("card")}
            className={`px-4 py-2 rounded-lg border transition ${
              method === "card"
                ? "bg-blue-600 text-white border-blue-600 hover:border-none"
                : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
            }`}
          >
            Картка
          </button>
          <button
            onClick={() => setMethod("paypal")}
            className={`px-4 py-2 rounded-lg border transition ${
              method === "paypal"
                ? "bg-blue-600 text-white border-blue-600 hover:border-none"
                : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
            }`}
          >
            PayPal
          </button>
        </div>

        {method === "card" ? (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Ім’я власника картки</label>
              <Input
                type="text"
                placeholder="Same Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Номер картки</label>
              <div className="relative">
                <Input
                  type={showCard ? "text" : "password"}
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className={`pr-10 ${
                    cardValid ? "" : "border-red-500 focus:border-red-500 focus:ring-red-500"
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-800"
                  onClick={() => setShowCard((p) => !p)}
                  style={{ border: "none" }}
                >
                  {showCard ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {!cardValid && (
                <p className="text-red-600 text-xs mt-1">Номер картки невалідний (перевірка Луна)</p>
              )}
            </div>

            <div className="flex gap-2">
              <div className="w-1/2 relative">
                <label className="block text-sm text-gray-700 mb-1">Термін дії</label>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  onBlur={handleExpiryBlur}
                />
              </div>
              <div className="w-1/2 relative">
                <label className="block text-sm text-gray-700 mb-1">CVV</label>
                <Input
                  type={showCvv ? "text" : "password"}
                  placeholder="***"
                  value={cvv}
                  onChange={(e) => setCvv(formatCvv(e.target.value))}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
                  style={{ border: "none" }}
                  onClick={() => setShowCvv((p) => !p)}
                >
                  {showCvv ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
                          onClick={handleSubmit}
                style={{ border: "none" }}
            >
              Оплатити
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Ви будете перенаправлені на PayPal для завершення оплати.
            </p>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSubmit}
              style={{ border: "none" }}
            >
              Перейти до PayPal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
