// next.config.mjs
const isProd = process.env.NODE_ENV === "production";
const repo = "SitePortifolio"; // Nome idêntico ao do seu repositório no GitHub

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
