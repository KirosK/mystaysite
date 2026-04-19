/**
 * API Catalog (RFC 9727) — lets agents discover our machine-readable
 * endpoints in a standard linkset format (RFC 9264).
 */

const SITE = "https://mystaysite.com";

export const dynamic = "force-static";

export function GET() {
  const body = {
    linkset: [
      {
        anchor: `${SITE}/`,
        "service-desc": [
          { href: `${SITE}/.well-known/openapi.json`, type: "application/json" },
        ],
        "service-doc": [
          { href: `${SITE}/llms-full.txt`, type: "text/plain" },
          { href: `${SITE}/llms.txt`, type: "text/plain" },
        ],
        "service-meta": [
          { href: `${SITE}/agents.json`, type: "application/json" },
          { href: `${SITE}/.well-known/mcp.json`, type: "application/json" },
          { href: `${SITE}/.well-known/ai-plugin.json`, type: "application/json" },
        ],
        status: [
          { href: `${SITE}/`, type: "text/html" },
        ],
      },
      {
        anchor: `${SITE}/feed.xml`,
        "service-desc": [
          { href: `${SITE}/feed.xml`, type: "application/rss+xml" },
        ],
        describedby: [
          { href: `${SITE}/sitemap.xml`, type: "application/xml" },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
