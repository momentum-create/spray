import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/ui/PageHero";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { getSiteFacts } from "@/content/get-site-facts";

type GuidePageProps = {
  locale: Locale;
  copy: Copy;
  title: string;
  lead?: string;
  body: string;
  parent?: { href: string; label: string };
};

export function GuidePage({ locale, copy, title, lead, body, parent }: GuidePageProps) {
  const { contact } = getSiteFacts(locale);

  return (
    <>
      <PageHero title={title} lead={lead} />
      <div className="container-page max-w-2xl space-y-8 pb-12">
        {parent ? (
          <p>
            <LocaleLink href={parent.href} locale={locale} className="text-sm text-spray-blue hover:underline">
              ← {parent.label}
            </LocaleLink>
          </p>
        ) : null}
        <p className="text-spray-muted">{body}</p>
        <div className="flex flex-wrap gap-3">
          <LocaleLink href="/about/access" locale={locale} className="btn-park">
            {copy.ui.contactCta}
          </LocaleLink>
          <a href={contact.telLink} className="btn-shop-outline">
            {copy.ui.phoneCta} {contact.tel}
          </a>
        </div>
      </div>
    </>
  );
}
