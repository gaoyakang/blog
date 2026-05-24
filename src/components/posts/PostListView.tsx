"use client";

import { useState } from "react";
import type { Post } from "@/lib/posts";
import { LoadingLink } from "@/components/content/LoadingLink";

interface PostListViewProps {
  grouped: Record<string, Post[]>;
  years: string[];
  locale: string;
}

function PostRow({
  post,
  locale,
  hoveredSlug,
  onHover,
  isFirst,
}: {
  post: Post;
  locale: string;
  hoveredSlug: string | null;
  onHover: (slug: string) => void;
  isFirst?: boolean;
}) {
  const isHovered = hoveredSlug === post.slug;
  const isDimmed = hoveredSlug !== null && !isHovered;
  const date = new Date(post.frontmatter.date);
  const monthDay = `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;

  return (
    <article
      className={isFirst ? "pb-3.5" : "py-3.5"}
      onMouseEnter={() => onHover(post.slug)}
    >
      <LoadingLink href={`/${locale}/posts/${post.slug}`} className="block">
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3
              className={`text-base origin-left transition-all duration-200 ease-out ${
                isDimmed
                  ? "font-normal text-[var(--text-secondary)] scale-100"
                  : "font-semibold text-[var(--text-primary)]"
              } ${isHovered ? "scale-[1.03]" : "scale-100"}`}
            >
              {post.frontmatter.title}
            </h3>
            {post.frontmatter.summary && (
              <p
                className={`mt-1.5 text-sm line-clamp-1 transition-colors duration-200 ${
                  isDimmed
                    ? "text-[var(--text-secondary)]/70"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                {post.frontmatter.summary}
              </p>
            )}
          </div>
          <time
            className={`shrink-0 text-sm tabular-nums transition-colors duration-200 ${
              isDimmed
                ? "text-[var(--text-secondary)]/70"
                : "text-[var(--text-secondary)]"
            }`}
          >
            {monthDay}
          </time>
        </div>
      </LoadingLink>
    </article>
  );
}

export function PostListView({ grouped, years, locale }: PostListViewProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div onMouseLeave={() => setHoveredSlug(null)}>
      {years.map((year, index) => (
        <div
          key={year}
          className={
            index > 0 ? "border-t border-[var(--border)] mt-3 pt-3" : ""
          }
        >
          <div className="flex items-baseline gap-5 sm:gap-8">
            <span className="shrink-0 w-10 sm:w-11 text-sm text-[var(--text-secondary)]">
              {year}
            </span>

            <div className="flex-1 min-w-0">
              {grouped[year].map((post, postIndex) => (
                <PostRow
                  key={post.slug}
                  post={post}
                  locale={locale}
                  hoveredSlug={hoveredSlug}
                  onHover={setHoveredSlug}
                  isFirst={postIndex === 0}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
