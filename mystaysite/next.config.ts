import type { NextConfig } from "next";

const AGENT_LINKS = [
  '</agents.json>; rel="alternate"; type="application/json"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</llms-full.txt>; rel="describedby"; type="text/plain"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</feed.xml>; rel="alternate"; type="application/rss+xml"',
  '</.well-known/mcp.json>; rel="mcp-server"; type="application/json"',
  '</.well-known/openapi.json>; rel="service-desc"; type="application/json"',
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"; type="application/json"',
].join(", ");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  compress: true,

  async headers() {
    return [
      {
        // RFC 8288 Link headers on every HTML page for agent discovery.
        // We exclude static assets/api/_next to keep response headers small.
        source: "/:path((?!_next/|api/|.*\\.).*)",
        headers: [
          { key: "Link", value: AGENT_LINKS },
          { key: "X-Agents-Manifest", value: "/agents.json" },
        ],
      },
    ];
  },

  // Next.js ignores folders beginning with "." so we keep our handlers under
  // /well-known/* and rewrite /.well-known/* to them.
  async rewrites() {
    return [
      {
        source: "/.well-known/api-catalog",
        destination: "/well-known/api-catalog",
      },
      {
        source: "/.well-known/agent-skills/index.json",
        destination: "/well-known/agent-skills/index.json",
      },
      {
        source: "/.well-known/http-message-signatures-directory",
        destination: "/well-known/http-message-signatures-directory",
      },
      // Legacy /favicon.ico is still probed by Google, RSS readers, and some
      // older browsers. Rewrite it to the dynamic /icon endpoint so they get
      // a real PNG (≥48x48) instead of the HTML fallback.
      {
        source: "/favicon.ico",
        destination: "/icon",
      },
    ];
  },
};

export default nextConfig;
