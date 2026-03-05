/**
 * Conversion tracking helpers. Safe to call even before cookie consent (gtag/fbq may be undefined).
 */
declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

export function trackLead(source: string, plan?: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "generate_lead", { source, ...(plan && { plan }) });
  window.fbq?.("track", "Lead", {
    content_name: source,
    ...(plan && { content_category: plan }),
  });
}

export function trackCtaClick(ctaName: string, plan?: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "cta_click", { cta_name: ctaName, ...(plan && { plan }) });
  window.fbq?.("track", "Lead", {
    content_name: `CTA - ${ctaName}`,
    ...(plan && { content_category: plan }),
  });
}
