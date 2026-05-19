import { MaintenancePriceMenu } from "@/components/maintenance/MaintenancePriceMenu";
import type { Copy } from "@/i18n/get-copy";
import type { SiteFacts } from "@/content/get-site-facts";

type Props = {
  copy: Copy;
  maintenance: SiteFacts["maintenance"];
};

export function MaintenanceServiceTables({ copy, maintenance }: Props) {
  return (
    <section className="border-b border-spray-border bg-black p-4 md:p-6">
      <p className="mb-6 text-sm leading-relaxed text-spray-muted">{copy.maintenance.lead}</p>

      <MaintenancePriceMenu
        title={copy.maintenance.priceMenuTitle}
        leftTitle={copy.maintenance.tuneUpTitle}
        rightTitle={copy.maintenance.laborTitle}
        left={maintenance.priceMenuLeft}
        right={maintenance.priceMenuRight}
        footerNote={maintenance.footerNote}
      />

      <p className="mt-4 text-[10px] text-spray-muted">{copy.maintenance.sourceNote}</p>
    </section>
  );
}
