"use client";

import Link from "next/link";
import { copy } from "@/content/copy.ja";
import { ProductImage } from "@/components/inbound/dawn/ProductImage";
import { useCart } from "@/components/inbound/dawn/CartProvider";

const c = copy.owlGoggle.checkout;
const ff = c.fulfillment;

function formatJpy(n: number) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(n);
}

function fulfillmentLabel(method: "store_pickup" | "domestic_shipping") {
  return method === "store_pickup" ? ff.labelStorePickup : ff.labelDomesticShipping;
}

export function OwlGoggleJaDrawerCart() {
  const { lines, isOpen, closeCart, removeLine, subtotalJpy, itemCount } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
        onClick={closeCart}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-spray-border bg-[#141414] text-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={c.cartTitle}
      >
        <div className="flex items-center justify-between border-b border-spray-border px-5 py-4">
          <h2 className="text-lg font-bold">{c.cartTitle}</h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-2xl leading-none text-white/60 hover:text-white"
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="text-sm text-spray-muted">{c.cartEmpty}</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.lineKey} className="flex gap-3 border-b border-spray-border pb-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-spray-border bg-black">
                    <ProductImage product={line.product} sizes="80px" className="object-contain p-1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{line.product.name}</p>
                    <p className="text-xs text-spray-muted">{line.product.brand}</p>
                    <p className="mt-1 text-sm">
                      {formatJpy(line.product.priceJpy)}
                      {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                    </p>
                    {line.variantLabel ? (
                      <p className="mt-1 text-xs text-spray-muted">{line.variantLabel}</p>
                    ) : null}
                    <p className="mt-1 text-xs text-spray-muted">
                      {fulfillmentLabel(line.fulfillmentMethod)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeLine(line.lineKey)}
                      className="mt-2 text-xs text-spray-blue underline hover:text-white"
                    >
                      {c.remove}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-spray-border px-5 py-4">
          <p className="mb-3 flex justify-between text-sm">
            <span>{c.total}</span>
            <span className="font-bold">{formatJpy(subtotalJpy)}</span>
          </p>
          <Link
            href="/ja/checkout"
            onClick={closeCart}
            className={`btn-park mb-2 block w-full text-center ${
              itemCount === 0 ? "pointer-events-none opacity-40" : ""
            }`}
          >
            {c.checkout}
          </Link>
          <button type="button" onClick={closeCart} className="btn-shop-outline w-full">
            {c.continue}
          </button>
        </div>
      </aside>
    </>
  );
}
