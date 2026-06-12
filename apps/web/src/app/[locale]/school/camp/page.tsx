import { SchoolCampView } from "@/components/school/SchoolCampView";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function SchoolCampPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  return <SchoolCampView locale={locale} copy={copy} />;
}
