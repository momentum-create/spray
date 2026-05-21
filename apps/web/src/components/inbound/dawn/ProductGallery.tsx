import type { InboundProduct } from "@/content/inbound/products.en";
import { ProductImage } from "@/components/inbound/dawn/ProductImage";

type Props = {
  product: InboundProduct;
};

export function ProductGallery({ product }: Props) {
  return (
    <div className="space-y-2">
      <div className="relative aspect-square w-full overflow-hidden border border-[#e8e8e8] bg-white">
        <ProductImage product={product} priority sizes="(max-width: 1024px) 100vw, 560px" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`relative aspect-square overflow-hidden border bg-white ${
              i === 0 ? "border-black" : "border-[#e8e8e8] opacity-60"
            }`}
          >
            {i === 0 ? (
              <ProductImage
                product={product}
                sizes="120px"
                className="object-contain p-1"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
