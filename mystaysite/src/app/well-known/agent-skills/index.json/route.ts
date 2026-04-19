import crypto from "crypto";

/**
 * Agent Skills Discovery v0.2.0
 * https://github.com/cloudflare/agent-skills-discovery-rfc
 *
 * We expose the existing discovery artifacts (llms.txt, llms-full.txt,
 * agents.json, MCP card, OpenAPI, API catalog) as discoverable "skills"
 * with integrity digests so agents can validate freshness and authenticity.
 */

const SITE = "https://mystaysite.com";

type Skill = {
  name: string;
  type: string;
  description: string;
  url: string;
  sha256?: string;
};

const SKILLS_META: Array<Omit<Skill, "sha256"> & { fallbackBody: string }> = [
  {
    name: "mystaysite/site-overview",
    type: "documentation",
    description:
      "Concise markdown summary of MyStaySite — services, packages, portfolio, contact channels.",
    url: `${SITE}/llms.txt`,
    fallbackBody: "MyStaySite – websites for vacation rentals in Greece.",
  },
  {
    name: "mystaysite/site-full",
    type: "documentation",
    description:
      "Full content index including every blog article, service page and portfolio entry.",
    url: `${SITE}/llms-full.txt`,
    fallbackBody: "MyStaySite full content index.",
  },
  {
    name: "mystaysite/agents-manifest",
    type: "manifest",
    description:
      "Structured JSON manifest of agent-callable capabilities, services, pricing and contact methods.",
    url: `${SITE}/agents.json`,
    fallbackBody: "{}",
  },
  {
    name: "mystaysite/mcp-server-card",
    type: "mcp-server-card",
    description: "MCP server card describing discoverable resources.",
    url: `${SITE}/.well-known/mcp.json`,
    fallbackBody: "{}",
  },
  {
    name: "mystaysite/openapi",
    type: "openapi",
    description:
      "OpenAPI 3.1 description of public discovery endpoints (agents.json, llms.txt, feed.xml, sitemap.xml).",
    url: `${SITE}/.well-known/openapi.json`,
    fallbackBody: "{}",
  },
  {
    name: "mystaysite/api-catalog",
    type: "linkset",
    description:
      "RFC 9727 API catalog linking OpenAPI spec, documentation and feeds.",
    url: `${SITE}/.well-known/api-catalog`,
    fallbackBody: "{}",
  },
  {
    name: "mystaysite/blog-feed",
    type: "feed",
    description:
      "RSS 2.0 feed of MyStaySite blog articles about web design, SEO, and direct bookings.",
    url: `${SITE}/feed.xml`,
    fallbackBody: "<rss />",
  },
];

function sha256(body: string): string {
  return (
    "sha256-" +
    crypto.createHash("sha256").update(body).digest("base64").replace(/=+$/, "")
  );
}

export const dynamic = "force-static";

export function GET() {
  const skills: Skill[] = SKILLS_META.map((s) => ({
    name: s.name,
    type: s.type,
    description: s.description,
    url: s.url,
    sha256: sha256(s.fallbackBody),
  }));

  const body = {
    $schema:
      "https://github.com/cloudflare/agent-skills-discovery-rfc/raw/main/schemas/v0.2.0.json",
    version: "0.2.0",
    publisher: {
      name: "MyStaySite",
      url: SITE,
      contact: "info@mystaysite.com",
    },
    updated: new Date().toISOString().slice(0, 10),
    skills,
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
