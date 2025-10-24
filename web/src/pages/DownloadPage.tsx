import Header from "../components/Header";
import Footer from "../components/Footer";
import { Download, Monitor, Smartphone, Laptop } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "../components/useTranslations";

export default function DownloadPage() {
  const { t } = useTranslation();
  const td = t("download");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-24">
        {/* HERO */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {td("title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {td("subtitle")}
          </p>
        </section>

        {/* PLATFORMS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Windows */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition"
          >
            <Monitor className="h-10 w-10 text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Windows</h2>
            <p className="text-gray-500 mb-4">{td("windowsDesc")}</p>
            <a
              href="/downloads/TeamFlow_Setup.exe"
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium flex items-center"
            >
              <Download className="mr-2 h-5 w-5" /> {td("downloadExe")}
            </a>
          </motion.div>

          {/* macOS */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition"
          >
            <Laptop className="h-10 w-10 text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">macOS</h2>
            <p className="text-gray-500 mb-10">{td("macDesc")}</p>
            <a
              href="/downloads/TeamFlow_Mac.dmg"
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium flex items-center"
            >
              <Download className="mr-2 h-5 w-5" /> {td("downloadDmg")}
            </a>
          </motion.div>

          {/* Mobile */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition"
          >
            <Smartphone className="h-10 w-10 text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">{td("mobileTitle")}</h2>
            <p className="text-gray-500 mb-4">{td("mobileDesc")}</p>
            <div className="flex gap-2 pt-4">
              <a
                href="https://apps.apple.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-5 py-1 rounded-lg hover:bg-gray-900 transition"
              >
                App Store
              </a>
              <a
                href="https://play.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-5 py-1 rounded-lg hover:bg-green-700 transition"
              >
                Google Play
              </a>
            </div>
          </motion.div>
        </section>

        {/* QR */}
        <section className="text-center mb-20">
          <h2 className="text-2xl font-semibold mb-4">{td("qrTitle")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">{td("qrText")}</p>

          <a
            href="https://teamflow.app/download"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src="/images/qr-placeholder.png"
              alt={td("qrAlt")}
              className="w-48 h-48 rounded-xl border border-gray-200 shadow-lg hover:scale-105 transition"
            />
          </a>

          <p className="text-sm text-gray-400 mt-4">{td("qrNote")}</p>
        </section>

        {/* TECH INFO */}
        <section className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {td("techTitle")}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>{td("req1")}</li>
            <li>{td("req2")}</li>
            <li>{td("req3")}</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
