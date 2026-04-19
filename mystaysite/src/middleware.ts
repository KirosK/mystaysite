import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["el", "en"];
const DEFAULT_LOCALE = "el";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Markdown content negotiation (Cloudflare-style markdown-for-agents)
  //
  // If the client asks for `Accept: text/markdown` we internally rewrite
  // to /api/md?path=... which returns a markdown version of the page with
  // the correct Content-Type header.
  const accept = request.headers.get("accept") || "";
  if (
    accept.toLowerCase().includes("text/markdown") &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api/") &&
    !pathname.startsWith("/.well-known/") &&
    !pathname.includes(".")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/api/md";
    url.search = `?path=${encodeURIComponent(pathname || "/")}`;
    const res = NextResponse.rewrite(url);
    res.headers.set("Vary", "Accept");
    return res;
  }

  // --- Locale detection & redirect
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Never rewrite discovery endpoints into a locale path.
  if (pathname.startsWith("/well-known/")) return;

  const acceptLang = request.headers.get("accept-language") || "";
  const preferredLocale = acceptLang.toLowerCase().startsWith("en")
    ? "en"
    : DEFAULT_LOCALE;

  request.nextUrl.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
