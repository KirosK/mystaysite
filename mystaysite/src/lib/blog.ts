import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_BASE = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  dateModified?: string;
  category: string;
  excerpt: string;
  keywords: string[];
  image: string;
  author: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: number;
}

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function getBlogDir(locale?: string): string {
  if (locale === "en") {
    const enDir = path.join(BLOG_BASE, "en");
    if (fs.existsSync(enDir)) return enDir;
  }
  return BLOG_BASE;
}

export function getAllPosts(locale?: string): Post[] {
  const dir = getBlogDir(locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      frontmatter: data as PostFrontmatter,
      content,
      readingTime: calculateReadingTime(content),
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getPostBySlug(slug: string, locale?: string): Post | null {
  if (locale === "en") {
    const enDir = path.join(BLOG_BASE, "en");
    if (fs.existsSync(enDir)) {
      const enPost = readPostFromDir(enDir, slug);
      if (enPost) return enPost;
    }
  }
  return readPostFromDir(BLOG_BASE, slug);
}

function readPostFromDir(dir: string, slug: string): Post | null {
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))
    : [];

  for (const filename of files) {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    if ((data as PostFrontmatter).slug === slug) {
      return {
        frontmatter: data as PostFrontmatter,
        content,
        readingTime: calculateReadingTime(content),
      };
    }
  }
  return null;
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3,
  locale?: string
): Post[] {
  const posts = getAllPosts(locale);
  return posts
    .filter(
      (p) =>
        p.frontmatter.slug !== currentSlug &&
        p.frontmatter.category === category
    )
    .slice(0, limit);
}

export function getAllSlugs(locale?: string): string[] {
  return getAllPosts(locale).map((p) => p.frontmatter.slug);
}
