import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { getSiteFacts } from "@/content/get-site-facts";
import { designAssets } from "@/lib/design-assets";
import { HomeBoardMaintenance } from "@/components/home/HomeBoardMaintenance";
import { HomeSkateparkPanel } from "@/components/home/HomeSkateparkPanel";
import { HomeSkateparkShortcuts } from "@/components/home/HomeSkateparkShortcuts";

const brandLogos = [
  "BURTON",
  "ELEMENT",
  "NITRO",
  "VANS",
  "LIB TECH",
  "CAPITA",
  "SALOMON",
  "RIDE",
  "K2",
  "GNU",
  "DC",
  "VOLCOM",
  "THIRTYTWO",
  "FORUM",
  "GLOBE",
  "PALACE",
  "ANTIHERO",
  "BAKER",
];

type HomeHubGridProps = {
  locale: Locale;
  copy: Copy;
};

export function HomeHubGrid({ locale, copy }: HomeHubGridProps) {
  const facts = getSiteFacts(locale);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-1">
        <HomeSkateparkPanel locale={locale} copy={copy} />
        <HomeSkateparkShortcuts locale={locale} copy={copy} />
      </div>

      <div className="space-y-6 lg:col-span-2">
        <HomeBoardMaintenance locale={locale} copy={copy} />

        <section>
          <h3 className="section-label mb-3">{copy.home.brandsWeCarry}</h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {brandLogos.map((name) => (
              <div
                key={name}
                className="flex aspect-square items-center justify-center border border-spray-border bg-spray-elevated p-2 text-center text-[9px] font-bold text-white/70"
              >
                {name}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="section-label mb-3">{copy.home.staffAccess}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-wrap gap-3">
              {facts.staff.map((s) => (
                <div key={s.name} className="text-center">
                  <div className="mx-auto h-14 w-14 overflow-hidden rounded-full border-2 border-spray-orange bg-spray-surface">
                    <Image
                      src={designAssets.pict.maintenance}
                      alt={s.name}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-white">{s.nameEn ?? s.name}</p>
                </div>
              ))}
            </div>
            <div className="relative min-h-[180px] overflow-hidden border border-spray-border">
              <iframe
                title="map"
                src={facts.access.mapsEmbedUrl}
                className="h-full min-h-[180px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
