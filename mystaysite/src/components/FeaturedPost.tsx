import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  SEO: "bg-blue-500 text-white",
  Marketing: "bg-purple-500 text-white",
  "Case Studies": "bg-emerald-500 text-white",
  Tips: "bg-amber-500 text-white",
};

export default function FeaturedPost({
  post,
  locale = "el",
}: {
  post: Post;
  locale?: string;
}) {
  const { frontmatter, readingTime } = post;
  const isEn = locale === "en";
  const badgeClass =
    categoryColors[frontmatter.category] || "bg-gray-500 text-white";
  const hasImage = frontmatter.image && frontmatter.image.length > 0;

  return (
    <Link
      href={`/${locale}/blog/${frontmatter.slug}`}
      className="group block rounded-2xl overflow-hidden bg-white dark:bg-[#111827] ring-1 ring-gray-100 dark:ring-white/5 hover:ring-gray-200 dark:hover:ring-white/15 shadow-sm dark:shadow-black/30 hover:shadow-xl dark:hover:shadow-black/60 transition-all duration-300 mb-12"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[360px] overflow-hidden bg-gray-100 dark:bg-[#0B0F1A]">
          {hasImage && (
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-[1.04] transition-transform duration-[600ms] ease-out"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 md:bg-gradient-to-r md:from-black/0 md:to-black/0" />
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/95 dark:bg-[#0B0F1A]/90 text-[#1a1a2e] dark:text-white shadow-sm">
            <svg
              className="w-3 h-3 text-[#f57c51]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.8 5.7 21l2.3-7.2-6-4.4h7.6z" />
            </svg>
            {isEn ? "Featured" : "Προτεινόμενο"}
          </span>
        </div>
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full ${badgeClass}`}
            >
              {frontmatter.category}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {readingTime} {isEn ? "min read" : "λεπτά ανάγνωση"}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {new Date(frontmatter.date).toLocaleDateString(
                isEn ? "en-US" : "el-GR",
                { year: "numeric", month: "short", day: "numeric" }
              )}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1a2e] dark:text-white leading-tight mb-3 group-hover:text-[#f57c51] transition-colors">
            {frontmatter.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-[0.95rem] leading-relaxed mb-5 line-clamp-3">
            {frontmatter.excerpt}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f57c51]">
            {isEn ? "Read article" : "Διαβάστε το άρθρο"}
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
