"use client";

import { useState, useRef, useCallback, useEffect, use } from "react";
import Image from "next/image";

const BEFORE_SRC = [
  "/portfolio/achilleas/before-01-hero.jpg",
  "/portfolio/achilleas/before-02-about.jpg",
  "/portfolio/achilleas/before-03-rooms.jpg",
  "/portfolio/achilleas/before-04-gallery.jpg",
  "/portfolio/achilleas/before-05-area.jpg",
  "/portfolio/achilleas/before-06-contact.jpg",
  "/portfolio/achilleas/before-07-footer.jpg",
];

const AFTER_SRC = [
  "/portfolio/achilleas/after-01-hero.jpg",
  "/portfolio/achilleas/after-02-intro.jpg",
  "/portfolio/achilleas/after-03-apartments.jpg",
  "/portfolio/achilleas/after-04-amenities.jpg",
  "/portfolio/achilleas/after-05-location.jpg",
  "/portfolio/achilleas/after-06-reviews.jpg",
  "/portfolio/achilleas/after-07-contact.jpg",
];

const BEFORE_LABELS_EL = ["Αρχική", "Σχετικά", "Στόχος", "Gallery", "Φωτογραφίες", "Επικοινωνία", "Footer"];
const BEFORE_LABELS_EN = ["Home", "About", "Purpose", "Gallery", "Photos", "Contact", "Footer"];
const AFTER_LABELS_EL = ["Hero", "Highlights", "Διαμερίσματα", "Χώροι", "Τοποθεσία", "Κριτικές", "Κράτηση"];
const AFTER_LABELS_EN = ["Hero", "Highlights", "Apartments", "Spaces", "Location", "Reviews", "Booking"];

function buildImages(src: string[], labels: string[]) {
  return src.map((s, i) => ({ src: s, label: labels[i] }));
}

type ImageItem = { src: string; label: string };

