import Link from "next/link";
import { CatalogProductCard } from "@/components/inbound/dawn/CatalogProductCard";
import {
  categoryBrandPath,
  getCategoryBrands,
  getCategoryMeta,
  getCategoryProducts,
} from "@/content/inbound/shop-catalog";

type CategoryCatalogViewProps = {
  categorySlug: string;
};

export function CategoryCatalogView({ categorySlug }: CategoryCatalogViewProps) {
  const meta = getCategoryMeta(categorySlug);
  if (!meta) return null;

  const brands = getCategoryBrands(categorySlug);
  const products = getCategoryProducts(categorySlug);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-black/50">Category</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium text-black md:text-4xl">{meta.title}</h1>
          <p className="mt-2 text-sm text-black/60">
            {meta.totalProducts} items · synced from spray166.shop
          </p>
        </div>
        <a
          href={meta.shopCategoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="dawn-btn-secondary text-xs"
        >
          Official category page
        </a>
      </div>

      {brands.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-wide text-black">Shop by brand</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <li key={brand.slug}>
                <Link
                  href={categoryBrandPath(categorySlug, brand.slug)}
                  className="flex items-center justify-between border border-[#e8e8e8] px-4 py-3 text-sm transition hover:border-black"
                >
                  <span className="font-medium text-black">{brand.name}</span>
                  <span className="text-black/45">({brand.productCount})</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#e8e8e8] pb-4">
          <h2 className="text-sm font-medium uppercase tracking-wide text-black">All products</h2>
          <p className="text-xs text-black/50">{products.length} items</p>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <CatalogProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <p className="mt-10">
        <Link href="/en/products/categories" className="text-sm underline text-black/60 hover:text-black">
          ← All categories
        </Link>
      </p>
    </div>
  );
}
