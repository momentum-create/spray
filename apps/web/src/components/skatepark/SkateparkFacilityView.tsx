import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { getSiteFacts } from "@/content/get-site-facts";

type Props = { locale: Locale; copy: Copy };

type ZoneId = keyof Copy["skatepark"]["facility"]["zones"];

export function SkateparkFacilityView({ locale, copy }: Props) {
  const { skatepark } = getSiteFacts(locale);
  const f = copy.skatepark.facility;
  const featureIcon = skatepark.featureIcon;

  return (
    <>
      <PageHero title={f.title} lead={f.lead} />

      <div className="container-page pb-14">
        {/* 旧 /aircraft/ と同型: 見出し → 大ヒーロー → セクション（大写真 + 小アイコン付き項目） */}
        <div className="border-b border-spray-border py-10 text-center md:py-12">
          <h2 className="text-xl font-bold leading-snug tracking-tight text-white md:text-2xl lg:text-3xl">
            {skatepark.headline}
            <span className="mt-2 block text-base font-bold text-spray-muted md:text-lg">
              {skatepark.subhead}
            </span>
          </h2>
        </div>

        <figure className="relative mb-14 aspect-[16/10] w-full max-h-[min(70vh,560px)] overflow-hidden rounded-lg border border-spray-border bg-spray-surface">
          <Image
            src={skatepark.heroImage}
            alt={skatepark.headline}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1200px"
            priority
          />
        </figure>

        <div className="space-y-16 md:space-y-20">
          {skatepark.facilityAreas.map((area) => {
            const zone = f.zones[area.id as ZoneId];

            return (
              <section key={area.id} className="border-b border-spray-border pb-16 last:border-0 md:pb-20">
                <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {zone.label}
                </h2>
                <p className="mt-4 text-base font-bold leading-relaxed text-white md:text-lg">
                  {area.headline}
                </p>

                {area.images.length > 0 ? (
                  <div
                    className={
                      area.images.length > 1
                        ? "mt-8 grid gap-4 sm:grid-cols-2"
                        : "mt-8"
                    }
                  >
                    {area.images.map((src) => (
                      <figure
                        key={src}
                        className="relative aspect-[4/3] w-full min-h-[220px] overflow-hidden rounded-lg border border-spray-border bg-spray-surface md:min-h-[300px] lg:min-h-[360px]"
                      >
                        <Image
                          src={src}
                          alt={`${zone.label} — ${area.headline}`}
                          fill
                          className="object-cover"
                          sizes={
                            area.images.length > 1
                              ? "(max-width: 640px) 100vw, 50vw"
                              : "(max-width: 1280px) 100vw, 1200px"
                          }
                        />
                      </figure>
                    ))}
                  </div>
                ) : null}

                <div className="mt-8 divide-y divide-spray-border border-t border-spray-border">
                  {area.features.map((feat) => (
                    <article
                      key={feat.name}
                      className="flex gap-4 py-6 md:gap-6 md:py-8"
                    >
                      <figure className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded border border-spray-border bg-spray-surface md:h-20 md:w-20">
                        <Image
                          src={featureIcon}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="80px"
                          aria-hidden
                        />
                      </figure>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-white md:text-base">
                          {feat.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-spray-muted md:text-base">
                          {feat.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-16 border-t border-spray-border pt-12">
          <h2 className="text-center text-xl font-bold text-white md:text-2xl">
            {f.priceHeading}
          </h2>
          <div className="mt-8 flex flex-col items-center gap-6">
            <figure className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-spray-border bg-spray-surface">
              <Image
                src={skatepark.pricing.legacyChart.src}
                alt={
                  locale === "ja"
                    ? skatepark.pricing.legacyChart.altJa
                    : skatepark.pricing.legacyChart.altEn
                }
                width={1200}
                height={800}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </figure>
            <LocaleLink href="/skatepark/prices" locale={locale} className="btn-park">
              {f.priceLink}
            </LocaleLink>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <LocaleLink href="/skatepark/prices" locale={locale} className="btn-park">
            {copy.cta.bookPark}
          </LocaleLink>
          <LocaleLink href="/skatepark/first-timers" locale={locale} className="btn-park">
            {copy.cta.firstTimers}
          </LocaleLink>
          <LocaleLink
            href="/skatepark/calendar"
            locale={locale}
            className="text-sm font-bold text-spray-blue hover:underline"
          >
            {copy.cta.viewCalendar}
          </LocaleLink>
        </div>
      </div>
    </>
  );
}
