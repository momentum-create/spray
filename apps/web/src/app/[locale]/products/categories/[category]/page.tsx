import { notFound } from "next/navigation";
import { CategoryCatalogView } from "@/components/inbound/dawn/CategoryCatalogView";
import { getAllCategorySlugs, getCategoryMeta } from "@/content/inbound/shop-catalog";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string; category: string }> };

export async function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ locale: "en", category }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const meta = getCategoryMeta(category);
  if (!meta) return {};
  return { title: `${meta.title} | SPRAY Shop` };
}

export default async function ShopCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  const meta = getCategoryMeta(category);
  if (!meta) notFound();

  return <CategoryCatalogView categorySlug={category} />;
}
