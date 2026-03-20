import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | MyStaySite — Συμβουλές για Τουριστικά Καταλύματα",
  description:
    "Πρακτικές συμβουλές για ιδιοκτήτες ενοικιαζόμενων δωματίων. SEO, marketing, direct bookings, μείωση προμηθειών. Από την ομάδα MyStaySite.",
  openGraph: {
    title: "Blog | MyStaySite — Συμβουλές για Τουριστικά Καταλύματα",
    description:
      "Πρακτικές συμβουλές για ιδιοκτήτες ενοικιαζόμενων δωματίων. SEO, marketing, direct bookings.",
    url: "https://mystaysite.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://mystaysite.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Navbar placeholder spacer */}
      <div className="h-16 md:h-18" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#f57c51] transition-colors mb-6"
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
            Αρχική
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Συμβουλές, οδηγοί και case studies για ιδιοκτήτες τουριστικών
            καταλυμάτων στην Ελλάδα.
          </p>
        </div>

        {/* Posts grid */}
        {posts.length === 0 ? (
          <p className="text-center text-gray-400 py-20">
            Δεν υπάρχουν ακόμα άρθρα. Μείνετε συντονισμένοι!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, i) => (
              <>
                <BlogCard key={post.frontmatter.slug} post={post} />
                {/* CTA banner after 3rd card */}
                {i === 2 && posts.length > 3 && (
                  <div
                    key="cta-banner"
                    className="md:col-span-2 lg:col-span-3 rounded-2xl bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4e] p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Θέλετε περισσότερες κρατήσεις;
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">
                        Δείτε πώς μπορούμε να σας βοηθήσουμε με ένα
                        επαγγελματικό website.
                      </p>
                    </div>
                    <a
                      href="/#contact"
                      className="shrink-0 bg-[#f57c51] hover:bg-[#e06a42] text-white font-bold px-6 py-3 rounded-xl transition-colors"
                    >
                      Ζητήστε Demo
                    </a>
                  </div>
                )}
              </>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
