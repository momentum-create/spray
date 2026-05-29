import { notFound } from "next/navigation";
import { DawnShopHome } from "@/components/inbound/dawn/DawnShopHome";
import { DawnSmoothScroll } from "@/components/inbound/dawn/DawnSmoothScroll";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function ShopHomePage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  return (
    <DawnSmoothScroll>
      <DawnShopHome />
    </DawnSmoothScroll>
  );
}
