import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { userDb } from "../models/mockDB/users";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof userDb.getById> | null>(null);

  // ============================
  // 🔹 Отримуємо користувача
  // ============================
  useEffect(() => {
    const localId = localStorage.getItem("currentUserId");

    if (localId) {
      const localUser = userDb.getById(localId);
      if (localUser) {
        setCurrentUser(localUser);
        return;
      }
    }

    const match = location.pathname.match(/\/profile\/([^/]+)/);
    if (match && match[1]) {
      const urlUser = userDb.getById(match[1]);
      if (urlUser) setCurrentUser(urlUser);
    }
  }, [location.pathname]);

  // ============================
  // 🔹 Вихід
  // ============================
  const handleLogout = () => {
    localStorage.removeItem("currentUserId");
    setCurrentUser(null);
    navigate("/login");
  };

  // ============================
  // 🔹 Меню навігації
  // ============================

  const navItemsBase = [
    {
      label: "Продукт",
      options: [
        { name: "Огляд", path: "/overview" },
        { name: "Функції", path: "/features" },
        { name: "Ціни", path: "/price" },
      ],
    },
    {
      label: "Компанія",
      options: [
        { name: "Про нас", path: "/about" },
        { name: "Команда", path: "/my-team" },
        { name: "Кар’єра", path: "/career" },
      ],
    },
    {
      label: "Ресурси",
      options: [
        { name: "Блог", path: "/blog" },
        { name: "Підтримка", path: "/support" },
        { name: "Документація", path: "/documentation" },
      ],
    },
  ];

  const navItems = currentUser
    ? [
        ...navItemsBase,
        {
          label: "Мій простір",
          options: [
            {
              name: "Календар",
              path: `/calendar/${currentUser.id}/${new Date().getFullYear()}-${String(
                new Date().getMonth() + 1
              ).padStart(2, "0")}`,
            },
            { name: "Завдання", path: `/tasks/user/${currentUser.id}` },
            { name: "Команди", path: `/teams/user/${currentUser.id}` },
          ],
        },
      ]
    : navItemsBase;

  // ============================
  // 🔹 Ховери
  // ============================
  const handleMouseEnter = (idx: number) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpenMenu(idx);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200);
  };

  // ============================
  // 🔹 Рендер
  // ============================
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
        {/* Лого */}
        <div
          className="font-bold text-xl text-gray-800 cursor-pointer flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <img
            src="/images/TeamFlow_logo.png"
            alt="TeamFlow Logo"
            style={{ height: "70px", width: "auto" }}
            className="hover:opacity-80 transition"
          />
        </div>

        {/* Навігація */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-700">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="hover:text-blue-600 transition p-2 rounded-xl">
                {item.label}
              </button>

              {openMenu === idx && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 w-44 text-sm z-50">
                  {item.options.map(
                    (
                      option: string | { name: string; path: string },
                      i: number
                    ) =>
                      typeof option === "string" ? (
                        <span
                          key={i}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-default"
                        >
                          {option}
                        </span>
                      ) : (
                        <button
                          key={i}
                          onClick={() => navigate(option.path)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition text-gray-800"
                        >
                          {option.name}
                        </button>
                      )
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Праворуч — користувач */}
        <div className="flex items-center gap-3 text-sm">
          {currentUser ? (
            <div className="flex items-center gap-3">
              {currentUser.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.username}
                  className="w-8 h-8 rounded-full object-cover cursor-pointer"
                  onClick={() => navigate(`/profile/${currentUser.id}`)}
                />
              ) : (
                <div
                  onClick={() => navigate(`/profile/${currentUser.id}`)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold cursor-pointer"
                >
                  {currentUser.username.charAt(0).toUpperCase()}
                </div>
              )}

              <button
                onClick={() => navigate(`/profile/${currentUser.id}`)}
                className="text-gray-800 font-medium hover:text-blue-600 transition"
              >
                {currentUser.fullname || currentUser.username}
              </button>

              <button
                onClick={handleLogout}
                className="ml-2 text-gray-500 hover:text-red-600 transition"
              >
                Вийти
              </button>
            </div>
          ) : (
            <>
              <button
                className="text-gray-700 hover:text-blue-600 transition p-2 rounded-xl"
                onClick={() => navigate("/login")}
              >
                Увійти
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
              >
                Зареєструватися
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
