import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Calendar, CheckCircle, MessageSquare, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../components/useTranslations";

export default function OverviewPage() {
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("currentUserId");
  const isLoggedIn = Boolean(currentUserId);
  const { t, lang, translations } = useTranslation();
  const to = t("overview");

  // Іконки у тому ж порядку, що й у перекладі
  const icons = [Calendar, CheckCircle, MessageSquare, Shield];

  const handleTryFree = () => {
    navigate(isLoggedIn ? `/profile/${currentUserId}` : "/login");
  };

  const handleDemo = () => {
    navigate(isLoggedIn ? "/price" : "/login");
  };

  const handleJoin = () => {
    navigate(isLoggedIn ? `/profile/${currentUserId}` : "/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 pt-12">
        {/* 🔹 Hero Section */}
        <section className="text-center py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-100">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">
            {to("heroTitle")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {to("heroText")}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={handleTryFree}
            >
              {to("tryFree")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-gray-400 text-gray-800 hover:bg-gray-100 hover:border-gray-600 transition"
              onClick={handleDemo}
            >
              {to("demo")}
            </Button>
          </div>
        </section>

        {/* 🔹 Features Section */}
        <section className="py-20 bg-white">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
            {to("whyTitle")}
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto px-6">
            {translations[lang].overview.features.map(
              (f: { title: string; desc: string }, i: number) => {
                const Icon = icons[i];
                return (
                  <Card
                    key={i}
                    className="text-center shadow-md border border-gray-100 hover:shadow-lg transition"
                  >
                    <CardContent className="pt-8 pb-6">
                      <Icon className="w-10 h-10 mx-auto mb-4 text-blue-600" />
                      <h3 className="text-xl font-medium mb-2 text-gray-800">
                        {f.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{f.desc}</p>
                    </CardContent>
                  </Card>
                );
              }
            )}
          </div>
        </section>

        {/* 🔹 CTA Section */}
        <section className="py-20 bg-gray-100 text-gray-800 text-center">
          <h2 className="text-3xl font-semibold mb-4">{to("ctaTitle")}</h2>
          <p className="text-gray-600 mb-8">{to("ctaText")}</p>
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={handleJoin}
          >
            {to("join")}
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
