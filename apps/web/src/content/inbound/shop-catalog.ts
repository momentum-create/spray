import { catalogJsonBySlug, type CatalogFile } from "@/content/inbound/catalog-data";
import { getCategoryDef, shopCategoryRegistry } from "@/content/inbound/shop-categories.registry";

export type CatalogBrand = {
  slug: string;
  name: string;
  shopBrandUrl: string;
  productCount: number;
};

export type CatalogProductRaw = {
  slug: string;
  makeshopId: string;
  brandSlug: string;
  name: string;
  priceJpy: number;
  shopUrl: string;
  updatedAt?: string;
};

export type CatalogProduct = CatalogProductRaw & {
  brand: string;
  imageUrl: string;
  imageGallery: string[];
  description: string;
  categorySlug: string;
  categoryTitle: string;
};

export type CategoryCatalogMeta = {
  slug: string;
  title: string;
  titleJa: string;
  makeshopCode: string;
  shopCategoryUrl: string;
  totalProducts: number;
};

function catalogFileBySlug(slug: string): CatalogFile | undefined {
  return catalogJsonBySlug[slug];
}

function enrichJsonProduct(raw: CatalogProductRaw, file: CatalogFile): CatalogProduct {
  const imgs = file.images[raw.makeshopId];
  const imageUrl = imgs?.primary ?? "";
  const imageGallery =
    imgs?.gallery && imgs.gallery.length > 0 ? imgs.gallery : imageUrl ? [imageUrl] : [];
  const brand = file.brands.find((b) => b.slug === raw.brandSlug)?.name ?? raw.brandSlug;

  return {
    ...raw,
    brand,
    imageUrl,
    imageGallery,
    categorySlug: file.category.slug,
    categoryTitle: file.category.title,
    description: `${raw.name}. Available at SPRAY official store (spray166.shop). Tax included.`,
  };
}

export function getAllCategorySlugs(): string[] {
  return shopCategoryRegistry.map((c) => c.slug);
}

export function getCategoryMeta(slug: string): CategoryCatalogMeta | undefined {
  return catalogFileBySlug(slug)?.category;
}

export function getCategoryBrands(slug: string): CatalogBrand[] {
  const file = catalogFileBySlug(slug);
  if (!file) return [];
  return file.brands.filter((b) => b.productCount > 0 || file.products.some((p) => p.brandSlug === b.slug));
}

export function getCategoryProducts(slug: string): CatalogProduct[] {
  const file = catalogFileBySlug(slug);
  if (!file) return [];
  return file.products.map((p) => enrichJsonProduct(p, file));
}

export function getCategoryBrand(slug: string, brandSlug: string): CatalogBrand | undefined {
  return getCategoryBrands(slug).find((b) => b.slug === brandSlug);
}

export function getCategoryProductsByBrand(slug: string, brandSlug: string): CatalogProduct[] {
  return getCategoryProducts(slug).filter((p) => p.brandSlug === brandSlug);
}

export function getCatalogProduct(slug: string): CatalogProduct | undefined {
  for (const def of shopCategoryRegistry) {
    const file = catalogFileBySlug(def.slug);
    if (!file) continue;
    const raw = file.products.find((p) => p.slug === slug);
    if (raw) return enrichJsonProduct(raw, file);
  }
  return undefined;
}

export function getAllCatalogProductSlugs(): string[] {
  return shopCategoryRegistry.flatMap(
    (c) => catalogFileBySlug(c.slug)?.products.map((p) => p.slug) ?? [],
  );
}

/** spray166.shop 同期カタログ — 直近更新（updatedAt）順、画像あり */
export function getOfficialStoreNewArrivals(limit = 3): CatalogProduct[] {
  const all = shopCategoryRegistry.flatMap((def) => getCategoryProducts(def.slug));
  return all
    .filter((p) => p.imageUrl)
    .sort((a, b) => {
      const byUpdated = (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "");
      if (byUpdated !== 0) return byUpdated;
      return b.makeshopId.localeCompare(a.makeshopId);
    })
    .slice(0, limit);
}

export function getEnglishShopProductPath(slug: string): string {
  return `/en/products/${slug}`;
}

export function formatCatalogPriceJpy(priceJpy: number, locale: "ja" | "en"): string {
  if (locale === "ja") return `¥${priceJpy.toLocaleString("ja-JP")}`;
  return `¥${priceJpy.toLocaleString("en-US")}`;
}

export function categoryBrandPath(categorySlug: string, brandSlug: string): string {
  return `/en/products/categories/${categorySlug}/brands/${brandSlug}`;
}

export function categoryPath(categorySlug: string): string {
  return `/en/products/categories/${categorySlug}`;
}

export function getCategorySummary(slug: string): {
  slug: string;
  title: string;
  productCount: number;
  brandCount: number;
} | null {
  const meta = getCategoryMeta(slug);
  if (!meta) {
    const def = getCategoryDef(slug);
    if (!def) return null;
    const file = catalogFileBySlug(slug);
    return {
      slug,
      title: def.title,
      productCount: file?.products.length ?? 0,
      brandCount: file?.brands.length ?? 0,
    };
  }
  return {
    slug,
    title: meta.title,
    productCount: meta.totalProducts,
    brandCount: getCategoryBrands(slug).length,
  };
}
