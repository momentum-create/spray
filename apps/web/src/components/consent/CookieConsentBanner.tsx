"use client";

import { useEffect, useState } from "react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import {
  CONSENT_STORAGE_KEY,
  getConsent,
  loadGa4,
  setConsent,
  type ConsentValue,
} from "@/lib/analytics";

export type ConsentBannerCopy = {
  title: string;
  body: string;
  accept: string;
  deny: string;
  details: string;
};

type Props = {
  locale: Locale;
  banner: ConsentBannerCopy;
  /** When set, re-opens the banner (footer "Cookie settings") */
  forceOpen?: boolean;
  onClose?: () => void;
};

export function CookieConsentBanner({ locale, banner: c, forceOpen, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (existing === "granted") loadGa4();
    if (forceOpen || existing === null) setVisible(true);
  }, [forceOpen]);

  function choose(value: ConsentValue) {
    setConsent(value);
    setVisible(false);
    onClose?.();
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed bottom-16 left-0 right-0 z-50 border-t border-spray-border bg-spray-bg/95 p-4 backdrop-blur md:bottom-0"
    >
      <div className="mx-auto flex max-w-site flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p id="cookie-banner-title" className="text-sm font-bold text-spray-text">
            {c.title}
          </p>
          <p id="cookie-banner-desc" className="text-xs text-spray-muted">
            {c.body}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="btn-park min-h-11 px-4"
            onClick={() => choose("granted")}
          >
            {c.accept}
          </button>
          <button
            type="button"
            className="min-h-11 rounded border border-spray-border px-4 py-2 text-xs font-bold text-spray-text hover:border-spray-orange"
            onClick={() => choose("denied")}
          >
            {c.deny}
          </button>
          <LocaleLink
            href="/legal/privacy"
            locale={locale}
            className="min-h-11 px-2 py-2 text-xs text-spray-blue hover:underline"
          >
            {c.details}
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}

export { CONSENT_STORAGE_KEY };
