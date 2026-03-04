"use client";

import { useLang } from "@/lib/language-context";
import { useAnimateOnScroll } from "@/lib/use-animate-on-scroll";

export default function GuaranteeStack() {
  const { t } = useLang();
  const ref = useAnimateOnScroll();

  return (
    <section className="py-16 md:py-24">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            {t.guarantee.sectionTitle}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            {t.guarantee.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {t.guarantee.items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-border p-6 md:p-8 flex items-start gap-5 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div>
                <h3 className="text-base font-bold mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
