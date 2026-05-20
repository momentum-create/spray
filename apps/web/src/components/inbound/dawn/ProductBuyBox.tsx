"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { InboundProduct } from "@/content/inbound/products.en";
import { formatJpy } from "@/content/inbound/products.en";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import { BopisPickup } from "@/components/inbound/dawn/BopisPickup";
import { TaxFreeNote } from "@/components/inbound/dawn/TaxFreeNote";
import { useCart, type CartAddon } from "@/components/inbound/dawn/CartProvider";

type Props = {
  product: InboundProduct;
};

export function ProductBuyBox({ product }: Props) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [tuneUp, setTuneUp] = useState<"none" | "pre" | "full">("none");
  const [withCase, setWithCase] = useState(false);
  const selectedAddons = useMemo<CartAddon[]>(() => {
    const addons: CartAddon[] = [];
    if (tuneUp === "pre") {
      addons.push({ id: "pre-tune", label: "Pre tune-up", priceJpy: 6_600 });
    }
    if (tuneUp === "full") {
      addons.push({ id: "full-tune", label: "Full tune-up", priceJpy: 15_400 });
    }
    if (withCase) {
      addons.push({ id: "board-case", label: "Board case", priceJpy: 8_800 });
    }
    return addons;
  }, [tuneUp, withCase]);

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
      {!product.soldOut ? (
        <fieldset className="mt-5 border border-[#e8e8e8] p-4">
          <legend className="px-1 text-xs font-medium uppercase tracking-wide text-black/70">
            Tune-up options
          </legend>
          <div className="space-y-2">
            <label className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`tune-up-${product.slug}`}
                  checked={tuneUp === "none"}
                  onChange={() => setTuneUp("none")}
                />
                No tune-up
              </span>
              <span className="text-black/50">+¥0</span>
            </label>
            <label className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`tune-up-${product.slug}`}
                  checked={tuneUp === "pre"}
                  onChange={() => setTuneUp("pre")}
                />
                Pre tune-up
              </span>
              <span>+¥6,600</span>
            </label>
            <label className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`tune-up-${product.slug}`}
                  checked={tuneUp === "full"}
                  onChange={() => setTuneUp("full")}
                />
                Full tune-up
              </span>
              <span>+¥15,400</span>
            </label>
          </div>
          <label className="mt-3 flex items-center justify-between gap-2 border-t border-[#e8e8e8] pt-3 text-sm">
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={withCase}
                onChange={(e) => setWithCase(e.target.checked)}
              />
              Add board case
            </span>
            <span>+¥8,800</span>
          </label>
        </fieldset>
      ) : null}

      <div className="mt-6 space-y-3">
        {product.soldOut ? (
          <p className="w-full border border-[#e8e8e8] bg-[#f3f3f3] px-6 py-3.5 text-center text-sm font-medium text-black/60">
            Sold out — contact store for availability
          </p>
        ) : (
          <>
            <button
              type="button"
              onClick={() => addToCart(product, selectedAddons)}
              className="dawn-btn-secondary w-full"
            >
              {dawnCopy.product.addToCart}
            </button>
            <button
              type="button"
              onClick={() => {
                addToCart(product, selectedAddons);
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
