import { GuidePage } from "@/components/content/GuidePage";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function AboutCalendarPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  const c = copy.about.calendar;
  return (
    <GuidePage
      locale={locale}
      copy={copy}
      title={c.title}
      lead={c.lead}
      body={c.body}
      parent={{ href: "/about/access", label: copy.about.access.title }}
    />
  );
}
