import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";

type Props = { locale: Locale; copy: Copy };

export function NotFoundView({ locale, copy }: Props) {
  const e = copy.errors.notFound;

  return (
    <div className="container-page flex min-h-[50vh] max-w-lg flex-col items-center justify-center py-16 text-center">
      <h1 className="text-2xl font-bold text-spray-text">{e.title}</h1>
      <p className="mt-4 text-spray-muted">{e.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LocaleLink href="/" locale={locale} className="btn-park min-h-11 px-6">
          {e.cta}
        </LocaleLink>
        <LocaleLink href="/shop" locale={locale} className="btn-shop-outline min-h-11 px-6">
          {e.ctaShop}
        </LocaleLink>
      </div>
      <LocaleLink
        href="/skatepark"
        locale={locale}
        className="mt-4 text-sm text-spray-blue hover:underline"
      >
        {e.ctaPark} →
      </LocaleLink>
    </div>
  );
}
