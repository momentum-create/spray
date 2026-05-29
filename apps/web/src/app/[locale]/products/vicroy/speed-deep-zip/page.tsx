import { notFound } from "next/navigation";
import { VicroySpeedDeepZipView } from "@/components/inbound/dawn/VicroySpeedDeepZipView";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export const metadata = {
  title: "SPEED DEEP ZIP 26-27 — VICROY Early Pre-order | SPRAY",
  description:
    "Limited early-release pre-order for VICROY SPEED DEEP ZIP 26-27 long-cuff gloves. Estimated delivery mid-November. Pick up at SPRAY Asahikawa.",
};

export default async function VicroySpeedDeepZipPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  return <VicroySpeedDeepZipView />;
}
