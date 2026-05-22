import { getPost } from "@/lib/posts";
import { MDXContentWithLightbox } from "@/components/content/MDXContentWithLightbox";
import { TableOfContents } from "@/components/content/TableOfContents";
import { PostViews } from "@/components/content/PostViews";
import { BackToTop } from "@/components/content/BackToTop";
import { extractToc } from "@/lib/extract-toc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);

  if (!post) {
    return {};
  }

  const title = post.frontmatter.title;
  const description = post.frontmatter.summary || (locale === "zh" ? "技术博客文章" : "Tech blog article");

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "article",
      publishedTime: post.frontmatter.date,
    },
    twitter: {
      card: "summary",
      title: title,
      description: description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);

  if (!post) {
    notFound();
  }

  const date = new Date(post.frontmatter.date).toLocaleDateString(
    locale === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const tocItems = extractToc(post.content);

  return (
    <article className="pt-6 pb-24 w-full">
      {/* 三栏布局容器 */}
      <div className="flex gap-0">
        {/* 左侧目录区域 */}
        <div className="hidden lg:block w-48 flex-shrink-0">
          <div className="sticky top-40">
            <TableOfContents items={tocItems} />
          </div>
        </div>

        {/* 中间内容区域 */}
        <div className="flex-1 max-w-2xl mx-auto w-full">
          {/* 顶部导航 */}
          <nav className="flex items-center justify-between mb-4">
            <Link
              href={`/${locale}`}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label={locale === "zh" ? "返回" : "Back"}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 14 4 9l5-5M4 9h11a5 5 0 015 5v1"
                />
              </svg>
            </Link>
            <span className="text-sm text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-2">
              Blog
            </span>
          </nav>

          {/* 横向分割线 */}
          <div className="border-b border-[var(--border)] mb-8" />

          {/* 标题区 */}
          <header className="mb-16">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 text-[var(--text-primary)]">
              {post.frontmatter.title}
            </h1>
            <div className="flex items-center gap-4">
              <time className="text-[13px] text-[var(--text-secondary)]">{date}</time>
              <PostViews slug={slug} />
            </div>
          </header>

          {/* 文章内容 */}
          <div className="prose-custom">
            <MDXContentWithLightbox content={post.content} />
          </div>
        </div>

        {/* 右侧空区域 */}
        <div className="hidden lg:block w-48 flex-shrink-0" />
      </div>
      <BackToTop />
    </article>
  );
}
