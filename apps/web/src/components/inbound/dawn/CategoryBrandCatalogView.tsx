import Link from "next/link";
import { CatalogProductCard } from "@/components/inbound/dawn/CatalogProductCard";
import {
  categoryPath,
  getCategoryBrand,
  getCategoryMeta,
  getCategoryProductsByBrand,
} from "@/content/inbound/shop-catalog";

type CategoryBrandCatalogViewProps = {
  categorySlug: string;
  brandSlug: string;
  pocCollectionHref?: string;
  pocCollectionLabel?: string;
};

export function CategoryBrandCatalogView({
  categorySlug,
  brandSlug,
  pocCollectionHref,
  pocCollectionLabel,
}: CategoryBrandCatalogViewProps) {
  const meta = getCategoryMeta(categorySlug);
  const brand = getCategoryBrand(categorySlug, brandSlug);
  if (!meta || !brand) return null;

  const products = getCategoryProductsByBrand(categorySlug, brandSlug);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
      <p className="text-xs uppercase tracking-widest text-black/50">
        <Link href={categoryPath(categorySlug)} className="hover:underline">
          {meta.title}
        </Link>
        {" / "}
        Brand
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-black md:text-3xl">{brand.name}</h1>
          <p className="mt-2 text-sm text-black/60">
            {products.length} items at SPRAY official store
          </p>
        </div>
        <a
          href={brand.shopBrandUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="dawn-btn-secondary text-xs"
        >
          View on spray166.shop
        </a>
      </div>

      {pocCollectionHref && pocCollectionLabel ? (
        <div className="mt-6 border border-[#e8e8e8] bg-[#fafafa] p-5">
          <p className="text-sm text-black/70">
            Interactive demo with cart &amp; checkout for selected GENTEMSTICK boards.
          </p>
          <Link href={pocCollectionHref} className="dawn-btn-primary mt-4 inline-flex text-xs">
            {pocCollectionLabel}
          </Link>
        </div>
      ) : null}

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#e8e8e8] pb-4">
          <h2 className="text-sm font-medium uppercase tracking-wide text-black">Products</h2>
          <p className="text-xs text-black/50">Prices include tax · Opens official store</p>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <CatalogProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <p className="mt-10 flex flex-wrap gap-4 text-sm">
        <Link href={categoryPath(categorySlug)} className="underline text-black/60 hover:text-black">
          ← {meta.title}
        </Link>
        <Link href="/en/products/categories" className="underline text-black/60 hover:text-black">
          ← All categories
        </Link>
        <Link href="/en/products" className="underline text-black/60 hover:text-black">
          ← Shop home
        </Link>
      </p>
    </div>
  );
}
