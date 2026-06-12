"use client";

import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import type { MallId } from "@/lib/shops";
import { trackEvent } from "@/lib/analytics";
import { mallLegalLinks, mallNavLabel } from "@/lib/shops";

type Props = { locale: Locale; copy: Copy };

export function ShopLegalBlock({ locale, copy }: Props) {
  const s = copy.shop.legal;

  const linkLabels = {
    tokusho: s.tokushoLabel,
    info: s.infoLabel,
    guide: s.guideLabel,
  };
  const cards: { id: MallId; links: ReturnType<typeof mallLegalLinks> }[] = [
    { id: "official", links: mallLegalLinks("official", locale, linkLabels) },
    { id: "rakuten", links: mallLegalLinks("rakuten", locale, linkLabels) },
    { id: "yahoo", links: mallLegalLinks("yahoo", locale, linkLabels) },
  ];

  return (
    <section aria-labelledby="shop-legal-heading">
      <h2 id="shop-legal-heading" className="section-label mb-2">
        {s.title}
      </h2>
      <p className="mb-6 text-sm text-spray-muted">{s.lead}</p>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(({ id, links }) => (
          <div
            key={id}
            className="flex flex-col rounded border border-spray-border bg-spray-surface p-4"
          >
            <h3 className="font-bold text-spray-text">{mallNavLabel(id, copy, locale)}</h3>
            <p className="mt-2 flex-1 text-sm text-spray-muted">
              {id === "official"
                ? s.officialNote
                : id === "rakuten"
                  ? s.rakutenNote
                  : s.yahooNote}
            </p>
            <ul
              className="mt-4 space-y-2 text-sm"
              aria-label={`${mallNavLabel(id, copy, locale)} — ${s.linksLabel}`}
            >
              {links.map((link) =>
                link.internal ? (
                  <li key={link.href}>
                    <LocaleLink
                      href={link.href}
                      locale={locale}
                      className="text-spray-blue hover:underline"
                      onClick={() =>
                        trackEvent("legal_tokusho_click", { source: "shop", mall: id })
                      }
                    >
                      {link.label}
                    </LocaleLink>
                  </li>
                ) : (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-spray-blue hover:underline"
                      onClick={() =>
                        trackEvent(
                          link.kind === "tokusho" ? "legal_tokusho_click" : "legal_info_click",
                          { source: "shop", mall: id },
                        )
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-spray-muted">{s.disclaimer}</p>
      <p className="mt-2 text-xs text-spray-muted">{s.footerHint}</p>
    </section>
  );
}
