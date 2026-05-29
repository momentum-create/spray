import { categoryBrandPath, getCategoryBrands } from "@/content/inbound/shop-catalog";

/** Brand slug → collection path on the English shop (Dawn), snowboard legacy */
export function shopBrandPath(slug: string): string | null {
  const snowboardSlugs = getCategoryBrands("snowboard").map((b) => b.slug);
  if (snowboardSlugs.includes(slug)) {
    return categoryBrandPath("snowboard", slug);
  }
  return null;
}
