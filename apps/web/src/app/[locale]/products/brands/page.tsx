import { redirect, notFound } from "next/navigation";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function ShopBrandsPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  redirect("/en/products/categories");
}