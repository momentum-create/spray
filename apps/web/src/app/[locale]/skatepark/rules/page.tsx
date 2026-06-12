import { SkateparkRulesView } from "@/components/skatepark/SkateparkRulesView";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function SkateparkRulesPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  return <SkateparkRulesView locale={locale} copy={copy} />;
}
