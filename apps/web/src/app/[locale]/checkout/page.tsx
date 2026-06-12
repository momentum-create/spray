import { notFound } from "next/navigation";
import { CartProvider } from "@/components/inbound/dawn/CartProvider";
import { ExpressCheckout } from "@/components/inbound/dawn/ExpressCheckout";
import { JaExpressCheckout } from "@/components/shop/JaExpressCheckout";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  return {
    title: locale === "ja" ? "お支払い | SPRAY" : "Checkout | SPRAY",
  };
}

export default async function InboundCheckoutPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled()) notFound();

  if (locale === "en") {
    return <ExpressCheckout />;
  }

  if (locale === "ja") {
    return (
      <CartProvider drawer="ja">
        <JaExpressCheckout />
      </CartProvider>
    );
  }

  notFound();
}
