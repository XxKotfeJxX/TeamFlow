import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { Users, Target, Rocket } from "lucide-react";
import { useTranslation } from "../components/useTranslations";

export default function AboutPage() {
  const { t } = useTranslation();
  const ta = t("about");

  const highlights = [
    {
      icon: Users,
      title: ta("highlight1Title"),
      desc: ta("highlight1Desc"),
    },
    {
      icon: Target,
      title: ta("highlight2Title"),
      desc: ta("highlight2Desc"),
    },
    {
      icon: Rocket,
      title: ta("highlight3Title"),
      desc: ta("highlight3Desc"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 text-gray-800 pt-28 pb-0 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">{ta("title")}</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">{ta("subtitle")}</p>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16">
        <section className="text-center space-y-6 text-lg leading-relaxed max-w-3xl mx-auto">
          <p dangerouslySetInnerHTML={{ __html: ta("p1") }} />
          <p>{ta("p2")}</p>
          <p dangerouslySetInnerHTML={{ __html: ta("p3") }} />
        </section>

        {/* Highlights */}
        <section className="grid md:grid-cols-3 gap-8 mt-16">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-transform text-center"
            >
              <item.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div className="text-center mt-20">
          <Button
            onClick={() => (window.location.href = "/career")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl transition-transform hover:scale-105"
            style={{ border: "none" }}
          >
            {ta("cta")}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
