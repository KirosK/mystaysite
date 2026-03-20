import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { mdxComponents } from "@/components/MDXComponents";
import BlogCTA from "@/components/BlogCTA";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { frontmatter } = post;
  const url = `https://mystaysite.com/blog/${frontmatter.slug}`;

  return {
    title: `${frontmatter.title} | MyStaySite Blog`,
    description: frontmatter.excerpt,
    keywords: frontmatter.keywords,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      url,
      type: "article",
      images: frontmatter.image
        ? [{ url: frontmatter.image, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.excerpt,
    },
    alternates: {
      canonical: url,
    },
  };
}

function extractHeadings(content: string): { id: string; text: string }[] {
  const regex = /^##\s+(.+)$/gm;
  const headings: { id: string; text: string }[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    headings.push({ id, text });
  }
  return headings;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;
  const headings = extractHeadings(content);
  const related = getRelatedPosts(frontmatter.slug, frontmatter.category);
  const url = `https://mystaysite.com/blog/${frontmatter.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    image: frontmatter.image
      ? `https://mystaysite.com${frontmatter.image}`
      : undefined,
    datePublished: frontmatter.date,
    author: {
      "@type": "Person",
      name: "Κύρος",
    },
    publisher: {
      "@type": "Organization",
      name: "MyStaySite",
      url: "https://mystaysite.com",
    },
    mainEntityOfPage: url,
  };

  return (
    <>
      {/* Navbar spacer */}
      <div className="h-16 md:h-18" />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#f57c51] transition-colors">
            Αρχική
          </Link>
          <span>/</span>
          <Link
            href="/blog"
            className="hover:text-[#f57c51] transition-colors"
          >
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-400 truncate">{frontmatter.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#f57c51]/10 text-[#f57c51]">
              {frontmatter.category}
            </span>
            <span className="text-sm text-gray-400">
              {readingTime} λεπτά ανάγνωση
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a2e] leading-tight mb-6">
            {frontmatter.title}
          </h1>

          {/* Author bar */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white font-bold text-sm">
              K
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1a1a2e]">
                Κύρος | MyStaySite
              </p>
              <p className="text-xs text-gray-400">
                {new Date(frontmatter.date).toLocaleDateString("el-GR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </header>

        {/* Featured image */}
        {frontmatter.image && (
          <div className="mb-10 rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={frontmatter.image}
              alt={frontmatter.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        )}

        {/* Table of contents */}
        <TableOfContents items={headings} />

        {/* Article body */}
        <div className="prose-custom">
          <MDXRemote source={content} components={mdxComponents} />
        </div>

        {/* Share */}
        <ShareButtons title={frontmatter.title} url={url} />

        {/* CTA */}
        <BlogCTA />

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">
              Σχετικά Άρθρα
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p) => (
                <BlogCard key={p.frontmatter.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </article>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
