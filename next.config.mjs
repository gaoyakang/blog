import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "*.qiniudn.com" },
      { protocol: "https", hostname: "*.qiniu.com" },
    ],
  },
  
  // ========== 新增：控制 chunk 大小，减少小文件 ==========
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          // 合并 vendor 库
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
            minChunks: 2,
          },
          // 合并小 chunk
          default: {
            minSize: 30000,      // 小于 30KB 不单独打包（原来是 20KB）
            maxSize: 250000,     // 最大 250KB
          },
        },
      };
    }
    return config;
  },
};

// 先包 next-intl，再包 bundle-analyzer
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withAnalyzer(withNextIntl(nextConfig));