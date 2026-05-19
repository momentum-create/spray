import Image from "next/image";
import type { Copy } from "@/i18n/get-copy";
import type { SiteFacts } from "@/content/get-site-facts";
import { designAssets } from "@/lib/design-assets";

const technicians = [
  { name: "Matt Profile", role: "SNOWBOARD BASE GURU" },
  { name: "Gome Short", role: "SKATEBOARD ASSEMBLY EXPERT" },
  { name: "Gumy Profile", role: "EDGE & WAX SPECIALIST" },
] as const;

type Props = {
  copy: Copy;
  facts: SiteFacts;
};

export function MaintenanceRightColumn({ copy, facts }: Props) {
  const flowImages = [
    designAssets.maintenanceHero,
    designAssets.pict.maintenance,
    designAssets.pict.maintenanceAlt,
    designAssets.maintenanceHero,
    designAssets.pict.maintenance,
  ];

  return (
    <div className="flex flex-col bg-black">
      <section className="border-b border-spray-border p-4">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">
          {copy.maintenance.flow.title}
        </h2>
        <ol className="space-y-3">
          {copy.maintenance.flow.steps.map((step, i) => (
            <li key={step.title} className="flex gap-2">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-spray-border">
                <span className="absolute left-0 top-0 z-10 flex h-5 w-5 items-center justify-center bg-spray-orange text-[10px] font-bold">
                  {i + 1}
                </span>
                <Image src={flowImages[i]} alt="" fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-white">{step.title}</p>
                <p className="mt-0.5 text-[9px] leading-snug text-spray-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-b border-spray-border p-4">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">
          MASTER TECHNICIANS
        </h2>
        <ul className="space-y-4">
          {technicians.map((tech, i) => (
            <li key={tech.name} className="flex gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-spray-orange">
                <Image
                  src={flowImages[i]}
                  alt={tech.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white">{tech.name}</p>
                <p className="mt-1 text-[9px] text-spray-muted">
                  {facts.staff[0]?.nameEn ?? "SPRAY staff"}  Eexpert maintenance.
                </p>
                <span className="mt-2 inline-block border border-spray-orange px-2 py-0.5 text-[8px] font-bold uppercase text-spray-orange">
                  {tech.role}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-auto p-4 text-[9px] text-spray-muted">
        <p className="mb-2 font-bold uppercase tracking-widest text-white">{copy.home.contactInfo}</p>
        <p>{facts.address.full}</p>
        <p className="mt-1">{facts.contact.tel}</p>
        <p className="mt-3 font-bold uppercase tracking-widest text-white">{copy.home.openingHours}</p>
        <p>
          {facts.hours.label}  E{facts.hours.closedDay}
        </p>
        <p className="mt-3 font-bold uppercase tracking-widest text-white">{copy.home.social}</p>
        <div className="mt-1 flex gap-3">
          <a href={facts.social.instagram} className="text-white hover:text-spray-orange">
            Instagram
          </a>
          <a href={facts.social.facebook} className="text-white hover:text-spray-orange">
            Facebook
          </a>
        </div>
        <p className="mt-4 text-[8px]">{copy.footer.copyright(new Date().getFullYear())}</p>
      </footer>
    </div>
  );
}
