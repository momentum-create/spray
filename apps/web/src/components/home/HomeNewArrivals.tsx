import Image from "next/image";
import type { Copy } from "@/i18n/get-copy";
import type { Locale } from "@/i18n/config";
import {
  formatCatalogPriceJpy,
  getOfficialStoreNewArrivals,
} from "@/content/inbound/shop-catalog";
import { malls, mallUrl } from "@/lib/shops";

const NEW_ARRIVAL_COUNT = 3;
const OFFICIAL_UTM = "utm_source=spray166&utm_medium=site&utm_campaign=new_arrivals";

function officialProductHref(shopUrl: string): string {
  const sep = shopUrl.includes("?") ? "&" : "?";
  return `${shopUrl}${sep}${OFFICIAL_UTM}`;
}

type HomeNewArrivalsProps = { copy: Copy; locale: Locale; embedded?: boolean };

export function HomeNewArrivals({ copy, locale, embedded }: HomeNewArrivalsProps) {
  const products = getOfficialStoreNewArrivals(NEW_ARRIVAL_COUNT);
  const officialMall = malls.find((m) => m.id === "official")!;
  const badgeLabel = copy.shop.malls.official.name;

  const content = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="section-label">{copy.home.ec.heading}</h2>
          <p className="mt-1 text-[10px] text-spray-muted">{copy.home.arrivals.note}</p>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center bg-spray-orange text-white"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center bg-spray-orange text-white"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {products.map((product) => (
            <article key={product.slug} className="card-dark flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 1024px) 33vw, 280px"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-spray-elevated p-2">
                <div>
                  <p className="text-[10px] font-bold uppercase leading-snug text-white">
                    {product.brand}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[9px] leading-snug text-white/85">
                    {product.name}
                  </p>
                  <p className="mt-1 text-[9px] font-bold leading-snug text-spray-orange">
                    {formatCatalogPriceJpy(product.priceJpy, locale)}
                  </p>
                </div>
                <a
                  href={officialProductHref(product.shopUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block bg-[#0068b7] py-1.5 text-center text-[9px] font-bold uppercase tracking-wider text-white"
                >
                  {badgeLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="card-dark p-4 text-center">
          <p className="text-xs text-spray-muted">{copy.home.arrivals.note}</p>
          <a
            href={mallUrl(officialMall, locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block bg-[#0068b7] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white"
          >
            {badgeLabel}
          </a>
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
