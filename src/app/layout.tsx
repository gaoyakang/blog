import { ReactNode } from "react";
import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourblog.com"), // 替换为你的实际域名
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
