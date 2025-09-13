import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/Label"
import { Card, CardContent } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Checkbox } from "../components/ui/Checkbox"
import { userDb } from "../models/mockDB/users"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function RegisterPage() {
  const navigate = useNavigate()

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [email, setEmail] = useState("")
  const [agree, setAgree] = useState(false)

  const [errors, setErrors] = useState<{
    login?: string
    password?: string
    repeatPassword?: string
    email?: string
    agree?: string
  }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: typeof errors = {}

    if (!login) newErrors.login = "Введіть логін"
    if (password.length < 8) newErrors.password = "Пароль повинен містити мінімум 8 символів"
    if (repeatPassword !== password) newErrors.repeatPassword = "Паролі не збігаються"
    if (!isValidEmail(email)) newErrors.email = "Невірний формат електронної пошти"
    if (!agree) newErrors.agree = "Потрібно погодитися з політикою конфіденційності"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // 🔹 перевірка чи email вже існує
      if (userDb.getByEmail(email)) {
        setErrors({ email: "Користувач з таким email вже існує" })
        return
      }

      // 🔹 створюємо нового користувача
      const newUser = userDb.create({
        username: login,
        email,
        password,
        tags: [],
        skills: [],
        links: [],
        languages: [],
        interfaceLang: "uk-UA",
        profileVisibility: "public",
        teams: [],
        plan: "Base",
      })

      // 🔹 переходимо на сторінку профілю, можна передати ID
      navigate(`/profile/${newUser.id}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12 md:pt-32 md:pb-16">
        <Card className="w-full max-w-md border-gray-300 bg-white shadow-md">
          <CardContent>
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Створити акаунт
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Логін */}
              <div>
                <Label htmlFor="login">Логін</Label>
                <Input
                  id="login"
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Введіть логін"
                />
                {errors.login && <p className="mt-1 text-sm text-red-600">{errors.login}</p>}
              </div>

              {/* Пароль */}
              <div className="pt-4">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введіть пароль"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Повторити пароль */}
              <div>
                <Label htmlFor="repeatPassword">Повторити пароль</Label>
                <Input
                  id="repeatPassword"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="Повторіть пароль"
                />
                {errors.repeatPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.repeatPassword}</p>
                )}
              </div>

              {/* Email */}
              <div className="pt-4">
                <Label htmlFor="email">Електронна пошта</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введіть email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Кастомний чекбокс */}
              <div className="pt-8">
                <Checkbox
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  label={
                    <>
                      Я погоджуюсь з{" "}
                      <a href="/privacy" className="text-blue-600 hover:underline">
                        політикою конфіденційності
                      </a>
                    </>
                  }
                />
                {errors.agree && <p className="text-red-600 text-sm mt-1">{errors.agree}</p>}
              </div>

              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Створити акаунт
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
