import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { getSiteFacts } from "@/content/get-site-facts";
import { designAssets } from "@/lib/design-assets";
type Props = {
  locale: Locale;
  copy: Copy;
};

/** 中央カラム — SKATE PARK & SCHOOL（Pict モック準拠・縦積み整列） */
export function HomeSkateparkColumn({ locale, copy }: Props) {
  const facts = getSiteFacts(locale);
  const q = copy.home.parkQuick;

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="section-label mb-3">{copy.home.skateParkAndSchool}</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative aspect-[4/3] overflow-hidden border border-spray-border">
            <Image
              src={designAssets.skateparkHero}
              alt=""
              fill
              className="object-cover"
              sizes="200px"
            />
            <p className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 text-[8px] font-bold uppercase text-white">
              {copy.home.hero.indoorLabel}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-spray-border">
            <Image
              src={designAssets.pict.homePanels}
              alt=""
              fill
              className="object-cover object-top"
              sizes="200px"
            />
            <p className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 text-[8px] font-bold uppercase text-white">
              {copy.nav.school.label}
            </p>
          </div>
        </div>
      </section>

      <section className="border border-spray-border bg-[#141414] p-4">
        <h3 className="section-label mb-2">{copy.home.realTimeCalendar}</h3>
        <p className="mb-3 text-[11px] text-spray-muted">
          <span className="text-white">{q.hoursLabel}: </span>
          {facts.hours.label}（{facts.hours.closedDay}
          {locale === "ja" ? "定休" : " closed"}）
        </p>
        <LocaleLink
          href="/skatepark/calendar"
          locale={locale}
          className="btn-park block w-full text-center text-[11px]"
        >
          {q.calendar}
        </LocaleLink>
      </section>

      <div className="grid grid-cols-2 gap-2">
        <section className="flex flex-col border border-spray-border">
          <h3 className="table-header-orange">{copy.home.priceTable}</h3>
          <div className="flex flex-1 flex-col justify-between bg-[#141414] p-3">
            <p className="text-[10px] leading-relaxed text-spray-muted">{q.priceLead}</p>
            <LocaleLink
              href="/skatepark/prices"
              locale={locale}
              className="btn-orange-outline mt-3 block text-center text-[10px]"
            >
              {q.prices}
            </LocaleLink>
          </div>
        </section>
        <section className="flex flex-col border border-spray-border">
          <h3 className="table-header-orange">{copy.home.firstTimersGuide}</h3>
          <div className="flex flex-1 flex-col justify-between bg-[#141414] p-3">
            <p className="text-[10px] leading-relaxed text-spray-muted">
              {copy.skatepark.firstTimers.lead}
            </p>
            <LocaleLink
              href="/skatepark/first-timers"
              locale={locale}
              className="btn-orange-outline mt-3 block text-center text-[10px]"
            >
              {q.firstTimers}
            </LocaleLink>
          </div>
        </section>
      </div>
    </div>
  );
}
