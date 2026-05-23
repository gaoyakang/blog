import { setRequestLocale } from "next-intl/server";
import { PostList } from "@/components/posts/PostList";
import { locales } from "@/lib/i18n";

// 🔥 关键：预生成所有语言版本
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 🔥 关键：启用静态渲染
  setRequestLocale(locale);

  return (
    <div className="pt-0 max-w-2xl mx-auto w-full">
      <PostList locale={locale} />
    </div>
  );
}