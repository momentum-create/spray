import Link from "next/link";
import type { InboundProduct } from "@/content/inbound/products.en";
import { formatJpy } from "@/content/inbound/products.en";

type Props = {
  product: InboundProduct;
  localePrefix?: string;
};

export function ProductCard({ product, localePrefix = "/en" }: Props) {
  return (
    <Link
      href={`${localePrefix}/products/${product.slug}`}
      className="group block border border-[#e8e8e8] bg-white transition hover:border-black/30"
    >
      <div className="aspect-square bg-[#f3f3f3] transition group-hover:bg-[#ebebeb]" />
      <div className="p-4">
        <p className="text-xs text-black/50">{product.brand}</p>
        <p className="mt-1 text-sm font-medium text-black group-hover:underline">
          {product.name}
        </p>
        <p className="mt-2 text-sm text-black">{formatJpy(product.priceJpy)}</p>
      </div>
    </Link>
  );
}
