import { MaintenancePageView } from "@/components/maintenance/MaintenancePageView";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function MaintenancePage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  return <MaintenancePageView locale={locale} copy={copy} />;
}
