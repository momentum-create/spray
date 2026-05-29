import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategorySlugs, getCategorySummary } from "@/content/inbound/shop-catalog";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function ShopCategoriesPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  const categories = getAllCategorySlugs()
    .map((slug) => getCategorySummary(slug))
    .filter((c): c is NonNullable<typeof c> => c !== null && c.productCount > 0);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6 md:py-14">
      <p className="text-xs uppercase tracking-[0.2em] text-black/50">Step 2</p>
      <h1 className="mt-3 text-3xl font-medium text-black md:text-4xl">
        {dawnCopy.shopCategories.title}
      </h1>
      <p className="mt-4 max-w-2xl text-sm text-black/65 md:text-base">{dawnCopy.shopCategories.lead}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/en/products/categories/${category.slug}`}
            className="border border-[#e8e8e8] p-6 transition hover:border-black"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">Category</p>
            <p className="mt-2 text-xl font-medium text-black">{category.title}</p>
            <p className="mt-2 text-sm text-black/55">
              {category.productCount} products
              {category.brandCount > 0 ? ` · ${category.brandCount} brands` : ""}
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-10">
        <Link href="/en/products" className="text-sm underline text-black/60 hover:text-black">
          {dawnCopy.shopCategories.back}
        </Link>
      </p>
    </div>
  );
}
