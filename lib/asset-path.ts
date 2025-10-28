// Helper para construir caminhos de assets que funcionem no GitHub Pages
export const assetPrefix =
  process.env.NODE_ENV === "production" ? "/SitePortifolio" : "";

export function asset(path: string) {
  // garante a / no início e prefixa quando necessário
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${assetPrefix}${clean}`;
}
