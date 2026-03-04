"use client";

import { useState } from "react";
import { useLang } from "@/lib/language-context";
import { useAnimateOnScroll } from "@/lib/use-animate-on-scroll";

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold pr-4">{question}</span>
        <svg
          className={`w-5 h-5 shrink-0 text-text-secondary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useLang();
  const ref = useAnimateOnScroll();

  return (
    <section id="faq" className="py-16 md:py-24 bg-bg-light">
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-12">
          {t.faq.sectionTitle}
        </h2>

        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <AccordionItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
