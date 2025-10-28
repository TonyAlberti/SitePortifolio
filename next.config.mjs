// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/SitePortifolio",
  assetPrefix: "/SitePortifolio/",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
