/**
 * Microsoft Clarity helpers.
 *
 * Clarity gives us heatmaps + session recordings + basic insights for free.
 * https://clarity.microsoft.com
 *
 * Integration rules:
 * - The script is loaded only AFTER the user grants `analytics` consent
 *   (same gate as GA4, because Clarity stores a first-party cookie and
 *   records session interactions).
 * - The project id is configured via `NEXT_PUBLIC_CLARITY_PROJECT_ID`.
 *   If the env var is missing, nothing loads (safe no-op).
 * - We call `clarity('consent')` after load so Clarity treats the session
 *   as consent-given (rather than cookieless / sampling-only mode).
 */

export const CLARITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "";

declare global {
  interface Window {
    clarity?: (command: string, ...args: unknown[]) => void;
  }
}

const SCRIPT_ID = "ms-clarity";

/**
 * Inject the Clarity bootstrap snippet. Safe to call multiple times - it is a
 * no-op after the first successful load. Caller is responsible for gating
 * this behind consent.
 */
export function loadClarity(): void {
  if (typeof window === "undefined") return;
  if (!CLARITY_PROJECT_ID) return;
  if (document.getElementById(SCRIPT_ID)) return;
  if (typeof window.clarity === "function") return;

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.type = "text/javascript";
  script.async = true;
  // Official snippet, adapted to avoid eslint 'no-implied-eval' while staying
  // byte-for-byte compatible with Clarity's upstream loader.
  script.textContent = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
  `;
  document.head.appendChild(script);
}

/**
 * Call after load to explicitly grant consent to Clarity. Upgrades the
 * session from cookieless / sampled mode to full recording.
 */
export function grantClarityConsent(): void {
  if (typeof window === "undefined") return;
  if (typeof window.clarity !== "function") return;
  try {
    window.clarity("consent");
  } catch {
    // swallow - Clarity is an optional analytics signal
  }
}

/**
 * Attach a custom tag (searchable/filterable in the Clarity dashboard) to the
 * current session. Useful for faceting by locale, theme, route group, etc.
 */
export function setClarityTag(key: string, value: string): void {
  if (typeof window === "undefined") return;
  if (typeof window.clarity !== "function") return;
  try {
    window.clarity("set", key, value);
  } catch {
    // noop
  }
}

/**
 * Identify the current visitor (hashed email / user id). Only call this
 * AFTER the user submits a form, never on page load.
 */
export function identifyClarityUser(
  userId: string,
  sessionId?: string,
  pageId?: string,
  friendlyName?: string,
): void {
  if (typeof window === "undefined") return;
  if (typeof window.clarity !== "function") return;
  try {
    window.clarity("identify", userId, sessionId, pageId, friendlyName);
  } catch {
    // noop
  }
}

/**
 * Fire a Clarity custom event (e.g. "lead_submitted", "audit_requested").
 * These show up as filters in the Clarity dashboard and help isolate the
 * exact sessions where something interesting happened.
 */
export function trackClarityEvent(eventName: string): void {
  if (typeof window === "undefined") return;
  if (typeof window.clarity !== "function") return;
  try {
    window.clarity("event", eventName);
  } catch {
    // noop
  }
}
