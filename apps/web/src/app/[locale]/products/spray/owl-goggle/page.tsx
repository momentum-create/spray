import { notFound } from "next/navigation";
import { OwlGoggleView } from "@/components/inbound/dawn/OwlGoggleView";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export const metadata = {
  title: "SPRAY × OWL Original Goggles — Pre-order | SPRAY",
  description:
    "Pre-order SPRAY × OWL Flow and Vent goggles with Ainu Logo White strap. ¥25,000 tax incl. Add to cart and checkout at SPRAY Asahikawa.",
};

export default async function OwlGoggleProductPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  return <OwlGoggleView />;
}
