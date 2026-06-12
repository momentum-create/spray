import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";

type Props = { locale: Locale; copy: Copy };

export function SchoolBookingView({ locale, copy }: Props) {
  const p = copy.school.bookingPage;

  return (
    <>
      <PageHero title={copy.school.booking.title} lead={copy.school.booking.lead} />
      <div className="container-page max-w-3xl space-y-10 pb-12">
        <section>
          <h2 className="text-xl font-bold text-white">{p.flowTitle}</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-spray-muted">
            <li>{p.step1}</li>
            <li>{p.step2}</li>
            <li>{p.step3}</li>
          </ol>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">{p.contactTitle}</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={copy.footer.telLink} className="btn-park min-h-11 px-4">
              {copy.footer.tel}
            </a>
            <LocaleLink href="/about/access#contact" locale={locale} className="btn-shop-outline min-h-11 px-4">
              {copy.ui.contactCta}
            </LocaleLink>
            <span className="inline-flex min-h-11 items-center rounded border border-spray-border px-4 text-xs text-spray-muted">
              {p.onlineSoon}
            </span>
          </div>
        </section>
        <LocaleLink href="/school" locale={locale} className="text-sm text-spray-blue hover:underline">
          ← {copy.school.title}
        </LocaleLink>
      </div>
    </>
  );
}
