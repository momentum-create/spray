import { SkateparkCalendarView } from "@/components/skatepark/SkateparkCalendarView";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function SkateparkCalendarPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  return <SkateparkCalendarView locale={locale} copy={copy} />;
}
