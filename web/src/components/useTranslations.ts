import { useState, useEffect } from "react";
import { translations, type LangKey } from "../models/i18n";

type TranslationSection = keyof (typeof translations)["uk"];
type TranslationKeys<T extends TranslationSection> =
  keyof (typeof translations)["uk"][T];

export function useTranslation() {
  const [lang, setLang] = useState<LangKey>(
    (localStorage.getItem("interfaceLang") as LangKey) || "uk"
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const newLang = (e as CustomEvent<string>).detail as LangKey;
      setLang(newLang);
    };
    window.addEventListener("interfaceLangChange", handler);
    return () => window.removeEventListener("interfaceLangChange", handler);
  }, []);

  const t =
    <T extends TranslationSection>(section: T) =>
    (key: TranslationKeys<T>): string =>
      String(translations[lang][section][key] ?? "");

  return { t, lang, translations };
}
