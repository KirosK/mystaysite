/**
 * Spam-protection utilities shared by form handlers (client + server).
 *
 * Defense layers:
 *   1. Honeypot field `_gotcha` — hidden from humans, filled by naive bots.
 *   2. Time guard — reject submissions that arrive impossibly fast.
 *   3. Content heuristics — disposable emails, link flooding, crypto/spam
 *      phrases, non-textual payloads.
 *   4. (Optional, server-side) Cloudflare Turnstile token verification.
 *
 * All functions are pure and safe to call on both client and server.
 */

// --- 1. Basic validation -----------------------------------------------------

const EMAIL_RE =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function isValidEmail(value: string): boolean {
  if (typeof value !== "string") return false;
  const v = value.trim();
  if (v.length < 5 || v.length > 254) return false;
  return EMAIL_RE.test(v);
}

export function isValidUrl(value: string): boolean {
  if (typeof value !== "string") return false;
  const v = value.trim();
  if (v.length === 0) return true; // URL is optional
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// --- 2. Disposable / suspicious email domains --------------------------------

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "10minutemail.com",
  "temp-mail.org",
  "guerrillamail.com",
  "guerrillamail.net",
  "yopmail.com",
  "throwawaymail.com",
  "trashmail.com",
  "maildrop.cc",
  "dispostable.com",
  "fakeinbox.com",
  "sharklasers.com",
  "spam4.me",
  "getairmail.com",
  "mohmal.com",
  "mytemp.email",
  "mailnesia.com",
  "tempail.com",
  "tempmailer.com",
  "inboxalias.com",
  "tempr.email",
  "mt2015.com",
  "fake-mail.net",
  "tempmail.ninja",
  "emailondeck.com",
]);

export function isDisposableEmail(email: string): boolean {
  const at = email.lastIndexOf("@");
  if (at === -1) return false;
  const domain = email.slice(at + 1).toLowerCase().trim();
  return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

// --- 3. Spam content heuristics ---------------------------------------------

const SPAM_KEYWORDS = [
  "buy cheap",
  "viagra",
  "cialis",
  "casino",
  "bitcoin investment",
  "crypto opportunity",
  "seo backlinks",
  "guest post opportunity",
  "domain authority",
  "rank #1",
  "forex",
  "earn money fast",
  "work from home",
  "mlm",
  "pyramid",
  "replica watches",
  "loan approval",
  "debt consolidation",
  "adult dating",
  "escort",
  "sex cam",
];

/** Count HTTP/HTTPS URLs in a string. */
export function countUrls(text: string): number {
  if (!text) return 0;
  const matches = text.match(/https?:\/\/[^\s<>"]+/gi);
  return matches ? matches.length : 0;
}

/** True if text is almost entirely uppercase (≥ 70%) and at least 20 chars. */
function isShouty(text: string): boolean {
  if (text.length < 20) return false;
  const letters = text.replace(/[^A-Za-z]/g, "");
  if (letters.length < 10) return false;
  const uppers = letters.replace(/[^A-Z]/g, "").length;
  return uppers / letters.length >= 0.7;
}

/** Cyrillic/CJK letters mixed with Latin — classic spam pattern. */
function hasMixedScripts(text: string): boolean {
  const hasCyrillic = /[\u0400-\u04FF]/.test(text);
  const hasCJK = /[\u4E00-\u9FFF]/.test(text);
  const hasLatin = /[A-Za-z]/.test(text);
  return hasLatin && (hasCyrillic || hasCJK);
}

export interface SpamCheckResult {
  ok: boolean;
  reason?: string;
}

/**
 * Apply multiple content heuristics. Used for the free-text concern/message
 * fields. Intentionally conservative — we'd rather let through a borderline
 * message than block a real Greek/English speaker.
 */
export function checkSpamContent(text: string): SpamCheckResult {
  if (!text) return { ok: true };
  const lower = text.toLowerCase();

  for (const phrase of SPAM_KEYWORDS) {
    if (lower.includes(phrase)) {
      return { ok: false, reason: `spam keyword: ${phrase}` };
    }
  }

  if (countUrls(text) >= 3) {
    return { ok: false, reason: "too many urls" };
  }

  if (isShouty(text)) {
    return { ok: false, reason: "shouty" };
  }

  if (hasMixedScripts(text)) {
    return { ok: false, reason: "mixed scripts" };
  }

  return { ok: true };
}

// --- 4. Honeypot + time guard ------------------------------------------------

/** Minimum ms between form mount and submission to be considered human. */
export const MIN_FILL_MS = 2500;
/** Maximum ms to accept — stale tabs should re-submit, blocks replay attempts. */
export const MAX_FILL_MS = 1000 * 60 * 60 * 6; // 6 hours

export interface HoneypotPayload {
  /** Hidden field — bots fill it, humans can't see it. */
  _gotcha?: string;
  /** Timestamp (ms) of form mount, included by the client. */
  _ts?: number;
}

export function checkHoneypot(
  payload: HoneypotPayload
): SpamCheckResult {
  if (payload._gotcha && payload._gotcha.trim() !== "") {
    return { ok: false, reason: "honeypot triggered" };
  }

  if (typeof payload._ts === "number") {
    const now = Date.now();
    const age = now - payload._ts;
    if (age < MIN_FILL_MS) {
      return { ok: false, reason: "too fast" };
    }
    if (age > MAX_FILL_MS) {
      return { ok: false, reason: "stale" };
    }
  }

  return { ok: true };
}

// --- 5. Simple in-memory rate limit (per-instance) --------------------------

/**
 * Token-bucket-ish rate limiter, scoped per instance. For low-volume sites
 * this is enough to stop brute-force abuse without needing Redis/KV. Behind
 * Vercel's auto-scaling, a distributed attacker could hit multiple instances
 * but Formspree + Turnstile still gate the final write.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_HITS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entries = hits.get(key) ?? [];
  const recent = entries.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_HITS) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    // Opportunistic cleanup of stale keys.
    for (const [k, ts] of hits) {
      const r = ts.filter((t) => now - t < WINDOW_MS);
      if (r.length === 0) hits.delete(k);
      else hits.set(k, r);
    }
  }

  return false;
}

// --- 6. Turnstile token verification (optional) -----------------------------

/**
 * Verify a Cloudflare Turnstile token server-side. If
 * `TURNSTILE_SECRET_KEY` is not configured, returns `{ ok: true }` so the
 * site keeps working without Turnstile. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
 * on the client and `TURNSTILE_SECRET_KEY` on the server to enable.
 */
export async function verifyTurnstile(
  token: string | undefined,
  remoteip?: string
): Promise<SpamCheckResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true };

  if (!token) return { ok: false, reason: "missing turnstile token" };

  try {
    const form = new URLSearchParams();
    form.append("secret", secret);
    form.append("response", token);
    if (remoteip) form.append("remoteip", remoteip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: form,
      }
    );
    const data = (await res.json()) as { success?: boolean; ["error-codes"]?: string[] };
    if (!data.success) {
      return {
        ok: false,
        reason: `turnstile: ${data["error-codes"]?.join(",") ?? "unknown"}`,
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: "turnstile network error" };
  }
}

// --- 7. Hash for log-safe IP addresses --------------------------------------

/** Simple hash so we don't log raw IPs (GDPR-friendlier). */
export async function hashIp(ip: string): Promise<string> {
  if (!ip) return "anonymous";
  const salt = process.env.IP_HASH_SALT ?? "mystaysite";
  try {
    const data = new TextEncoder().encode(ip + salt);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buf))
      .slice(0, 8)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return "hashfail";
  }
}
