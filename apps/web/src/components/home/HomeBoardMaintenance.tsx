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

/** トップ — 左: 写真+文字オーバーレイ / 右: 料金リスト（Pict モック） */
export function HomeBoardMaintenance({ locale, copy }: Props) {
  const facts = getSiteFacts(locale);
  const services = facts.maintenance.tuneUp.slice(0, 3);

  return (
    <section className="overflow-hidden border border-spray-border bg-black">
      <div className="grid md:grid-cols-2">
        <LocaleLink
          href="/maintenance"
          locale={locale}
          className="group relative block min-h-[200px] md:min-h-[240px]"
          aria-label={copy.home.viewMaintenancePage}
        >
          <Image
            src={designAssets.homeMaintenancePanel}
            alt=""
            fill
            className="object-cover object-[35%_center] transition group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20"
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <p className="font-display text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              {copy.home.maintenanceOverlayTitle}
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-white/90 md:text-base">
              {copy.home.maintenanceOverlaySubtitle}
            </p>
            <p className="mt-3 max-w-xs text-[11px] leading-snug text-white/75">
              {copy.maintenance.heroSubtitle}
            </p>
          </div>
          <Image
            src={designAssets.graffiti}
            alt=""
            width={100}
            height={50}
            className="pointer-events-none absolute bottom-3 right-3 w-20 opacity-90 md:w-24"
          />
        </LocaleLink>

        <div className="flex flex-col justify-center bg-[#141414] p-4 md:p-5">
          <h3 className="section-label mb-1">{copy.home.boardMaintenance}</h3>
          <p className="text-xs text-spray-muted">{copy.home.tuneUpServices}</p>
          <ul className="mt-3 space-y-0 text-xs">
            {services.map((item) => (
              <li
                key={item.name}
                className="flex items-start justify-between gap-2 border-b border-spray-border py-2 last:border-0"
              >
                <span className="text-white">{item.name}</span>
                <span className="shrink-0 text-right font-bold text-spray-orange">{item.price}</span>
              </li>
            ))}
          </ul>
          <LocaleLink
            href="/maintenance/request"
            locale={locale}
            className="btn-orange-outline mt-4 w-full text-center text-[11px] md:text-xs"
          >
            {copy.home.requestMaintenance}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
