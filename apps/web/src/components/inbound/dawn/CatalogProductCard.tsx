import Link from "next/link";
import { catalogToShopProduct } from "@/content/inbound/shop-product";
import type { CatalogProduct } from "@/content/inbound/shop-catalog";
import { formatJpy } from "@/content/inbound/products.en";
import { ProductImage } from "@/components/inbound/dawn/ProductImage";

type CatalogProductCardProps = {
  product: CatalogProduct;
};

export function CatalogProductCard({ product }: CatalogProductCardProps) {
  const shopProduct = catalogToShopProduct(product);

  return (
    <Link
      href={`/en/products/${product.slug}`}
      className="group block border border-[#e8e8e8] bg-white transition hover:border-black/30"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <ProductImage product={shopProduct} sizes="(max-width: 640px) 50vw, 220px" />
      </div>
      <div className="p-4">
        <p className="line-clamp-3 text-sm font-medium leading-snug text-black group-hover:underline">
          {product.name}
        </p>
        <p className="mt-2 text-sm text-black">{formatJpy(product.priceJpy)}</p>
      </div>
    </Link>
  );
}
