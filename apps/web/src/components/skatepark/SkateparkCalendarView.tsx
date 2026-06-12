import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { getSiteFacts } from "@/content/get-site-facts";

type Props = { locale: Locale; copy: Copy };

export function SkateparkCalendarView({ locale, copy }: Props) {
  const { skatepark } = getSiteFacts(locale);
  const c = copy.skatepark.calendar;

  return (
    <>
      <PageHero title={c.title} lead={c.lead} />
      <div className="container-page space-y-6 pb-12">
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={skatepark.scheduleImageUrl}
            alt={c.title}
            className="w-full max-w-2xl rounded border border-spray-border"
          />
        </figure>
        <p className="text-sm text-spray-muted">{c.imageNote}</p>
        <LocaleLink href="/skatepark/prices" locale={locale} className="btn-park">
          {copy.cta.bookPark}
        </LocaleLink>
      </div>
    </>
  );
}
