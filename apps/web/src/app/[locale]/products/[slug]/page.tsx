import { notFound } from "next/navigation";
import { ProductPageView } from "@/components/inbound/dawn/ProductPageView";
import { getInboundProduct, inboundProducts } from "@/content/inbound/products.en";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return inboundProducts.map((p) => ({ locale: "en", slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getInboundProduct(slug);
  if (!product) return {};
  return { title: `${product.name} | SPRAY` };
}

export default async function InboundProductPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  const product = getInboundProduct(slug);
  if (!product) notFound();

  return <ProductPageView product={product} />;
}
