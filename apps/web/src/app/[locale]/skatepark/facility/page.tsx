import { SkateparkFacilityView } from "@/components/skatepark/SkateparkFacilityView";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function SkateparkFacilityPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  return <SkateparkFacilityView locale={locale} copy={copy} />;
}
