import type { MetadataRoute } from "next";

/**
 * robots.txt for mystaysite.com
 *
 * Strategy: we WANT AI crawlers to discover us (it means more exposure when
 * users ask ChatGPT/Claude/Perplexity "find me a website builder for rentals").
 * So we explicitly ALLOW the major AI training crawlers instead of letting
 * ambiguity reign.
 */
export default function robots(): MetadataRoute.Robots {
  const blocked = ["/api/", "/_next/"];

  const allowedBots = [
    // Search engines
    "Googlebot",
    "Googlebot-Image",
    "Bingbot",
    "Slurp",
    "DuckDuckBot",
    "Baiduspider",
    "YandexBot",
    // AI/LLM crawlers - we ALLOW discovery
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

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: blocked },
      ...allowedBots.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: blocked,
      })),
    ],
    sitemap: [
      "https://mystaysite.com/sitemap.xml",
      "https://mystaysite.com/feed.xml",
    ],
    host: "https://mystaysite.com",
  };
}
