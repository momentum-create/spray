import Link from "next/link";
import { notFound } from "next/navigation";
import { DawnVisitBlock } from "@/components/inbound/dawn/DawnVisitBlock";
import { ProductCard } from "@/components/inbound/dawn/ProductCard";
import { gentemCollection, inboundProducts } from "@/content/inbound/products.en";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function GentemCollectionPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
      <p className="text-xs uppercase tracking-widest text-black/50">{gentemCollection.title}</p>
      <h1 className="mt-2 text-2xl font-medium text-black md:text-3xl">
        {gentemCollection.subtitle}
      </h1>

      <section id="products" className="scroll-mt-24 mt-8">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#e8e8e8] pb-4">
          <h2 className="text-sm font-medium uppercase tracking-wide text-black">
            Boards ({inboundProducts.length})
          </h2>
          <p className="text-xs text-black/50">Tap a board for details, add-ons, and pickup</p>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {inboundProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-black/70">
        {gentemCollection.description}
      </p>
      <a
        href={gentemCollection.shopCollectionUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm underline text-black/60 hover:text-black"
      >
        Full catalog on spray166.shop (official store) →
      </a>
      <p className="mt-4 text-[11px] text-black/40">{gentemCollection.imageCredit}</p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div className="border-t border-[#e8e8e8] pt-10">
          <p className="text-sm font-medium text-black">Tune-up before your trip?</p>
          <p className="mt-2 text-sm text-black/60">
            Book wax, edge work, and sole guards at our Asahikawa shop.
          </p>
          <Link href="/en/booking/tune-up" className="dawn-btn-secondary mt-4 inline-flex">
            Book tune-up
          </Link>
        </div>
        <DawnVisitBlock />
      </div>

      <p className="mt-10 text-center text-[11px] text-black/40">
        <Link href="/en" className="underline hover:text-black">
          ← Back to SPRAY English home
        </Link>
      </p>
    </div>
  );
}
