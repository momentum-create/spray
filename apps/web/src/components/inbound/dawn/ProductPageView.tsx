import type { InboundProduct } from "@/content/inbound/products.en";
import { gentemCollection } from "@/content/inbound/products.en";
import { ProductBuyBox } from "@/components/inbound/dawn/ProductBuyBox";
import { ProductGallery } from "@/components/inbound/dawn/ProductGallery";

type Props = {
  product: InboundProduct;
};

export function ProductPageView({ product }: Props) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductGallery product={product} />
        </div>

        <div className="flex min-w-0 flex-col gap-10">
          <ProductBuyBox product={product} />

          <section className="border-t border-[#e8e8e8] pt-8">
            <h2 className="text-sm font-medium text-black">Description</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">{product.description}</p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div className="space-y-1">
                <dt className="text-black/50">Series</dt>
                <dd className="font-medium text-black">{product.series}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-black/50">Length</dt>
                <dd className="font-medium text-black">{product.lengthMm} mm</dd>
              </div>
            </dl>
            <p className="mt-6 text-[11px] text-black/40">{gentemCollection.imageCredit}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
