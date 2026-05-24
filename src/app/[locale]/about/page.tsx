import { setRequestLocale } from "next-intl/server";
import { AboutContent } from "@/components/content/AboutContent";
import { Metadata } from "next";
import { locales } from "@/lib/i18n";

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about me and this blog",
};

// 🔥 关键：预生成所有语言版本
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 🔥 关键：启用静态渲染
  setRequestLocale(locale);

  await delay(2000);

  return <AboutContent />;
}