import type { InboundProduct } from "@/content/inbound/products.en";

type Props = {
  product: InboundProduct;
};

export function ProductGallery({ product }: Props) {
  return (
    <div className="space-y-2">
      <div className="aspect-square w-full border border-[#e8e8e8] bg-[#f3f3f3]">
        <div className="flex h-full flex-col items-center justify-center p-8 text-center">
          <p className="text-xs uppercase tracking-widest text-black/40">{product.brand}</p>
          <p className="mt-2 text-sm font-medium text-black/70">{product.name}</p>
          <p className="mt-4 text-xs text-black/40">{product.lengthMm} mm · {product.series}</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`aspect-square border bg-[#f3f3f3] ${
              i === 0 ? "border-black" : "border-[#e8e8e8]"
            }`}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
