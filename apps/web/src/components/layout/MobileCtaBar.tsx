import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import { getCopy } from "@/i18n/get-copy";

type MobileCtaBarProps = {
  locale: Locale;
};

export function MobileCtaBar({ locale }: MobileCtaBarProps) {
  const copy = getCopy(locale);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-0 border-t border-spray-border bg-black md:hidden">
      <LocaleLink href="/skatepark" locale={locale} className="btn-park flex-1 justify-center py-3 text-center text-[10px]">
        {copy.cta.park}
      </LocaleLink>
      <LocaleLink href="/shop" locale={locale} className="btn-shop-outline flex-1 justify-center border-0 border-l border-spray-border py-3 text-center text-[10px]">
        {copy.cta.shop}
      </LocaleLink>
    </div>
  );
}
