import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { designAssets } from "@/lib/design-assets";

type Props = { locale: Locale; copy: Copy };

/** メンテナンスページ上部 — PRECISION CARE 全幅ヒーロー（参考モック準拠） */
export function MaintenanceHero({ locale, copy }: Props) {
  return (
    <section className="relative min-h-[320px] border-b border-spray-border md:min-h-[380px] lg:min-h-[420px]">
      <Image
        src={designAssets.userProvided.workshopScraperHero}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-black/35"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[320px] flex-col items-center justify-center px-4 py-10 text-center md:min-h-[380px] lg:min-h-[420px]">
        <h1 className="max-w-3xl font-display text-2xl font-black uppercase leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
          <span className="block">{copy.maintenance.heroTitle}</span>
          <span className="mt-2 block text-lg font-bold normal-case md:text-xl lg:text-2xl">
            {copy.maintenance.heroSubtitle}
          </span>
        </h1>

        <div className="mt-6 flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:justify-center">
          <LocaleLink
            href="/skatepark"
            locale={locale}
            className="btn-park flex-1 text-center text-[10px] sm:text-xs"
          >
            {copy.cta.park}
          </LocaleLink>
          <LocaleLink
            href="/shop"
            locale={locale}
            className="btn-shop-gold flex-1 text-center text-[10px] sm:text-xs"
          >
            {copy.cta.shop}
          </LocaleLink>
        </div>
      </div>

      <Image
        src={designAssets.graffiti}
        alt=""
        width={160}
        height={80}
        className="pointer-events-none absolute bottom-14 right-4 z-10 w-28 opacity-95 md:bottom-16 md:right-8 md:w-36"
      />

      <LocaleLink
        href="/maintenance/request"
        locale={locale}
        className="absolute bottom-4 right-4 z-20 border border-spray-border bg-black px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white hover:border-spray-orange hover:text-spray-orange md:bottom-6 md:right-6 md:text-[10px]"
      >
        {copy.home.requestMaintenance}
      </LocaleLink>
    </section>
  );
}
