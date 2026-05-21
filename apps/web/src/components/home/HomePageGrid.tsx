import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { getSiteFacts } from "@/content/get-site-facts";
import { designAssets } from "@/lib/design-assets";
import { HomeBoardMaintenance } from "@/components/home/HomeBoardMaintenance";
import { HomeBrandsGrid } from "@/components/home/HomeBrandsGrid";
import { HomeNewArrivals } from "@/components/home/HomeNewArrivals";
import { HomeNews } from "@/components/home/HomeNews";
import { HomeSkateparkColumn } from "@/components/home/HomeSkateparkColumn";
import { InboundGuestBanner } from "@/components/inbound/InboundGuestBanner";

type Props = {
  locale: Locale;
  copy: Copy;
  posts: { id: number; slug: string; title: { rendered: string }; date: string }[];
};

/** Pict モック準拠 — 3カラム等幅・上端揃え */
export function HomePageGrid({ locale, copy, posts }: Props) {
  const facts = getSiteFacts(locale);

  return (
    <>
      {locale === "en" ? <InboundGuestBanner /> : null}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
      <div className="flex flex-col gap-6">
        <HomeNewArrivals copy={copy} locale={locale} embedded />
        <HomeNews locale={locale} copy={copy} posts={posts} />
      </div>

      <HomeSkateparkColumn locale={locale} copy={copy} />

      <div className="flex flex-col gap-6">
        <HomeBoardMaintenance locale={locale} copy={copy} />

        <HomeBrandsGrid locale={locale} copy={copy} />

        <section>
          <h2 className="section-label mb-3">{copy.home.staffAccess}</h2>
          <div className="flex flex-wrap justify-center gap-3 border border-spray-border bg-[#141414] p-4">
            {facts.staff.map((s) => (
              <div key={s.name} className="text-center">
                <div className="mx-auto h-12 w-12 overflow-hidden rounded-full border-2 border-spray-orange">
                  <Image
                    src={designAssets.pict.maintenance}
                    alt={s.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-1 text-[9px] text-white">{s.nameEn ?? s.name}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-2 min-h-[160px] overflow-hidden border border-spray-border">
            <iframe
              title="map"
              src={facts.access.mapsEmbedUrl}
              className="h-full min-h-[160px] w-full"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </div>
    </>
  );
}
