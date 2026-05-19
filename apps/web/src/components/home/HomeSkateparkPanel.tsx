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

/** トップ左 — 屋内パーク写真 + 文字オーバーレイ（メンテ右と同型） */
export function HomeSkateparkPanel({ locale, copy }: Props) {
  const facts = getSiteFacts(locale);

  return (
    <LocaleLink
      href="/skatepark"
      locale={locale}
      className="group relative block aspect-video overflow-hidden border border-spray-border"
      aria-label={copy.home.viewSkateparkPage}
    >
      <Image
        src={designAssets.skateparkHero}
        alt=""
        fill
        className="object-cover object-center transition group-hover:scale-[1.02]"
        sizes="400px"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25"
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <p className="font-display text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
          {copy.home.parkOverlayTitle}
        </p>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/90 md:text-sm">
          {copy.home.parkOverlaySubtitle}
        </p>
        <p className="mt-3 max-w-xs text-[10px] leading-snug text-white/75 md:text-[11px]">
          {facts.skatepark.headline}
        </p>
        <span className="btn-park mt-4 px-4 py-2 text-[10px] md:text-xs">
          {copy.cta.bookPark}
        </span>
      </div>
      <Image
        src={designAssets.graffiti}
        alt=""
        width={90}
        height={45}
        className="pointer-events-none absolute bottom-3 right-3 w-16 opacity-90 md:w-20"
      />
    </LocaleLink>
  );
}
