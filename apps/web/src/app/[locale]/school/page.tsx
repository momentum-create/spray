import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/ui/PageHero";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function SchoolPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);

  const links = [
    { href: "/school/lessons", label: copy.school.links.lessons },
    { href: "/school/camp", label: copy.school.links.camp },
    { href: "/school/instructors", label: copy.school.links.instructors },
    { href: "/school/booking", label: copy.school.booking.title },
  ] as const;

  return (
    <>
      <PageHero title={copy.school.title} lead={copy.school.lead} />
      <nav className="container-page grid gap-3 pb-12 sm:grid-cols-2">
        {links.map((l) => (
          <LocaleLink
            key={l.href}
            href={l.href}
            locale={locale}
            className="rounded border border-spray-border bg-spray-surface px-6 py-4 hover:border-spray-blue"
          >
            {l.label}
          </LocaleLink>
        ))}
      </nav>
    </>
  );
}
