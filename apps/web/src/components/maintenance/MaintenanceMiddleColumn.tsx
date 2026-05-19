import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import type { SiteFacts } from "@/content/get-site-facts";
import { designAssets } from "@/lib/design-assets";

type Props = {
  locale: Locale;
  copy: Copy;
  maintenance: SiteFacts["maintenance"];
};

export function MaintenanceMiddleColumn({ locale, copy, maintenance }: Props) {
  return (
    <div className="flex flex-col border-b border-spray-border bg-black lg:border-b-0 lg:border-r">
      <section className="border-b border-spray-border p-4">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">
          {copy.maintenance.tuneUpTitle} & REPAIR SERVICES
        </h2>
        <ul className="space-y-3">
          {maintenance.tuneUp.map((item, i) => (
            <li key={item.name} className="border-b border-spray-border/50 pb-3 last:border-0">
              <span className="mb-1 inline-block bg-spray-orange px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                {i === 0 ? "WAXING" : i === 1 ? "TUNING" : "REPAIR"}
              </span>
              <p className="text-[11px] font-bold uppercase text-white">{item.name}</p>
              <p className="mt-1 text-[9px] text-spray-muted">{item.description}</p>
              <p className="mt-1 text-sm font-black text-spray-orange">{item.price}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="p-4">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">
          {copy.home.boardMaintenance}
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative min-h-[80px] overflow-hidden border border-spray-border">
            <Image
              src={designAssets.maintenanceHero}
              alt=""
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
          <div className="relative min-h-[80px] overflow-hidden border border-spray-border">
            <Image
              src={designAssets.pict.maintenanceAlt}
              alt=""
              fill
              className="object-cover object-top"
              sizes="200px"
            />
          </div>
        </div>
        <ul className="mt-3 space-y-2 border border-spray-border">
          {maintenance.labor.slice(0, 4).map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between gap-2 border-b border-spray-border px-2 py-1.5 text-[10px] last:border-0"
            >
              <span className="text-white">{item.name}</span>
              <span className="shrink-0 font-bold text-spray-orange">{item.price}</span>
            </li>
          ))}
        </ul>
        <LocaleLink
          href="/maintenance/request"
          locale={locale}
          className="btn-orange-outline mt-4 block w-full text-center text-[10px]"
        >
          {copy.home.requestMaintenance}
        </LocaleLink>
      </section>
    </div>
  );
}
