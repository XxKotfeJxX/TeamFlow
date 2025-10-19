import { useState } from "react";
import { Button } from "../ui/Button";

interface Props {
  plan: { name: string; priceMonth?: number; priceYear?: number };
  onClose: () => void;
  onComplete: () => void;
}

export default function PaymentModal({ plan, onClose, onComplete }: Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (cardNumber.length < 16) {
      setError("Некоректний номер картки");
      return;
    }
    setError("");
    // TODO: тут можна вставити валідацію або запит до mock-сервера
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Оплата плану <span className="text-blue-600">{plan.name}</span>
        </h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Номер картки"
            className="w-full border p-2 rounded-lg"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="MM/YY"
              className="w-1/2 border p-2 rounded-lg"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-1/2 border p-2 rounded-lg"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-center gap-3 pt-3">
            <Button className="bg-gray-300 text-gray-800 hover:bg-gray-400" onClick={onClose}>
              Скасувати
            </Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSubmit}>
              Оплатити
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
