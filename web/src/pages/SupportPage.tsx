import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/Accordion";
import { Button } from "../components/ui/Button";
import { useTranslation } from "../components/useTranslations";

export default function SupportPage() {
  const { t } = useTranslation();
  const ts = t("support");

  const faqs = [
    {
      q: ts("q1"),
      a: ts("a1"),
    },
    {
      q: ts("q2"),
      a: ts("a2"),
    },
    {
      q: ts("q3"),
      a: ts("a3"),
    },
    {
      q: ts("q4"),
      a: ts("a4"),
    },
    {
      q: ts("q5"),
      a: ts("a5"),
    },
    {
      q: ts("q6"),
      a: ts("a6"),
    },
    {
      q: ts("q7"),
      a: ts("a7"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-900">
          {ts("title")}
        </h1>

        <section className="space-y-6 mb-12 text-center">
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {ts("intro")}
          </p>
        </section>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>
                <span dangerouslySetInnerHTML={{ __html: f.a }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-16">
          <p className="text-gray-700 mb-4 text-lg">{ts("noAnswer")}</p>
          <Button
            onClick={() =>
              (window.location.href = "mailto:support@teamflow.com")
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl transition-transform hover:scale-105"
            style={{ border: "none" }}
          >
            {ts("contactButton")}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
