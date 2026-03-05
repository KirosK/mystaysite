"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "mystaysite-cookie-consent";
const GA_ID = "G-S05LEDF6JW";
const META_PIXEL_ID = "49013716985302";

function loadAnalytics() {
  if (typeof document === "undefined") return;

  // GA4
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gtagScript);

  const gtagConfig = document.createElement("script");
  gtagConfig.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`;
  document.head.appendChild(gtagConfig);

  // Meta Pixel
  const fbqScript = document.createElement("script");
  fbqScript.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;
  document.head.appendChild(fbqScript);
}

export default function CookieConsentAndAnalytics() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      setShowBanner(false);
      loadAnalytics();
    } else {
      setShowBanner(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShowBanner(false);
    loadAnalytics();
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-bg-darker/95 backdrop-blur border-t border-white/10 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          Χρησιμοποιούμε cookies για αναλυτικά (Google Analytics) και διαφημίσεις (Meta) ώστε να βελτιώνουμε την εμπειρία σας. Με το «Αποδοχή» συμφωνείτε με τη χρήση τους.{" "}
          <a href="/privacy" className="text-primary hover:underline">Πολιτική Απορρήτου</a>.
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-colors"
        >
          Αποδοχή
        </button>
      </div>
    </div>
  );
}
