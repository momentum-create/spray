import Link from "next/link";
import { DawnShopHero } from "@/components/inbound/dawn/DawnShopHero";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";

export function DawnShopHome() {
  return (
    <>
      <DawnShopHero />

      <section className="grid min-h-svh place-items-center px-4 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 sm:grid-cols-[0.8fr_1.2fr]">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-black/50">
            {dawnCopy.shopHome.sectionLabel}
          </p>
          <div className="space-y-8">
            <h2 className="text-[clamp(1.75rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.06em] text-black">
              {dawnCopy.shopHome.sectionTitle}
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-black/65">{dawnCopy.shopHome.sectionBody}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/en/products/categories"
                className="border border-[#e8e8e8] p-5 transition hover:border-black"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">Browse</p>
                <p className="mt-2 text-lg font-medium text-black">All categories</p>
              </Link>
              <Link
                href="/en/products/categories/gloves"
                className="border border-[#e8e8e8] p-5 transition hover:border-black"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">Featured</p>
                <p className="mt-2 text-lg font-medium text-black">Gloves</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e8e8e8] bg-[#fafafa]">
        <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-sm font-medium uppercase tracking-wide text-black">
              {dawnCopy.shopHome.featuredLabel}
            </h2>
            <Link
              href="/en/products/gentemstick"
              className="text-sm underline text-black/60 hover:text-black"
            >
              {dawnCopy.shopHome.featuredCta}
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link
              href="/en/products/gentemstick"
              className="block border border-[#e8e8e8] bg-white p-8 transition hover:border-black"
            >
              <p className="text-xs uppercase tracking-widest text-black/50">GENTEMSTICK</p>
              <p className="mt-2 text-2xl font-medium text-black">{dawnCopy.shopHome.featuredTitle}</p>
              <p className="mt-3 max-w-xl text-sm text-black/60">{dawnCopy.shopHome.featuredBody}</p>
            </Link>
            <Link
              href="/en/products/vicroy/speed-deep-zip"
              className="block border border-[#e8e8e8] bg-white p-8 transition hover:border-black"
            >
              <p className="text-xs uppercase tracking-widest text-black/50">VICROY · Pre-order</p>
              <p className="mt-2 text-2xl font-medium text-black">SPEED DEEP ZIP 26-27</p>
              <p className="mt-3 max-w-xl text-sm text-black/60">
                Limited early-release zip long-cuff gloves. Estimated delivery mid-November.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
