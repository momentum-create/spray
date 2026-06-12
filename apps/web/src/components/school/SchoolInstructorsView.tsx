import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/ui/PageHero";
import { getSiteFacts } from "@/content/get-site-facts";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";

type Props = { locale: Locale; copy: Copy };

export function SchoolInstructorsView({ locale, copy }: Props) {
  const p = copy.school.instructorsPage;
  const { staff } = getSiteFacts(locale);

  return (
    <>
      <PageHero title={copy.school.links.instructors} lead={copy.about.staff.lead} />
      <div className="container-page max-w-3xl space-y-10 pb-12">
        <p className="text-spray-muted">{p.intro}</p>
        <div className="grid gap-6 sm:grid-cols-2">
          {staff.map((member) => (
            <div
              key={member.name}
              className="border border-spray-border bg-spray-surface p-4"
            >
              <div className="relative aspect-square w-full max-w-[200px] overflow-hidden bg-black">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <h2 className="mt-4 font-bold text-white">{member.name}</h2>
              <p className="text-sm text-spray-muted">{member.birthplace}</p>
            </div>
          ))}
          <div className="flex aspect-square max-w-[200px] items-center justify-center border border-dashed border-spray-border bg-spray-surface p-4 text-center text-xs text-spray-muted">
            {locale === "ja" ? "スタッフ追加予定" : "More staff coming soon"}
          </div>
        </div>
        <LocaleLink href="/about/story" locale={locale} className="btn-park">
          {p.ctaStory}
        </LocaleLink>
        <LocaleLink href="/school" locale={locale} className="block text-sm text-spray-blue hover:underline">
          ← {copy.school.title}
        </LocaleLink>
      </div>
    </>
  );
}
