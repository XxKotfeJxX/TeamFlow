import Header from "../components/Header";
import Footer from "../components/Footer";
import { Mail, MapPin, Clock } from "lucide-react";
import { Button } from "../components/ui/Button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { useTranslation } from "../components/useTranslations";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();
  const tc = t("contact");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-24 space-y-24">
        {/* HERO */}
        <section className="text-center space-y-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {tc("title")}
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {tc("subtitle")}
          </motion.p>
        </section>

        {/* CONTACT INFO */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-3"
          >
            <Mail className="h-8 w-8 text-indigo-600 mx-auto" />
            <h3 className="font-semibold text-lg">{tc("emailTitle")}</h3>
            <p className="text-gray-500">{tc("emailValue")}</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-3"
          >
            <MapPin className="h-8 w-8 text-indigo-600 mx-auto" />
            <h3 className="font-semibold text-lg">{tc("officeTitle")}</h3>
            <p className="text-gray-500">{tc("officeValue")}</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-3"
          >
            <Clock className="h-8 w-8 text-indigo-600 mx-auto" />
            <h3 className="font-semibold text-lg">{tc("hoursTitle")}</h3>
            <p className="text-gray-500">{tc("hoursValue")}</p>
          </motion.div>
        </section>

        {/* FORM */}
        <section className="bg-white shadow-sm border border-gray-100 rounded-2xl p-10">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {tc("formTitle")}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto space-y-5"
            action="mailto:support@teamflow.app"
            method="POST"
          >
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                {tc("nameLabel")}
              </label>
              <Input
                type="text"
                name="name"
                placeholder={tc("namePlaceholder")}
                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 p-3"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                {tc("emailLabel")}
              </label>
              <Input
                type="email"
                name="email"
                required
                placeholder={tc("emailPlaceholder")}
                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 p-3"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                {tc("messageLabel")}
              </label>
              <Textarea
                name="message"
                required
                rows={5}
                placeholder={tc("messagePlaceholder")}
                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 p-3"
              ></Textarea>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                {tc("sendButton")}
              </Button>

              {sent && (
                <p className="text-green-600 mt-3 text-sm">{tc("sentMsg")}</p>
              )}
            </div>
          </form>
        </section>

        {/* MAP */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {tc("mapTitle")}
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.910093153667!2d30.5200223!3d50.4478752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce54c96f56c3%3A0x5c5941f5d92a0bb8!2z0LLRg9C70LjRhtGPINCa0L7RgdC80L7QstGB0LrQvtCz0L4sIDEsINCa0LjRl9CyLCDQutC-0LvQsNCy0YHRjNC60LAgMDIwMDA!5e0!3m2!1suk!2sua!4v1697800000000!5m2!1suk!2sua"
              width="100%"
              height="400"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
