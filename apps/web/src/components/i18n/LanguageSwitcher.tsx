"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { switchLocaleHref } from "@/i18n/routing";
import { getCopy } from "@/i18n/get-copy";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const ui = getCopy(locale).ui.lang;

  return (
    <div
      className="flex items-center gap-1 rounded border border-spray-border bg-spray-bg p-0.5 text-xs"
      role="group"
      aria-label={ui.label}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={switchLocaleHref(pathname, l)}
            className={`rounded px-2 py-1 font-medium transition ${
              active
                ? "bg-spray-orange text-black"
                : "text-spray-muted hover:text-white"
            }`}
            aria-current={active ? "page" : undefined}
            hrefLang={l}
          >
            {l === "ja" ? ui.ja : ui.en}
          </Link>
        );
      })}
    </div>
  );
}
