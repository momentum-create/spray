import { catalogJsonBySlug } from "@/content/inbound/catalog-data";
import { inboundProducts } from "@/content/inbound/products.en";
import { shopCategoryRegistry } from "@/content/inbound/shop-categories.registry";
import {
  getSnowboardBrandsWithStock,
  snowboardCategory,
  snowboardProducts,
} from "@/content/inbound/snowboard-catalog.en";

export type ShopOpsCategoryRow = {
  slug: string;
  title: string;
  titleJa: string;
  makeshopCode: string;
  productCount: number;
  imageCount: number;
  missingImages: number;
  brandCount: number;
  officialUrl: string;
  sitePath: string;
};

export type ShopOpsReport = {
  generatedAt: string;
  totalSiteProducts: number;
  totalCatalogProducts: number;
  totalWithImages: number;
  totalMissingImages: number;
  categories: ShopOpsCategoryRow[];
};

function countJsonImages(file: (typeof catalogJsonBySlug)[string]): number {
  return file.products.filter((p) => Boolean(file.images[p.makeshopId]?.primary)).length;
}

export function getShopOpsReport(): ShopOpsReport {
  const categories: ShopOpsCategoryRow[] = shopCategoryRegistry.map((def) => {
    if (def.slug === "snowboard") {
      const imageCount = snowboardProducts.filter((p) => p.imageUrl).length;
      return {
        slug: def.slug,
        title: snowboardCategory.title,
        titleJa: def.titleJa,
        makeshopCode: def.makeshopCode,
        productCount: snowboardProducts.length,
        imageCount,
        missingImages: snowboardProducts.length - imageCount,
        brandCount: getSnowboardBrandsWithStock().length,
        officialUrl: snowboardCategory.shopCategoryUrl,
        sitePath: `/en/products/categories/${def.slug}`,
      };
    }

    const file = catalogJsonBySlug[def.slug];
    const productCount = file?.products.length ?? 0;
    const imageCount = file ? countJsonImages(file) : 0;

    return {
      slug: def.slug,
      title: file?.category.title ?? def.title,
      titleJa: def.titleJa,
      makeshopCode: def.makeshopCode,
      productCount,
      imageCount,
      missingImages: productCount - imageCount,
      brandCount: file?.brands.length ?? 0,
      officialUrl:
        file?.category.shopCategoryUrl ??
        `https://www.spray166.shop/shopbrand/${def.makeshopCode}/`,
      sitePath: `/en/products/categories/${def.slug}`,
    };
  });

  const totalCatalogProducts = categories.reduce((n, c) => n + c.productCount, 0);
  const totalWithImages = categories.reduce((n, c) => n + c.imageCount, 0);

  return {
    generatedAt: new Date().toISOString(),
    totalSiteProducts: totalCatalogProducts + inboundProducts.length,
    totalCatalogProducts,
    totalWithImages,
    totalMissingImages: totalCatalogProducts - totalWithImages,
    categories: categories.sort((a, b) => a.title.localeCompare(b.title)),
  };
}

export const shopOpsCommands = {
  fullSync: "npm run fetch-catalogs",
  quickSync: "npm run fetch-catalogs:quick",
  categoryWithImages: "node scripts/fetch-category-catalog.mjs ct299 --images",
  categoryOnly: "node scripts/fetch-category-catalog.mjs gloves",
  imagesOnly: "node scripts/fetch-category-catalog.mjs --all --images-only",
  dev: "npm run dev",
  build: "npm run build",
  devClean: "npm run dev:clean",
} as const;

export const shopOpsSourceFiles = [
  {
    path: "apps/web/scripts/fetch-category-catalog.mjs",
    note: "スクレイパー（公式ストア → JSON）",
  },
  {
    path: "apps/web/src/content/inbound/shop-categories.registry.ts",
    note: "カテゴリ一覧の定義",
  },
  {
    path: "apps/web/src/content/inbound/catalog-data.ts",
    note: "JSON の import（新カテゴリ時に1行追加）",
  },
  {
    path: "apps/web/src/content/inbound/snowboard-catalog.en.ts",
    note: "スノーボードのみ手入れカタログ",
  },
] as const;
