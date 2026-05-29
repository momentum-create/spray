import type { InboundProduct } from "@/content/inbound/products.en";
import { getInboundProduct, inboundProducts } from "@/content/inbound/products.en";
import {
  categoryBrandPath,
  getAllCatalogProductSlugs,
  getCatalogProduct,
  type CatalogProduct,
} from "@/content/inbound/shop-catalog";

export type ShopProduct = {
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  priceJpy: number;
  imageUrl: string;
  imageGallery: string[];
  description: string;
  officialUrl: string;
  categorySlug: string;
  categoryTitle: string;
  series?: string;
  lengthMm?: number;
  badge?: string;
  soldOut?: boolean;
  reviewCount: number;
};

export function inboundToShopProduct(product: InboundProduct): ShopProduct {
  return {
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    brandSlug: "gentem",
    priceJpy: product.priceJpy,
    imageUrl: product.imageUrl,
    imageGallery: [product.imageUrl],
    description: product.description,
    officialUrl: product.officialUrl,
    categorySlug: "snowboard",
    categoryTitle: "Snowboards",
    series: product.series,
    lengthMm: product.lengthMm,
    badge: product.badge,
    soldOut: product.soldOut,
    reviewCount: product.reviewCount,
  };
}

export function catalogToShopProduct(product: CatalogProduct): ShopProduct {
  return {
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    brandSlug: product.brandSlug,
    priceJpy: product.priceJpy,
    imageUrl: product.imageUrl,
    imageGallery: product.imageGallery,
    description: product.description,
    officialUrl: product.shopUrl,
    categorySlug: product.categorySlug,
    categoryTitle: product.categoryTitle,
    reviewCount: 0,
  };
}

export function getShopProduct(slug: string): ShopProduct | undefined {
  const inbound = getInboundProduct(slug);
  if (inbound) return inboundToShopProduct(inbound);

  const catalog = getCatalogProduct(slug);
  if (catalog) return catalogToShopProduct(catalog);

  return undefined;
}

export function getShopBrandHref(product: ShopProduct): string {
  return categoryBrandPath(product.categorySlug, product.brandSlug);
}

export function getAllShopProductSlugs(): string[] {
  const inbound = inboundProducts.map((p) => p.slug);
  const catalog = getAllCatalogProductSlugs();
  return [...inbound, ...catalog];
}
