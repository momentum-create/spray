import { MaintenanceRequestForm } from "@/components/forms/MaintenanceRequestForm";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/ui/PageHero";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function MaintenanceRequestPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  const r = copy.maintenance.request;

  return (
    <>
      <PageHero title={r.title} lead={r.lead} />
      <div className="container-page max-w-2xl pb-12">
        <p className="mb-6">
          <LocaleLink
            href="/maintenance"
            locale={locale}
            className="text-sm text-spray-blue hover:underline"
          >
            ← {copy.maintenance.title}
          </LocaleLink>
        </p>
        <MaintenanceRequestForm locale={locale} copy={copy} />
      </div>
    </>
  );
}
