import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  SEO: "bg-blue-500/95 text-white",
  Marketing: "bg-purple-500/95 text-white",
  "Case Studies": "bg-emerald-500/95 text-white",
  Tips: "bg-amber-500/95 text-white",
};

const categoryBgGradients: Record<string, string> = {
  SEO: "from-blue-500 via-blue-600 to-indigo-700",
  Marketing: "from-fuchsia-500 via-purple-600 to-indigo-700",
  "Case Studies": "from-emerald-500 via-teal-600 to-cyan-700",
  Tips: "from-amber-400 via-orange-500 to-rose-600",
};

export default function BlogCard({
  post,
  locale,
}: {
  post: Post;
  locale?: string;
}) {
  const { frontmatter, readingTime } = post;
  const badgeClass =
    categoryColors[frontmatter.category] || "bg-gray-500/95 text-white";
  const hasImage = frontmatter.image && frontmatter.image.length > 0;
  const prefix = locale ? `/${locale}` : "";

  return (
    <Link
      href={`${prefix}/blog/${frontmatter.slug}`}
      className="group block bg-white dark:bg-[#111827] rounded-2xl shadow-sm dark:shadow-black/30 hover:shadow-xl dark:hover:shadow-black/60 ring-1 ring-gray-100 dark:ring-white/5 hover:ring-gray-200 dark:hover:ring-white/15 transition-all duration-300 overflow-hidden hover:-translate-y-1"
    >
      <div className="aspect-[16/10] overflow-hidden relative bg-gray-100 dark:bg-[#0B0F1A]">
        {hasImage ? (
          <>
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              fill
              className="object-cover group-hover:scale-[1.06] transition-transform duration-[600ms] ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </>
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${
              categoryBgGradients[frontmatter.category] ||
              "from-gray-500 to-gray-700"
            } flex items-center justify-center p-6 relative`}
          >
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:18px_18px]" />
            <span className="relative text-white font-bold text-lg text-center leading-tight line-clamp-3 drop-shadow">
              {frontmatter.title}
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm ${badgeClass}`}
          >
            {frontmatter.category}
          </span>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <h3 className="text-lg md:text-[1.15rem] font-bold text-[#1a1a2e] dark:text-white mb-2 group-hover:text-[#f57c51] transition-colors line-clamp-2 leading-snug">
          {frontmatter.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
          {frontmatter.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 pt-3 border-t border-gray-100 dark:border-white/10">
          <time dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString(
              locale === "en" ? "en-US" : "el-GR",
              { year: "numeric", month: "short", day: "numeric" }
            )}
          </time>
          <span className="inline-flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {readingTime} {locale === "en" ? "min" : "λεπτά"}
          </span>
        </div>
      </div>
    </Link>
  );
}
