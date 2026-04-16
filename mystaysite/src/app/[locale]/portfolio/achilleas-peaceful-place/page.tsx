"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

const BEFORE = [
  { src: "/portfolio/achilleas/before-01-hero.jpg", label: "Αρχική" },
  { src: "/portfolio/achilleas/before-02-about.jpg", label: "Σχετικά" },
  { src: "/portfolio/achilleas/before-03-rooms.jpg", label: "Στόχος" },
  { src: "/portfolio/achilleas/before-04-gallery.jpg", label: "Gallery" },
  { src: "/portfolio/achilleas/before-05-area.jpg", label: "Φωτογραφίες" },
  { src: "/portfolio/achilleas/before-06-contact.jpg", label: "Επικοινωνία" },
  { src: "/portfolio/achilleas/before-07-footer.jpg", label: "Footer" },
];

const AFTER = [
  { src: "/portfolio/achilleas/after-01-hero.jpg", label: "Hero" },
  { src: "/portfolio/achilleas/after-02-intro.jpg", label: "Highlights" },
  { src: "/portfolio/achilleas/after-03-apartments.jpg", label: "Διαμερίσματα" },
  { src: "/portfolio/achilleas/after-04-amenities.jpg", label: "Χώροι" },
  { src: "/portfolio/achilleas/after-05-location.jpg", label: "Τοποθεσία" },
  { src: "/portfolio/achilleas/after-06-reviews.jpg", label: "Κριτικές" },
  { src: "/portfolio/achilleas/after-07-contact.jpg", label: "Κράτηση" },
];

function ImagePanel({ images, color, label, subtitle }: {
  images: typeof BEFORE;
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
        <span className="text-sm text-gray-400 truncate">{subtitle}</span>
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

export default function AchilleasCaseStudy() {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#0EA5E9] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span className="text-lg font-extrabold text-gray-900">my</span>
              <span className="text-lg font-extrabold text-[#0EA5E9]">stay</span>
              <span className="text-lg font-extrabold text-gray-900">site</span>
            </div>
          </a>
          <a href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            ← Αρχική
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Title */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
              Case Study
            </span>
            <span className="text-sm text-gray-400">Σκάλα Συκιάς, Χαλκιδική</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Achilleas Peaceful Place
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Από ένα βασικό website σε ένα σύγχρονο site με κρατήσεις,
            κριτικές από 3 πλατφόρμες, και Google SEO.
          </p>
        </div>


        {/* Before / After — side by side */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Πριν & Μετά</h2>
          <p className="text-gray-500 mb-8">7 screenshots από κάθε version. Κάνε κλικ στα βελάκια ή swipe.</p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <ImagePanel images={BEFORE} color="red" label="ΠΡΙΝ" subtitle="" />
            <ImagePanel images={AFTER} color="emerald" label="ΜΕΤΑ" subtitle="" />
          </div>
        </div>

        {/* Live link */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-16 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="font-bold text-gray-900">Δες το live site</h3>
            <p className="text-sm text-gray-500 mt-0.5">achilleasplace.gr</p>
          </div>
          <a
            href="https://achilleasplace.gr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Ανοιξε το site ↗
          </a>
        </div>

        {/* CTA */}
        <div className="bg-[#0F172A] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Θες κάτι παρόμοιο;
          </h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Στείλε μας μήνυμα και σου ετοιμάζουμε αναλυτική προσφορά σε 24 ώρες.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/306974585063?text=%CE%93%CE%B5%CE%B9%CE%B1!%20%CE%96%CE%B7%CF%84%CF%8E%20%CF%80%CF%81%CE%BF%CF%83%CF%86%CE%BF%CF%81%CE%AC%20%CE%B3%CE%B9%CE%B1%20website."
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
              href="/#contact"
              className="inline-flex items-center justify-center bg-[#F97316] hover:bg-[#EA580C] text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
            >
              Ζητήστε Προσφορά
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/" className="text-[#0EA5E9] hover:text-[#0284C7] font-medium text-sm transition-colors">
            ← Πίσω στην αρχική
          </a>
          <span className="hidden sm:inline text-gray-300">·</span>
          <a href="/#pricing" className="text-[#0EA5E9] hover:text-[#0284C7] font-medium text-sm transition-colors">
            Δες τα πακέτα μας
          </a>
          <span className="hidden sm:inline text-gray-300">·</span>
          <a href="/#portfolio" className="text-[#0EA5E9] hover:text-[#0284C7] font-medium text-sm transition-colors">
            Δες όλα τα projects
          </a>
        </div>
      </main>
    </div>
  );
}
