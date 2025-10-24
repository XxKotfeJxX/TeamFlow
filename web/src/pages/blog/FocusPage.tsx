import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/Button";
import { VideoEmbed } from "../../components/ui/VideoEmbed";
import { useTranslation } from "../../components/useTranslations";

export default function FocusPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tb = t("blogFocus");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      {/* Hero */}
      <section className="relative h-[420px] bg-gradient-to-r from-violet-600 to-indigo-500 text-white flex flex-col justify-center items-center text-center px-4">
        <img
          src="/images/focus.jpg"
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
            src="images/focus-team.jpg"
            alt={tb("introImgAlt")}
            className="rounded-xl mt-4 shadow-lg"
          />
        </section>

        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{tb("sec1Title")}</h2>
          <p>{tb("sec1Text")}</p>
          <VideoEmbed
            videoId="xm3YgoEiEDc"
            previewImage="images/team-working.png"
            title="TeamFlow Focus Mode Demo"
          />
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{tb("sec2Title")}</h2>
          <p>{tb("sec2Text")}</p>
          <img
            src="images/morning-checkin.png"
            alt={tb("sec2ImgAlt")}
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{tb("sec3Title")}</h2>
          <p>{tb("sec3Text")}</p>
          <img
            src="images/microbreaks.png"
            alt={tb("sec3ImgAlt")}
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{tb("sec4Title")}</h2>
          <p>{tb("sec4Text")}</p>
          <img
            src="images/focus-ui.png"
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
        <section className="text-lg italic text-gray-600 border-l-4 border-violet-500 pl-4">
          <p>{tb("quote")}</p>
        </section>

        {/* Back */}
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
