import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { designAssets } from "@/lib/design-assets";
import { heroShopCta } from "@/lib/shops";

type HomeHeroProps = {
  locale: Locale;
  copy: Copy;
};

export function HomeHero({ locale, copy }: HomeHeroProps) {
  const titleLines = copy.home.hero.title.split("\n");

  return (
    <section className="relative min-h-[320px] overflow-hidden border-b border-spray-border md:min-h-[420px]">
      <Image
        src={designAssets.hero}
        alt=""
        fill
        priority
        className="object-cover object-[center_35%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

      <div className="relative mx-auto flex min-h-[320px] max-w-site flex-col justify-center px-4 py-12 md:min-h-[420px] md:px-6">
        <h1 className="max-w-2xl font-display text-3xl font-black uppercase leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-wrap gap-3">
          <LocaleLink href="/skatepark" locale={locale} className="btn-park">
            {copy.cta.park}
          </LocaleLink>
          <LocaleLink href="/shop" locale={locale} className="btn-shop-outline">
            {heroShopCta(copy, locale)}
          </LocaleLink>
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-white/80">
            {copy.home.hero.indoorLabel}
          </p>
          <Image
            src={designAssets.graffiti}
            alt="SPRAY"
            width={160}
            height={80}
            className="hidden h-auto w-32 opacity-95 md:block md:w-40"
          />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <span className="h-1.5 w-6 bg-white" />
        <span className="h-1.5 w-1.5 bg-white/40" />
        <span className="h-1.5 w-1.5 bg-white/40" />
      </div>
    </section>
  );
}
