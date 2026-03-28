"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/lib/language-context";

const STORAGE_KEY = "mss_cookie_consent";

export default function CookieConsent() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
    if (consent === "accepted") loadTrackers();
  }, []);

  function loadTrackers() {
    if (typeof window === "undefined") return;
    if (window.document.querySelector('script[src*="googletagmanager"]')) return;

    const ga = document.createElement("script");
    ga.src = "https://www.googletagmanager.com/gtag/js?id=G-S05LEDF6JW";
    ga.async = true;
    document.head.appendChild(ga);

    const gaInit = document.createElement("script");
    gaInit.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-S05LEDF6JW');`;
    document.head.appendChild(gaInit);

    const fb = document.createElement("script");
    fb.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','49013716985302');fbq('track','PageView');`;
    document.head.appendChild(fb);
  }

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    loadTrackers();
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  const isGr = lang === "gr";

  return (
    <div className="fixed bottom-0 inset-x-0 z-[90] p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-text-secondary flex-1">
          {isGr
            ? "Χρησιμοποιούμε cookies για analytics και βελτίωση της εμπειρίας σας."
            : "We use cookies for analytics and to improve your experience."}
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isGr ? "Απόρριψη" : "Decline"}
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-bold text-white bg-accent hover:bg-accent-dark rounded-lg transition-colors"
          >
            {isGr ? "Αποδοχή" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