function ImagePanel({ images, color, label, subtitle }: {
  images: ImageItem[];
  color: "red" | "emerald";
  label: string;
  subtitle: string;
}) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);
  const current = images[idx];

  const goTo = useCallback((i: number) => {
    if (i === idx) return;
    setFading(true);
    setTimeout(() => { setIdx(i); setFading(false); }, 150);
  }, [idx]);

  const next = useCallback(() => {
    goTo(idx < images.length - 1 ? idx + 1 : 0);
  }, [idx, images.length, goTo]);

  const prev = useCallback(() => {
    goTo(idx > 0 ? idx - 1 : images.length - 1);
  }, [idx, images.length, goTo]);

  useEffect(() => {
    if (thumbRef.current) {
      const active = thumbRef.current.children[idx] as HTMLElement;
      if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [idx]);

  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const isBefore = color === "red";
  const borderColor = isBefore ? "border-red-200" : "border-emerald-300";
  const badgeBg = isBefore ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700";
  const labelBg = isBefore ? "bg-red-500/90" : "bg-emerald-500/90";
  const thumbActive = isBefore ? "border-red-400" : "border-emerald-400";
  const wrapperStyle = isBefore
    ? "shadow-sm"
    : "shadow-xl shadow-emerald-200/40 ring-1 ring-emerald-100";
  const imgFilter = isBefore
    ? "grayscale-[5%] opacity-95"
    : "brightness-105 contrast-[1.02] saturate-[1.05]";

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${badgeBg}`}>{label}</span>
        <span className="text-sm text-gray-400 dark:text-gray-500 truncate">{subtitle}</span>
      </div>

      <div
        className={`relative rounded-xl overflow-hidden border-2 ${borderColor} ${wrapperStyle}`}
        onTouchStart={(e) => { touchStart.current = e.targetTouches[0].clientX; touchEnd.current = e.targetTouches[0].clientX; }}
        onTouchMove={(e) => { touchEnd.current = e.targetTouches[0].clientX; }}
        onTouchEnd={() => { const d = touchStart.current - touchEnd.current; if (Math.abs(d) > 50) { d > 0 ? next() : prev(); } }}
      >
        <div className={`transition-opacity duration-150 ${fading ? "opacity-0" : "opacity-100"}`}>
          <Image src={current.src} alt={current.label} width={1440} height={900}
            className={`w-full h-auto ${imgFilter}`}
          />
        </div>

        <button onClick={prev}
          className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur text-white flex items-center justify-center transition-colors cursor-pointer">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button onClick={next}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur text-white flex items-center justify-center transition-colors cursor-pointer">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur shadow text-white ${labelBg}`}>
            {current.label}
          </span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/50 text-white backdrop-blur">
            {idx + 1}/{images.length}
          </span>
        </div>
      </div>

      <div ref={thumbRef} className="flex gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-hide">
        {images.map((img, i) => (
          <button key={img.src} onClick={() => goTo(i)}
            className={`shrink-0 w-[72px] rounded-md overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
              i === idx ? `${thumbActive} shadow-md scale-105` : "border-transparent opacity-40 hover:opacity-70"
            }`}>
            <Image src={img.src} alt={img.label} width={144} height={90} className="w-full h-auto" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AchilleasCaseStudy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const isEn = locale === "en";
  const urlLocale = isEn ? "en" : "el";

  const copy = isEn
    ? {
        backHome: "← Home",
        caseStudy: "Case Study",
        location: "Skala Sykias, Halkidiki",
        subtitle:
          "From a basic website to a modern site with bookings, reviews from 3 platforms, and Google SEO.",
        beforeAfterTitle: "Before & After",
        beforeAfterText: "7 screenshots from each version. Tap the arrows or swipe.",
        beforeLabel: "BEFORE",
        afterLabel: "AFTER",
        liveTitle: "View the live site",
        openSite: "Open the site ↗",
        ctaTitle: "Want something like this?",
        ctaText:
          "Send us a message and we'll prepare a detailed quote within 24 hours.",
        ctaPrimary: "Get a Quote",
        backToHome: "← Back to home",
        seePricing: "See our packages",
        seePortfolio: "See all projects",
      }
    : {
        backHome: "← Αρχική",
        caseStudy: "Case Study",
        location: "Σκάλα Συκιάς, Χαλκιδική",
        subtitle:
          "Από ένα βασικό website σε ένα σύγχρονο site με κρατήσεις, κριτικές από 3 πλατφόρμες, και Google SEO.",
        beforeAfterTitle: "Πριν & Μετά",
        beforeAfterText: "7 screenshots από κάθε version. Κάνε κλικ στα βελάκια ή swipe.",
        beforeLabel: "ΠΡΙΝ",
        afterLabel: "ΜΕΤΑ",
        liveTitle: "Δες το live site",
        openSite: "Άνοιξε το site ↗",
        ctaTitle: "Θες κάτι παρόμοιο;",
        ctaText:
          "Στείλε μας μήνυμα και σου ετοιμάζουμε αναλυτική προσφορά σε 24 ώρες.",
        ctaPrimary: "Ζητήστε Προσφορά",
        backToHome: "← Πίσω στην αρχική",
        seePricing: "Δες τα πακέτα μας",
        seePortfolio: "Δες όλα τα projects",
      };

  const before = buildImages(BEFORE_SRC, isEn ? BEFORE_LABELS_EN : BEFORE_LABELS_EL);
  const after = buildImages(AFTER_SRC, isEn ? AFTER_LABELS_EN : AFTER_LABELS_EL);

  return (
    <div className="min-h-screen bg-[#FAFBFC] dark:bg-[#0B0F1A]">
      <div className="h-16 md:h-18" />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
              {copy.caseStudy}
            </span>
            <span className="text-sm text-gray-400 dark:text-gray-500">{copy.location}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Achilleas Peaceful Place
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">{copy.subtitle}</p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">{copy.beforeAfterTitle}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">{copy.beforeAfterText}</p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <ImagePanel images={before} color="red" label={copy.beforeLabel} subtitle="" />
            <ImagePanel images={after} color="emerald" label={copy.afterLabel} subtitle="" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-white/10 p-6 mb-16 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm dark:shadow-black/30">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{copy.liveTitle}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">achilleasplace.gr</p>
          </div>
          <a
            href="https://achilleasplace.gr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            {copy.openSite}
          </a>
        </div>

        <div className="bg-[#0F172A] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            {copy.ctaTitle}
          </h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">{copy.ctaText}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/306974585063?text=${encodeURIComponent(
                isEn
                  ? "Hi! I'd like a quote for a website."
                  : "Γεια! Ζητώ προσφορά για website."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#25D366]/20"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`/${urlLocale}#contact`}
              className="inline-flex items-center justify-center bg-[#F97316] hover:bg-[#EA580C] text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
            >
              {copy.ctaPrimary}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={`/${urlLocale}`} className="text-[#0EA5E9] hover:text-[#0284C7] font-medium text-sm transition-colors">
            {copy.backToHome}
          </a>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-600">·</span>
          <a href={`/${urlLocale}#pricing`} className="text-[#0EA5E9] hover:text-[#0284C7] font-medium text-sm transition-colors">
            {copy.seePricing}
          </a>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-600">·</span>
          <a href={`/${urlLocale}#portfolio`} className="text-[#0EA5E9] hover:text-[#0284C7] font-medium text-sm transition-colors">
            {copy.seePortfolio}
          </a>
        </div>
      </main>
    </div>
  );
}
