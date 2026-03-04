"use client";

import { useLang } from "@/lib/language-context";
import { useAnimateOnScroll } from "@/lib/use-animate-on-scroll";

export default function PainPoints() {
  const { t } = useLang();
  const ref = useAnimateOnScroll();

  const cards = [
    { title: t.pain.card1Title, text: t.pain.card1Text, cost: t.pain.card1Cost },
    { title: t.pain.card2Title, text: t.pain.card2Text, cost: t.pain.card2Cost },
    { title: t.pain.card3Title, text: t.pain.card3Text, cost: t.pain.card3Cost },
  ];

  return (
    <section id="why" className="py-16 md:py-24 bg-bg-light">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-12">
          {t.pain.sectionTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-border p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
            >
              <h3 className="text-lg font-bold mb-3">{card.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed flex-1">{card.text}</p>
              {card.cost && (
                <div className="mt-4 pt-3 border-t border-border">
                  <span className="inline-block bg-red-50 text-red-600 text-sm font-bold px-3 py-1.5 rounded-lg font-mono-nums">
                    {card.cost}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-primary font-semibold text-base">
          {t.pain.transition}
        </p>
      </div>
    </section>
  );
}
