import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "../components/useTranslations";

export default function TermsOfService() {
  const { t } = useTranslation();
  const tt = t("terms");

  const sections = Array.from({ length: 10 }, (_, i) => ({
    titleKey: `sec${i + 1}Title` as const,
    textKey: `sec${i + 1}Text` as const,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 leading-relaxed">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-6 pb-12 pt-28">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
          {tt("title")}
        </h1>

        <p className="text-center text-gray-500 mb-12 italic">
          {tt("updated")}
        </p>

        {sections.map((s, i) => {
          // кастимо динамічний ключ до відомого типу для t()
          const title = tt(s.titleKey as keyof typeof tt);
          const text = tt(s.textKey as keyof typeof tt);

          const paragraphs = Array.isArray(text)
            ? text
            : (text as unknown as string[]);

          return (
            <section key={i} className="space-y-4 mb-10">
              <h2 className="text-2xl font-semibold text-indigo-700">
                {title}
              </h2>

              {paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={
                    p.startsWith("*gray") ? "text-gray-500 italic text-sm" : ""
                  }
                >
                  {p.replace("*gray", "")}
                </p>
              ))}
            </section>
          );
        })}

        <p className="text-center text-gray-600 mt-16">⚖️ {tt("footer")}</p>
      </main>

      <Footer />
    </div>
  );
}
