import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // ✅ нова офіційна іконка X

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 text-sm">
      {/* Контейнер */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Продукт */}
        <div>
          <h4 className="text-white font-semibold mb-4">Продукт</h4>
          <ul className="space-y-2">
            <li><a href="/features" className="hover:text-white transition">Функції</a></li>
            <li><a href="/price" className="hover:text-white transition">Ціни</a></li>
            <li><a href="/download" className="hover:text-white transition">Завантаження</a></li>
          </ul>
        </div>

        {/* Компанія */}
        <div>
          <h4 className="text-white font-semibold mb-4">Компанія</h4>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-white transition">Про нас</a></li>
            <li><a href="/blog" className="hover:text-white transition">Блог</a></li>
            <li><a href="/career" className="hover:text-white transition">Кар’єра</a></li>
          </ul>
        </div>

        {/* Підтримка */}
        <div>
          <h4 className="text-white font-semibold mb-4">Підтримка</h4>
          <ul className="space-y-2">
            <li><a href="/support" className="hover:text-white transition">Допомога</a></li>
            <li><a href="/contact" className="hover:text-white transition">Контакти</a></li>
            <li><a href="/documentation" className="hover:text-white transition">Документація</a></li>
          </ul>
        </div>

        {/* Соцмережі + мова */}
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-white font-semibold mb-2">Слідкуйте за нами</h4>
            <div className="flex gap-4 text-lg">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <FaFacebook />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <FaXTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Вибір мови */}
          <div>
            <label htmlFor="language" className="block mb-1 text-gray-400">Мова сайту</label>
            <select
              id="language"
              className="bg-gray-800 text-white border border-gray-700 rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="uk">Українська</option>
              <option value="en">English</option>
              <option value="pl">Polski</option>
            </select>
          </div>
        </div>
      </div>

      {/* Нижній ряд */}
      <div className="w-full border-t border-gray-700 text-center py-4 px-4 text-xs text-gray-500">
        © {new Date().getFullYear()} TeamFlow. Усі права захищено.
        <span className="mx-2">·</span>
        <a href="/privacy" className="hover:text-white transition">Політика конфіденційності</a>
        <span className="mx-2">·</span>
        <a href="/terms" className="hover:text-white transition">Умови користування</a>
      </div>
    </footer>
  );
};

export default Footer;
