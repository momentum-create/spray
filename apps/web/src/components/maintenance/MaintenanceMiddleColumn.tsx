import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { designAssets } from "@/lib/design-assets";

type Props = {
  locale: Locale;
  copy: Copy;
};

/** 工房写真のみ（料金は上部メニュー表に一本化） */
export function MaintenanceMiddleColumn({ locale, copy }: Props) {
  return (
    <div className="flex flex-col border-b border-spray-border bg-black p-4 lg:border-b-0 lg:border-r">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">
        {copy.maintenance.workshopTitle}
      </h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative min-h-[120px] overflow-hidden border border-spray-border md:min-h-[140px]">
          <Image
            src={designAssets.maintenanceHero}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 320px"
          />
        </div>
        <div className="relative min-h-[120px] overflow-hidden border border-spray-border md:min-h-[140px]">
          <Image
            src={designAssets.pict.maintenanceAlt}
            alt=""
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 50vw, 320px"
          />
        </div>
      </div>
      <div className="relative mt-2 min-h-[100px] overflow-hidden border border-spray-border">
        <Image
          src={designAssets.userProvided.pictMaintenanceTools}
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 640px"
        />
      </div>
      <LocaleLink
        href="/maintenance/request"
        locale={locale}
        className="btn-orange-outline mt-4 block w-full text-center text-[11px] md:text-xs"
      >
        {copy.home.requestMaintenance}
      </LocaleLink>
    </div>
  );
}
