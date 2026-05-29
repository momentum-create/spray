import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";

type HomeLocomotiveTopProps = {
  locale: Locale;
};

const copyByLocale = {
  ja: {
    badge: "Digital-First Shop",
    heroA: "SPRAY",
    heroB: "SNOW",
    heroC: "CONCRETE",
    lead:
      "感性を刺激するプロダクトと体験を、余白とタイポグラフィで魅せるショップトップ。",
    ctaPrimary: "Shop Collection",
    ctaSecondary: "View Story",
    sectionLabel: "Featured Direction",
    sectionTitle: "Design and ride are one expression.",
    sectionBody:
      "Locomotive の世界観を参考に、縦スクロールで印象が残る大胆な見出しと、静かな情報設計でSPRAYの入り口を再構成しました。",
    footerMetaLeft: "Based in Hakuba, Japan",
    footerMetaRight: "Creative top page concept / 2026",
  },
  en: {
    badge: "Digital-First Shop",
    heroA: "SPRAY",
    heroB: "SNOW",
    heroC: "CONCRETE",
    lead: "A shop top page with cinematic whitespace and oversized editorial typography.",
    ctaPrimary: "Shop Collection",
    ctaSecondary: "View Story",
    sectionLabel: "Featured Direction",
    sectionTitle: "Design and ride are one expression.",
    sectionBody:
      "Inspired by Locomotive's visual language, this concept combines oversized headings and quiet composition to shape a memorable first view for SPRAY.",
    footerMetaLeft: "Based in Hakuba, Japan",
    footerMetaRight: "Creative top page concept / 2026",
  },
} as const;

export function HomeLocomotiveTop({ locale }: HomeLocomotiveTopProps) {
  const copy = copyByLocale[locale] ?? copyByLocale.en;

  return (
    <div className="bg-[#f6f4ef] text-[#111111]">
      <section className="relative min-h-[92svh] overflow-hidden border-b border-black/15">
        <Image
          src="/images/hero-play-on-snow-ride-concrete.png"
          alt="Rider in motion"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/45" />

        <div className="relative z-10 mx-auto flex min-h-[92svh] w-full max-w-[1680px] flex-col justify-between px-5 py-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.24em] text-white/90 sm:text-xs">
            <span>{copy.badge}</span>
            <span>SPRAY / 2026</span>
          </div>

          <div className="pb-[7svh] text-white">
            <h1 className="font-display text-[clamp(3.4rem,14vw,13rem)] font-black uppercase leading-[0.8] tracking-[-0.08em]">
              <span className="block">{copy.heroA}</span>
              <span className="block pl-[10vw]">{copy.heroB}</span>
              <span className="block">{copy.heroC}</span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
              {copy.lead}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LocaleLink
                href="/shop"
                locale={locale}
                className="inline-flex items-center border border-white/85 bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-transparent hover:text-white"
              >
                {copy.ctaPrimary}
              </LocaleLink>
              <LocaleLink
                href="/about/story"
                locale={locale}
                className="inline-flex items-center border border-white/65 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
              >
                {copy.ctaSecondary}
              </LocaleLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1680px] gap-12 px-5 py-20 sm:grid-cols-[0.8fr_1.2fr] sm:px-8 lg:px-12 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/55">
          {copy.sectionLabel}
        </p>
        <div>
          <h2 className="font-display text-[clamp(2rem,6.8vw,6.6rem)] font-black leading-[0.88] tracking-[-0.06em]">
            {copy.sectionTitle}
          </h2>
          <p className="mt-7 max-w-3xl text-base leading-8 text-black/70 sm:text-lg">
            {copy.sectionBody}
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[1680px] items-center justify-between border-t border-black/15 px-5 py-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/55 sm:px-8 sm:text-xs lg:px-12">
        <span>{copy.footerMetaLeft}</span>
        <span>{copy.footerMetaRight}</span>
      </section>
    </div>
  );
}
