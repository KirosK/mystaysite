/**
 * Analytics helpers (Google Analytics 4 + Meta Pixel).
 *
 * - gtag.js is loaded globally in `Analytics.tsx` with Consent Mode v2 defaults set to `denied`.
 * - When the user accepts via `CookieConsent`, we call `gtag('consent','update',...)`.
 * - Meta Pixel is still lazy-loaded (no consent mode equivalent) for marketing cookies.
 * - All helpers are safe to call before consent (gtag/fbq may be undefined).
 */

export const GA_MEASUREMENT_ID = "G-S05LEDF6JW";
export const META_PIXEL_ID = "49013716985302";

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

// ---------- Consent Mode v2 ----------

type ConsentState = "granted" | "denied";

export function updateConsent({
  analytics,
  marketing,
}: {
  analytics: boolean;
  marketing: boolean;
}) {
  if (typeof window === "undefined") return;
  const analyticsState: ConsentState = analytics ? "granted" : "denied";
  const marketingState: ConsentState = marketing ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    analytics_storage: analyticsState,
    ad_storage: marketingState,
    ad_user_data: marketingState,
    ad_personalization: marketingState,
  });
}

// ---------- Page / view tracking ----------

export function trackPageView(url: string, locale?: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "page_view", {
    page_location: url,
    page_path: new URL(url, window.location.origin).pathname,
    ...(locale && { locale }),
  });
}

// ---------- Core Web Vitals ----------

export function trackWebVital(metric: {
  id: string;
  name: string;
  value: number;
  rating?: "good" | "needs-improvement" | "poor";
  delta: number;
  navigationType?: string;
}) {
  if (typeof window === "undefined") return;
  const value =
    metric.name === "CLS"
      ? Math.round(metric.value * 1000)
      : Math.round(metric.value);
  window.gtag?.("event", metric.name, {
    event_category: "Web Vitals",
    event_label: metric.id,
    value,
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_rating: metric.rating,
    non_interaction: true,
  });
}

// ---------- Conversion events ----------

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
  window.gtag?.("event", "cta_click", {
    cta_name: ctaName,
    ...(plan && { plan }),
  });
  window.fbq?.("track", "Lead", {
    content_name: `CTA - ${ctaName}`,
    ...(plan && { content_category: plan }),
  });
}

export function trackWhatsApp(source: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "contact_whatsapp", { source });
  window.fbq?.("track", "Contact", { method: "whatsapp", source });
}

export function trackPhone(source: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "contact_phone", { source });
  window.fbq?.("track", "Contact", { method: "phone", source });
}

export function trackEmail(source: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "contact_email", { source });
  window.fbq?.("track", "Contact", { method: "email", source });
}

export function trackOutboundClick(url: string, label: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "outbound_click", {
    link_url: url,
    link_label: label,
  });
}

export function trackServiceView(serviceName: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "view_service", { service_name: serviceName });
}

export function trackBlogRead(slug: string, category?: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "blog_read", {
    article_slug: slug,
    ...(category && { article_category: category }),
  });
}

export function trackScrollDepth(percent: number, pagePath: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "scroll_depth", {
    percent,
    page_path: pagePath,
    non_interaction: true,
  });
}
