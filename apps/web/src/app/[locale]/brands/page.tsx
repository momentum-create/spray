import { BrandsCatalog } from "@/components/brands/BrandsCatalog";
import { PageHero } from "@/components/ui/PageHero";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function BrandsPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);

  return (
    <>
      <PageHero title={copy.brands.title} lead={copy.brands.lead} />
      <div className="container-page pb-12">
        <BrandsCatalog locale={locale} copy={copy} />
      </div>
    </>
  );
}
