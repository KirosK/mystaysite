"use client";

import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/lib/language-context";

const STORAGE_KEY = "mss_exit_dismissed";
const DISMISS_DAYS = 7;

export default function ExitIntentPopup() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed && Date.now() - Number(dismissed) < DISMISS_DAYS * 86400000) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      let triggered = false;
      const onScroll = () => {
        if (triggered) return;
        const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        if (scrollPct > 0.6) {
          triggered = true;
          setVisible(true);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setVisible(true);
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-hero-fade-in">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-4xl mb-4">👋</div>
        <h3 className="text-xl font-extrabold text-text-primary mb-2">
          {t.exitPopup.title}
        </h3>
        <p className="text-text-secondary text-sm mb-6">
          {t.exitPopup.text}
        </p>
        <a
          href="#contact"
          onClick={dismiss}
          className="inline-block bg-accent hover:bg-accent-dark text-white font-bold text-base px-8 py-3.5 rounded-lg transition-colors shadow-lg shadow-accent/20"
        >
          {t.exitPopup.cta}
        </a>
      </div>
    </div>
  );
}
