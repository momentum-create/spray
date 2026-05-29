"use client";

import { useState } from "react";
import type { ShopProduct } from "@/content/inbound/shop-product";
import { ProductImage } from "@/components/inbound/dawn/ProductImage";

type Props = {
  product: ShopProduct;
  /** Max thumbnails shown (default 4). Pass a higher value for large galleries. */
  thumbnailCount?: number;
};

export function ProductGallery({ product, thumbnailCount = 4 }: Props) {
  const images =
    product.imageGallery.length > 0
      ? product.imageGallery
      : product.imageUrl
        ? [product.imageUrl]
        : [];
  const [active, setActive] = useState(0);
  const activeSrc = images[active] ?? product.imageUrl;

  return (
    <div className="space-y-2">
      <div className="relative aspect-square w-full overflow-hidden border border-[#e8e8e8] bg-white">
        <ProductImage product={product} src={activeSrc} priority sizes="(max-width: 1024px) 100vw, 560px" />
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.slice(0, thumbnailCount).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden border bg-white ${
                i === active ? "border-black" : "border-[#e8e8e8] opacity-70"
              }`}
            >
              <ProductImage product={product} src={src} sizes="120px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
