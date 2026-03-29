import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  SEO: "bg-blue-100 text-blue-700",
  Marketing: "bg-purple-100 text-purple-700",
  "Case Studies": "bg-green-100 text-green-700",
  Tips: "bg-amber-100 text-amber-700",
};

const categoryBgGradients: Record<string, string> = {
  SEO: "from-blue-500 to-blue-700",
  Marketing: "from-purple-500 to-purple-700",
  "Case Studies": "from-green-500 to-green-700",
  Tips: "from-amber-500 to-amber-600",
};

export default function BlogCard({ post, locale }: { post: Post; locale?: string }) {
  const { frontmatter, readingTime } = post;
  const colorClass =
    categoryColors[frontmatter.category] || "bg-gray-100 text-gray-700";
  const hasImage = frontmatter.image && frontmatter.image.length > 0;
  const prefix = locale ? `/${locale}` : "";

  return (
    <Link
      href={`${prefix}/blog/${frontmatter.slug}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="aspect-[16/9] overflow-hidden relative">
        {hasImage ? (
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${categoryBgGradients[frontmatter.category] || "from-gray-500 to-gray-700"} flex items-center justify-center p-6`}>
            <span className="text-white/90 font-bold text-lg text-center leading-tight line-clamp-3">
              {frontmatter.title}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}
          >
            {frontmatter.category}
          </span>
          <span className="text-xs text-gray-400">
            {readingTime} {locale === "en" ? "min read" : "λεπτά ανάγνωση"}
          </span>
        </div>
        <h3 className="text-lg font-bold text-[#1a1a2e] mb-2 group-hover:text-[#f57c51] transition-colors line-clamp-2">
          {frontmatter.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {frontmatter.excerpt}
        </p>
        <div className="text-xs text-gray-400">
          {new Date(frontmatter.date).toLocaleDateString(locale === "en" ? "en-US" : "el-GR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </Link>
  );
}
