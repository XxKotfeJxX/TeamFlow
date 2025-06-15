import { useState } from 'react'

const Header = () => {
  const [openMenu, setOpenMenu] = useState<number | null>(null)

  const navItems = [
    { label: 'Продукт', options: ['Огляд', 'Функції', 'Ціни'] },
    { label: 'Компанія', options: ['Про нас', 'Команда', 'Кар’єра'] },
    { label: 'Ресурси', options: ['Блог', 'Підтримка', 'Документація'] }
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
        {/* Лого */}
        <div className="font-bold text-xl text-gray-800">
          TeamFlow
        </div>

        {/* Навігація */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-700">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => setOpenMenu(idx)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className="hover:text-blue-600 transition">{item.label}</button>
              {openMenu === idx && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 text-sm">
                  {item.options.map((option, i) => (
                    <a
                      key={i}
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      {option}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Кнопки справа */}
        <div className="flex items-center gap-3 text-sm">
          <button className="text-gray-700 hover:text-blue-600 transition">Увійти</button>
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition">
            Завантажити
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
