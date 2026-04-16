"use client";

import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/lib/language-context";

const STORAGE_KEY = "mss_cookie_consent_v2";
const LEGACY_KEY = "mss_cookie_consent";
const EXPIRY_DAYS = 180;

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Consent;
      const age = Date.now() - parsed.timestamp;
      if (age < EXPIRY_DAYS * 24 * 60 * 60 * 1000) return parsed;
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy === "accepted") {
      const migrated: Consent = {
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      localStorage.removeItem(LEGACY_KEY);
      return migrated;
    }
    if (legacy === "declined") {
      const migrated: Consent = {
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      localStorage.removeItem(LEGACY_KEY);
      return migrated;
    }
    return null;
  } catch {
    return null;
  }
}

function loadAnalytics() {
  if (typeof window === "undefined") return;
  if (document.querySelector('script[src*="googletagmanager"]')) return;

  const ga = document.createElement("script");
  ga.src = "https://www.googletagmanager.com/gtag/js?id=G-S05LEDF6JW";
  ga.async = true;
  document.head.appendChild(ga);

  const gaInit = document.createElement("script");
  gaInit.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-S05LEDF6JW',{anonymize_ip:true});`;
  document.head.appendChild(gaInit);
}

function loadMarketing() {
  if (typeof window === "undefined") return;
  if ((window as unknown as { fbq?: unknown }).fbq) return;

  const fb = document.createElement("script");
  fb.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','49013716985302');fbq('track','PageView');`;
  document.head.appendChild(fb);
}

function applyConsent(c: Consent) {
  if (c.analytics) loadAnalytics();
  if (c.marketing) loadMarketing();
}

export default function CookieConsent() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      applyConsent(existing);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function onOpen() {
      const existing = readConsent();
      if (existing) {
        setAnalytics(existing.analytics);
        setMarketing(existing.marketing);
      }
      setShowPrefs(true);
      setVisible(true);
    }
    window.addEventListener("mss:open-cookie-settings", onOpen);
    return () => window.removeEventListener("mss:open-cookie-settings", onOpen);
  }, []);

  const save = useCallback(
    (consent: Consent) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
      applyConsent(consent);
      setShowPrefs(false);
      setVisible(false);
    },
    []
  );

  const acceptAll = () =>
    save({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() });

  const rejectAll = () =>
    save({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() });

  const saveCustom = () =>
    save({ necessary: true, analytics, marketing, timestamp: Date.now() });

  if (!visible) return null;

  const isGr = lang === "gr";
  const copy = isGr
    ? {
        title: "Χρησιμοποιούμε cookies",
        body:
          "Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας, να αναλύσουμε την κίνηση και για marketing. Επιλέξτε τι δεχόσαστε. Διαβάστε περισσότερα στην",
        privacyLink: "Πολιτική Απορρήτου",
        accept: "Αποδοχή όλων",
        reject: "Μόνο τα απαραίτητα",
        prefs: "Προτιμήσεις",
        save: "Αποθήκευση",
        close: "Κλείσιμο",
        prefsTitle: "Προτιμήσεις Cookies",
        necessary: "Απαραίτητα",
        necessaryDesc:
          "Χρειάζονται για τη λειτουργία του site (navigation, ασφάλεια). Δεν απενεργοποιούνται.",
        analytics: "Στατιστικά (Google Analytics)",
        analyticsDesc:
          "Ανώνυμα στατιστικά επισκεψιμότητας για να βελτιώνουμε το site.",
        marketing: "Marketing (Meta Pixel)",
        marketingDesc:
          "Χρησιμοποιείται για διαφημίσεις σε Facebook/Instagram και measurement.",
      }
    : {
        title: "We use cookies",
        body:
          "We use cookies to improve your experience, analyse traffic and for marketing. Choose what you accept. Read more in our",
        privacyLink: "Privacy Policy",
        accept: "Accept all",
        reject: "Necessary only",
        prefs: "Preferences",
        save: "Save",
        close: "Close",
        prefsTitle: "Cookie Preferences",
        necessary: "Necessary",
        necessaryDesc:
          "Required for site functionality (navigation, security). Cannot be disabled.",
        analytics: "Analytics (Google Analytics)",
        analyticsDesc:
          "Anonymous traffic analytics to help us improve the site.",
        marketing: "Marketing (Meta Pixel)",
        marketingDesc:
          "Used for ads on Facebook/Instagram and measurement.",
      };

  const privacyHref = isGr ? "/el/privacy" : "/en/privacy";

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-[90] p-3 sm:p-4 md:p-6 pointer-events-none"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-consent-title"
      >
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden pointer-events-auto animate-hero-fade-in">
          {!showPrefs ? (
            <div className="p-5 sm:p-6 flex flex-col gap-4">
              <div>
                <h3
                  id="cookie-consent-title"
                  className="text-base font-bold text-text-primary mb-1"
                >
                  {copy.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {copy.body}{" "}
                  <a
                    href={privacyHref}
                    className="text-primary underline hover:text-primary-dark"
                  >
                    {copy.privacyLink}
                  </a>
                  .
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
                <button
                  onClick={() => setShowPrefs(true)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  {copy.prefs}
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2.5 text-sm font-semibold text-gray-800 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors text-center"
                >
                  {copy.reject}
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-accent hover:bg-accent-dark rounded-lg transition-colors text-center"
                >
                  {copy.accept}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-bold text-text-primary">
                  {copy.prefsTitle}
                </h3>
                <button
                  onClick={() => setShowPrefs(false)}
                  aria-label={copy.close}
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{copy.necessary}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{copy.necessaryDesc}</div>
                  </div>
                  <div className="shrink-0 mt-0.5">
                    <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                      <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow" />
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{copy.analytics}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{copy.analyticsDesc}</div>
                  </div>
                  <div className="shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${analytics ? "bg-accent" : "bg-gray-300"}`}>
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${analytics ? "right-0.5" : "left-0.5"}`} />
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{copy.marketing}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{copy.marketingDesc}</div>
                  </div>
                  <div className="shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${marketing ? "bg-accent" : "bg-gray-300"}`}>
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${marketing ? "right-0.5" : "left-0.5"}`} />
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-2 border-t border-gray-100">
                <button
                  onClick={rejectAll}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {copy.reject}
                </button>
                <button
                  onClick={saveCustom}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-accent hover:bg-accent-dark rounded-lg transition-colors"
                >
                  {copy.save}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
