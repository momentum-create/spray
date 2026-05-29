import { notFound } from "next/navigation";
import { ProductPageView } from "@/components/inbound/dawn/ProductPageView";
import { getAllShopProductSlugs, getShopProduct } from "@/content/inbound/shop-product";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return getAllShopProductSlugs().map((slug) => ({ locale: "en", slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getShopProduct(slug);
  if (!product) return {};
  return { title: `${product.name} | SPRAY` };
}

export default async function ShopProductPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  const product = getShopProduct(slug);
  if (!product) notFound();

  return <ProductPageView product={product} />;
}
