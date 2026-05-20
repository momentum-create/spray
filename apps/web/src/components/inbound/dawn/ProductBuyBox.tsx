"use client";

import { useRouter } from "next/navigation";
import type { InboundProduct } from "@/content/inbound/products.en";
import { formatJpy } from "@/content/inbound/products.en";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import { BopisPickup } from "@/components/inbound/dawn/BopisPickup";
import { TaxFreeNote } from "@/components/inbound/dawn/TaxFreeNote";
import { useCart } from "@/components/inbound/dawn/CartProvider";

type Props = {
  product: InboundProduct;
};

export function ProductBuyBox({ product }: Props) {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <div className="dawn-buy-box w-full bg-white">
      <p className="text-xs uppercase tracking-widest text-black/50">{product.brand}</p>
      <h1 className="mt-2 text-2xl font-medium leading-tight text-black md:text-3xl">
        {product.name}
      </h1>
      <p className="mt-4 text-xl text-black">{formatJpy(product.priceJpy)}</p>
      {product.badge ? (
        <span className="mt-2 inline-block border border-[#e8e8e8] px-2 py-0.5 text-xs text-black/70">
          {product.badge}
        </span>
      ) : null}
      <p className="mt-2 text-xs text-black/50">
        {dawnCopy.product.reviews(product.reviewCount)}
      </p>

      <div className="mt-6 space-y-3">
        {product.soldOut ? (
          <p className="w-full border border-[#e8e8e8] bg-[#f3f3f3] px-6 py-3.5 text-center text-sm font-medium text-black/60">
            Sold out — contact store for availability
          </p>
        ) : (
          <>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="dawn-btn-secondary w-full"
            >
              {dawnCopy.product.addToCart}
            </button>
            <button
              type="button"
              onClick={() => {
                addToCart(product);
                router.push("/en/checkout");
              }}
              className="dawn-btn-primary w-full"
            >
              {dawnCopy.product.buyNow}
            </button>
          </>
        )}
      </div>

      <div className="mt-4">
        <BopisPickup />
      </div>

      <TaxFreeNote />

      <p className="mt-4 text-xs leading-relaxed text-black/50">{dawnCopy.product.shippingNote}</p>

      <a
        href={product.officialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-sm underline text-black/70 hover:text-black"
      >
        {dawnCopy.product.viewOfficial}
      </a>
    </div>
  );
}
