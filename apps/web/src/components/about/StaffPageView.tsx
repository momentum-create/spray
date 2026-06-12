import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { getSiteFacts } from "@/content/get-site-facts";
import { designAssets } from "@/lib/design-assets";

type Props = { locale: Locale; copy: Copy };

export function StaffPageView({ locale, copy }: Props) {
  const { staff } = getSiteFacts(locale);
  const s = copy.about.staff;

  return (
    <>
      <PageHero title={s.title} lead={s.lead} />
      <div className="container-page grid gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {staff.map((member) => (
          <article
            key={member.name}
            className="border border-spray-border bg-spray-surface p-6 text-center"
          >
            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-spray-orange">
              <Image
                src={member.image ?? designAssets.pict.maintenance}
                alt={member.name}
                width={96}
                height={96}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <h2 className="mt-4 font-bold text-white">{member.name}</h2>
            {member.nameEn ? (
              <p className="text-xs text-spray-muted">{member.nameEn}</p>
            ) : null}
            {member.birthplace ? (
              <p className="mt-2 text-xs text-spray-muted">{member.birthplace}</p>
            ) : null}
          </article>
        ))}
      </div>
    </>
  );
}
