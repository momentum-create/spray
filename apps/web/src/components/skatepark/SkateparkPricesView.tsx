import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { SkateparkPriceTable } from "@/components/skatepark/SkateparkPriceTable";
import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { getSiteFacts } from "@/content/get-site-facts";

type Props = { locale: Locale; copy: Copy };

export function SkateparkPricesView({ locale, copy }: Props) {
  const { hours, contact, skatepark } = getSiteFacts(locale);
  const p = copy.skatepark.prices;
  const ui = copy.ui.table;
  const { pricing } = skatepark;

  return (
    <>
      <PageHero title={p.title} lead={p.lead} />
      <section className="container-page space-y-8 pb-12">
        <section>
          <h2 className="section-label mb-3">{p.hoursHeading}</h2>
          <dl className="grid gap-2 text-sm sm:grid-cols-[8rem_1fr]">
            <dt className="text-spray-muted">{p.storeHours}</dt>
            <dd>
              {hours.label} ({p.closedPrefix}: {hours.closedDay})
            </dd>
          </dl>
          <p className="mt-3 text-sm text-spray-muted">{p.parkHoursNote}</p>
        </section>

        <p className="text-sm text-spray-muted">{skatepark.priceNote}</p>

        <SkateparkPriceTable
          title={p.sections.usageFees.title}
          lead={p.sections.usageFees.lead}
          rows={pricing.usageFees.rows}
          itemHeader={ui.item}
          priceHeader={ui.price}
        />
        <p className="text-sm text-spray-muted">{pricing.purposeNote}</p>
        <p className="text-sm text-spray-muted">{pricing.registerNote}</p>

        <figure>
          <h2 className="section-label mb-3">{p.legacyChart.title}</h2>
          <p className="mb-3 text-sm text-spray-muted">{p.legacyChart.caption}</p>
          <a
            href={pricing.legacyChart.src}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg border border-spray-border"
          >
            <div className="relative aspect-[3/4] w-full max-w-lg bg-spray-surface">
              <Image
                src={pricing.legacyChart.src}
                alt={locale === "ja" ? pricing.legacyChart.altJa : pricing.legacyChart.altEn}
                fill
                className="object-contain object-top"
                sizes="(max-width: 768px) 100vw, 512px"
              />
            </div>
          </a>
          <figcaption className="mt-2">
            <span className="text-xs text-spray-muted">{p.legacyChart.openInNewTab}</span>
          </figcaption>
        </figure>

        <div className="flex flex-wrap gap-3 border-t border-spray-border pt-8">
          <LocaleLink href="/skatepark/calendar" locale={locale} className="btn-park">
            {p.cta.calendar}
          </LocaleLink>
          <LocaleLink href="/skatepark/first-timers" locale={locale} className="btn-park">
            {p.cta.firstTimers}
          </LocaleLink>
          <LocaleLink
            href="/skatepark/facility"
            locale={locale}
            className="text-sm font-bold text-spray-blue hover:underline"
          >
            {p.cta.facility}
          </LocaleLink>
          <a
            href={contact.telLink}
            className="text-sm font-bold text-spray-blue hover:underline"
          >
            {p.cta.phone} {contact.tel}
          </a>
        </div>
      </section>
    </>
  );
}
