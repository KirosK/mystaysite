"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useLang } from "@/lib/language-context";
import { useAnimateOnScroll } from "@/lib/use-animate-on-scroll";
import Image from "next/image";

const BEFORE = [
  { src: "/portfolio/achilleas/before-01-hero.png", gr: "Αρχική", en: "Home" },
  { src: "/portfolio/achilleas/before-02-about.png", gr: "Σχετικά", en: "About" },
  { src: "/portfolio/achilleas/before-03-rooms.png", gr: "Στόχος", en: "Mission" },
  { src: "/portfolio/achilleas/before-04-gallery.png", gr: "Gallery", en: "Gallery" },
  { src: "/portfolio/achilleas/before-05-area.png", gr: "Φωτογραφίες", en: "Photos" },
  { src: "/portfolio/achilleas/before-06-contact.png", gr: "Επικοινωνία", en: "Contact" },
  { src: "/portfolio/achilleas/before-07-footer.png", gr: "Footer", en: "Footer" },
];

const AFTER = [
  { src: "/portfolio/achilleas/after-01-hero.png", gr: "Hero", en: "Hero" },
  { src: "/portfolio/achilleas/after-02-intro.png", gr: "Highlights", en: "Highlights" },
  { src: "/portfolio/achilleas/after-03-apartments.png", gr: "Διαμερίσματα", en: "Apartments" },
  { src: "/portfolio/achilleas/after-04-amenities.png", gr: "Χώροι", en: "Spaces" },
  { src: "/portfolio/achilleas/after-05-location.png", gr: "Τοποθεσία", en: "Location" },
  { src: "/portfolio/achilleas/after-06-reviews.png", gr: "Κριτικές", en: "Reviews" },
  { src: "/portfolio/achilleas/after-07-contact.png", gr: "Κράτηση", en: "Booking" },
];

function useSwipe(onLeft: () => void, onRight: () => void) {
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
    touchEnd.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onLeft();
      else onRight();
    }
  }, [onLeft, onRight]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}

export default function BeforeAfter() {
  const { lang } = useLang();
  const ref = useAnimateOnScroll();
  const [view, setView] = useState<"before" | "after">("after");
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);

  const images = view === "before" ? BEFORE : AFTER;
  const current = images[idx];
  const l = lang === "gr" ? "gr" : "en";

  const goTo = useCallback((i: number) => {
    if (i === idx) return;
    setFading(true);
    setTimeout(() => {
      setIdx(i);
      setFading(false);
    }, 150);
  }, [idx]);

  const next = useCallback(() => {
    goTo(idx < images.length - 1 ? idx + 1 : 0);
  }, [idx, images.length, goTo]);

  const prev = useCallback(() => {
    goTo(idx > 0 ? idx - 1 : images.length - 1);
  }, [idx, images.length, goTo]);

  const swipe = useSwipe(next, prev);

  const switchView = useCallback((v: "before" | "after") => {
    if (v === view) return;
    setFading(true);
    setTimeout(() => {
      setView(v);
      setIdx(0);
      setFading(false);
    }, 150);
  }, [view]);

  useEffect(() => {
    if (thumbRef.current) {
      const active = thumbRef.current.children[idx] as HTMLElement;
      if (active) {
        active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [idx]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-extrabold text-text-primary">Achilleas Peaceful Place</h3>
            <p className="text-sm text-text-secondary">Σκάλα Συκιάς, Χαλκιδική</p>
          </div>

          {/* Before/After mini arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => switchView("before")}
              aria-label="Before"
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                view === "before"
                  ? "bg-red-500 text-white shadow-sm"
                  : "bg-gray-200 text-gray-500 hover:bg-gray-300"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <span className={`text-xs font-bold min-w-[40px] text-center ${
              view === "before" ? "text-red-600" : "text-emerald-600"
            }`}>
              {view === "before"
                ? (lang === "gr" ? "Πριν" : "Before")
                : (lang === "gr" ? "Μετά" : "After")
              }
            </span>
            <button
              onClick={() => switchView("after")}
              aria-label="After"
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                view === "after"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-gray-200 text-gray-500 hover:bg-gray-300"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main image */}
        <div
          className={`relative rounded-2xl overflow-hidden border-2 transition-colors duration-300 ${
            view === "before" ? "border-red-200" : "border-emerald-200"
          }`}
          {...swipe}
        >
          <div className={`transition-opacity duration-150 ${fading ? "opacity-0" : "opacity-100"}`}>
            <Image
              src={current.src}
              alt={current[l]}
              width={1440}
              height={900}
              className={`w-full h-auto ${view === "before" ? "grayscale-[5%] opacity-95" : ""}`}
            />
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 active:bg-black/70 backdrop-blur text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 active:bg-black/70 backdrop-blur text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Label + counter */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur shadow ${
              view === "before" ? "bg-red-500/90 text-white" : "bg-emerald-500/90 text-white"
            }`}>
              {current[l]}
            </span>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/50 text-white backdrop-blur">
              {idx + 1} / {images.length}
            </span>
          </div>

        </div>

        {/* Thumbnails (desktop) */}
        <div
          ref={thumbRef}
          className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => goTo(i)}
              className={`shrink-0 w-[110px] rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                i === idx
                  ? view === "before" ? "border-red-400 shadow-md scale-105" : "border-emerald-400 shadow-md scale-105"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image src={img.src} alt={img[l]} width={220} height={138} className="w-full h-auto" />
            </button>
          ))}
        </div>


        {/* Case study link */}
        <div className="text-center mt-5">
          <a
            href="/portfolio/achilleas-peaceful-place"
            className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            {lang === "gr" ? "Δες αναλυτικά το case study" : "View full case study"}
          </a>
        </div>
      </div>
    </section>
  );
}
