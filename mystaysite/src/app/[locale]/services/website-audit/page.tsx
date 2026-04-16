import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

const content = {
  el: {
    metadata: {
      title: "Website Technical Audit | MyStaySite",
      description:
        "Αναλυτικό τεχνικό audit του website σας: ταχύτητα, SEO, security, UX, mobile. Detailed report + action plan σε 5 εργάσιμες.",
      ogTitle: "Website Technical Audit | MyStaySite",
      ogDescription:
        "Αναλυτικό audit του website σας σε 5 εργάσιμες. Εντοπίζουμε ό,τι κοστίζει κρατήσεις.",
    },
    data: {
      title: "Website Technical Audit",
      subtitle:
        "Έχεις ήδη website, αλλά δεν φέρνει κρατήσεις; Κάνουμε deep dive σε ταχύτητα, SEO, UX και security — και σου λέμε ακριβώς τι να διορθώσεις.",
      price: "€199 one-time",
      features: [
        "Page speed analysis (LCP, CLS, TBT, Core Web Vitals) σε desktop + mobile",
        "Mobile responsiveness & UX audit (real device testing)",
        "Technical SEO: indexing, sitemap, robots.txt, canonical, hreflang, schema markup",
        "On-page SEO: titles, meta descriptions, headings, alt text, internal linking",
        "Content audit: σύγκριση με competitors, keyword gaps",
        "Security check: HTTPS, headers, vulnerabilities (basic scan)",
        "Conversion audit: CTAs, forms, booking flow — πού χάνεις κρατήσεις",
        "Google Analytics + Search Console review (εάν υπάρχει access)",
        "Accessibility check (WCAG 2.1 basics)",
        "Detailed report (10-15 σελίδες) με priorities & action plan",
        "1 ώρα follow-up call για να εξηγήσουμε τα findings",
        "Προτάσεις για quick wins (μπορείς να τα κάνεις μόνος) + bigger fixes",
      ],
      faq: [
        {
          q: "Σε πόσες μέρες παραδίδεται το audit;",
          a: "5 εργάσιμες ημέρες από τη στιγμή που έχουμε access σε website, Google Analytics και Search Console.",
        },
        {
          q: "Τι χρειάζεστε από εμένα;",
          a: "URL του website, admin access (προαιρετικά για deeper analysis), Google Analytics view access, Search Console access.",
        },
        {
          q: "Μπορείτε να κάνετε και τις διορθώσεις;",
          a: "Ναι. Μετά το audit μπορείς να επιλέξεις (α) να κάνεις μόνος όσα γίνονται, (β) να αναλάβουμε εμείς επιλεγμένες εργασίες, ή (γ) να χτίσουμε νέο site εξαρχής αν η δομή χρειάζεται ανακατασκευή.",
        },
        {
          q: "Δουλεύει με οποιοδήποτε CMS;",
          a: "Ναι — WordPress, Wix, Squarespace, custom React/Next.js, Shopify, ακόμη και static HTML. Το audit είναι platform-agnostic.",
        },
        {
          q: "Τι είδους problems συνήθως βρίσκετε;",
          a: "Τα πιο συχνά: αργή ταχύτητα (> 4s LCP), κακό mobile UX, ελλιπές SEO (missing meta, wrong H1), broken booking flow, χωρίς structured data. Μέσος όρος: 15-25 issues.",
        },
      ],
    },
  },
  en: {
    metadata: {
      title: "Website Technical Audit | MyStaySite",
      description:
        "Detailed technical audit of your website: speed, SEO, security, UX, mobile. Detailed report + action plan in 5 business days.",
      ogTitle: "Website Technical Audit | MyStaySite",
      ogDescription:
        "Detailed audit of your website in 5 business days. We find what's costing you bookings.",
    },
    data: {
      title: "Website Technical Audit",
      subtitle:
        "Have a website but it's not driving bookings? We do a deep dive on speed, SEO, UX and security — and tell you exactly what to fix.",
      price: "€199 one-time",
      features: [
        "Page speed analysis (LCP, CLS, TBT, Core Web Vitals) on desktop + mobile",
        "Mobile responsiveness & UX audit (real device testing)",
        "Technical SEO: indexing, sitemap, robots.txt, canonical, hreflang, schema markup",
        "On-page SEO: titles, meta descriptions, headings, alt text, internal linking",
        "Content audit: comparison with competitors, keyword gaps",
        "Security check: HTTPS, headers, vulnerabilities (basic scan)",
        "Conversion audit: CTAs, forms, booking flow — where you lose bookings",
        "Google Analytics + Search Console review (if access available)",
        "Accessibility check (WCAG 2.1 basics)",
        "Detailed report (10-15 pages) with priorities & action plan",
        "1-hour follow-up call to walk through findings",
        "Suggestions for quick wins (DIY) + bigger fixes",
      ],
      faq: [
        {
          q: "How long does the audit take?",
          a: "5 business days from the moment we have access to website, Google Analytics and Search Console.",
        },
        {
          q: "What do you need from me?",
          a: "Website URL, admin access (optional, for deeper analysis), Google Analytics view access, Search Console access.",
        },
        {
          q: "Can you do the fixes too?",
          a: "Yes. After the audit you can choose (a) DIY what you can, (b) have us handle selected tasks, or (c) rebuild the site from scratch if the structure needs a redo.",
        },
        {
          q: "Does it work with any CMS?",
          a: "Yes — WordPress, Wix, Squarespace, custom React/Next.js, Shopify, even static HTML. The audit is platform-agnostic.",
        },
        {
          q: "What kinds of issues do you usually find?",
          a: "Most common: slow speed (>4s LCP), poor mobile UX, incomplete SEO (missing meta, wrong H1), broken booking flow, no structured data. Average: 15-25 issues per audit.",
        },
      ],
    },
  },
};

export async function generateStaticParams() {
  return [{ locale: "el" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = content[locale === "en" ? "en" : "el"].metadata;
  return {
    title: { absolute: c.title },
    description: c.description,
    alternates: {
      canonical: `https://mystaysite.com/${locale}/services/website-audit`,
      languages: {
        el: "https://mystaysite.com/el/services/website-audit",
        en: "https://mystaysite.com/en/services/website-audit",
      },
    },
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url: `https://mystaysite.com/${locale}/services/website-audit`,
    },
  };
}

export default async function WebsiteAuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = content[locale === "en" ? "en" : "el"].data;
  return <ServicePage data={data} locale={locale} />;
}
