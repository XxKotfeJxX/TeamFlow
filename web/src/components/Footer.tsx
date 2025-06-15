import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 text-sm">
      {/* Контейнер з max-width для вирівнювання контенту всередині */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Категорії */}
        <div>
          <h4 className="text-white font-semibold mb-4">Продукт</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Функції</a></li>
            <li><a href="#" className="hover:text-white">Ціни</a></li>
            <li><a href="#" className="hover:text-white">Завантаження</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Компанія</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Про нас</a></li>
            <li><a href="#" className="hover:text-white">Блог</a></li>
            <li><a href="#" className="hover:text-white">Кар’єра</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Підтримка</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Допомога</a></li>
            <li><a href="#" className="hover:text-white">Контакти</a></li>
            <li><a href="#" className="hover:text-white">Документація</a></li>
          </ul>
        </div>

        {/* Соцмережі + мова */}
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-white font-semibold mb-2">Слідкуйте за нами</h4>
            <div className="flex gap-4 text-lg">
              <a href="#" className="hover:text-white"><FaFacebook /></a>
              <a href="#" className="hover:text-white"><FaTwitter /></a>
              <a href="#" className="hover:text-white"><FaInstagram /></a>
              <a href="#" className="hover:text-white"><FaLinkedin /></a>
            </div>
          </div>

          <div>
            <label htmlFor="language" className="block mb-1 text-gray-400">Мова сайту</label>
            <select
              id="language"
              className="bg-gray-800 text-white border border-gray-700 rounded-md p-2 w-full"
            >
              <option value="uk">Українська</option>
              <option value="en">English</option>
              <option value="pl">Polski</option>
            </select>
          </div>
        </div>
      </div>

      {/* Низ футера */}
      <div className="w-full border-t border-gray-700 text-center py-4 px-4 text-xs text-gray-500">
        © {new Date().getFullYear()} TeamFlow. Усі права захищено.
        <span className="mx-2">·</span>
        <a href="#" className="hover:text-white">Політика конфіденційності</a>
        <span className="mx-2">·</span>
        <a href="#" className="hover:text-white">Умови користування</a>
      </div>
    </footer>
  )
}
export default Footer;
