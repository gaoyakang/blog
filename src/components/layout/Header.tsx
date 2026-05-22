"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export function Header() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const switchLocale = async () => {
    const newLocale = locale === "zh" ? "en" : "zh";
    
    // 构建新路径
    let newPath;
    const postMatch = pathname.match(/^\/[^/]+\/posts\/([^/]+)$/);
    
    if (postMatch) {
      const slug = postMatch[1];
      try {
        const res = await fetch(
          `/api/post-exists?locale=${newLocale}&slug=${encodeURIComponent(slug)}`,
        );
        const data = (await res.json()) as { exists?: boolean };
        if (data.exists) {
          newPath = `/${newLocale}/posts/${slug}`;
        } else {
          newPath = `/${newLocale}`;
        }
      } catch {
        newPath = `/${newLocale}`;
      }
    } else {
      // 替换当前 locale 为新 locale
      newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    }
    
    // 使用 window.location 来强制页面刷新，确保语言切换生效
    window.location.href = newPath;
  };

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-50 flex items-center gap-3">
      <button
        onClick={switchLocale}
        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        aria-label="Switch language"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      </button>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
