import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/Label"
import { Card, CardContent } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { userDb } from "../models/mockDB/users"

export default function LoginPage() {
  const navigate = useNavigate()
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<{ login?: string; password?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 🔹 шукаємо юзера по логіну або email
    const user = userDb.getAll().find(
      (u) => u.username === login || u.email === login
    )

    if (!user) {
      setError({ login: "Користувача не знайдено" })
      return
    }

    if (user.password !== password) {
      setError({ password: "Неправильний пароль" })
      return
    }

    // 🔹 все ок — очищаємо помилки і редіректимо на профіль
    setError({})
    navigate(`/profile/${user.id}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 pt-32 md:pt-36 md:pb-24 pb-20">
        <Card className="w-full max-w-md border-gray-300 bg-white shadow-md">
          <CardContent>
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Увійти</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="login">Логін</Label>
                <Input
                  id="login"
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Введіть логін"
                />
                {error.login && (
                  <p className="mt-1 text-sm text-red-600">{error.login}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введіть пароль"
                />
                {error.password ? (
                  <p className="mt-1 text-sm text-red-600">{error.password}</p>
                ) : (
                  <button
                    type="button"
                    className="mt-1 text-sm text-blue-600 hover:underline border-0 bg-transparent focus:outline-none"
                  >
                    Забули пароль?
                  </button>
                )}
              </div>

              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Увійти
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Не маєш акаунту?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Створи його
              </a>
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
