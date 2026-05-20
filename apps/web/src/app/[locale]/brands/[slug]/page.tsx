import { LocaleLink } from "@/components/i18n/LocaleLink";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";
import { malls, mallUrl } from "@/lib/shops";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function BrandDetailPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = await resolveLocale(Promise.resolve({ locale: raw }));
  const copy = getCopy(locale);

  return (
    <article className="container-page py-12">
      <h1 className="text-3xl font-bold capitalize">{slug}</h1>
      <p className="mt-4 text-spray-muted">{copy.brands.detailNote}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        {malls.map((mall) => (
          <a
            key={mall.id}
            href={mallUrl(mall, locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange-outline text-sm"
          >
            {copy.shop.malls[mall.id as keyof typeof copy.shop.malls].name}
            {copy.brands.shopAt}
          </a>
        ))}
      </div>
      <LocaleLink href="/brands" locale={locale} className="mt-8 inline-block text-spray-blue hover:underline">
        {copy.brands.backToList}
      </LocaleLink>
    </article>
  );
}
