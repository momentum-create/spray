import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";

type Section = { heading: string; body: string };

type LegalPageProps = {
  locale: Locale;
  copy: Copy;
  title: string;
  lead?: string;
  sections: Section[];
  updated?: string;
};

export function LegalPage({ locale, copy, title, lead, sections, updated }: LegalPageProps) {
  return (
    <>
      <PageHero title={title} lead={lead} />
      <div className="container-page max-w-2xl space-y-8 pb-12">
        {updated ? (
          <p className="text-sm text-spray-muted">
            {copy.legal.updatedLabel}: {updated}
          </p>
        ) : null}
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-bold text-spray-text">{section.heading}</h2>
            <p className="mt-2 whitespace-pre-line text-spray-muted">{section.body}</p>
          </section>
        ))}
        <p>
          <LocaleLink href="/" locale={locale} className="text-sm text-spray-blue hover:underline">
            ← {copy.errors.notFound.cta}
          </LocaleLink>
        </p>
      </div>
    </>
  );
}
