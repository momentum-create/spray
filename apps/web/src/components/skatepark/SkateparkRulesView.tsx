import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ParkRulesDownload } from "@/components/skatepark/ParkRulesDownload";
import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { getSiteFacts } from "@/content/get-site-facts";

type Props = { locale: Locale; copy: Copy };

export function SkateparkRulesView({ locale, copy }: Props) {
  const { skatepark } = getSiteFacts(locale);
  const r = copy.skatepark.rules;

  return (
    <>
      <PageHero title={r.title} lead={r.lead} />
      <div className="container-page pb-12">
        <ParkRulesDownload copy={copy} />
        <ul className="list-disc space-y-3 pl-6 text-spray-muted">
          {skatepark.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <LocaleLink href="/skatepark/first-timers" locale={locale} className="btn-park">
            {copy.cta.firstTimers}
          </LocaleLink>
          <LocaleLink href="/skatepark/calendar" locale={locale} className="text-spray-blue hover:underline">
            {copy.cta.viewCalendar}
          </LocaleLink>
        </div>
      </div>
    </>
  );
}
