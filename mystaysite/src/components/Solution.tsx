"use client";

import { useLang } from "@/lib/language-context";
import { useAnimateOnScroll } from "@/lib/use-animate-on-scroll";

export default function Solution() {
  const { t } = useLang();
  const ref = useAnimateOnScroll();

  return (
    <section className="py-16 md:py-24">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            {t.solution.sectionTitle}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            {t.solution.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {t.solution.features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-border p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
