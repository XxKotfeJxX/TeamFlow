import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
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

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage(null);

    const user = userDb.getByEmail(resetEmail.trim());
    if (!user) {
      setResetMessage("❌ Користувача з такою поштою не знайдено");
      return;
    }

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
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 text-gray-900">
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

        <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <Card className="border border-gray-100 bg-white/70 backdrop-blur-md shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                  Увійти
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="login">Логін або Email</Label>
                    <Input
                      id="login"
                      type="text"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      placeholder="Введіть логін або email"
                      autoComplete="username"
                      className="rounded-xl"
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
                      autoComplete="current-password"
                      className="rounded-xl"
                    />
                    {error.password ? (
                      <p className="mt-1 text-sm text-red-600">
                        {error.password}
                      </p>
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
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-xl py-3 font-medium text-lg transition"
                  >
                    Увійти
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                  Не маєш акаунту?{" "}
                  <a
                    href="#/register"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Створи його
                  </a>
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {showReset && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-sm border border-gray-100"
              >
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                  Відновлення паролю
                </h2>
                <form onSubmit={handleReset} className="space-y-4">
                  <div>
                    <Label htmlFor="resetEmail">
                      Введіть вашу електронну пошту
                    </Label>
                    <Input
                      id="resetEmail"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="rounded-xl"
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

                  <div className="flex gap-3 justify-center mt-4">
                    <Button
                      type="submit"
                      className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl"
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
                      className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl"
                    >
                      Скасувати
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}
