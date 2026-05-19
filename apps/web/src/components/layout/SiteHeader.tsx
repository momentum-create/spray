"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import { getCopy } from "@/i18n/get-copy";
import { mallNavLabel, malls, mallUrl } from "@/lib/shops";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = getCopy(locale);
  const pathname = usePathname();
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMaintenance = pathname?.includes("/maintenance");

  const navLinks = [
    { key: "park", href: "/skatepark", ...copy.nav.park },
    { key: "school", href: "/school", ...copy.nav.school },
    { key: "maintenance", href: "/maintenance", ...copy.nav.maintenance },
    { key: "brands", href: "/brands", ...copy.nav.brands },
    { key: "about", href: "/about/access", ...copy.nav.about },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-spray-border bg-black">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-3 md:px-6">
        <LocaleLink href="/" locale={locale} className="shrink-0 font-display text-2xl font-black tracking-tight text-white">
          {copy.site.name}
        </LocaleLink>

        <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              type="button"
              className={`nav-item-label px-2 py-1 ${shopOpen ? "bg-spray-elevated" : ""}`}
              aria-expanded={shopOpen}
              aria-haspopup="true"
            >
              {copy.nav.shop.label}
              <span className="nav-item-sub">{copy.nav.shop.sub}</span>
            </button>
            {shopOpen ? (
              <div className="absolute left-0 top-full z-50 min-w-[220px] border border-spray-border bg-spray-elevated py-2 shadow-xl">
                {malls.map((mall) => (
                  <a
                    key={mall.id}
                    href={mallUrl(mall)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10"
                  >
                    {mallNavLabel(mall.id, copy, locale)}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {navLinks.map((item) => (
            <LocaleLink
              key={item.key}
              href={item.href}
              locale={locale}
              className={`nav-item-label px-2 py-1 hover:bg-spray-elevated ${
                item.key === "maintenance" && isMaintenance
                  ? "border border-spray-orange bg-spray-elevated"
                  : ""
              }`}
            >
              {item.label}
              <span className="nav-item-sub">{item.sub}</span>
            </LocaleLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="rounded border border-spray-border px-2 py-1 text-xs text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            MENU
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav className="border-t border-spray-border bg-black px-4 py-4 lg:hidden">
          <p className="section-label mb-2">{copy.nav.shop.label}</p>
          <div className="mb-4 flex flex-col gap-2">
            {malls.map((mall) => (
              <a
                key={mall.id}
                href={mallUrl(mall)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-orange-outline text-center"
              >
                {mallNavLabel(mall.id, copy, locale)}
              </a>
            ))}
          </div>
          {navLinks.map((item) => (
            <LocaleLink
              key={item.key}
              href={item.href}
              locale={locale}
              className="mt-3 block border-t border-spray-border pt-3"
              onClick={() => setMobileOpen(false)}
            >
              <span className="nav-item-label">{item.label}</span>
              <span className="nav-item-sub">{item.sub}</span>
            </LocaleLink>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
