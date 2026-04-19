/**
 * Hand-rolled robots.txt so we can embed Content-Signal directives
 * (contentsignals.org / draft-romm-aipref-contentsignals) that the
 * Next.js MetadataRoute.Robots helper does not yet model.
 *
 * We ALLOW AI training, search, and AI-input because we *want* AI
 * crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) to discover the
 * site — more exposure when users ask an LLM "find me a website
 * builder for vacation rentals".
 */

const DISALLOW = ["/api/", "/_next/"];

const SEARCH_AND_AI_BOTS = [
  "Googlebot",
  "Googlebot-Image",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "Baiduspider",
  "YandexBot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "FacebookBot",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "YouBot",
  "cohere-ai",
  "Diffbot",
];

export const dynamic = "force-static";

export function GET() {
  const ruleBlocks = [
    ["*", ...SEARCH_AND_AI_BOTS].map(
      (ua) =>
        `User-Agent: ${ua}\nAllow: /\n${DISALLOW.map((d) => `Disallow: ${d}`).join("\n")}`,
    ),
  ].flat();

  const body = `${ruleBlocks.join("\n\n")}

# Content preferences for AI crawlers (contentsignals.org)
Content-Signal: search=yes, ai-train=yes, ai-input=yes

Host: https://mystaysite.com
Sitemap: https://mystaysite.com/sitemap.xml
Sitemap: https://mystaysite.com/feed.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
