import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
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

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
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

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.frontmatter.slug === slug) ?? null;
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3
): Post[] {
  const posts = getAllPosts();
  return posts
    .filter(
      (p) =>
        p.frontmatter.slug !== currentSlug &&
        p.frontmatter.category === category
    )
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.frontmatter.slug);
}
