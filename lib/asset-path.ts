const BASE = process.env.NODE_ENV === "production" ? "/SitePortifolio" : "";

export function asset(path: string) {
  if (!path) return "";
  const clean = path.startsWith("/") ? path : `/${path}`;

  if (BASE && clean.startsWith(`${BASE}/`)) return clean;

  // Se for URL absoluta (http/https), não mexe
  if (/^https?:\/\//i.test(clean)) return clean;

  return `${BASE}${clean}`;
}

export const assetPrefix = BASE;
