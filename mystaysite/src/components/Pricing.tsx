"use client";

import { useLang } from "@/lib/language-context";
import { useAnimateOnScroll } from "@/lib/use-animate-on-scroll";
import { trackCtaClick } from "@/lib/analytics";

const PHONE = "306974585063";

interface PlanData {
  readonly name: string;
  readonly tagline: string;
  readonly price: string;
  readonly target: string;
  readonly includes?: string;
  readonly features: readonly string[];
  readonly cta: string;
  readonly ctaSub?: string;
}

type PlanTier = "starter" | "professional" | "premium";

const tierStyles: Record<
  PlanTier,
  {
    card: string;
    badge: string;
    price: string;
    check: string;
    includes: string;
    btn: string;
  }
> = {
  starter: {
    card: "bg-white border-border shadow-sm hover:shadow-md",
    badge: "",
    price: "text-text-primary",
    check: "text-slate-400",
    includes: "",
    btn: "bg-slate-800 hover:bg-slate-700 text-white",
  },
  professional: {
    card: "bg-white ring-2 ring-accent shadow-xl scale-[1.02] border-accent",
    badge: "bg-accent",
    price: "text-accent",
    check: "text-accent",
    includes: "text-accent",
    btn: "bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/25",
  },
  premium: {
    card: "bg-gradient-to-b from-[#0F172A] to-[#1E293B] border-[#334155] shadow-xl",
    badge: "bg-amber-500",
    price: "text-amber-400",
    check: "text-amber-400",
    includes: "text-amber-400",
    btn: "bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-900 font-bold shadow-lg shadow-amber-500/25",
  },
};

interface PlanCardProps {
  plan: PlanData;
  tier: PlanTier;
  badge?: string;
  onCta: () => void;
}

function PlanCard({ plan, tier, badge, onCta }: PlanCardProps) {
  const s = tierStyles[tier];
  const isDark = tier === "premium";

  return (
    <div
      className={`rounded-2xl border relative transition-all duration-200 flex flex-col overflow-hidden ${s.card}`}
    >
      {badge && (
        <div className={`absolute -top-0 left-0 right-0 ${s.badge} text-white text-xs font-bold py-1.5 text-center tracking-wide`}>
          {tier === "premium" ? "👑" : "⭐"} {badge}
        </div>
      )}

      <div className={`p-6 md:p-8 flex flex-col flex-1 ${badge ? "pt-10" : ""}`}>
        <div className="mb-5">
          <h3 className={`text-lg font-extrabold ${isDark ? "text-white" : "text-text-primary"}`}>
            {plan.name}
          </h3>
          <p className={`text-sm mt-1 italic ${isDark ? "text-gray-400" : "text-text-secondary"}`}>
            {plan.tagline}
          </p>
          <p className={`text-xs mt-1.5 font-medium ${isDark ? "text-gray-500" : "text-text-secondary"}`}>
            {plan.target}
          </p>
        </div>

        <div className={`text-3xl font-extrabold font-mono-nums mb-5 ${s.price}`}>
          {plan.price}
        </div>

        {plan.includes && (
          <p className={`text-sm font-semibold mb-3 ${s.includes}`}>{plan.includes}</p>
        )}

        <div className="space-y-2.5 flex-1">
          {plan.features.map((feature, i) => (
            <div key={i} className={`flex items-start gap-2 text-sm ${isDark ? "text-gray-300" : "text-text-primary"}`}>
              <svg className={`w-4 h-4 shrink-0 mt-0.5 ${s.check}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={onCta}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${s.btn}`}
          >
            {plan.cta}
          </button>
          {plan.ctaSub && (
            <p className={`text-[11px] text-center mt-2 ${isDark ? "text-gray-500" : "text-text-secondary"}`}>
              {plan.ctaSub}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function openWhatsApp(planName: string, lang: string) {
  trackCtaClick("pricing_cta", planName);
  const msg =
    lang === "gr"
      ? `Γεια σας! Ενδιαφέρομαι για το πακέτο ${planName}. Μπορούμε να μιλήσουμε;`
      : `Hi! I'm interested in the ${planName} plan. Can we talk?`;
  window.open(
    `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

export default function Pricing() {
  const { t, lang } = useLang();
  const ref = useAnimateOnScroll();

  return (
    <section id="pricing" className="py-16 md:py-24 bg-bg-light">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            {t.pricing.sectionTitle}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 items-stretch">
          <PlanCard
            plan={t.pricing.starter}
            tier="starter"
            onCta={() => openWhatsApp("Starter", lang)}
          />
          <PlanCard
            plan={t.pricing.professional}
            tier="professional"
            badge={t.pricing.popular}
            onCta={() => openWhatsApp("Professional", lang)}
          />
          <PlanCard
            plan={t.pricing.premium}
            tier="premium"
            badge={t.pricing.premiumBadge}
            onCta={() => openWhatsApp("Premium", lang)}
          />
        </div>

        <div className="text-center mt-12 space-y-3">
          <p className="text-sm text-text-secondary">
            <strong>{t.pricing.maintenance}</strong>
          </p>
          <p className="text-sm text-text-secondary font-semibold">
            {t.pricing.guarantee}
          </p>
          <button
            onClick={() => openWhatsApp("Custom", lang)}
            className="text-primary hover:text-primary-dark font-medium underline underline-offset-4 transition-colors cursor-pointer"
          >
            {t.pricing.custom}
          </button>
          <p className="text-xs text-text-secondary pt-2">
            <a href="/terms" className="text-primary hover:text-primary-dark underline underline-offset-2 transition-colors">
              {t.pricing.termsLink}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
