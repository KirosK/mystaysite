import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogGrid from "@/components/BlogGrid";
import FeaturedPost from "@/components/FeaturedPost";
import Newsletter from "@/components/Newsletter";
import Link from "next/link";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: {
      absolute: isEn
        ? "Blog | MyStaySite: Tips for Vacation Rentals"
        : "Blog | MyStaySite: Συμβουλές για Τουριστικά Καταλύματα",
    },
    description: isEn
      ? "Practical advice for vacation rental owners. SEO, marketing, direct bookings. From the MyStaySite team."
      : "Πρακτικές συμβουλές για ιδιοκτήτες ενοικιαζόμενων δωματίων. SEO, marketing, direct bookings, μείωση προμηθειών.",
    openGraph: {
      title: isEn
        ? "Blog | MyStaySite: Tips for Vacation Rentals"
        : "Blog | MyStaySite: Συμβουλές για Τουριστικά Καταλύματα",
      url: `https://mystaysite.com/${locale}/blog`,
      type: "website",
    },
    alternates: {
      canonical: `https://mystaysite.com/${locale}/blog`,
      languages: {
        el: "https://mystaysite.com/el/blog",
        en: "https://mystaysite.com/en/blog",
      },
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const isEn = locale === "en";
  const [featured, ...rest] = posts;

  return (
    <>
      <div className="h-16 md:h-18" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center mb-12">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#f57c51] dark:hover:text-[#f57c51] transition-colors mb-6"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {isEn ? "Home" : "Αρχική"}
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a2e] dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {isEn
              ? "Tips, guides and case studies for vacation rental owners in Greece."
              : "Συμβουλές, οδηγοί και case studies για ιδιοκτήτες τουριστικών καταλυμάτων στην Ελλάδα."}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 py-20">
            {isEn
              ? "No articles yet. Stay tuned!"
              : "Δεν υπάρχουν ακόμα άρθρα. Μείνετε συντονισμένοι!"}
          </p>
        ) : (
          <>
            {featured && <FeaturedPost post={featured} locale={locale} />}
            <BlogGrid posts={rest} locale={locale} />
          </>
        )}

        <Newsletter locale={locale} />
      </main>
    </>
  );
}
