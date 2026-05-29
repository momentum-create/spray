import Link from "next/link";
import type { Copy } from "@/i18n/get-copy";
import type { Locale } from "@/i18n/config";
import {
  formatCatalogPriceJpy,
  getEnglishShopProductPath,
  getOfficialStoreNewArrivals,
} from "@/content/inbound/shop-catalog";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { malls, mallUrl } from "@/lib/shops";
import {
  HomeNewArrivalsCarousel,
  type NewArrivalCard,
} from "@/components/home/HomeNewArrivalsCarousel";

const NEW_ARRIVAL_COUNT = 6;
const OFFICIAL_UTM = "utm_source=spray166&utm_medium=site&utm_campaign=new_arrivals";

function officialProductHref(shopUrl: string): string {
  const sep = shopUrl.includes("?") ? "&" : "?";
  return `${shopUrl}${sep}${OFFICIAL_UTM}`;
}

type HomeNewArrivalsProps = { copy: Copy; locale: Locale; embedded?: boolean };

export function HomeNewArrivals({ copy, locale, embedded }: HomeNewArrivalsProps) {
  const englishShopEnabled = isInboundShopifyPocEnabled();
  const officialMall = malls.find((m) => m.id === "official")!;
  const products = getOfficialStoreNewArrivals(NEW_ARRIVAL_COUNT);

  const cards: NewArrivalCard[] = products.map((product) => {
    const englishHref = getEnglishShopProductPath(product.slug);
    const href = englishShopEnabled ? englishHref : officialProductHref(product.shopUrl);
    return {
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      imageUrl: product.imageUrl,
      priceLabel: formatCatalogPriceJpy(product.priceJpy, locale),
      href,
      ctaLabel: englishShopEnabled ? copy.home.arrivals.cta : copy.shop.malls.official.name,
      external: !englishShopEnabled,
    };
  });

  const content = (
    <>
      <div className="mb-4">
        <h2 className="section-label">{copy.home.ec.heading}</h2>
        <p className="mt-1 text-[10px] text-spray-muted">{copy.home.arrivals.note}</p>
      </div>

      {cards.length > 0 ? (
        <HomeNewArrivalsCarousel products={cards} />
      ) : (
        <div className="card-dark p-4 text-center">
          <p className="text-xs text-spray-muted">{copy.home.arrivals.note}</p>
          <Link
            href={englishShopEnabled ? "/en/products" : mallUrl(officialMall, locale)}
            className="mt-3 inline-block bg-[#0068b7] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white"
          >
            {englishShopEnabled ? copy.home.arrivals.cta : copy.shop.malls.official.name}
          </Link>
        </div>
      )}
    </>
  );

  if (embedded) {
    return <section>{content}</section>;
  }

  return (
    <section className="border-b border-spray-border bg-black py-8">
      <div className="mx-auto max-w-site px-4 md:px-6">{content}</div>
    </section>
  );
}
