import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Home,
  ArrowLeft,
  Mail,
  RefreshCw,
  Bug,
} from "lucide-react";
import { Button } from "../components/ui/Button"; // ⬅️ shadcn/ui button (adjust import path to your project)

/**
 * Гарна, адаптивна, креативна сторінка помилки для TeamFlow
 * — Підтримує різні коди помилок (401, 403, 404, 429, 500, 502, 503, 504, fallback)
 * — Темна/світла тема, анімації, доступність
 * — Не вибивається зі стилю: чиста типографіка, округлі кути, м'які тіні
 *
 * Приклад використання:
 * <ErrorPage code={404} />
 * <Route path="*" element={<ErrorPage code={404} />} />
 */

const COPY = {
  401: {
    title: "Потрібна авторизація",
    hint: "Увійдіть у свій акаунт, щоб продовжити.",
  },
  403: {
    title: "Доступ заборонено",
    hint: "Схоже, у вас немає прав на цю дію.",
  },
  404: {
    title: "Сторінку не знайдено",
    hint: "Можливо, посилання застаріло або було змінене.",
  },
  429: {
    title: "Занадто багато запитів",
    hint: "Трішки паузи — і все знову запрацює.",
  },
  500: {
    title: "Щось пішло не так",
    hint: "Це на нашому боці. Ми вже дивимось.",
  },
  502: {
    title: "Поганий шлюз",
    hint: "Проміжний сервер відповів некоректно.",
  },
  503: {
    title: "Сервіс недоступний",
    hint: "Сервер перевантажений або на обслуговуванні.",
  },
  504: {
    title: "Тайм-аут шлюзу",
    hint: "Відповідь зайняла надто багато часу.",
  },
} as const;

const codeToFace = (code: number | string) => {
  const c = Number(code);
  if (c === 404) return "( •︵• )";
  if (c === 500) return "( x _ x )";
  if (c === 401 || c === 403) return "( •‿• )ゞ";
  if (c === 429) return "( ⚆ _ ⚆ )";
  return "( •_• )";
};

export default function ErrorPage({
  code,
  homeTo = "/",
  contactTo = "/support",
  showBack = true,
  onReport,
}: {
  code: number | string;
  homeTo?: string;
  contactTo?: string;
  showBack?: boolean;
  onReport?: () => void;
}) {
  const navigate = useNavigate();
  const c = Number(code);
  const variant = COPY[c as keyof typeof COPY] ?? {
    title: "Невідома помилка",
    hint: "Ми вже розслідуємо, а ви можете повернутися на головну.",
  };

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Градиєнтні бліки позаду */}
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

      {/* Контент-карта */}
      <main className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center sm:py-20">
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full"
        >
          {/* Код помилки */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-2xl border bg-card px-4 py-2 text-card-foreground shadow-sm">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground text-gray-500">
              Код помилки
            </span>
            <span className="font-mono text-sm text-gray-500">{c}</span>
          </div>

          {/* ASCII-обличчя */}
          <motion.div
            role="img"
            aria-label="емоційне обличчя помилки"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-4 select-none text-4xl sm:text-5xl text-gray-600"
          >
            {codeToFace(c)}
          </motion.div>

          {/* Заголовок */}
          <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl text-gray-700">
            {variant.title}
          </h1>
          <p className="mx-auto mb-8 max-w-prose text-pretty text-muted-foreground text-gray-500">
            {variant.hint}
          </p>

          {/* Креативна ілюстрація (SVG) */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mb-10 w-full max-w-md"
          >
            <svg
              viewBox="0 0 400 220"
              className="h-auto w-full drop-shadow-sm"
              aria-hidden
            >
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop
                    offset="0%"
                    stopColor="currentColor"
                    stopOpacity="0.25"
                  />
                  <stop
                    offset="100%"
                    stopColor="currentColor"
                    stopOpacity="0.05"
                  />
                </linearGradient>
              </defs>
              {/* Екран з помилкою */}
              <rect
                x="40"
                y="20"
                rx="16"
                ry="16"
                width="320"
                height="180"
                fill="url(#g1)"
              />
              <rect
                x="55"
                y="45"
                rx="8"
                ry="8"
                width="290"
                height="12"
                opacity="0.25"
              />
              <rect
                x="55"
                y="70"
                rx="8"
                ry="8"
                width="180"
                height="12"
                opacity="0.4"
              />
              <rect
                x="55"
                y="90"
                rx="8"
                ry="8"
                width="240"
                height="12"
                opacity="0.2"
              />
              <rect
                x="55"
                y="110"
                rx="8"
                ry="8"
                width="210"
                height="12"
                opacity="0.2"
              />
              <g>
                <circle cx="320" cy="38" r="4" />
                <circle cx="306" cy="38" r="4" />
                <circle cx="292" cy="38" r="4" />
              </g>
              {/* Маленькі зірки */}
              <g opacity="0.3">
                <circle cx="80" cy="30" r="2" />
                <circle cx="110" cy="18" r="1.5" />
                <circle cx="360" cy="60" r="1.5" />
                <circle cx="300" cy="190" r="1.2" />
              </g>
              {/* Логотип-жучок */}
              <g transform="translate(260 130)">
                <circle r="18" />
                <line
                  x1="-24"
                  y1="0"
                  x2="-40"
                  y2="0"
                  strokeWidth="3"
                  stroke="currentColor"
                />
                <line
                  x1="24"
                  y1="0"
                  x2="40"
                  y2="0"
                  strokeWidth="3"
                  stroke="currentColor"
                />
                <line
                  x1="0"
                  y1="-24"
                  x2="0"
                  y2="-40"
                  strokeWidth="3"
                  stroke="currentColor"
                />
              </g>
            </svg>
          </motion.div>

          {/* Дії */}
          <div className="mx-auto flex w-full max-w-md flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            {showBack && (
              <Button
                onClick={() => navigate(-1)}
                variant="secondary"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-gray-600 hover:border-gray-300"
              >
                <ArrowLeft className="h-4 w-4" /> Назад
              </Button>
            )}

            <Link to={homeTo} className="w-full sm:w-auto">
              <Button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2 text-gray-600 hover:border-gray-300">
                <Home className="h-4 w-4" /> На головну
              </Button>
            </Link>

            <Button
              onClick={() => (onReport ? onReport() : navigate(0))}
              variant="outline"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-gray-600 hover:border-gray-300"
              title={
                onReport ? "Надіслати звіт про помилку" : "Оновити сторінку"
              }
            >
              {onReport ? (
                <Bug className="h-4 w-4 " />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {onReport ? "Поскаржитись" : "Оновити"}
            </Button>
          </div>

          {/* Посилання підтримки */}
          <p className="mt-6 text-sm text-muted-foreground text-gray-500">
            Потрібна допомога? Напишіть нам у{" "}
            <Link
              to={contactTo}
              className="inline-flex items-center gap-1 underline-offset-2 hover:underline"
            >
              <Mail className="h-3.5 w-3.5" />
              підтримку
            </Link>
            .
          </p>
        </motion.div>
      </main>
    </div>
  );
}
