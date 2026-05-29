import Image from "next/image";
import Link from "next/link";
import { brandLogos } from "@/content/brand-logos";
import { shopBrandPath } from "@/content/inbound/shop-taxonomy";

type ShopBrandGridProps = {
  slugs?: readonly string[];
};

export function ShopBrandGrid({ slugs }: ShopBrandGridProps) {
  const brands = slugs
    ? slugs
        .map((slug) => brandLogos.find((brand) => brand.slug === slug))
        .filter((brand): brand is (typeof brandLogos)[number] => Boolean(brand))
    : [...brandLogos];

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
      {brands.map((brand) => {
        const href = shopBrandPath(brand.slug) ?? `/en/products/brands/${brand.slug}`;
        const external = href.startsWith("http");

        const tile = (
          <div className="flex aspect-square items-center justify-center border border-[#e8e8e8] bg-white p-3 transition hover:border-black">
            <Image
              src={brand.image}
              alt={brand.name}
              width={96}
              height={96}
              className="max-h-full max-w-full object-contain"
              unoptimized={brand.image.endsWith(".gif")}
            />
          </div>
        );

        if (external) {
          return (
            <a
              key={brand.slug}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={brand.name}
            >
              {tile}
            </a>
          );
        }

        return (
          <Link key={brand.slug} href={href} title={brand.name}>
            {tile}
          </Link>
        );
      })}
    </div>
  );
}
