import Image from "next/image";
import type { Copy } from "@/i18n/get-copy";
import type { SiteFacts } from "@/content/get-site-facts";

type ServiceRow = {
  name: string;
  description: string;
  price: string;
  note?: string;
};

type Props = {
  copy: Copy;
  maintenance: SiteFacts["maintenance"];
};

function ServiceTable({
  title,
  rows,
  colProcess,
  colDetail,
  colPrice,
}: {
  title: string;
  rows: readonly ServiceRow[];
  colProcess: string;
  colDetail: string;
  colPrice: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="mb-3 border-l-4 border-spray-orange pl-3 text-sm font-bold uppercase tracking-widest text-white">
        {title}
      </h2>
      <div className="overflow-x-auto border border-spray-border">
        <table className="w-full min-w-[320px] border-collapse text-left text-[11px]">
          <thead>
            <tr className="bg-spray-orange text-white">
              <th className="px-3 py-2 font-bold uppercase tracking-wider">{colProcess}</th>
              <th className="px-3 py-2 font-bold uppercase tracking-wider">{colDetail}</th>
              <th className="whitespace-nowrap px-3 py-2 text-right font-bold uppercase tracking-wider">
                {colPrice}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-spray-border bg-[#141414]">
                <td className="align-top px-3 py-2.5 font-bold text-white">{row.name}</td>
                <td className="align-top px-3 py-2.5 text-spray-muted">
                  {row.description}
                  {"note" in row && row.note ? (
                    <span className="mt-1 block text-[10px] text-white/80">{row.note}</span>
                  ) : null}
                </td>
                <td className="whitespace-nowrap align-top px-3 py-2.5 text-right font-black text-spray-orange">
                  {row.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function MaintenanceServiceTables({ copy, maintenance }: Props) {
  return (
    <section className="border-b border-spray-border bg-black p-4 md:p-6">
      <p className="mb-6 text-sm leading-relaxed text-spray-muted">{copy.maintenance.lead}</p>

      <ServiceTable
        title={copy.maintenance.tuneUpTitle}
        rows={maintenance.tuneUp}
        colProcess={copy.maintenance.table.tuneUp.process}
        colDetail={copy.maintenance.table.tuneUp.detail}
        colPrice={copy.maintenance.table.tuneUp.price}
      />

      <ServiceTable
        title={copy.maintenance.laborTitle}
        rows={maintenance.labor}
        colProcess={copy.maintenance.table.labor.process}
        colDetail={copy.maintenance.table.labor.detail}
        colPrice={copy.maintenance.table.labor.price}
      />

      <p className="mb-4 text-[11px] text-spray-muted">{maintenance.footerNote}</p>
      <p className="mb-4 text-[10px] text-spray-muted">{copy.maintenance.sourceNote}</p>

      <div className="relative overflow-hidden border border-spray-border">
        <Image
          src={maintenance.priceSheetImageUrl}
          alt={copy.maintenance.priceSheetAlt}
          width={1200}
          height={800}
          className="h-auto w-full"
          sizes="(max-width: 1024px) 100vw, 480px"
        />
      </div>
    </section>
  );
}
