import Image from "next/image";
import type { Copy } from "@/i18n/get-copy";
import type { SiteFacts } from "@/content/get-site-facts";
import { designAssets } from "@/lib/design-assets";

const turnarounds = ["15 minute", "30 minute", "45 minute", "quote required", "20 minute", "25 minute"];

type Props = { copy: Copy; maintenance: SiteFacts["maintenance"] };

export function MaintenanceTuneUpGrid({ copy, maintenance }: Props) {
  const cards = maintenance.tuneUp;

  return (
    <section className="border-b border-spray-border bg-black p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white">
          {copy.maintenance.tuneUpTitle} & REPAIR SERVICES
        </h2>
        <div className="flex gap-1">
          <button type="button" className="flex h-6 w-6 items-center justify-center bg-spray-orange text-xs text-white" aria-label="Prev">
            ‹
          </button>
          <button type="button" className="flex h-6 w-6 items-center justify-center bg-spray-orange text-xs text-white" aria-label="Next">
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {cards.map((item, i) => (
          <article
            key={item.name}
            className="border border-spray-border bg-[#1a1a1a] p-3"
          >
            <h3 className="text-[10px] font-bold uppercase leading-tight text-white">
              {item.name}
            </h3>
            <p className="mt-2 line-clamp-3 text-[9px] leading-relaxed text-spray-muted">
              {item.description}
            </p>
            <p className="mt-2 text-lg font-black leading-none text-spray-orange">{item.price}</p>
            <p className="mt-2 text-[9px] text-spray-muted">
              Turnaround Time: {turnarounds[i] ?? "contact shop"}
            </p>
          </article>
        ))}
        <article className="relative col-span-2 min-h-[120px] overflow-hidden border border-spray-border bg-[#2a2a2a]">
          <Image
            src={designAssets.userProvided.pictMaintenanceTools}
            alt=""
            fill
            className="object-cover object-center opacity-95"
            sizes="400px"
          />
        </article>
      </div>
    </section>
  );
}
