import Header from "../components/Header"
import Footer from "../components/Footer"
import { Card, CardContent } from "../components/ui/Card"
import { Button } from "../components/ui/button"
import { FaCheck, FaTimes } from "react-icons/fa"

interface Feature {
  name: string
  available: boolean
}

interface Plan {
  name: string
  priceMonth?: number
  priceYear?: number
  features: Feature[]
  studentDiscount?: boolean
}

const plans: Plan[] = [
  {
    name: "Базовий",
    priceMonth: 0,
    features: [
      { name: "Обмежена кількість дошок", available: true },
      { name: "Обмежені чати", available: true },
      { name: "Автоматизація тасків", available: false },
      { name: "Підтримка команд", available: false },
    ],
  },
  {
    name: "Просто",
    priceMonth: 5,
    priceYear: 50,
    features: [
      { name: "Необмежені дошки", available: true },
      { name: "Чати", available: true },
      { name: "Автоматизація тасків", available: true },
      { name: "Підтримка команд", available: false },
    ],
  },
  {
    name: "Про",
    priceMonth: 10,
    priceYear: 100,
    studentDiscount: true,
    features: [
      { name: "Необмежені дошки", available: true },
      { name: "Чати", available: true },
      { name: "Автоматизація тасків", available: true },
      { name: "Підтримка команд", available: true },
      { name: "Розширені аналітики", available: true },
    ],
  },
  {
    name: "Компанія",
    priceMonth: 45, // 5 * 0.9 * 10 (5 людей, 90% від тарифу Про)
    priceYear: 450,
    features: [
      { name: "Необмежені дошки", available: true },
      { name: "Чати", available: true },
      { name: "Автоматизація тасків", available: true },
      { name: "Підтримка команд", available: true },
      { name: "Розширені аналітики", available: true },
      { name: "Декілька акаунтів у підписці", available: true },
      { name: "Пріоритетна підтримка", available: true },
    ],
  },
]

export default function PricePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <main className="flex-1 px-4 py-24 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Тарифи TeamFlow</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card key={plan.name} className="border-gray-300 bg-white shadow-md">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">{plan.name}</h2>

                {/* Ціна */}
                <div className="mb-4 text-gray-900">
                  {plan.priceMonth !== undefined && (
                    <p className="text-lg font-bold">
                      {plan.priceMonth === 0 ? "Безкоштовно" : `$${plan.priceMonth}/міс`}
                    </p>
                  )}
                  {plan.priceYear && (
                    <p className="text-sm text-gray-600">
                      або ${plan.priceYear}/рік{" "}
                      {plan.studentDiscount && <span className="text-blue-600">(студентам знижка)</span>}
                    </p>
                  )}
                </div>

                {/* Фічі */}
                <ul className="mb-4 space-y-1">
                  {plan.features.map((f) => (
                    <li key={f.name} className="flex items-center gap-2 text-gray-700">
                      {f.available ? (
                        <FaCheck className="text-green-600" />
                      ) : (
                        <FaTimes className="text-red-600" />
                      )}
                      <span>{f.name}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => alert(`Обрано тариф: ${plan.name}`)}
                >
                  Обрати
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
