"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { translations, type Lang } from "./translations";

type TranslationData = (typeof translations)["gr"];

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: TranslationData;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangRaw] = useState<Lang>("gr");

  useEffect(() => {
    const saved = localStorage.getItem("mystaysite-lang");
    if (saved === "en") setLangRaw("en");
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangRaw(newLang);
    localStorage.setItem("mystaysite-lang", newLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLangRaw((prev) => {
      const next = prev === "gr" ? "en" : "gr";
      localStorage.setItem("mystaysite-lang", next);
      return next;
    });
  }, []);

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
