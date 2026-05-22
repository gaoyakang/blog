import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./src/lib/i18n";

export default createMiddleware({
  defaultLocale,
  locales,
  localeDetection: false, // 禁用自动语言检测，强制默认 en
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
