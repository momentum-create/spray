import { notFound } from "next/navigation";
import { CategoryBrandCatalogView } from "@/components/inbound/dawn/CategoryBrandCatalogView";
import {
  getAllCategorySlugs,
  getCategoryBrand,
  getCategoryBrands,
} from "@/content/inbound/shop-catalog";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = {
  params: Promise<{ locale: string; category: string; brandSlug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; category: string; brandSlug: string }[] = [];
  for (const category of getAllCategorySlugs()) {
    for (const brand of getCategoryBrands(category)) {
      params.push({ locale: "en", category, brandSlug: brand.slug });
    }
  }
  return params;
}

export default async function CategoryBrandPage({ params }: PageProps) {
  const { category, brandSlug } = await params;
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  const brand = getCategoryBrand(category, brandSlug);
  if (!brand) notFound();

  return (
    <CategoryBrandCatalogView
      categorySlug={category}
      brandSlug={brandSlug}
      pocCollectionHref={
        category === "snowboard" && brandSlug === "gentemstick"
          ? "/en/products/gentemstick"
          : undefined
      }
      pocCollectionLabel={
        category === "snowboard" && brandSlug === "gentemstick"
          ? "Open GENTEMSTICK demo shop (cart & checkout)"
          : undefined
      }
    />
  );
}
