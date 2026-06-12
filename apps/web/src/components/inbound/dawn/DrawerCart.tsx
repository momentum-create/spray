"use client";

import Link from "next/link";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import { formatJpy } from "@/content/inbound/products.en";
import { ProductImage } from "@/components/inbound/dawn/ProductImage";
import { fulfillmentMethodLabel } from "@/components/inbound/dawn/fulfillment";
import { useCart } from "@/components/inbound/dawn/CartProvider";

export function DrawerCart() {
  const { lines, isOpen, closeCart, removeLine, subtotalJpy, itemCount } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
        onClick={closeCart}
      />
      <aside
        className={`dawn-drawer fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={dawnCopy.cart.title}
      >
        <div className="flex items-center justify-between border-b border-[#e8e8e8] px-5 py-4">
          <h2 className="text-lg font-medium text-black">{dawnCopy.cart.title}</h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-2xl leading-none text-black/60 hover:text-black"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="text-sm text-black/60">{dawnCopy.cart.empty}</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li
                  key={line.lineKey}
                  className="flex gap-3 border-b border-[#e8e8e8] pb-4"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-[#e8e8e8] bg-white">
                    <ProductImage product={line.product} sizes="80px" className="object-contain p-1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-black">{line.product.name}</p>
                    <p className="text-xs text-black/50">{line.product.brand}</p>
                    <p className="mt-1 text-sm text-black">
                      {formatJpy(
                        line.product.priceJpy +
                          line.addons.reduce((sum, addon) => sum + addon.priceJpy, 0),
                      )}
                      {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                    </p>
                    {line.addons.length ? (
                      <ul className="mt-1 space-y-0.5 text-xs text-black/50">
                        {line.addons.map((addon) => (
                          <li key={addon.id}>
                            + {addon.label} ({formatJpy(addon.priceJpy)})
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {line.variantLabel ? (
                      <p className="mt-1 text-xs text-black/50">{line.variantLabel}</p>
                    ) : null}
                    <p className="mt-1 text-xs text-black/50">
                      {fulfillmentMethodLabel(line.fulfillmentMethod)}
                    </p>
                    {line.pickupDate ? (
                      <p className="mt-1 text-xs text-black/50">Pickup: {line.pickupDate}</p>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => removeLine(line.lineKey)}
                      className="mt-2 text-xs underline text-black/50 hover:text-black"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-[#e8e8e8] px-5 py-4">
          <p className="mb-3 flex justify-between text-sm text-black">
            <span>Subtotal</span>
            <span className="font-medium">{formatJpy(subtotalJpy)}</span>
          </p>
          <Link
            href="/en/checkout"
            onClick={closeCart}
            className={`dawn-btn-primary mb-2 block w-full text-center ${
              itemCount === 0 ? "pointer-events-none opacity-40" : ""
            }`}
          >
            {dawnCopy.cart.checkout}
          </Link>
          <button
            type="button"
            onClick={closeCart}
            className="dawn-btn-secondary w-full"
          >
            {dawnCopy.cart.continue}
          </button>
        </div>
      </aside>
    </>
  );
}
