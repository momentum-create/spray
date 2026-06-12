import { ShopHubView } from "@/components/shop/ShopHubView";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function ShopPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  return <ShopHubView locale={locale} copy={copy} />;
}
