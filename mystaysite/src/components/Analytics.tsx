"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import {
  GA_MEASUREMENT_ID,
  trackPageView,
  trackWebVital,
} from "@/lib/analytics";

/**
 * Global analytics loader.
 * - Injects gtag.js with Google Consent Mode v2 defaults = denied (for EEA compliance).
 * - Reports Core Web Vitals (LCP, CLS, INP, FCP, TTFB) as GA4 events.
 * - Fires an explicit `page_view` on client-side route changes.
 * - Skips localhost in non-production (so dev traffic does not pollute reports).
 */

const isProd = process.env.NODE_ENV === "production";

function isLocalHost(): boolean {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return (
    h === "localhost" ||
    h === "127.0.0.1" ||
    h === "0.0.0.0" ||
    h.endsWith(".local")
  );
}

export default function Analytics({ locale }: { locale?: string }) {
  const pathname = usePathname();

  // Core Web Vitals -> GA4
  useReportWebVitals((metric) => {
    if (!isProd || isLocalHost()) return;
    trackWebVital({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      rating: (metric as { rating?: "good" | "needs-improvement" | "poor" })
        .rating,
      navigationType: (metric as { navigationType?: string }).navigationType,
    });
  });

  // SPA page_view tracking on route changes (first pageview is sent by gtag 'config')
  useEffect(() => {
    if (!isProd || isLocalHost()) return;
    if (typeof window === "undefined") return;
    trackPageView(window.location.href, locale);
  }, [pathname, locale]);

  // Do not load scripts on localhost / dev to avoid polluting analytics
  if (!isProd || (typeof window !== "undefined" && isLocalHost())) {
    return null;
  }

  return (
    <>
      {/* Consent Mode v2: defaults denied. Updated after user consent via gtag('consent','update',...) */}
      <Script id="gtag-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent','default',{
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });
          gtag('set','ads_data_redaction', true);
          gtag('set','url_passthrough', true);
        `}
      </Script>
      <Script
        id="gtag-js"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config','${GA_MEASUREMENT_ID}',{
            anonymize_ip: true,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
