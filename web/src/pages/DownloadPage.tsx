import Header from "../components/Header";
import Footer from "../components/Footer";
import { Download, Monitor, Smartphone, Laptop } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "../components/useTranslations";

export default function DownloadPage() {
  const { t } = useTranslation();
  const td = t("download");

  const platformCards = [
    {
      icon: Monitor,
      title: "Windows",
      desc: td("windowsDesc"),
      link: "/downloads/TeamFlow_Setup.exe",
      btn: td("downloadExe"),
    },
    {
      icon: Laptop,
      title: "macOS",
      desc: td("macDesc"),
      link: "/downloads/TeamFlow_Mac.dmg",
      btn: td("downloadDmg"),
    },
    {
      icon: Smartphone,
      title: td("mobileTitle"),
      desc: td("mobileDesc"),
      isMobile: true,
    },
  ];

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 text-gray-800">
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

        <main className="relative z-10 flex-1 max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-24">
          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {td("title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {td("subtitle")}
            </p>
          </motion.section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24 items-stretch">
            {platformCards.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-md hover:shadow-lg p-8 flex flex-col items-center text-center transition-transform h-full"
              >
                <item.icon className="h-10 w-10 text-blue-600 mb-4" />
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-500 mb-6 flex-1">{item.desc}</p>

                <div className="mt-auto">
                  {!item.isMobile ? (
                    <a
                      href={item.link}
                      className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-2xl font-medium flex items-center justify-center shadow-sm hover:shadow-md transition"
                    >
                      <Download className="mr-2 h-5 w-5" /> {item.btn}
                    </a>
                  ) : (
                    <div className="flex gap-2 justify-center">
                      <a
                        href="https://apps.apple.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-900 transition"
                      >
                        App Store
                      </a>
                      <a
                        href="https://play.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Google Play
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-24"
          >
            <h2 className="text-2xl font-semibold mb-4">{td("qrTitle")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              {td("qrText")}
            </p>

            <a
              href="#/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="images/qr.svg"
                alt={td("qrAlt")}
                className="w-48 h-48 rounded-2xl border border-gray-100 shadow-lg hover:scale-105 transition"
              />
            </a>

            <p className="text-sm text-gray-400 mt-4">{td("qrNote")}</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 shadow-md p-10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {td("techTitle")}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>{td("req1")}</li>
              <li>{td("req2")}</li>
              <li>{td("req3")}</li>
            </ul>
          </motion.section>
        </main>
      </div>

      <Footer />
    </>
  );
}
