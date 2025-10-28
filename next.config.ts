// next.config.ts
const isProd = process.env.NODE_ENV === "production";
const repo = "SitePortifolio"; // <- exatamente como no GitHub

const nextConfig = {
  /** Exporta HTML estático para o GitHub Pages */
  output: "export",

  /** next/image precisa ser desativado para export estático */
  images: { unoptimized: true },

  /** Base do site quando publicado como "project site" */
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",

  /** Evita 404 no Pages quando não há servidor */
  trailingSlash: true,
};

export default nextConfig;
