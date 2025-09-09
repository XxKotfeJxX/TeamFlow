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
    name: "Base",
    priceMonth: 0,
    priceYear: 0,
    features: [
      { name: "Обмежена кількість дошок", available: true },
      { name: "Обмежені чати", available: true },
      { name: "Автоматизація тасків", available: false },
      { name: "Підтримка команд", available: false },
    ],
  },
  {
    name: "Lite",
    priceMonth: 5,
    priceYear: 50,
    studentDiscount: true,
    features: [
      { name: "Необмежені дошки", available: true },
      { name: "Чати", available: true },
      { name: "Автоматизація тасків", available: true },
      { name: "Підтримка команд", available: false },
    ],
  },
  {
    name: "Pro",
    priceMonth: 10,
    priceYear: 100,
    studentDiscount: true,
    features: [
      { name: "Необмежені дошки", available: true },
      { name: "Чати", available: true },
      { name: "Автоматизація тасків", available: true },
      { name: "Підтримка команд", available: true },
      { name: "Розширена аналітика", available: true },
    ],
  },
  {
    name: "Enterprise",
    priceMonth: 45,
    priceYear: 450,
    features: [
      { name: "Необмежені дошки", available: true },
      { name: "Чати", available: true },
      { name: "Автоматизація тасків", available: true },
      { name: "Підтримка команд", available: true },
      { name: "Розширена аналітика", available: true },
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
            <Card key={plan.name} className="border-gray-300 bg-white shadow-md flex flex-col">
              <CardContent className="flex flex-col flex-1">
                {/* Назва тарифу англійською по центру */}
                <h2 className="text-2xl font-bold text-center pt-4 mb-0 text-gray-800">
                  {plan.name}
                </h2>

                {/* Ціна */}
                <div className="mb-4 text-gray-900 text-left">
  {/* Місячна ціна */}
  <p className="text-lg font-bold">
    {plan.priceMonth !== undefined ? (plan.priceMonth === 0 ? "\u00A0" : `$${plan.priceMonth}/міс`) : "\u00A0"}
  </p>

  {/* Річна ціна */}
  <p className="text-sm text-gray-600 mt-1">
    {plan.priceYear !== undefined ? (plan.priceYear === 0 ? <span className="text-lg font-bold text-black">Безкоштовно</span> :  `або $${plan.priceYear}/рік`) : "\u00A0"}
  </p>

  {/* Студентська знижка */}
  <p className="text-blue-600 text-sm mt-1 text-left">
    {plan.studentDiscount ? "Студентам доступна знижка" : "\u00A0"}
  </p>
</div>


                {/* Фічі */}
                <ul className="mb-4 space-y-1 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.name} className="flex items-center gap-2 text-gray-700">
                      <span className="flex-none w-4">
                        {f.available ? (
                          <FaCheck className="text-green-600" />
                        ) : (
                          <FaTimes className="text-red-600" />
                        )}
                      </span>
                      <span>{f.name}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => alert(`Обрано тариф: ${plan.name}`)}
                  >
                    Обрати
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
