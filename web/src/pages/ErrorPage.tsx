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
import { Button } from "../components/ui/Button";
import { useTranslation } from "../components/useTranslations";

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
  const { t } = useTranslation();
  const te = t("errorPage");

  const COPY = {
    401: {
      title: te("error401Title"),
      hint: te("error401Hint"),
    },
    403: {
      title: te("error403Title"),
      hint: te("error403Hint"),
    },
    404: {
      title: te("error404Title"),
      hint: te("error404Hint"),
    },
    429: {
      title: te("error429Title"),
      hint: te("error429Hint"),
    },
    500: {
      title: te("error500Title"),
      hint: te("error500Hint"),
    },
    502: {
      title: te("error502Title"),
      hint: te("error502Hint"),
    },
    503: {
      title: te("error503Title"),
      hint: te("error503Hint"),
    },
    504: {
      title: te("error504Title"),
      hint: te("error504Hint"),
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

  const c = Number(code);
  const variant = COPY[c as keyof typeof COPY] ?? {
    title: te("errorUnknownTitle"),
    hint: te("errorUnknownHint"),
  };

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-background to-muted/30">
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

      <main className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center sm:py-20">
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-2xl border bg-card px-4 py-2 text-card-foreground shadow-sm">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-gray-500">
              {te("errorCode")}
            </span>
            <span className="font-mono text-sm text-gray-500">{c}</span>
          </div>

          <motion.div
            role="img"
            aria-label="emoji"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-4 select-none text-4xl sm:text-5xl text-gray-600"
          >
            {codeToFace(c)}
          </motion.div>

          <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl text-gray-700">
            {variant.title}
          </h1>
          <p className="mx-auto mb-8 max-w-prose text-pretty text-gray-500">
            {variant.hint}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mb-10 w-full max-w-md"
          >
            {/* Simple SVG decorative graphic */}
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
              <rect
                x="40"
                y="20"
                rx="16"
                ry="16"
                width="320"
                height="180"
                fill="url(#g1)"
              />
            </svg>
          </motion.div>

          <div className="mx-auto flex w-full max-w-md flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            {showBack && (
              <Button
                onClick={() => navigate(-1)}
                variant="secondary"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-gray-600 hover:border-gray-300"
              >
                <ArrowLeft className="h-4 w-4" /> {te("back")}
              </Button>
            )}

            <Link to={homeTo} className="w-full sm:w-auto">
              <Button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2 text-gray-600 hover:border-gray-300">
                <Home className="h-4 w-4" /> {te("home")}
              </Button>
            </Link>

            <Button
              onClick={() => (onReport ? onReport() : navigate(0))}
              variant="outline"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-gray-600 hover:border-gray-300"
              title={onReport ? te("reportTitle") : te("refreshTitle")}
            >
              {onReport ? (
                <Bug className="h-4 w-4" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {onReport ? te("report") : te("refresh")}
            </Button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            {te("needHelp")}{" "}
            <Link
              to={contactTo}
              className="inline-flex items-center gap-1 underline-offset-2 hover:underline"
            >
              <Mail className="h-3.5 w-3.5" />
              {te("support")}
            </Link>
            .
          </p>
        </motion.div>
      </main>
    </div>
  );
}
