import { LocaleLink } from "@/components/i18n/LocaleLink";
import { FooterConsent, FooterLegalLink } from "@/components/layout/FooterConsent";
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
  const f = copy.footer;
  const l = f.legal;

  const navLinks = [
    { href: "/shop", label: f.shop },
    { href: "/skatepark", label: f.park },
    { href: "/school", label: f.school },
    { href: "/maintenance", label: f.maintenance },
    { href: "/brands", label: f.brands },
    { href: "/about/access", label: f.access },
    { href: "/news", label: f.news },
  ] as const;

  return (
    <footer className="border-t border-spray-border bg-spray-surface">
      <div className="mx-auto grid max-w-site gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <div>
          <p className="section-label mb-3">{f.navTitle}</p>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <LocaleLink
                  href={link.href}
                  locale={locale}
                  className="text-xs text-spray-muted hover:text-spray-text"
                >
                  {link.label}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="section-label mb-2">{copy.home.contactInfo}</p>
          <p className="text-xs text-spray-muted">{address.full}</p>
          <p className="mt-1 text-xs text-spray-muted">
            <a href={contact.telLink} className="hover:text-spray-text">
              {contact.tel}
            </a>
          </p>
        </div>
        <div>
          <p className="section-label mb-2">{copy.home.openingHours}</p>
          <p className="text-xs font-bold text-spray-text">{hours.label}</p>
          <p className="text-xs text-spray-muted">{hours.closedDay}</p>
        </div>
        <div>
          <p className="section-label mb-2">{copy.home.social}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase text-spray-text hover:text-spray-orange"
            >
              Instagram
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase text-spray-text hover:text-spray-orange"
            >
              Facebook
            </a>
            <a
              href={social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase text-spray-text hover:text-spray-orange"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
      <nav
        aria-label={f.legalNavTitle}
        className="border-t border-spray-border px-4 py-3"
      >
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <FooterLegalLink
            href="/legal/tokusho"
            label={l.tokusho}
            locale={locale}
            eventName="legal_tokusho_click"
          />
          <FooterLegalLink
            href="/legal/company"
            label={l.company}
            locale={locale}
          />
          <FooterLegalLink
            href="/legal/privacy"
            label={l.privacy}
            locale={locale}
          />
          <FooterLegalLink
            href="/about/access"
            label={l.contact}
            locale={locale}
          />
        </div>
      </nav>
      <div className="border-t border-spray-border py-4 text-center">
        <p className="text-[10px] text-spray-muted">© {year} {f.copyright}</p>
        <FooterConsent
          locale={locale}
          cookieSettingsLabel={f.cookieSettings}
          banner={copy.consent.banner}
        />
      </div>
    </footer>
  );
}
