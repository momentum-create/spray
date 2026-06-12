import Image from "next/image";
import { notFound } from "next/navigation";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { brandLogos } from "@/content/brand-logos";
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
  const brand = brandLogos.find((b) => b.slug === slug);
  if (!brand) notFound();

  return (
    <article className="container-page py-12">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div className="flex h-32 w-32 items-center justify-center border border-spray-border bg-white p-4">
          <Image
            src={brand.image}
            alt={brand.name}
            width={120}
            height={120}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-spray-text">{brand.name}</h1>
          <p className="mt-2 text-sm text-spray-muted">{copy.brands.detailNote}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {malls.map((mall) => (
          <a
            key={mall.id}
            href={mallUrl(mall, locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange-outline min-h-11 text-sm"
          >
            {copy.shop.malls[mall.id as keyof typeof copy.shop.malls].name}
            {copy.brands.shopAt}
          </a>
        ))}
      </div>
      <LocaleLink
        href="/brands"
        locale={locale}
        className="mt-8 inline-block text-spray-blue hover:underline"
      >
        {copy.brands.backToList}
      </LocaleLink>
    </article>
  );
}
