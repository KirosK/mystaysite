import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const LOCALES = ["el", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mystaysite.com";

  const staticPages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/free-audit", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/odigos-direct-bookings", changeFrequency: "monthly" as const, priority: 0.85 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/services", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/services/property-management", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/services/website-audit", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/services/analytics-consulting", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/services/google-ads", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/services/social-media", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/services/seo", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/portfolio/achilleas-peaceful-place", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/badge", changeFrequency: "monthly" as const, priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  const localePages = LOCALES.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${baseUrl}/${l}${page.path}`])
        ),
      },
    }))
  );

  const blogPosts = getAllPosts().flatMap((post) =>
    LOCALES.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${post.frontmatter.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${baseUrl}/${l}/blog/${post.frontmatter.slug}`])
        ),
      },
    }))
  );

  return [...localePages, ...blogPosts];
}
