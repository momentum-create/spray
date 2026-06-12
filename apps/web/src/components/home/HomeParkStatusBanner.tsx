import { LocaleLink } from "@/components/i18n/LocaleLink";
import { getSiteFacts } from "@/content/get-site-facts";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";

type Props = { locale: Locale; copy: Copy };

const styles = {
  open: "border-green-600/50 bg-green-950/40",
  limited: "border-amber-500/50 bg-amber-950/40",
  closed: "border-red-600/50 bg-red-950/40",
} as const;

export function HomeParkStatusBanner({ locale, copy }: Props) {
  const { parkStatus } = getSiteFacts(locale);
  const b = copy.home.parkStatusBanner;
  const state = parkStatus.state;
  const label =
    state === "open" ? b.labelOpen : state === "limited" ? b.labelLimited : b.labelClosed;
  const message = locale === "ja" ? parkStatus.messageJa : parkStatus.messageEn;

  return (
    <div
      className={`mx-auto max-w-site border px-4 py-3 ${styles[state]}`}
      role="status"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-white">{label}</p>
          {message ? <p className="text-sm text-spray-muted">{message}</p> : null}
        </div>
        <LocaleLink
          href="/skatepark/calendar"
          locale={locale}
          className="text-sm text-spray-blue hover:underline"
        >
          {b.details} →
        </LocaleLink>
      </div>
    </div>
  );
}
