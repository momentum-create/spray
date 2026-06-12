"use client";

import { useState } from "react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { HeaderNavItem } from "@/components/layout/HeaderNavItem";
import type { Locale } from "@/i18n/config";

export type NavDropdownItem = {
  href: string;
  label: string;
  external?: boolean;
};

type HeaderNavDropdownProps = {
  locale: Locale;
  label: string;
  sub?: string;
  items: NavDropdownItem[];
  footerLink?: { href: string; label: string };
};

export function HeaderNavDropdown({
  locale,
  label,
  sub,
  items,
  footerLink,
}: HeaderNavDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <HeaderNavItem
        as="button"
        label={label}
        sub={sub}
        active={open}
        aria-expanded={open}
        aria-haspopup
      />
      {open ? (
        <div className="absolute left-0 top-full z-50 min-w-[240px] border border-spray-border bg-spray-elevated py-2 shadow-xl">
          {items.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2.5 text-sm text-spray-text hover:bg-spray-surface"
              >
                {item.label}
              </a>
            ) : (
              <LocaleLink
                key={item.href}
                href={item.href}
                locale={locale}
                className="block px-4 py-2.5 text-sm text-spray-text hover:bg-spray-surface"
              >
                {item.label}
              </LocaleLink>
            ),
          )}
          {footerLink ? (
            <LocaleLink
              href={footerLink.href}
              locale={locale}
              className="mt-1 block border-t border-spray-border px-4 py-2.5 text-xs font-bold text-spray-orange hover:underline"
            >
              {footerLink.label}
            </LocaleLink>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
