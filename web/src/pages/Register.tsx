import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Checkbox } from "../components/ui/Checkbox";
import { userDb } from "../models/mockDB/users";
import { useTranslation } from "../components/useTranslations";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tr = t("registerPage");

  const passwordRules = [
    { test: (p: string) => p.length >= 8, text: tr("ruleLength") },
    { test: (p: string) => /[A-Z]/.test(p), text: tr("ruleUppercase") },
    { test: (p: string) => /[a-z]/.test(p), text: tr("ruleLowercase") },
    { test: (p: string) => /\d/.test(p), text: tr("ruleDigit") },
    { test: (p: string) => /[^A-Za-z0-9]/.test(p), text: tr("ruleSpecial") },
  ];

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

    if (!login.trim()) newErrors.login = tr("errorLoginRequired");

    const failedRules = passwordRules
      .filter((rule) => !rule.test(password))
      .map((rule) => rule.text);
    if (failedRules.length > 0) newErrors.password = failedRules;

    if (repeatPassword !== password)
      newErrors.repeatPassword = tr("errorPasswordsMismatch");

    if (!isValidEmail(email)) newErrors.email = tr("errorInvalidEmail");

    if (!agree) newErrors.agree = tr("errorAgreeRequired");

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (userDb.getByEmail(email)) {
      setErrors({ email: tr("errorEmailExists") });
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

        <main className="relative z-10 flex-1 flex items-center justify-center px-4 pt-28 pb-20 md:pt-32 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <Card className="border border-gray-100 bg-white/70 backdrop-blur-md shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                  {tr("title")}
                </h1>

                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="space-y-4"
                >
                  {/* Login */}
                  <div>
                    <Label htmlFor="login">{tr("loginLabel")}</Label>
                    <Input
                      id="login"
                      type="text"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      placeholder={tr("loginPlaceholder")}
                      className="rounded-xl"
                    />
                    {errors.login && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.login}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="pt-4">
                    <Label htmlFor="password">{tr("passwordLabel")}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={tr("passwordPlaceholder")}
                      className="rounded-xl"
                    />

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
                        <p>{tr("passwordNotValid")}</p>
                        <ul className="list-disc ml-5">
                          {errors.password.map((msg, i) => (
                            <li key={i}>{msg}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Repeat password */}
                  <div>
                    <Label htmlFor="repeatPassword">
                      {tr("repeatPasswordLabel")}
                    </Label>
                    <Input
                      id="repeatPassword"
                      type="password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      placeholder={tr("repeatPasswordPlaceholder")}
                      className="rounded-xl"
                    />
                    {errors.repeatPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.repeatPassword}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="pt-4">
                    <Label htmlFor="email">{tr("emailLabel")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={tr("emailPlaceholder")}
                      className="rounded-xl"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Agreement */}
                  <div className="pt-6">
                    <Checkbox
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      label={
                        <>
                          {tr("agreeText")}{" "}
                          <a
                            href="/privacy"
                            className="text-blue-600 hover:underline"
                          >
                            {tr("privacyPolicy")}
                          </a>
                        </>
                      }
                    />
                    {errors.agree && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.agree}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors mt-6 rounded-xl py-3 text-lg font-medium shadow-sm hover:shadow-md"
                  >
                    {tr("registerButton")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>

      <Footer />
    </>
  );
}
