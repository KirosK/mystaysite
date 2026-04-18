"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/BlogCard";
import type { Post } from "@/lib/blog";

interface BlogGridProps {
  posts: Post[];
  locale: string;
}

export default function BlogGrid({ posts, locale }: BlogGridProps) {
  const isEn = locale === "en";
  const [active, setActive] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => set.add(p.frontmatter.category));
    return Array.from(set);
  }, [posts]);

  const allLabel = isEn ? "All" : "Όλα";
  const filtered =
    active === "all"
      ? posts
      : posts.filter((p) => p.frontmatter.category === active);

  const categoryLabels: Record<string, { el: string; en: string }> = {
    SEO: { el: "SEO", en: "SEO" },
    Marketing: { el: "Marketing", en: "Marketing" },
    Tips: { el: "Tips", en: "Tips" },
    "Case Studies": { el: "Case Studies", en: "Case Studies" },
  };

  const pillBase =
    "px-4 py-2 rounded-full text-sm font-semibold transition-all border cursor-pointer";
  const pillActive =
    "bg-[#1a1a2e] dark:bg-white text-white dark:text-[#0B0F1A] border-[#1a1a2e] dark:border-white shadow-sm";
  const pillInactive =
    "bg-white dark:bg-[#111827] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/25 hover:text-[#1a1a2e] dark:hover:text-white";

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActive("all")}
          className={`${pillBase} ${active === "all" ? pillActive : pillInactive}`}
        >
          {allLabel}
          <span className="ml-2 text-xs opacity-70">{posts.length}</span>
        </button>
        {categories.map((cat) => {
          const count = posts.filter((p) => p.frontmatter.category === cat).length;
          const label = categoryLabels[cat]
            ? isEn
              ? categoryLabels[cat].en
              : categoryLabels[cat].el
            : cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`${pillBase} ${active === cat ? pillActive : pillInactive}`}
            >
              {label}
              <span className="ml-2 text-xs opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-20">
          {isEn
            ? "No articles in this category yet."
            : "Δεν υπάρχουν ακόμα άρθρα σε αυτή την κατηγορία."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((post, i) => (
            <div key={post.frontmatter.slug} className="contents">
              <BlogCard post={post} locale={locale} />
              {i === 2 && filtered.length > 3 && (
                <div className="md:col-span-2 lg:col-span-3 rounded-2xl bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4e] p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {isEn
                        ? "Want more bookings?"
                        : "Θέλετε περισσότερες κρατήσεις;"}
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">
                      {isEn
                        ? "See how we can help you with a professional website."
                        : "Δείτε πώς μπορούμε να σας βοηθήσουμε με ένα επαγγελματικό website."}
                    </p>
                  </div>
                  <a
                    href={`/${locale}#contact`}
                    className="shrink-0 bg-[#f57c51] hover:bg-[#e06a42] text-white font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    {isEn ? "Get a Quote" : "Ζητήστε Προσφορά"}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
