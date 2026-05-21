import { notFound } from "next/navigation";
import { ExpressCheckout } from "@/components/inbound/dawn/ExpressCheckout";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export const metadata = {
  title: "Checkout | SPRAY",
};

export default async function InboundCheckoutPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  return <ExpressCheckout />;
}
