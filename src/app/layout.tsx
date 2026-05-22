import { ReactNode } from "react";
import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourblog.com"), // 替换为你的实际域名
  title: {
    default: "个人博客 - 技术分享与成长",
    template: "%s | 个人博客",
  },
  description: "一个专注于技术分享与个人成长的博客",
  keywords: ["技术", "博客", "成长", "编程"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "个人博客 - 技术分享与成长",
    description: "一个专注于技术分享与个人成长的博客",
    url: "https://yourblog.com",
    siteName: "个人博客",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "个人博客 - 技术分享与成长",
    description: "一个专注于技术分享与个人成长的博客",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==='light')document.documentElement.classList.add('light')}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
