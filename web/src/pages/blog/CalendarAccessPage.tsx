import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/Button";
import { useTranslation } from "../../components/useTranslations";

export default function CalendarAccessPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tb = t("blogCalendar");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      {/* Hero */}
      <section className="relative h-[420px] bg-gradient-to-r from-blue-600 to-teal-500 text-white flex flex-col justify-center items-center text-center px-4">
        <img
          src="/images/calendar.png"
          alt={tb("heroAlt")}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {tb("heroTitle")}
          </h1>
          <p className="text-lg opacity-90">{tb("heroDate")}</p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 space-y-16 leading-relaxed">
        {/* Intro */}
        <section>
          <p className="text-lg text-gray-700 mb-6">{tb("intro")}</p>
          <img
            src="/images/calendar-access-diagram.png"
            alt={tb("diagramAlt")}
            className="rounded-xl mt-4 shadow-lg"
          />
        </section>

        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{tb("sec1Title")}</h2>
          <p dangerouslySetInnerHTML={{ __html: tb("sec1Text") }} />
          <img
            src="/images/private-public-calendar.png"
            alt={tb("sec1ImgAlt")}
            className="rounded-xl mt-6 shadow-md"
          />
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{tb("sec2Title")}</h2>
          <p>{tb("sec2Text")}</p>
          <div className="aspect-video mt-6 rounded-xl overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/MfIsunvTTQw"
              title="TeamFlow Calendar Access Demo"
              allowFullScreen
            />
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{tb("sec3Title")}</h2>
          <p>{tb("sec3Text")}</p>
          <img
            src="/images/calendar-tags.png"
            alt={tb("sec3ImgAlt")}
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{tb("sec4Title")}</h2>
          <p>{tb("sec4Text")}</p>
          <img
            src="/images/calendar-confirmation.png"
            alt={tb("sec4ImgAlt")}
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{tb("sec5Title")}</h2>
          <p>{tb("sec5Text")}</p>
        </section>

        {/* Quote */}
        <section className="text-lg italic text-gray-600 border-l-4 border-teal-500 pl-4">
          <p>{tb("quote")}</p>
        </section>

        {/* Back button */}
        <div className="flex justify-center mt-12">
          <Button
            onClick={() => navigate("/blog")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            ← {tb("backButton")}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
