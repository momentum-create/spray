import Link from "next/link";
import { getSnowboardBrandProductCount, getSnowboardBrandsWithStock } from "@/content/inbound/snowboard-catalog.en";

export function SnowboardBrandGrid() {
  const brands = getSnowboardBrandsWithStock();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {brands.map((brand) => (
        <Link
          key={brand.slug}
          href={`/en/products/categories/snowboard/brands/${brand.slug}`}
          className="flex items-center justify-between border border-[#e8e8e8] bg-white px-4 py-4 transition hover:border-black"
        >
          <span className="font-medium text-black">{brand.name}</span>
          <span className="text-xs text-black/45">{getSnowboardBrandProductCount(brand.slug)} items</span>
        </Link>
      ))}
    </div>
  );
}
