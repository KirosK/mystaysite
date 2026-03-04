"use client";

import { useLang } from "@/lib/language-context";
import { useAnimateOnScroll } from "@/lib/use-animate-on-scroll";

export default function HowItWorks() {
  const { t } = useLang();
  const ref = useAnimateOnScroll();

  return (
    <section id="how" className="py-16 md:py-24 bg-bg-light">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-14 max-w-3xl mx-auto">
          {t.howItWorks.sectionTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16.5%] right-[16.5%] h-0.5 bg-border" />

          {t.howItWorks.steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className="relative z-10 w-24 h-24 mx-auto mb-6 bg-white border-2 border-primary rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl font-extrabold text-primary">{i + 1}</span>
              </div>
              <h3 className="text-base font-bold mb-3">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
