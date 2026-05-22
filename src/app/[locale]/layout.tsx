import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, Locale } from "@/lib/i18n";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";

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
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
