import { MaintenanceHero } from "@/components/maintenance/MaintenanceHero";
import { MaintenanceMiddleColumn } from "@/components/maintenance/MaintenanceMiddleColumn";
import { MaintenanceRightColumn } from "@/components/maintenance/MaintenanceRightColumn";
import { MaintenanceTuneUpGrid } from "@/components/maintenance/MaintenanceTuneUpGrid";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { getSiteFacts } from "@/content/get-site-facts";

type MaintenancePageViewProps = {
  locale: Locale;
  copy: Copy;
};

/** Pict メンテナンス画面 — 全幅ヒーロー + 3カラム本文 */
export function MaintenancePageView({ locale, copy }: MaintenancePageViewProps) {
  const facts = getSiteFacts(locale);

  return (
    <div className="bg-black">
      <MaintenanceHero locale={locale} copy={copy} />

      <div className="mx-auto grid max-w-site grid-cols-1 lg:grid-cols-3">
        <div className="lg:border-r lg:border-spray-border">
          <MaintenanceTuneUpGrid copy={copy} maintenance={facts.maintenance} />
        </div>

        <MaintenanceMiddleColumn locale={locale} copy={copy} maintenance={facts.maintenance} />

        <MaintenanceRightColumn copy={copy} facts={facts} />
      </div>
    </div>
  );
}
