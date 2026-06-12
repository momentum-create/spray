"use client";

import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ShopLegalBlock } from "@/components/shop/ShopLegalBlock";
import { PageHero } from "@/components/ui/PageHero";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { mallNavLabel, malls, mallUrl } from "@/lib/shops";

type Props = { locale: Locale; copy: Copy };

export function ShopHubView({ locale, copy }: Props) {
  const s = copy.shop;

  return (
    <>
      <PageHero title={s.title} lead={s.lead} />
      <div className="container-page space-y-12 pb-12">
        <section className="overflow-hidden border border-spray-orange/40 bg-[#001c2c]">
          <div className="grid gap-0 md:grid-cols-[1fr_220px]">
            <div className="p-6">
              <h2 className="text-lg font-bold text-white">{s.owlGoggleBanner.title}</h2>
              <p className="mt-2 text-sm text-white/80">{s.owlGoggleBanner.lead}</p>
              <LocaleLink
                href="/shop/owl-goggle"
                locale={locale}
                className="btn-park mt-4 inline-flex min-h-11 items-center"
                onClick={() => trackEvent("owl_goggle_banner_click", { source: "shop_hub" })}
              >
                {s.owlGoggleBanner.cta}
              </LocaleLink>
            </div>
            <div className="relative hidden min-h-[140px] bg-white md:block">
              <Image
                src="/images/owl-goggle/design-sheet-flow-vent.png"
                alt=""
                fill
                className="object-cover object-left"
                sizes="220px"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-label mb-4">{s.compareTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {malls.map((mall) => {
              const mallCopy = s.malls[mall.id];
              return (
                <a
                  key={mall.id}
                  href={mallUrl(mall, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-dark flex min-h-[140px] flex-col rounded p-6 hover:border-spray-orange"
                  onClick={() => trackEvent(`ec_click_${mall.id}`, { source: "shop_hub" })}
                >
                  <h3 className="text-lg font-bold text-spray-text">
                    {mallNavLabel(mall.id, copy, locale)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-spray-muted">{mallCopy.feature}</p>
                  <span className="mt-4 text-xs font-bold uppercase text-spray-orange">
                    {s.openStore}
                  </span>
                </a>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-spray-muted">{s.officialNote}</p>
        </section>

        <section>
          <h2 className="section-label mb-4">{s.faqTitle}</h2>
          <dl className="space-y-4">
            {s.faq.map((item) => (
              <div key={item.q} className="card-dark p-4">
                <dt className="font-bold text-spray-text">{item.q}</dt>
                <dd className="mt-2 text-sm text-spray-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <ShopLegalBlock locale={locale} copy={copy} />

        <p>
          <LocaleLink href="/" locale={locale} className="text-spray-blue hover:underline">
            {s.backHome}
          </LocaleLink>
        </p>
      </div>
    </>
  );
}
