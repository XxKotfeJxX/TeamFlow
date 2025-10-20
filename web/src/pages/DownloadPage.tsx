// src/pages/DownloadPage.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { Download, Monitor, Smartphone, Laptop } from "lucide-react";
import { motion } from "framer-motion";

export default function DownloadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16">
        {/* HERO */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Завантаж TeamFlow
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Отримай доступ до командного простору будь-де.  
            Працюй офлайн, синхронізуй дані миттєво, залишайся на зв’язку навіть без браузера.
          </p>
        </section>

        {/* ПЛАТФОРМИ */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Windows */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow-md rounded-2xl p-8 flex flex-col items-center text-center"
          >
            <Monitor className="h-10 w-10 text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Windows</h2>
            <p className="text-gray-500 mb-4">
              Сумісна з Windows 10 і новішими.  
              Підтримка автооновлень і офлайн-режиму.
            </p>
            <Button variant="default" size="lg">
              <Download className="mr-2 h-5 w-5" /> Завантажити .exe
            </Button>
          </motion.div>

          {/* macOS */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow-md rounded-2xl p-8 flex flex-col items-center text-center"
          >
            <Laptop className="h-10 w-10 text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">macOS</h2>
            <p className="text-gray-500 mb-4">
              Підтримка Apple Silicon (M1, M2, M3).  
              Оптимізовано для Sonoma та Ventura.
            </p>
            <Button variant="default" size="lg">
              <Download className="mr-2 h-5 w-5" /> Завантажити .dmg
            </Button>
          </motion.div>

          {/* Mobile */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow-md rounded-2xl p-8 flex flex-col items-center text-center"
          >
            <Smartphone className="h-10 w-10 text-indigo-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Мобільні пристрої</h2>
            <p className="text-gray-500 mb-4">
              Завантаж додаток на свій смартфон,  
              щоб бути з командою на зв’язку будь-де.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="lg">
                App Store
              </Button>
              <Button variant="outline" size="lg">
                Google Play
              </Button>
            </div>
          </motion.div>
        </section>

        {/* QR / INFO */}
        <section className="text-center mb-20">
          <h2 className="text-2xl font-semibold mb-4">Швидке встановлення</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Відскануй QR-код, щоб миттєво завантажити мобільну версію,  
            або скористайся автоматичним визначенням платформи для швидкого вибору інсталятора.
          </p>

          <div className="flex flex-col items-center gap-6">
            <img
              src="/images/qr-placeholder.png"
              alt="QR Code"
              className="w-40 h-40 rounded-lg border border-gray-200 shadow-sm"
            />
            <p className="text-sm text-gray-400">
              (Так, ми ще працюємо над автоматичним розпізнаванням — але воно вже близько)
            </p>
          </div>
        </section>

        {/* TECH INFO */}
        <section className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Технічні вимоги
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Windows 10+ / macOS 13+ / Android 10+ / iOS 15+</li>
            <li>Не менше 200 МБ вільного місця</li>
            <li>Стабільне інтернет-з’єднання для синхронізації</li>
            <li>Бажано — чашка кави ☕</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
