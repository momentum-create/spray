import { SchoolBookingView } from "@/components/school/SchoolBookingView";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function SchoolBookingPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  return <SchoolBookingView locale={locale} copy={copy} />;
}
