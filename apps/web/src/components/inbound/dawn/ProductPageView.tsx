import type { InboundProduct } from "@/content/inbound/products.en";
import { gentemCollection } from "@/content/inbound/products.en";
import { ProductBuyBox } from "@/components/inbound/dawn/ProductBuyBox";
import { ProductGallery } from "@/components/inbound/dawn/ProductGallery";

type Props = {
  product: InboundProduct;
};

/** Dawn-style: media + buy box side-by-side; description full-width below (no overlap) */
export function ProductPageView({ product }: Props) {
  return (
    <div className="dawn-product-page mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery product={product} />

        <div className="dawn-product-info w-full min-w-0">
          <ProductBuyBox product={product} />
        </div>
      </div>

      <section className="dawn-product-details mt-12 border-t border-[#e8e8e8] pt-10 lg:mt-16">
        <h2 className="text-base font-medium text-black">Description</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-black/70">
          {product.description}
        </p>
        <ul className="mt-8 grid max-w-md grid-cols-2 gap-6 text-sm sm:gap-8">
          <li>
            <p className="text-black/50">Series</p>
            <p className="mt-1 font-medium text-black">{product.series}</p>
          </li>
          <li>
            <p className="text-black/50">Length</p>
            <p className="mt-1 font-medium text-black">{product.lengthMm} mm</p>
          </li>
        </ul>
        <p className="mt-8 text-[11px] text-black/40">{gentemCollection.imageCredit}</p>
      </section>
    </div>
  );
}
