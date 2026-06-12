import records from "./records.json";
import type { BrandCategory, BrandRecord } from "./types";

export type { BrandCategory, BrandRecord };

export const brands: BrandRecord[] = records as BrandRecord[];

export const brandSlugs: string[] = brands.map((b) => b.slug);

const slugMap = new Map(brands.map((b) => [b.slug, b]));

export function getBrandBySlug(slug: string): BrandRecord | undefined {
  return slugMap.get(slug);
}

export function brandsByLetter(letter: string): BrandRecord[] {
  return brands.filter((b) => b.letter === letter);
}

export const brandLetters: string[] = [
  ...new Set(brands.map((b) => b.letter)),
].sort((a, b) => {
  if (a === "#") return 1;
  if (b === "#") return -1;
  return a.localeCompare(b);
});

/** @deprecated Use `brands` from this module. Shim for legacy imports. */
export const brandLogosCompat = brands.map((b) => ({
  name: b.nameJa,
  slug: b.slug,
  image: b.logo.src,
  sourceUrl: b.sourceUrl,
  shopUrl: b.mallLinks?.official,
}));
