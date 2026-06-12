import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";

type Props = { locale: Locale; copy: Copy };

export function SchoolCampView({ locale, copy }: Props) {
  const p = copy.school.campPage;

  return (
    <>
      <PageHero title={copy.school.links.camp} lead={copy.school.guides.camp} />
      <div className="container-page max-w-3xl space-y-10 pb-12">
        <p className="text-spray-muted">{p.intro}</p>
        <section>
          <h2 className="text-xl font-bold text-white">{p.scheduleTitle}</h2>
          <p className="mt-2 text-spray-muted">{p.scheduleBody}</p>
          <LocaleLink href="/news" locale={locale} className="mt-3 inline-block text-spray-blue hover:underline">
            {p.scheduleCta} →
          </LocaleLink>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">{p.faqTitle}</h2>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="font-bold text-white">{p.faq1q}</dt>
              <dd className="mt-1 text-sm text-spray-muted">{p.faq1a}</dd>
            </div>
            <div>
              <dt className="font-bold text-white">{p.faq2q}</dt>
              <dd className="mt-1 text-sm text-spray-muted">{p.faq2a}</dd>
            </div>
          </dl>
        </section>
        <LocaleLink href="/about/access" locale={locale} className="btn-park">
          {copy.ui.contactCta}
        </LocaleLink>
        <LocaleLink href="/school" locale={locale} className="block text-sm text-spray-blue hover:underline">
          ← {copy.school.title}
        </LocaleLink>
      </div>
    </>
  );
}
