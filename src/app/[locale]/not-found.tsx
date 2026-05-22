"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const locale = useLocale();
  const pathname = usePathname();

  // 提取slug
  const slugMatch = pathname.match(/\/posts\/([^/]+)$/);
  const slug = slugMatch?.[1];

  // 计算反向路径
  const otherLocale = locale === "zh" ? "en" : "zh";
  const originalPath = slug ? `/${otherLocale}/posts/${slug}` : `/${otherLocale}`;

  return (
    <div className="pt-6 pb-24 max-w-2xl mx-auto">
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
      </nav>

      <div className="border-b border-[var(--border)] mb-8" />

      <div className="text-center py-12">
        <h1 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">
          Oops!
        </h1>
        <p className="text-sm mb-6 text-[var(--text-secondary)]">
          {locale === "zh" 
            ? "博主还未创建对应版本的博客" 
            : "The author hasn't created this version yet"}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={originalPath}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--border)] transition-colors text-[var(--text-primary)] text-sm"
          >
            {locale === "zh" ? "返回英文博客" : "Go back to Chinese post"}
          </Link>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-secondary)] text-sm"
          >
            {locale === "zh" ? "返回首页" : "Back to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
