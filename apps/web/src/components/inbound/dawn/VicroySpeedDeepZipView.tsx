import Link from "next/link";
import { ProductGallery } from "@/components/inbound/dawn/ProductGallery";
import { VicroySpeedDeepZipBuyBox } from "@/components/inbound/dawn/VicroySpeedDeepZipBuyBox";
import {
  getVicroySpeedDeepZipProduct,
  vicroySpeedDeepZip,
} from "@/content/inbound/vicroy-speed-deep-zip.en";

export function VicroySpeedDeepZipView() {
  const product = getVicroySpeedDeepZipProduct();

  return (
    <div className="dawn-product-page mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
      <nav className="mb-8 text-xs text-black/50">
        <Link href="/en/products" className="hover:underline">
          Shop
        </Link>
        {" / "}
        <Link href="/en/products/categories/gloves" className="hover:underline">
          Gloves
        </Link>
        {" / "}
        <span className="text-black/70">VICROY · Early pre-order</span>
      </nav>

      <p className="mb-6 text-xs uppercase tracking-[0.25em] text-black/45">
        SPRAY × VICROY — Limited early release
      </p>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery product={product} thumbnailCount={9} />

        <div className="dawn-product-info w-full min-w-0">
          <VicroySpeedDeepZipBuyBox product={product} />
        </div>
      </div>

      <section className="dawn-product-details mt-12 border-t border-[#e8e8e8] pt-10 lg:mt-16">
        <h2 className="text-base font-medium text-black">About product</h2>
        <p className="mt-4 max-w-3xl whitespace-pre-line text-sm leading-relaxed text-black/80">
          {vicroySpeedDeepZip.aboutProductJa}
        </p>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-black/65">
          {vicroySpeedDeepZip.aboutProductEn}
        </p>

        <ul className="mt-8 grid max-w-lg grid-cols-2 gap-6 text-sm sm:gap-8">
          <li>
            <p className="text-black/50">Brand</p>
            <p className="mt-1 font-medium text-black">VICROY · DRIFT MAX</p>
          </li>
          <li>
            <p className="text-black/50">Season</p>
            <p className="mt-1 font-medium text-black">26-27</p>
          </li>
          <li>
            <p className="text-black/50">Color</p>
            <p className="mt-1 font-medium text-black">BLACK</p>
          </li>
          <li>
            <p className="text-black/50">Sizes</p>
            <p className="mt-1 font-medium text-black">S / M / L</p>
          </li>
        </ul>

        <p className="mt-8 text-[11px] text-black/40">
          {vicroySpeedDeepZip.imageCredit}. Source:{" "}
          <a
            href={vicroySpeedDeepZip.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black"
          >
            VICROY Official Web
          </a>
        </p>
      </section>

      <p className="mt-10 text-center text-[11px] text-black/40">
        <Link href="/en/products" className="underline hover:text-black">
          ← Back to shop home
        </Link>
      </p>
    </div>
  );
}
