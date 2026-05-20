"use client";

import Link from "next/link";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import { useCart } from "@/components/inbound/dawn/CartProvider";
import { formatJpy } from "@/content/inbound/products.en";

const PAYMENT_ICONS = ["Apple Pay", "Google Pay", "PayPal", "Visa", "Mastercard"] as const;

export function ExpressCheckout() {
  const { lines, subtotalJpy, subtotalLabel } = useCart();

  return (
    <div className="mx-auto max-w-lg px-4 py-12 md:px-6">
      <h1 className="text-center text-2xl font-medium text-black">{dawnCopy.checkout.title}</h1>
      <p className="mt-2 text-center text-xs text-black/50">{dawnCopy.checkout.demoNote}</p>

      <div className="mt-8 space-y-3">
        {PAYMENT_ICONS.map((label) => (
          <button
            key={label}
            type="button"
            className="flex w-full items-center justify-center gap-2 border border-[#e8e8e8] bg-white py-3 text-sm font-medium text-black hover:border-black/40"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-black/40">
        <span className="h-px flex-1 bg-[#e8e8e8]" />
        OR
        <span className="h-px flex-1 bg-[#e8e8e8]" />
      </div>

      <div className="space-y-3 border border-[#e8e8e8] p-4 text-sm">
        {lines.length === 0 ? (
          <p className="text-black/50">No items — add from a product page.</p>
        ) : (
          lines.map((line) => {
            const addonsTotal = line.addons.reduce((sum, addon) => sum + addon.priceJpy, 0);
            return (
              <div key={line.lineKey} className="space-y-1">
                <div className="flex justify-between gap-4">
                  <span className="text-black/80">
                    {line.product.name}
                    {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                  </span>
                  <span className="shrink-0 text-black">
                    {formatJpy((line.product.priceJpy + addonsTotal) * line.quantity)}
                  </span>
                </div>
                {line.addons.length ? (
                  <ul className="space-y-0.5 text-xs text-black/50">
                    {line.addons.map((addon) => (
                      <li key={addon.id}>
                        + {addon.label} ({formatJpy(addon.priceJpy)})
                      </li>
                    ))}
                  </ul>
                ) : null}
                {line.pickupDate ? (
                  <p className="text-xs text-black/50">Pickup date: {line.pickupDate}</p>
                ) : null}
              </div>
            );
          })
        )}
        <div className="flex justify-between border-t border-[#e8e8e8] pt-3 font-medium text-black">
          <span>{dawnCopy.checkout.total}</span>
          <span>{subtotalLabel}</span>
        </div>
        <p className="text-xs text-black/50">{dawnCopy.checkout.pickup}</p>
      </div>

      <button type="button" className="dawn-btn-primary mt-6 w-full">
        {dawnCopy.checkout.pay}
      </button>

      <Link
        href="/en/products/gentemstick"
        className="mt-4 block text-center text-sm underline text-black/60"
      >
        Continue shopping
      </Link>
    </div>
  );
}
