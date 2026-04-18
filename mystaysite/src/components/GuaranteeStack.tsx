"use client";

import { useLang } from "@/lib/language-context";
import { useAnimateOnScroll } from "@/lib/use-animate-on-scroll";

export default function GuaranteeStack() {
  const { t, lang } = useLang();
  const ref = useAnimateOnScroll();
  const urlLocale = lang === "en" ? "en" : "el";

  const scrollTo = (id: string): boolean => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

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
              className="bg-white dark:bg-[#111827] rounded-2xl border border-border p-6 md:p-8 flex items-start gap-5 hover:shadow-md dark:hover:shadow-black/40 transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div>
                <h3 className="text-base font-bold mb-2 text-text-primary">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={`/${urlLocale}#contact`}
            onClick={(e) => { if (scrollTo("#contact")) e.preventDefault(); }}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg shadow-accent/20"
          >
            {t.guarantee.ctaLink}
          </a>
        </div>
      </div>
    </section>
  );
}
