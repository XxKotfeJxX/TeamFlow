import { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "./useTranslations";

const Footer = () => {
  const [language, setLanguage] = useState("uk");
  const { t } = useTranslation();
  const tf = t("footer");

  useEffect(() => {
    const storedLang = localStorage.getItem("interfaceLang");
    if (storedLang) setLanguage(storedLang);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "interfaceLang" && e.newValue) {
        setLanguage(e.newValue);
      }
    };

    const handleInterfaceLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setLanguage(customEvent.detail);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(
      "interfaceLangChange",
      handleInterfaceLangChange as EventListener
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "interfaceLangChange",
        handleInterfaceLangChange as EventListener
      );
    };
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    localStorage.setItem("interfaceLang", newLang);
    document.documentElement.lang = newLang;
    window.dispatchEvent(
      new CustomEvent("interfaceLangChange", { detail: newLang })
    );
  };

  return (
    <footer className="w-full bg-gray-900 text-gray-300 text-sm px-8">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-semibold mb-4">Продукт</h4>
          <ul className="space-y-2">
            <li>
              <a href="#/features" className="hover:text-white transition">
                {tf("features")}
              </a>
            </li>
            <li>
              <a href="#/price" className="hover:text-white transition">
                {tf("pricing")}
              </a>
            </li>
            <li>
              <a href="#/download" className="hover:text-white transition">
                {tf("download")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{tf("company")}</h4>
          <ul className="space-y-2">
            <li>
              <a href="#/about" className="hover:text-white transition">
                {tf("about")}
              </a>
            </li>
            <li>
              <a href="#/blog" className="hover:text-white transition">
                {tf("blog")}
              </a>
            </li>
            <li>
              <a href="#/career" className="hover:text-white transition">
                {tf("career")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{tf("support")}</h4>
          <ul className="space-y-2">
            <li>
              <a href="#/support" className="hover:text-white transition">
                {tf("help")}
              </a>
            </li>
            <li>
              <a href="#/contact" className="hover:text-white transition">
                {tf("contact")}
              </a>
            </li>
            <li>
              <a href="#/documentation" className="hover:text-white transition">
                {tf("docs")}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-white font-semibold mb-2">{tf("followUs")}</h4>
            <div className="flex gap-4 text-lg">
              <a
                href="https://www.facebook.com/profile.php?id=61582548252738"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://x.com/TeamflowC"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://www.instagram.com/p_teamflow_q/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/team-flow-2964ba390/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div>
            <label htmlFor="language" className="block mb-1 text-gray-400">
              {tf("langLabel")}
            </label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="bg-gray-800 text-white border border-gray-700 rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="uk">Українська</option>
              <option value="en">English</option>
              <option value="pl">Polski</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-gray-700 text-center py-4 px-4 text-xs text-gray-500">
        © {new Date().getFullYear()} TeamFlow. {tf("rights")}
        <span className="mx-2">·</span>
        <a href="#/privacy" className="hover:text-white transition">
          {tf("privacy")}
        </a>
        <span className="mx-2">·</span>
        <a href="#/terms" className="hover:text-white transition">
          {tf("terms")}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
