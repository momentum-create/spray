import Link from "next/link";
import { getCategoryBrands, getCategoryProductsByBrand } from "@/content/inbound/shop-catalog";

export function SnowboardBrandGrid() {
  const brands = getCategoryBrands("snowboard");

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {brands.map((brand) => (
        <Link
          key={brand.slug}
          href={`/en/products/categories/snowboard/brands/${brand.slug}`}
          className="flex items-center justify-between border border-[#e8e8e8] bg-white px-4 py-4 transition hover:border-black"
        >
          <span className="font-medium text-black">{brand.name}</span>
          <span className="text-xs text-black/45">
            {getCategoryProductsByBrand("snowboard", brand.slug).length} items
          </span>
        </Link>
      ))}
    </div>
  );
}
