"use client";

import { useLang } from "@/lib/language-context";
import { useAnimateOnScroll } from "@/lib/use-animate-on-scroll";

export default function Testimonials() {
  const { t } = useLang();
  const ref = useAnimateOnScroll();

  return (
    <section className="py-16 md:py-24">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-14">
          {t.testimonials.sectionTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {t.testimonials.reviews.map((review, i) => {
            const hasUrl = "url" in review && review.url;
            const card = (
              <div
                className={`bg-white rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow relative ${hasUrl ? "ring-2 ring-green-200" : ""}`}
              >
                {hasUrl && (
                  <div className="absolute -top-2.5 right-4 bg-green-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Live Project ↗
                  </div>
                )}

                {/* Stars */}
                <div className="flex gap-0.5 mb-4 text-yellow-400">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-text-primary text-sm leading-relaxed mb-5">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {review.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{review.name}</div>
                    <div className="text-xs text-text-secondary">
                      {review.property}, {review.location}
                    </div>
                  </div>
                </div>

                {hasUrl && (
                  <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
                    <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">9.5 Booking</span>
                    <span className="bg-yellow-50 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded">5.0 Google</span>
                    <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded">4.9 Airbnb</span>
                  </div>
                )}
              </div>
            );

            if (hasUrl) {
              return (
                <a key={i} href={review.url as string} target="_blank" rel="noopener noreferrer">
                  {card}
                </a>
              );
            }

            return <div key={i}>{card}</div>;
          })}
        </div>

        {/* Google rating + portfolio link */}
        <div className="flex flex-col items-center gap-3 mt-10">
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-5 py-2">
            <span className="text-sm">⭐</span>
            <span className="text-sm font-semibold text-yellow-800">{t.testimonials.googleRating}</span>
          </div>
          <a
            href="/portfolio/achilleas-peaceful-place"
            className="text-sm text-primary hover:text-primary-dark font-medium underline underline-offset-2 transition-colors"
          >
            {t.testimonials.caseStudyLink}
          </a>
        </div>
      </div>
    </section>
  );
}
