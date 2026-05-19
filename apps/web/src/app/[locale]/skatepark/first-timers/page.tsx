import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/ui/PageHero";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function FirstTimersPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  const { firstTimers } = copy.skatepark;

  return (
    <>
      <PageHero title={firstTimers.title} lead={firstTimers.lead} />
      <ol className="container-page list-decimal space-y-4 pb-12 pl-6">
        {firstTimers.steps.map((step, i) => (
          <li key={i} className="text-spray-muted">
            {step}
          </li>
        ))}
      </ol>
      <div className="container-page flex flex-wrap gap-4 pb-12">
        <LocaleLink href="/skatepark/prices" locale={locale} className="btn-park">
          {copy.cta.bookPark}
        </LocaleLink>
        <LocaleLink href="/school" locale={locale} className="text-spray-blue hover:underline">
          {copy.skatepark.learnAtSchool}
        </LocaleLink>
      </div>
    </>
  );
}
