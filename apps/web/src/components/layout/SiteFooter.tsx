import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import { getCopy } from "@/i18n/get-copy";
import { getSiteFacts } from "@/content/get-site-facts";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const copy = getCopy(locale);
  const { address, contact, hours, social } = getSiteFacts(locale);

  return (
    <footer className="border-t border-spray-border bg-black">
      <div className="mx-auto grid max-w-site gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <p className="section-label mb-2">{copy.home.contactInfo}</p>
          <p className="text-xs text-spray-muted">{address.full}</p>
          <p className="mt-1 text-xs text-spray-muted">
            <a href={contact.telLink} className="hover:text-white">
              {contact.tel}
            </a>
          </p>
        </div>
        <div>
          <p className="section-label mb-2">{copy.home.openingHours}</p>
          <p className="text-xs font-bold text-white">{hours.label}</p>
          <p className="text-xs text-spray-muted">{hours.closedDay}</p>
        </div>
        <div>
          <p className="section-label mb-2">{copy.home.social}</p>
          <div className="flex gap-3">
            <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-xs uppercase text-white hover:text-spray-orange">
              Instagram
            </a>
            <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-xs uppercase text-white hover:text-spray-orange">
              Facebook
            </a>
            <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="text-xs uppercase text-white hover:text-spray-orange">
              YouTube
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-spray-border py-4 text-center">
        <p className="text-[10px] text-spray-muted">{copy.footer.copyright(year)}</p>
        <LocaleLink href="/legal/privacy" locale={locale} className="mt-1 inline-block text-[10px] text-spray-muted hover:text-white">
          {copy.footer.privacy}
        </LocaleLink>
      </div>
    </footer>
  );
}
