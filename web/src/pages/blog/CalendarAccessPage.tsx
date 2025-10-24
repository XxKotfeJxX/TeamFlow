// src/pages/blog/CalendarAccessPage.tsx
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/Button";
import { useTranslation } from "../../components/useTranslations";
import { motion } from "framer-motion";

export default function CalendarAccessPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tb = t("blogCalendar");

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 text-gray-800">
        {/* Градієнтні бліки позаду */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
        </motion.div>

        <main className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-start overflow-x-hidden">
          {/* Hero Section */}
          <section className="relative z-10 w-full pt-32 pb-20 px-6 md:px-12 lg:px-24 flex flex-col items-center text-center gap-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-10 max-w-3xl"
            >
              <img
                src="images/calendar.png"
                alt={tb("heroAlt")}
                className="w-28 h-28 mb-6 rounded-xl shadow-md border border-gray-100 object-cover"
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 drop-shadow-sm">
                {tb("heroTitle")}
              </h1>
              <p className="text-lg text-gray-600">{tb("heroDate")}</p>
            </motion.div>
          </section>

          {/* Content Sections */}
          <section className="w-full py-16 px-6 md:px-12 lg:px-24 space-y-20 leading-relaxed">
            {[
              {
                title: null,
                text: tb("intro"),
                img: "images/calendar-access-diagram.png",
                alt: tb("diagramAlt"),
              },
              {
                title: tb("sec1Title"),
                text: tb("sec1Text"),
                img: "images/private-public-calendar.png",
                alt: tb("sec1ImgAlt"),
              },
              {
                title: tb("sec2Title"),
                text: tb("sec2Text"),
                video: "https://www.youtube.com/embed/MfIsunvTTQw",
              },
              {
                title: tb("sec3Title"),
                text: tb("sec3Text"),
                img: "images/calendar-tags.png",
                alt: tb("sec3ImgAlt"),
              },
              {
                title: tb("sec4Title"),
                text: tb("sec4Text"),
                img: "images/calendar-confirmation.png",
                alt: tb("sec4ImgAlt"),
              },
              {
                title: tb("sec5Title"),
                text: tb("sec5Text"),
              },
            ].map((sec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-10 bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]`}
              >
                <div className="flex-1">
                  {sec.title && (
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                      {sec.title}
                    </h2>
                  )}
                  <p
                    className="text-gray-600 text-lg"
                    dangerouslySetInnerHTML={{ __html: sec.text }}
                  />
                </div>
                <div className="flex-1 w-full">
                  {sec.img && (
                    <img
                      src={sec.img}
                      alt={sec.alt}
                      className="w-full rounded-xl shadow-lg border border-gray-100"
                    />
                  )}
                  {sec.video && (
                    <div className="aspect-video mt-2 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                      <iframe
                        className="w-full h-full"
                        src={sec.video}
                        title="TeamFlow Calendar Access Demo"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Quote */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg italic text-gray-600 border-l-4 border-teal-500 pl-6 bg-white/60 rounded-xl p-6 shadow-sm"
            >
              <p>{tb("quote")}</p>
            </motion.section>

            {/* Back button */}
            <div className="flex justify-center mt-12">
              <Button
                onClick={() => navigate("/blog")}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 py-3 text-lg font-semibold shadow-md hover:shadow-lg transition"
              >
                ← {tb("backButton")}
              </Button>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative w-full overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 text-white py-20 px-6 md:px-12 lg:px-24 text-center rounded-t-[2rem]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-4 tracking-tight">
                {tb("ctaTitle")}
              </h2>
              <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                {tb("ctaText")}
              </p>
              <Button
                size="lg"
                className="rounded-2xl px-8 py-3 text-lg bg-white text-blue-700 font-semibold hover:bg-gray-100 shadow-md hover:shadow-lg transition"
                onClick={() => navigate("/register")}
              >
                {tb("ctaButton")}
              </Button>
            </motion.div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
