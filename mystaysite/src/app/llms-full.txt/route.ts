import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://mystaysite.com";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();

  const blogSection = posts
    .map((p) => {
      const url = `${SITE_URL}/el/blog/${p.frontmatter.slug}`;
      return `### ${p.frontmatter.title}
- URL: ${url}
- Category: ${p.frontmatter.category}
- Date: ${p.frontmatter.date}
- Reading time: ${p.readingTime} min
- Keywords: ${p.frontmatter.keywords?.join(", ") || "—"}
- Summary: ${p.frontmatter.excerpt}`;
    })
    .join("\n\n");

  const body = `# MyStaySite (Full Content Index)

> This file provides a comprehensive index of all public content on mystaysite.com for LLM/AI agent consumption. For the concise version see /llms.txt.

## Company

MyStaySite builds professional websites for accommodation owners (villas, studios, apartments, hotels, guest houses) in Greece. The mission is to help property owners reduce dependency on OTAs like Booking.com and Airbnb by driving direct bookings through their own website, saving 15-20% commission per reservation.

- Website: ${SITE_URL}
- Email: info@mystaysite.com
- Phone: +30 697 458 5063
- WhatsApp: https://wa.me/306974585063
- Languages: Greek (el), English (en)
- Based in: Thessaloniki, Central Macedonia, Greece
- Areas served: Greece nationwide; focus on Central Macedonia (Thessaloniki), Halkidiki (Sithonia, Kassandra), Cyclades (Antiparos, Paros, Naxos), Crete

## Core services

- **Website development** — Custom responsive sites with booking systems
- **SEO** — Keyword research, on-page optimization, Google indexing guarantee within 14 days
- **Google Business Profile** — Setup and ongoing optimization for local SEO
- **Google Ads** — Campaign setup and management
- **Analytics consulting** — GA4, Search Console, conversion tracking
- **Website audit** — Technical + SEO audit with actionable recommendations
- **Property management** — Room/property management software setup
- **Social media** — Setup and content strategy (no content writing)

## Packages

| Package | Price | Includes |
|---|---|---|
| Starter | €450 | One-page site, photos, SEO basics, SSL, Google Business Profile |
| Professional | €890 | Full site + booking system, reviews, 2 languages, GA4, gallery |
| Premium | €1890 | Everything + online payments, iCal sync, 3+ languages, blog, copywriting, Google Ads setup, social media, PMS integration |

Yearly maintenance: €200/year (first year FREE). Includes updates, backups, security patches, and minor text/pricing edits. Additionally, clients get 3 months of free edits after launch. Custom quotes for variable-scope services.

## Guarantees

- Free quote with no obligation
- Google-indexed in 14 days or we work for free until it is
- 6 months bug-free guarantee
- Free demo iteration before final payment

## Portfolio

- **Villa Afroditi** — Luxury seafront villas, Glyfa, Antiparos. Two independent villas with private pools. https://www.antiparos-afroditivillas.gr
- **Achilleas Peaceful Place** — Apartments in Sithonia, Halkidiki. Full before/after case study available. https://achilleasplace.gr
- **RODAVGI Apartments** — Apartments in Sithonia, Halkidiki. Booking score 9.5, Google 5.0. https://rodavgiapartments.com

## Key pages

- Homepage (Greek): ${SITE_URL}/el
- Homepage (English): ${SITE_URL}/en
- All services: ${SITE_URL}/el/services
- Blog: ${SITE_URL}/el/blog
- Portfolio case study: ${SITE_URL}/el/portfolio/achilleas-peaceful-place
- Terms: ${SITE_URL}/el/terms
- Privacy: ${SITE_URL}/el/privacy

## Service pages

- SEO: ${SITE_URL}/el/services/seo
- Google Ads: ${SITE_URL}/el/services/google-ads
- Social media: ${SITE_URL}/el/services/social-media
- Analytics consulting: ${SITE_URL}/el/services/analytics-consulting
- Website audit: ${SITE_URL}/el/services/website-audit
- Property management: ${SITE_URL}/el/services/property-management

## Blog articles

${blogSection}

## Payment methods

Bank transfer, Stripe, Viva Wallet, Mastercard, American Express, Crypto.

## Machine-readable manifests

- Sitemap: ${SITE_URL}/sitemap.xml
- RSS feed: ${SITE_URL}/feed.xml
- Agents manifest: ${SITE_URL}/agents.json
- Concise LLM index: ${SITE_URL}/llms.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
