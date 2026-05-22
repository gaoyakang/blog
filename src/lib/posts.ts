import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface PostFrontmatter {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  [key: string]: unknown;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export async function getPostSlugs(locale: string): Promise<string[]> {
  const dir = path.join(CONTENT_DIR, locale);

  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(".mdx", ""))
      .sort((a, b) => b.localeCompare(a));
  } catch {
    return [];
  }
}

export async function getPost(
  locale: string,
  slug: string,
): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      frontmatter: {
        title: String(data.title || slug),
        date: String(data.date || new Date().toISOString()),
        summary: data.summary ? String(data.summary) : "",
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      },
      content,
    };
  } catch {
    return null;
  }
}
