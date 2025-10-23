import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/Card";
import {
  Calendar,
  CheckSquare,
  MessageSquare,
  Shield,
  Code,
  Cpu,
} from "lucide-react";
import { useTranslation } from "../components/useTranslations";

export default function FeaturesPage() {
  const { t, lang, translations } = useTranslation();
  const tf = t("features");

  const icons = [Calendar, CheckSquare, MessageSquare, Shield, Code, Cpu];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-16 pt-24">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          {tf("title")}
        </h1>

        <div className="grid gap-8 max-w-6xl mx-auto px-6 md:grid-cols-2 lg:grid-cols-3">
          {translations[lang].features.sections.map(
            (section: { title: string; points: string[] }, index: number) => {
              const Icon = icons[index];
              return (
                <Card
                  key={index}
                  className="shadow-md hover:shadow-lg transition"
                >
                  <CardContent className="pt-8 pb-6">
                    <Icon className="w-10 h-10 text-indigo-600 mb-3" />
                    <h3 className="text-xl font-medium mb-3 text-gray-800">
                      {section.title}
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                      {section.points.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
