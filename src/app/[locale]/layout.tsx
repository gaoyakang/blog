import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { locales, Locale } from "@/lib/i18n";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Header } from "@/components/layout/Header";

// 🔥 关键：预生成所有语言版本
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  const t = (key: string) => {
    const parts = key.split(".");
    let value: any = messages;
    for (const part of parts) {
      if (value && typeof value === "object" && part in value) {
        value = value[part];
      } else {
        return key;
      }
    }
    return value;
  };

  return {
    title: {
      default: t("metadata.title"),
      template: t("metadata.titleTemplate"),
    },
    description: t("metadata.description"),
    keywords: t("metadata.keywords").split(", "),
    authors: [{ name: "Your Name" }],
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      siteName: t("metadata.siteName"),
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("metadata.title"),
      description: t("metadata.description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // 🔥 关键：启用静态渲染
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
          <Header />
          <main className="flex-1 w-full max-w-4xl lg:max-w-6xl mx-auto px-5 sm:px-8 pt-14 sm:pt-16 pb-16">
            {children}
          </main>
        </div>
        <GoogleAnalytics />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}