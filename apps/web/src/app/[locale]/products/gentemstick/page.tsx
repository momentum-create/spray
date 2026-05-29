import { notFound } from "next/navigation";
import { GentemCollectionView } from "@/components/inbound/dawn/GentemCollectionView";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function GentemCollectionPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  return <GentemCollectionView />;
}
