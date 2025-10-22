import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Checkbox } from "../components/ui/Checkbox";
import { userDb } from "../models/mockDB/users";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 🔹 Умови для пароля
const passwordRules = [
  { test: (p: string) => p.length >= 8, text: "Мінімум 8 символів" },
  {
    test: (p: string) => /[A-Z]/.test(p),
    text: "Принаймні одна велика літера",
  },
  {
    test: (p: string) => /[a-z]/.test(p),
    text: "Принаймні одна маленька літера",
  },
  { test: (p: string) => /\d/.test(p), text: "Принаймні одна цифра" },
  {
    test: (p: string) => /[^A-Za-z0-9]/.test(p),
    text: "Принаймні один спеціальний символ",
  },
];

export default function RegisterPage() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState<{
    login?: string;
    password?: string[];
    repeatPassword?: string;
    email?: string;
    agree?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!login.trim()) newErrors.login = "Введіть логін";

    // Перевірка пароля за всіма правилами
    const failedRules = passwordRules
      .filter((rule) => !rule.test(password))
      .map((rule) => rule.text);

    if (failedRules.length > 0) {
      newErrors.password = failedRules;
    }

    if (repeatPassword !== password)
      newErrors.repeatPassword = "Паролі не збігаються";

    if (!isValidEmail(email))
      newErrors.email = "Невірний формат електронної пошти";

    if (!agree)
      newErrors.agree = "Потрібно погодитися з політикою конфіденційності";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Перевірка унікальності email
    if (userDb.getByEmail(email)) {
      setErrors({ email: "Користувач з таким email вже існує" });
      return;
    }

    const newUser = userDb.create({
      username: login,
      email,
      password,
      tags: [],
      skills: [],
      links: [],
      languages: [],
      interfaceLang: "uk",
      profileVisibility: "public",
      teams: [],
      plan: "Base",
    });

    localStorage.setItem("currentUserId", newUser.id);

    navigate(`/profile/${newUser.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12 md:pt-32 md:pb-16">
        <Card className="w-full max-w-md border-gray-300 bg-white shadow-md rounded-2xl">
          <CardContent>
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Створити акаунт
            </h1>

            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="space-y-4"
            >
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
                {errors.login && (
                  <p className="mt-1 text-sm text-red-600">{errors.login}</p>
                )}
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

                {/* Вимоги до паролю */}
                <ul className="mt-2 text-sm space-y-1">
                  {passwordRules.map((rule) => {
                    const passed = rule.test(password);
                    return (
                      <li
                        key={rule.text}
                        className={`flex items-center gap-2 ${
                          passed ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        <span>{passed ? "✅" : "⚪"}</span>
                        {rule.text}
                      </li>
                    );
                  })}
                </ul>

                {errors.password && (
                  <div className="mt-2 text-sm text-red-600">
                    <p>Пароль не відповідає вимогам:</p>
                    <ul className="list-disc ml-5">
                      {errors.password.map((msg, i) => (
                        <li key={i}>{msg}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Повтор паролю */}
              <div>
                <Label htmlFor="repeatPassword">Повторіть пароль</Label>
                <Input
                  id="repeatPassword"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="Повторіть пароль"
                />
                {errors.repeatPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.repeatPassword}
                  </p>
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
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Політика конфіденційності */}
              <div className="pt-6">
                <Checkbox
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  label={
                    <>
                      Я погоджуюсь з{" "}
                      <a
                        href="/privacy"
                        className="text-blue-600 hover:underline"
                      >
                        політикою конфіденційності
                      </a>
                    </>
                  }
                />
                {errors.agree && (
                  <p className="text-red-600 text-sm mt-1">{errors.agree}</p>
                )}
              </div>

              {/* Кнопка */}
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors mt-6"
              >
                Створити акаунт
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
