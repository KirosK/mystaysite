"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { translations, type Lang } from "./translations";

type TranslationData = (typeof translations)["gr"];

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: TranslationData;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function detectLocaleFromPath(pathname: string): Lang {
  if (pathname.startsWith("/en")) return "en";
  return "gr";
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: string;
}) {
  const pathname = usePathname();
  const [lang, setLangRaw] = useState<Lang>(() => {
    if (initialLocale === "en") return "en";
    if (initialLocale === "el" || initialLocale === "gr") return "gr";
    return detectLocaleFromPath(typeof window !== "undefined" ? window.location.pathname : "/el");
  });

  useEffect(() => {
    const detected = detectLocaleFromPath(pathname);
    if (detected !== lang) setLangRaw(detected);
  }, [pathname]);

  const setLang = useCallback((newLang: Lang) => {
    const urlLocale = newLang === "en" ? "en" : "el";
    const currentLocale = lang === "en" ? "en" : "el";
    const newPath = pathname.replace(`/${currentLocale}`, `/${urlLocale}`);
    window.location.href = newPath || `/${urlLocale}`;
  }, [lang, pathname]);

  const toggleLang = useCallback(() => {
    const newLang = lang === "gr" ? "en" : "gr";
    setLang(newLang);
  }, [lang, setLang]);

  const t = translations[lang] as TranslationData;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
