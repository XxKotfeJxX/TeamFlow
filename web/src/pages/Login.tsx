import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/Label";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { userDb } from "../models/mockDB/users";

export default function LoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ login?: string; password?: string }>({});
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError({});

    const user = userDb
      .getAll()
      .find((u) => u.username === login.trim() || u.email === login.trim());

    if (!user) {
      setError({ login: "Користувача не знайдено" });
      return;
    }

    if (user.password !== password) {
      setError({ password: "Неправильний пароль" });
      return;
    }

    localStorage.setItem("currentUserId", user.id);
    userDb.update(user.id, { lastActive: new Date() });

    navigate(`/profile/${user.id}`);
  };

  // 🔹 Скидання пароля (імітація)
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage(null);

    const user = userDb.getByEmail(resetEmail.trim());
    if (!user) {
      setResetMessage("❌ Користувача з такою поштою не знайдено");
      return;
    }

    // тут можна було б надіслати "листа" або скинути пароль
    setResetMessage(
      "✅ Інструкцію для відновлення паролю відправлено на вашу пошту."
    );

    setTimeout(() => {
      setShowReset(false);
      setResetEmail("");
      setResetMessage(null);
    }, 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 pt-32 md:pt-36 md:pb-24 pb-20 relative">
        <Card className="w-full max-w-md border-gray-300 bg-white shadow-md rounded-2xl">
          <CardContent>
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Увійти
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Логін або Email */}
              <div>
                <Label htmlFor="login">Логін або Email</Label>
                <Input
                  id="login"
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Введіть логін або email"
                  autoComplete="username"
                />
                {error.login && (
                  <p className="mt-1 text-sm text-red-600">{error.login}</p>
                )}
              </div>

              {/* Пароль */}
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введіть пароль"
                  autoComplete="current-password"
                />
                {error.password ? (
                  <p className="mt-1 text-sm text-red-600">{error.password}</p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowReset(true)}
                    className="mt-1 text-sm text-blue-600 hover:underline border-0 bg-transparent focus:outline-none"
                  >
                    Забули пароль?
                  </button>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
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

        {/* ===== МОДАЛЬНЕ ВІКНО ДЛЯ СКИДАННЯ ПАРОЛЯ ===== */}
        {showReset && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4 text-center">
                Відновлення паролю
              </h2>
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <Label htmlFor="resetEmail">Введіть вашу електронну пошту</Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {resetMessage && (
                  <p
                    className={`text-sm text-center ${
                      resetMessage.startsWith("✅")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {resetMessage}
                  </p>
                )}

                <div className="flex gap-2 justify-center mt-4">
                  <Button
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Відновити
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowReset(false);
                      setResetEmail("");
                      setResetMessage(null);
                    }}
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Скасувати
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
