import Image from "next/image";
import type { Copy } from "@/i18n/get-copy";
import type { Locale } from "@/i18n/config";
import { malls, mallUrl, type MallId } from "@/lib/shops";

const products = [
  {
    id: "snow",
    name: "SNOWBOARD (Snowboard)",
    mall: "rakuten" as const,
    image: "/images/product-snowboard.png",
  },
  {
    id: "skate1",
    name: "ELEMENT 86 (Skateboard)",
    mall: "yahoo" as const,
    image: "/images/product-skateboard-deck.png",
  },
  {
    id: "skate2",
    name: "SKATEBOARD (Skateboard)",
    mall: "official" as const,
    image: "/images/product-skateboard-complete.png",
  },
];

const mallBadgeClass: Record<MallId, string> = {
  rakuten: "bg-[#bf0000] text-white",
  yahoo: "bg-[#ff0033] text-white",
  official: "bg-[#0068b7] text-white",
};

const mallBadgeFallback: Record<MallId, string> = {
  rakuten: "Rakuten",
  yahoo: "YAHOO! JAPAN",
  official: "公式ストア",
};

type HomeNewArrivalsProps = { copy: Copy; locale: Locale; embedded?: boolean };

export function HomeNewArrivals({ copy, locale, embedded }: HomeNewArrivalsProps) {
  const content = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="section-label">{copy.home.ec.heading}</h2>
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {products.map((product) => {
          const mall = malls.find((m) => m.id === product.mall)!;
          const mallKey = product.mall;
          const badgeLabel = copy.shop.malls[mallKey].name || mallBadgeFallback[mallKey];
          return (
            <article key={product.id} className="card-dark flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 1024px) 33vw, 280px"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-spray-elevated p-2">
                <p className="text-[10px] font-bold uppercase leading-snug text-white">{product.name}</p>
                <a
                  href={mallUrl(mall, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 block py-1.5 text-center text-[9px] font-bold uppercase tracking-wider ${mallBadgeClass[mallKey]}`}
                >
                  {badgeLabel}
                </a>
              </div>
            </article>
          );
        })}
      </div>
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
