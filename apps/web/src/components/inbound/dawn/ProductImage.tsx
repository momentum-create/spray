import Image from "next/image";
import type { ShopProduct } from "@/content/inbound/shop-product";

type Props = {
  product: ShopProduct;
  src?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function ProductImage({
  product,
  src,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "object-contain object-center p-6",
}: Props) {
  const imageSrc = src ?? product.imageUrl;
  if (!imageSrc) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#f5f5f5] text-xs uppercase tracking-wider text-black/35">
        {product.brand}
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={product.name}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
      unoptimized={
        imageSrc.includes("makeshop-multi-images") || imageSrc.includes("vicroy.jp")
      }
    />
  );
}
