import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/ui/PageHero";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";
import { malls, mallUrl } from "@/lib/shops";

type PageProps = { params: Promise<{ locale: string }> };

export default async function ShopPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);

  return (
    <>
      <PageHero title={copy.shop.title} lead={copy.shop.lead} />
      <div className="container-page grid gap-6 md:grid-cols-3">
        {malls.map((mall) => (
          <a
            key={mall.id}
            href={mallUrl(mall)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-spray-border bg-spray-surface p-8 hover:border-spray-orange"
          >
            <h2 className="text-lg font-bold">
              {copy.shop.malls[mall.id as keyof typeof copy.shop.malls].name}
            </h2>
            <p className="mt-2 text-sm text-spray-muted">
              {copy.shop.malls[mall.id as keyof typeof copy.shop.malls].feature}
            </p>
          </a>
        ))}
      </div>
      <div className="container-page pb-12">
        <LocaleLink href="/" locale={locale} className="text-spray-blue hover:underline">
          {copy.shop.backHome}
        </LocaleLink>
      </div>
    </>
  );
}
