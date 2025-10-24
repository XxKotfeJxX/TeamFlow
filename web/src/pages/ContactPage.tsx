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

        <main className="relative z-10 flex-1 max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-24 space-y-24">
          {/* HERO */}
          <section className="text-center space-y-4">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {tc("title")}
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {tc("subtitle")}
            </motion.p>
          </section>

          {/* CONTACT INFO */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: Mail,
                title: tc("emailTitle"),
                value: tc("emailValue"),
              },
              {
                icon: MapPin,
                title: tc("officeTitle"),
                value: tc("officeValue"),
              },
              {
                icon: Clock,
                title: tc("hoursTitle"),
                value: tc("hoursValue"),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-8 space-y-3 hover:shadow-lg"
              >
                <item.icon className="h-8 w-8 text-blue-600 mx-auto" />
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-500">{item.value}</p>
              </motion.div>
            ))}
          </section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-md shadow-md border border-gray-100 rounded-2xl p-10"
          >
            <h2 className="text-2xl font-semibold mb-8 text-center">
              {tc("formTitle")}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto space-y-6"
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
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 p-3"
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
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 p-3"
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
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 p-3"
                ></Textarea>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-transform hover:scale-105"
                >
                  {tc("sendButton")}
                </Button>

                {sent && (
                  <p className="text-green-600 mt-3 text-sm">{tc("sentMsg")}</p>
                )}
              </div>
            </form>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {tc("mapTitle")}
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.910093153667!2d30.5200223!3d50.4478752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce54c96f56c3%3A0x5c5941f5d92a0bb8!2z0LLRg9C70LjRhtGPINCa0L7RgdC80L7QstGB0LrQvtCz0L4sIDEsINCa0LjRl9CyLCDQutC-0LvQsNCy0YHRjNC60LAgMDIwMDA!5e0!3m2!1suk!2sua!4v1697800000000!5m2!1suk!2sua"
                width="100%"
                height="400"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </motion.section>
        </main>
      </div>
      <Footer />
    </>
  );
}
