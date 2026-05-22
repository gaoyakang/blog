import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "./src/lib/i18n";

export default getRequestConfig(async ({ locale }) => {
  // 确保 locale 是有效的
  if (!locale || !locales.includes(locale as typeof locales[number])) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./src/messages/${locale}.json`)).default,
  };
});
