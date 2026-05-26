"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Avatar } from "./Avatar";

export function AboutContent() {
  const t = useTranslations("about");

  return (
    <div className="pt-8 pb-24 max-w-2xl mx-auto">
      {/* 头像和基本信息 */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12">
        <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[var(--border)] bg-[var(--bg-secondary)]">
          <Avatar alt={t("greeting")} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">
            {t("greeting")}
          </h2>
          <p className="text-[var(--text-body)] mb-4 text-sm">{t("bio")}</p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </Link>
            <Link
              href="mailto:gao2nuo@gmail.com"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              gao2nuo@gmail.com
            </Link>
          </div>
        </div>
      </div>

      {/* 课程介绍 */}
      <div className="mb-12">
        <h3 className="text-base font-semibold mb-4 text-[var(--text-primary)]">
          {t("coursesTitle")}
        </h3>
        <div className="space-y-3">
          <Link
            href="https://www.51zxw.net/List.aspx?cid=733"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--text-secondary)] transition-colors"
          >
            <h4 className="font-medium mb-1 text-[var(--text-primary)] text-sm">
              {t("course1Title")}
            </h4>
            <p className="text-[var(--text-body)] text-xs">
              {t("course1Desc")}
            </p>
          </Link>
          <Link
            href="https://www.51zxw.net/List.aspx?cid=1324"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--text-secondary)] transition-colors"
          >
            <h4 className="font-medium mb-1 text-[var(--text-primary)] text-sm">
              {t("course2Title")}
            </h4>
            <p className="text-[var(--text-body)] text-xs">
              {t("course2Desc")}
            </p>
          </Link>
        </div>
      </div>

      {/* 项目介绍 */}
      <div className="mb-12">
        <h3 className="text-base font-semibold mb-4 text-[var(--text-primary)]">
          {t("projectsTitle")}
        </h3>
        <div className="space-y-3 mb-3">
          <Link
            href="https://github.com/gaoyakang/online_logisim"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--text-secondary)] transition-colors"
          >
            <h4 className="font-medium mb-1 text-[var(--text-primary)] text-sm">
              {t("project2Title")}
            </h4>
            <p className="text-[var(--text-body)] text-xs">
              {t("project2Desc")}
            </p>
          </Link>
        </div>
        <div className="space-y-3 mb-3">
          <Link
            href="https://github.com/gaoyakang/electron-react-tpl"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--text-secondary)] transition-colors"
          >
            <h4 className="font-medium mb-1 text-[var(--text-primary)] text-sm">
              {t("project1Title")}
            </h4>
            <p className="text-[var(--text-body)] text-xs">
              {t("project1Desc")}
            </p>
          </Link>
        </div>
        <div className="space-y-3">
          <Link
            href="https://github.com/gaoyakang/Goofish_Chat_Bot"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--text-secondary)] transition-colors"
          >
            <h4 className="font-medium mb-1 text-[var(--text-primary)] text-sm">
              {t("project3Title")}
            </h4>
            <p className="text-[var(--text-body)] text-xs">
              {t("project3Desc")}
            </p>
          </Link>
        </div>
      </div>

      {/* 关于博客 */}
      <div>
        <h3 className="text-base font-semibold mb-3 text-[var(--text-primary)]">
          <Link
            href="/"
            className="hover:text-[var(--text-secondary)] transition-colors"
          >
            {t("blogTitle")}
          </Link>
        </h3>
        <p className="text-[var(--text-body)] mb-3 text-sm">{t("blogDesc1")}</p>
        <p className="text-[var(--text-body)] text-sm">{t("blogDesc2")}</p>
      </div>
    </div>
  );
}
