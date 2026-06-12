import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/ui/PageHero";
import { getSiteFacts } from "@/content/get-site-facts";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";

type Props = { locale: Locale; copy: Copy };

export function SchoolLessonsView({ locale, copy }: Props) {
  const p = copy.school.lessonsPage;
  const { contact } = getSiteFacts(locale);

  return (
    <>
      <PageHero title={copy.school.links.lessons} lead={copy.school.lead} />
      <div className="container-page max-w-3xl space-y-10 pb-12">
        <p className="text-spray-muted">{p.intro}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: p.privateTitle, body: p.privateBody },
            { title: p.groupTitle, body: p.groupBody },
            { title: p.dualTitle, body: p.dualBody },
          ].map((card) => (
            <div
              key={card.title}
              className="border border-spray-border bg-spray-surface p-6"
            >
              <h2 className="text-lg font-bold text-white">{card.title}</h2>
              <p className="mt-2 text-sm text-spray-muted">{card.body}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <LocaleLink href="/school/booking" locale={locale} className="btn-park">
            {p.ctaBooking}
          </LocaleLink>
          <a href={contact.telLink} className="btn-shop-outline min-h-11 inline-flex items-center px-4">
            {copy.ui.phoneCta}
          </a>
        </div>
        <LocaleLink href="/school" locale={locale} className="text-sm text-spray-blue hover:underline">
          ← {copy.school.title}
        </LocaleLink>
      </div>
    </>
  );
}
