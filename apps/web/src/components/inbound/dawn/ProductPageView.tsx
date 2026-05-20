import type { InboundProduct } from "@/content/inbound/products.en";
import { ProductBuyBox } from "@/components/inbound/dawn/ProductBuyBox";
import { ProductGallery } from "@/components/inbound/dawn/ProductGallery";

type Props = {
  product: InboundProduct;
};

export function ProductPageView({ product }: Props) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery product={product} />
        <div>
          <ProductBuyBox product={product} />
          <div className="mt-10 border-t border-[#e8e8e8] pt-8">
            <h2 className="text-sm font-medium text-black">Description</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">{product.description}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-black/50">Series</dt>
                <dd className="text-black">{product.series}</dd>
              </div>
              <div>
                <dt className="text-black/50">Length</dt>
                <dd className="text-black">{product.lengthMm} mm</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
