import fs from "fs";
import path from "path";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

/**
 * Markdown content negotiation endpoint.
 *
 * Middleware rewrites any HTML request that sends `Accept: text/markdown`
 * here, passing the original pathname as `?path=`. We return a markdown
 * version of the requested page with `Content-Type: text/markdown` so
 * AI agents and LLM-aware browsers can consume structured content
 * without having to parse HTML.
 */

const SITE_URL = "https://mystaysite.com";

function normalizeLocale(pathname: string): "el" | "en" {
  return pathname.startsWith("/en") ? "en" : "el";
}

function tryRead(p: string): string | null {
  try {
    return fs.readFileSync(p, "utf-8");
  } catch {
    return null;
  }
}

function homepageMarkdown(locale: "el" | "en"): string {
  const llmsPath = path.join(process.cwd(), "public", "llms.txt");
  const base = tryRead(llmsPath) ?? "# MyStaySite";
  const header =
    locale === "en"
      ? "> You requested this page as markdown. The full site is at https://mystaysite.com/en — below is the machine-readable summary.\n\n"
      : "> Ζητήσατε αυτή τη σελίδα ως markdown. Η κανονική έκδοση βρίσκεται στο https://mystaysite.com/el — παρακάτω είναι η machine-readable σύνοψη.\n\n";
  return header + base;
}

function blogPostMarkdown(slug: string, locale: "el" | "en"): string | null {
  const post = getPostBySlug(slug, locale) ?? getPostBySlug(slug);
  if (!post) return null;

  const fm = post.frontmatter;
  return `---
title: ${fm.title}
slug: ${fm.slug}
date: ${fm.date}${fm.dateModified ? `\ndateModified: ${fm.dateModified}` : ""}
category: ${fm.category}
author: ${fm.author}
url: ${SITE_URL}/${locale}/blog/${fm.slug}
keywords: ${fm.keywords?.join(", ") ?? ""}
---

# ${fm.title}

> ${fm.excerpt}

${post.content}
`;
}

function blogIndexMarkdown(locale: "el" | "en"): string {
  const posts = getAllPosts();
  const list = posts
    .map(
      (p) =>
        `- [${p.frontmatter.title}](${SITE_URL}/${locale}/blog/${p.frontmatter.slug}) — ${p.frontmatter.excerpt}`,
    )
    .join("\n");
  return `# MyStaySite Blog\n\n> Articles about website development, SEO, and direct bookings for accommodation owners.\n\n${list}\n\nFeed: ${SITE_URL}/feed.xml\n`;
}

function fallbackMarkdown(pathname: string): string {
  const llmsFullPath = path.join(process.cwd(), "public", "llms.txt");
  const llms = tryRead(llmsFullPath) ?? "";
  return `# ${pathname}\n\n> This page is available at ${SITE_URL}${pathname}. For the full machine-readable site content see ${SITE_URL}/llms-full.txt.\n\n${llms}\n`;
}

export const dynamic = "force-static";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("path") || "/";
  const pathname = raw.startsWith("/") ? raw : `/${raw}`;
  const locale = normalizeLocale(pathname);

  let md: string;

  if (pathname === "/" || pathname === `/${locale}` || pathname === `/${locale}/`) {
    md = homepageMarkdown(locale);
  } else if (pathname.endsWith("/blog") || pathname.endsWith("/blog/")) {
    md = blogIndexMarkdown(locale);
  } else {
    const blogMatch = pathname.match(/\/blog\/([^/?#]+)/);
    const blogMd = blogMatch ? blogPostMarkdown(blogMatch[1], locale) : null;
    md = blogMd ?? fallbackMarkdown(pathname);
  }

  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      Vary: "Accept",
      "X-Markdown-Source": pathname,
    },
  });
}
