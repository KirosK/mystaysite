/**
 * Web Bot Auth — HTTP Message Signatures Directory
 * https://datatracker.ietf.org/doc/draft-meunier-web-bot-auth-architecture/
 *
 * We do not currently sign any outbound requests, but we publish this
 * directory so agents (and audit tools) can detect that we understand
 * the specification and discover our stance. The `keys` array is empty
 * and `trust_policy` documents that we rely on robots.txt (RFC 9309)
 * and Content-Signal for bot governance.
 */

export const dynamic = "force-static";

export function GET() {
  const body = {
    version: "1",
    publisher: {
      name: "MyStaySite",
      url: "https://mystaysite.com",
      contact: "info@mystaysite.com",
    },
    keys: [],
    trust_policy: {
      robots_txt: "https://mystaysite.com/robots.txt",
      content_signals: "declared-in-robots-txt",
      notes:
        "Access control for MyStaySite is declared via RFC 9309 (robots.txt) and Content-Signal directives. No signed-request authentication is required today; this directory advertises Web Bot Auth awareness for future signing support.",
    },
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
