import { MaintenanceHero } from "@/components/maintenance/MaintenanceHero";
import { MaintenanceMiddleColumn } from "@/components/maintenance/MaintenanceMiddleColumn";
import { MaintenanceRightColumn } from "@/components/maintenance/MaintenanceRightColumn";
import { MaintenanceServiceTables } from "@/components/maintenance/MaintenanceServiceTables";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { getSiteFacts } from "@/content/get-site-facts";

type MaintenancePageViewProps = {
  locale: Locale;
  copy: Copy;
};

/** メンテナンス — ヒーロー + 店頭料金表（1か所） + 工房写真 / サービスフロー */
export function MaintenancePageView({ locale, copy }: MaintenancePageViewProps) {
  const facts = getSiteFacts(locale);

  return (
    <div className="bg-black">
      <MaintenanceHero locale={locale} copy={copy} />

      <div className="mx-auto max-w-site">
        <MaintenanceServiceTables copy={copy} maintenance={facts.maintenance} />
      </div>

      <div className="mx-auto grid max-w-site grid-cols-1 lg:grid-cols-2">
        <div className="lg:border-r lg:border-spray-border">
          <MaintenanceMiddleColumn locale={locale} copy={copy} />
        </div>

        <MaintenanceRightColumn copy={copy} facts={facts} />
      </div>
    </div>
  );
}
