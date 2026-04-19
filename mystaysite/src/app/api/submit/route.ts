import { NextRequest, NextResponse } from "next/server";
import {
  checkHoneypot,
  checkSpamContent,
  hashIp,
  isDisposableEmail,
  isRateLimited,
  isValidEmail,
  isValidUrl,
  verifyTurnstile,
} from "@/lib/spam-protection";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_ENDPOINT ?? "https://formspree.io/f/xeerjqzn";

const ALLOWED_ORIGINS = [
  "https://mystaysite.com",
  "https://www.mystaysite.com",
];
const ALLOWED_TYPES = new Set([
  "free_audit",
  "contact",
  "newsletter",
]);

type JsonBody = Record<string, unknown>;

function badRequest(reason: string, status = 400) {
  return NextResponse.json(
    { ok: false, error: reason },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

function ok() {
  return NextResponse.json(
    { ok: true },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "anonymous";
}

function isAllowedOrigin(req: NextRequest): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const check = (value: string | null) => {
    if (!value) return false;
    return ALLOWED_ORIGINS.some((o) => value.startsWith(o));
  };
  return check(origin) || check(referer);
}

function getString(body: JsonBody, key: string, max = 2000): string {
  const raw = body[key];
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return badRequest("origin not allowed", 403);
  }

  let body: JsonBody;
  try {
    body = (await req.json()) as JsonBody;
  } catch {
    return badRequest("invalid body");
  }

  const type = getString(body, "type", 32);
  if (!ALLOWED_TYPES.has(type)) {
    return badRequest("unknown form type");
  }

  // Honeypot + time guard ----------------------------------------------------
  const honeypot = checkHoneypot({
    _gotcha: typeof body._gotcha === "string" ? body._gotcha : "",
    _ts: typeof body._ts === "number" ? body._ts : undefined,
  });
  if (!honeypot.ok) {
    // Pretend success so bots don't know they were caught.
    return ok();
  }

  // Rate limit by IP hash ----------------------------------------------------
  const ip = getClientIp(req);
  const ipKey = await hashIp(ip);
  if (isRateLimited(`${type}:${ipKey}`)) {
    return badRequest("rate limited", 429);
  }

  // Field-level validation ---------------------------------------------------
  const email = getString(body, "email", 254);
  if (!isValidEmail(email)) return badRequest("invalid email");
  if (isDisposableEmail(email)) return badRequest("disposable email");

  const name = getString(body, "name", 120);
  const whatsapp = getString(body, "whatsapp", 40);
  const website = getString(body, "website", 2048);
  const bookingLink = getString(body, "bookingLink", 2048);
  const concern = getString(body, "concern", 4000);
  const message = getString(body, "message", 4000);
  const link = getString(body, "link", 2048);
  const contact = getString(body, "contact", 254);
  const locale = getString(body, "locale", 8) || "el";
  const source = getString(body, "source", 120) || `mystaysite.com/${type}`;

  if (website && !isValidUrl(website)) return badRequest("invalid website url");
  if (bookingLink && !isValidUrl(bookingLink)) return badRequest("invalid booking url");
  if (link && !isValidUrl(link)) return badRequest("invalid link url");

  // Content heuristics -------------------------------------------------------
  for (const text of [name, concern, message]) {
    if (!text) continue;
    const s = checkSpamContent(text);
    if (!s.ok) {
      return ok(); // silent drop
    }
  }

  // Turnstile (optional) -----------------------------------------------------
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken : undefined;
  const turnstile = await verifyTurnstile(turnstileToken, ip);
  if (!turnstile.ok) {
    return badRequest("captcha failed", 403);
  }

  // Build subject ------------------------------------------------------------
  const subjectMap: Record<string, string> = {
    free_audit: "New Free Video Audit request",
    contact: "New quote request",
    newsletter: `Newsletter signup (${locale})`,
  };

  const payload: Record<string, unknown> = {
    _subject: subjectMap[type] ?? `New ${type} submission`,
    type,
    locale,
    source,
    email,
    ...(name && { name }),
    ...(whatsapp && { whatsapp }),
    ...(website && { website }),
    ...(bookingLink && { bookingLink }),
    ...(concern && { concern }),
    ...(message && { message }),
    ...(link && { link }),
    ...(contact && { contact }),
    meta: {
      ua: req.headers.get("user-agent")?.slice(0, 240) ?? "",
      ip_hash: ipKey,
    },
  };

  // Forward to Formspree -----------------------------------------------------
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return badRequest("upstream error", 502);
    }
  } catch {
    return badRequest("upstream network error", 502);
  }

  return ok();
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Cache-Control": "no-store",
      Allow: "POST, OPTIONS",
    },
  });
}
