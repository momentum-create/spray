import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { getSiteFacts } from "@/content/get-site-facts";

type Props = {
  locale: Locale;
  copy: Copy;
};

const links = [
  { href: "/skatepark/calendar", labelKey: "calendar" as const },
  { href: "/skatepark/prices", labelKey: "prices" as const },
  { href: "/skatepark/first-timers", labelKey: "firstTimers" as const },
] as const;

/** パーク写真の下 — 営業情報と明確な導線のみ（ダミーカレンダー・仮料金は出さない） */
export function HomeSkateparkShortcuts({ locale, copy }: Props) {
  const facts = getSiteFacts(locale);
  const q = copy.home.parkQuick;

  return (
    <section className="border border-spray-border bg-[#141414] p-4">
      <h3 className="section-label mb-3">{q.heading}</h3>
      <p className="text-xs text-spray-muted">
        <span className="font-bold text-white">{q.hoursLabel}</span>
        <br />
        {facts.hours.label}（{facts.hours.closedDay}
        {locale === "ja" ? "定休" : " closed"}）
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-spray-muted">{q.priceLead}</p>
      <ul className="mt-4 space-y-2">
        {links.map((item) => (
          <li key={item.href}>
            <LocaleLink
              href={item.href}
              locale={locale}
              className="btn-orange-outline block w-full text-center text-[11px]"
            >
              {q[item.labelKey]}
            </LocaleLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
