"use client";

import { useState } from "react";
import { CookieConsentBanner } from "@/components/consent/CookieConsentBanner";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";
import type { ConsentBannerCopy } from "@/components/consent/CookieConsentBanner";

type Props = {
  locale: Locale;
  cookieSettingsLabel: string;
  banner: ConsentBannerCopy;
};

export function FooterConsent({ locale, cookieSettingsLabel, banner }: Props) {
  const [showBanner, setShowBanner] = useState(false);

  return (
    <>
      <button
        type="button"
        className="mt-1 text-[10px] text-spray-muted hover:text-spray-text"
        onClick={() => setShowBanner(true)}
      >
        {cookieSettingsLabel}
      </button>
      {showBanner ? (
        <CookieConsentBanner
          locale={locale}
          banner={banner}
          forceOpen
          onClose={() => setShowBanner(false)}
        />
      ) : null}
    </>
  );
}

export function FooterLegalLink({
  href,
  label,
  locale,
  external,
  eventName,
}: {
  href: string;
  label: string;
  locale: Locale;
  external?: boolean;
  eventName?: string;
}) {
  const className =
    "inline-flex min-h-11 items-center px-1 py-2 text-xs text-spray-muted hover:text-spray-text";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={() => eventName && trackEvent(eventName, { source: "footer" })}
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href={`/${locale}${href.startsWith("/") ? href : `/${href}`}`}
      className={className}
      onClick={() => eventName && trackEvent(eventName, { source: "footer" })}
    >
      {label}
    </a>
  );
}
