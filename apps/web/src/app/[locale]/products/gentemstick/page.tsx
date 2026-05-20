import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/inbound/dawn/ProductCard";
import { gentemCollection, inboundProducts } from "@/content/inbound/products.en";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function GentemCollectionPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6 md:py-14">
      <p className="text-xs uppercase tracking-widest text-black/50">{gentemCollection.title}</p>
      <h1 className="mt-2 text-3xl font-medium text-black md:text-4xl">
        {gentemCollection.subtitle}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/70">
        {gentemCollection.description}
      </p>
      <a
        href={gentemCollection.shopCollectionUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm underline text-black/60 hover:text-black"
      >
        View all on spray166.shop →
      </a>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {inboundProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <div className="mt-16 border-t border-[#e8e8e8] pt-10">
        <p className="text-sm text-black/70">Need a tune-up before your trip?</p>
        <Link href="/en/booking/tune-up" className="dawn-btn-secondary mt-4 inline-flex">
          Book tune-up
        </Link>
      </div>
    </div>
  );
}
