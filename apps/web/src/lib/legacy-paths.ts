import { brandSlugs } from "@/content/brands";

/** 旧 spray166.com URL → 新サイトパス（locale プレフィックスなし） */
export const legacyPathRedirects: Record<string, string> = {
  "/aircraft": "/skatepark",
  "/board-maintenance": "/maintenance",
  "/service/board-maintenance": "/maintenance",
  "/service": "/maintenance",
  "/contact": "/about/access",
  "/blog": "/news",
  "/page-99": "/brands",
  "/online-shop": "/shop",
  "/about": "/about/story",
  "/gallery": "/skatepark/facility",
};

/** portfolio-item 旧 slug → 新 brands slug（エイリアス含む） */
export const portfolioSlugRedirects: Record<string, string> = {
  "ak-rogo": "ak-rogo",
  ak: "ak-rogo",
  volcom: "volcom",
  burton: "burton",
  green: "green",
  "green-clothing": "green",
  oakley: "oakley",
  northface: "northface",
  "the-north-face": "northface",
  "north-face": "northface",
  "tj-brand": "tj-brand",
  tjbrand: "tj-brand",
  chumslogo: "chumslogo",
  chums: "chumslogo",
  patagonia: "patagonia",
  prism: "prism",
  union: "union",
  vicroy: "vicroy",
  salomon: "salomon",
  msr: "msr",
  lade: "lade",
  loaded: "lade",
  korua: "korua",
  hid: "hid",
  gentem: "gentem",
  hestra: "hestra",
  fieldearth: "fieldearth",
  "field-earth": "fieldearth",
  dice: "dice",
  deeluxe: "deeluxe",
};

const PORTFOLIO_RE = /^\/portfolio-item\/([^/]+)\/?$/;
const knownBrandSlugs = new Set(brandSlugs);

export function resolveLegacyPath(pathname: string): string | null {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const exact = legacyPathRedirects[normalized];
  if (exact) return exact;

  const portfolioMatch = normalized.match(PORTFOLIO_RE);
  if (portfolioMatch) {
    const oldSlug = portfolioMatch[1];
    const newSlug = portfolioSlugRedirects[oldSlug] ?? oldSlug;
    if (knownBrandSlugs.has(newSlug)) return `/brands/${newSlug}`;
    return "/brands";
  }

  return null;
}
