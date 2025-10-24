import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // 📦 icons
import { userDb } from "../models/mockDB/users";
import { useTranslation } from "./useTranslations";
import logo from "../../public/images/TeamFlow_logo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentUser, setCurrentUser] = useState<ReturnType<
    typeof userDb.getById
    > | null>(null);
  const { t } = useTranslation();
  const th = t("header");

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
     label: th("product"),
     options: [
       { name: th("overview"), path: "/overview" },
       { name: th("features"), path: "/features" },
       { name: th("pricing"), path: "/price" },
     ],
   },
   {
     label: th("company"),
     options: [
       { name: th("about"), path: "/about" },
       { name: th("team"), path: "/my-team" },
       { name: th("career"), path: "/career" },
     ],
   },
   {
     label: th("resources"),
     options: [
       { name: th("blog"), path: "/blog" },
       { name: th("support"), path: "/support" },
       { name: th("docs"), path: "/documentation" },
     ],
   },
 ];


  const navItems = currentUser
    ? [
        ...navItemsBase,
        {
          label: th("mySpace"),
          options: [
            {
              name: th("calendar"),
              path: `/calendar/${
                currentUser.id
              }/${new Date().getFullYear()}-${String(
                new Date().getMonth() + 1
              ).padStart(2, "0")}`,
            },
            { name: th("tasks"), path: `/tasks/user/${currentUser.id}` },
            { name: th("teams"), path: `/teams/user/${currentUser.id}` },
          ],
        },
      ]
    : navItemsBase;

  // ============================
  // 🔹 Ховери для desktop
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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-20">
        {/* Лого */}
        <div
          className="font-bold text-xl text-gray-800 cursor-pointer flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="TeamFlow Logo"
            style={{ height: "70px", width: "auto" }}
            className="hover:opacity-80 transition"
          />
        </div>

        {/* Навігація для Desktop */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-700">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`p-2 rounded-xl transition duration-150 
                  hover:text-blue-600 focus:outline-none focus:ring-0 
                  ${
                    openMenu === idx
                      ? "bg-gray-100 text-blue-600"
                      : "bg-transparent"
                  }
                `}
                style={{ border: "none" }}
              >
                {item.label}
              </button>

              {openMenu === idx && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 w-44 text-sm z-50">
                  {item.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(option.path)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition text-gray-800"
                      style={{ border: "none" }}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Праворуч — користувач або кнопки */}
        <div className="hidden md:flex items-center gap-3 text-sm">
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
                style={{ border: "none" }}
              >
                {currentUser.fullname || currentUser.username}
              </button>

              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1.5 rounded-md bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-700 transition font-medium"
                style={{ border: "none" }}
              >
                {th("logout")}
              </button>
            </div>
          ) : (
            <>
              <button
                className="text-gray-700 hover:text-blue-600 transition p-2 rounded-xl"
                onClick={() => navigate("/login")}
              >
                {th("login")}
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
              >
                {th("register")}
              </button>
            </>
          )}
        </div>

        {/* Мобільне меню */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-gray-700 hover:text-blue-600 transition"
            style={{ border: "none" }}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Випливаюче меню (мобільна версія) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 flex"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="bg-white w-3/4 max-w-xs h-full shadow-xl p-5 flex flex-col gap-6 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Верхня панель */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg text-gray-800">
                {th("menu")}
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-600 hover:text-red-600 transition"
                style={{ border: "none" }}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Навігація */}
            <nav className="flex flex-col gap-3 text-gray-800 text-base">
              {navItems.map((item, idx) => (
                <div key={idx}>
                  <button
                    onClick={() => setOpenMenu(openMenu === idx ? null : idx)}
                    className="flex justify-between items-center w-full text-left py-2 px-3 rounded-md hover:bg-gray-100"
                    style={{ border: "none" }}
                  >
                    {item.label}
                    <span className="text-gray-500">
                      {openMenu === idx ? "−" : "+"}
                    </span>
                  </button>
                  {openMenu === idx && (
                    <div className="ml-4 mt-1 flex flex-col">
                      {item.options.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            navigate(option.path);
                            setMobileOpen(false);
                          }}
                          className="py-1.5 text-gray-700 hover:text-blue-600 text-left px-3 rounded-md hover:bg-gray-100"
                          style={{
                            border: "none",
                          }}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Авторизація / Профіль */}
            <div className="mt-auto border-t pt-4">
              {currentUser ? (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      navigate(`/profile/${currentUser.id}`);
                      setMobileOpen(false);
                    }}
                    className="text-left font-medium text-gray-800 hover:text-blue-600"
                    style={{ border: "none" }}
                  >
                    {currentUser.fullname || currentUser.username}
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="text-left px-3 py-2 rounded-md bg-gray-100 hover:bg-red-100 hover:text-red-700 font-medium text-gray-600"
                    style={{ border: "none" }}
                  >
                    {th("logout")}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMobileOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-blue-600"
                  >
                    {th("login")}
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                      setMobileOpen(false);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-left"
                  >
                    {th("register")}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Анімація зліва */}
          <style>
            {`
              @keyframes slide-in {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
              .animate-slide-in {
                animation: slide-in 0.3s ease-out forwards;
              }
            `}
          </style>
        </div>
      )}
    </header>
  );
};

export default Header;
