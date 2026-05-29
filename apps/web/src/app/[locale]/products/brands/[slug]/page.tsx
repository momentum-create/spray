import { redirect, notFound } from "next/navigation";
import { categoryBrandPath, getCategoryBrands } from "@/content/inbound/shop-catalog";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export default async function ShopBrandPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  const snowboardBrand = getCategoryBrands("snowboard").find((b) => b.slug === slug);
  if (snowboardBrand) {
    redirect(categoryBrandPath("snowboard", slug));
  }

  notFound();
}
