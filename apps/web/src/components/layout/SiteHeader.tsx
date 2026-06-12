"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import { getCopy } from "@/i18n/get-copy";
import { mallNavLabel, malls, mallUrl } from "@/lib/shops";
import { HeaderNavDropdown } from "@/components/layout/HeaderNavDropdown";
import { HeaderNavItem } from "@/components/layout/HeaderNavItem";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = getCopy(locale);
  const pathname = usePathname();
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMaintenance = pathname?.includes("/maintenance");
  const headerMallOrder = ["official", "rakuten", "yahoo"] as const;
  const headerMalls = headerMallOrder
    .map((id) => malls.find((mall) => mall.id === id))
    .filter((mall): mall is (typeof malls)[number] => Boolean(mall));

  const parkItems = [
    { href: "/skatepark/facility", label: copy.skatepark.facility.title },
    { href: "/skatepark/prices", label: copy.skatepark.prices.title },
    { href: "/skatepark/calendar", label: copy.skatepark.calendar.title },
    { href: "/skatepark/rules", label: copy.skatepark.rules.title },
    { href: "/skatepark/first-timers", label: copy.skatepark.firstTimers.title },
  ];

  const schoolItems = [
    { href: "/school/lessons", label: copy.school.links.lessons },
    { href: "/school/camp", label: copy.school.links.camp },
    { href: "/school/instructors", label: copy.school.links.instructors },
    { href: "/school/booking", label: copy.school.booking.title },
  ];

  const aboutItems = [
    { href: "/about/access", label: copy.about.access.title },
    { href: "/about/staff", label: copy.about.staff.title },
    { href: "/about/story", label: copy.about.story.title },
    { href: "/about/calendar", label: copy.about.calendar.title },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-spray-border bg-spray-bg">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-3 md:px-6">
        <LocaleLink
          href="/"
          locale={locale}
          className="shrink-0 font-display text-2xl font-black tracking-tight text-spray-text"
        >
          {copy.site.name}
        </LocaleLink>

        <nav className="hidden flex-1 items-end justify-center gap-4 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <HeaderNavItem
              as="button"
              label={copy.nav.shop.label}
              sub={copy.nav.shop.sub}
              active={shopOpen}
              aria-expanded={shopOpen}
              aria-haspopup
            />
            {shopOpen ? (
              <div className="absolute left-0 top-full z-50 w-[min(100vw-2rem,320px)] border border-spray-border bg-spray-elevated py-2 shadow-xl">
                {headerMalls.map((mall) => {
                  const mallCopy = copy.shop.malls[mall.id];
                  return (
                    <a
                      key={mall.id}
                      href={mallUrl(mall, locale)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 hover:bg-spray-surface"
                    >
                      <span className="block text-sm font-bold text-spray-text">
                        {mallNavLabel(mall.id, copy, locale)}
                      </span>
                      <span className="mt-1 block text-xs text-spray-muted">
                        {mallCopy.feature}
                      </span>
                    </a>
                  );
                })}
                <LocaleLink
                  href="/shop"
                  locale={locale}
                  className="mt-1 block border-t border-spray-border px-4 py-2.5 text-xs font-bold text-spray-orange hover:underline"
                >
                  {copy.nav.shop.hub}
                </LocaleLink>
              </div>
            ) : null}
          </div>

          <HeaderNavDropdown
            locale={locale}
            label={copy.nav.park.label}
            sub={copy.nav.park.sub}
            items={parkItems}
            footerLink={{ href: "/skatepark", label: copy.skatepark.title }}
          />

          <HeaderNavDropdown
            locale={locale}
            label={copy.nav.school.label}
            sub={copy.nav.school.sub}
            items={schoolItems}
            footerLink={{ href: "/school", label: copy.school.title }}
          />

          <HeaderNavItem
            as="link"
            href="/maintenance"
            locale={locale}
            label={copy.nav.maintenance.label}
            sub={copy.nav.maintenance.sub}
            current={Boolean(isMaintenance)}
          />

          <HeaderNavItem
            as="link"
            href="/brands"
            locale={locale}
            label={copy.nav.brands.label}
            sub={copy.nav.brands.sub}
          />

          <HeaderNavDropdown
            locale={locale}
            label={copy.nav.about.label}
            sub={copy.nav.about.sub}
            items={aboutItems}
          />
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="min-h-11 rounded border border-spray-border px-3 py-1 text-xs text-spray-text lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? copy.nav.closeMenu : copy.nav.menu}
          >
            {mobileOpen ? copy.nav.closeMenu : copy.nav.menu}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav className="max-h-[80vh] overflow-y-auto border-t border-spray-border bg-spray-bg px-4 py-4 lg:hidden">
          <p className="section-label mb-2">{copy.nav.shop.label}</p>
          <div className="mb-2 flex flex-col gap-2">
            {headerMalls.map((mall) => (
              <a
                key={mall.id}
                href={mallUrl(mall, locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-orange-outline min-h-11 text-center"
              >
                {mallNavLabel(mall.id, copy, locale)}
              </a>
            ))}
          </div>
          <LocaleLink
            href="/shop"
            locale={locale}
            className="mb-4 block text-center text-xs font-bold text-spray-orange"
            onClick={() => setMobileOpen(false)}
          >
            {copy.nav.shop.hub}
          </LocaleLink>

          <p className="section-label mb-2">{copy.nav.park.label}</p>
          {parkItems.map((item) => (
            <LocaleLink
              key={item.href}
              href={item.href}
              locale={locale}
              className="block min-h-11 py-2 text-sm text-spray-text"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </LocaleLink>
          ))}

          <p className="section-label mb-2 mt-4">{copy.nav.school.label}</p>
          {schoolItems.map((item) => (
            <LocaleLink
              key={item.href}
              href={item.href}
              locale={locale}
              className="block min-h-11 py-2 text-sm text-spray-text"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </LocaleLink>
          ))}

          <div className="mt-4 border-t border-spray-border pt-4">
            <LocaleLink
              href="/maintenance"
              locale={locale}
              className="block min-h-11 py-2 font-bold text-spray-text"
              onClick={() => setMobileOpen(false)}
            >
              {copy.nav.maintenance.label}
            </LocaleLink>
            <LocaleLink
              href="/brands"
              locale={locale}
              className="block min-h-11 py-2 font-bold text-spray-text"
              onClick={() => setMobileOpen(false)}
            >
              {copy.nav.brands.label}
            </LocaleLink>
            <p className="section-label mb-2 mt-2">{copy.nav.about.label}</p>
            {aboutItems.map((item) => (
              <LocaleLink
                key={item.href}
                href={item.href}
                locale={locale}
                className="block min-h-11 py-2 text-sm text-spray-text"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </LocaleLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
