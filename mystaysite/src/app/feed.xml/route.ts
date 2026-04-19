import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://mystaysite.com";
const TITLE = "MyStaySite Blog";
const DESCRIPTION =
  "Articles about website development, SEO, direct bookings, and digital marketing for vacation rental owners.";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const buildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/el/blog/${post.frontmatter.slug}`;
      const pubDate = new Date(post.frontmatter.date).toUTCString();
      return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.frontmatter.excerpt || post.frontmatter.title)}</description>
      <category>${escapeXml(post.frontmatter.category)}</category>
      <author>info@mystaysite.com (${escapeXml(
        post.frontmatter.author || "MyStaySite",
      )})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${SITE_URL}/el/blog</link>
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>el-GR</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
