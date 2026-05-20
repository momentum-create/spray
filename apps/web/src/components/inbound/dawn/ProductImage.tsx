import Image from "next/image";
import type { InboundProduct } from "@/content/inbound/products.en";

type Props = {
  product: InboundProduct;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function ProductImage({
  product,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "object-contain object-center p-6",
}: Props) {
  return (
    <Image
      src={product.imageUrl}
      alt={product.name}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
