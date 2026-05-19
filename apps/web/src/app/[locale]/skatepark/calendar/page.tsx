import { StubPage } from "@/components/ui/StubPage";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function SkateparkCalendarPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  return (
    <StubPage
      locale={locale}
      title={copy.skatepark.calendar.title}
      lead={copy.skatepark.calendar.lead}
      path="/skatepark/calendar"
    />
  );
}
