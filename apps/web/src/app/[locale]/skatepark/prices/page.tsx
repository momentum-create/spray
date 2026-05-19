import { PageHero } from "@/components/ui/PageHero";
import { getSiteFacts } from "@/content/get-site-facts";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function SkateparkPricesPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  const { hours, skatepark } = getSiteFacts(locale);
  const labels = copy.skatepark.prices;

  return (
    <>
      <PageHero title={labels.title} lead={copy.skatepark.lead} />
      <section className="container-page space-y-8 pb-12">
        <dl className="grid gap-2 text-sm sm:grid-cols-[8rem_1fr]">
          <dt className="text-spray-muted">{labels.storeHours}</dt>
          <dd>
            {hours.label} ({labels.closedPrefix}: {hours.closedDay})
          </dd>
        </dl>
        <p className="text-sm text-spray-muted">{skatepark.priceNote}</p>
        <figure>
          <a
            href={skatepark.priceImageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg border border-spray-border"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={skatepark.priceImageUrl}
              alt={labels.priceAlt}
              className="w-full max-w-md"
            />
          </a>
          <figcaption className="mt-2 text-xs text-spray-muted">
            {labels.priceCaption}
          </figcaption>
        </figure>
      </section>
    </>
  );
}
