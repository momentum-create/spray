"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import { fulfillmentMethodLabel } from "@/components/inbound/dawn/fulfillment";
import { useCart } from "@/components/inbound/dawn/CartProvider";
import { formatJpy } from "@/content/inbound/products.en";

const PAYMENT_ICONS = ["Apple Pay", "Google Pay", "PayPal", "Visa", "Mastercard"] as const;

export function ExpressCheckout() {
  const { lines, subtotalJpy, subtotalLabel } = useCart();
  const [agreeFinalSale, setAgreeFinalSale] = useState(false);
  const [agreePickupOnly, setAgreePickupOnly] = useState(false);
  const [agreeTaxRefundFlow, setAgreeTaxRefundFlow] = useState(false);
  const hasGentemPreOrder = useMemo(
    () => lines.some((line) => line.product.brandSlug === "gentem"),
    [lines],
  );
  const fulfillmentSummary = useMemo(() => {
    const methods = new Set(lines.map((line) => line.fulfillmentMethod));
    if (methods.size > 1) return "mixed" as const;
    if (methods.has("domestic_shipping")) return "domestic_shipping" as const;
    return "store_pickup" as const;
  }, [lines]);
  const canProceed =
    !hasGentemPreOrder || (agreeFinalSale && agreePickupOnly && agreeTaxRefundFlow);

  useEffect(() => {
    if (!hasGentemPreOrder) {
      setAgreeFinalSale(false);
      setAgreePickupOnly(false);
      setAgreeTaxRefundFlow(false);
    }
  }, [hasGentemPreOrder]);

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
                <p className="text-xs text-black/50">
                  {fulfillmentMethodLabel(line.fulfillmentMethod)}
                </p>
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
        <p className="text-xs text-black/50">
          {fulfillmentSummary === "mixed"
            ? dawnCopy.checkout.mixedFulfillment
            : fulfillmentSummary === "domestic_shipping"
              ? dawnCopy.checkout.domesticShipping
              : dawnCopy.checkout.pickup}
        </p>
      </div>

      {hasGentemPreOrder ? (
        <div className="mt-4 space-y-3 border border-[#e8e8e8] p-4 text-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-black/70">
            Pre-order agreement required
          </p>
          <label className="flex items-start gap-2 text-sm leading-relaxed text-black/80">
            <input
              type="checkbox"
              checked={agreeFinalSale}
              onChange={(e) => setAgreeFinalSale(e.target.checked)}
              className="mt-1"
            />
            <span>
              I understand that this is a made-to-order product. All sales are final. No
              cancellations, modifications, or refunds will be accepted under any circumstances.
            </span>
          </label>
          <p className="pl-6 text-xs text-black/55">
            繁中: 我了解此為訂製商品，付款後不可取消、修改或退款。 / 简中:
            我理解该商品为定制商品，付款后不可取消、修改或退款。
          </p>
          <label className="flex items-start gap-2 text-sm leading-relaxed text-black/80">
            <input
              type="checkbox"
              checked={agreePickupOnly}
              onChange={(e) => setAgreePickupOnly(e.target.checked)}
              className="mt-1"
            />
            <span>
              I agree that fulfillment is within Japan only (store pickup at SPRAY Asahikawa or
              domestic shipping to a Japan address). No international shipping is provided. Unclaimed
              store pickup orders will not be refunded.
            </span>
          </label>
          <p className="pl-6 text-xs text-black/55">
            繁中: 僅限日本國內（店取或國內配送），不提供海外配送；未取貨不退款。 / 简中:
            仅限日本国内（自提或国内配送），不提供国际配送；未提货不退款。
          </p>
          <label className="flex items-start gap-2 text-sm leading-relaxed text-black/80">
            <input
              type="checkbox"
              checked={agreeTaxRefundFlow}
              onChange={(e) => setAgreeTaxRefundFlow(e.target.checked)}
              className="mt-1"
            />
            <span>
              I understand that payment is tax-inclusive (10% JP tax), and any eligible tax refund
              must be processed by myself at airport customs under Japan&apos;s tax-free refund
              rules.
            </span>
          </label>
          <p className="pl-6 text-xs text-black/55">
            繁中: 本站為含稅價格（10%），符合條件之退稅需於出境時由本人在機場海關辦理。 / 简中:
            本站为含税价格（10%），符合条件的退税需在离境时由本人在机场海关办理。
          </p>
          <p className="text-xs text-black/55">
            日本語: 受注発注品のためキャンセル・変更・返金不可、日本国内のみ（店頭受取または国内配送・海外発送なし）に同意します。
          </p>
          <p className="text-xs text-black/55">
            Tax free note: store pick-up with passport verification may be eligible. Hotel/domestic
            delivery without in-person verification is not tax-free.
          </p>
          <p className="text-xs text-black/55">
            If your pick-up date changes, contact us in advance. Without prior notice, we hold your
            order for 30 days from the scheduled pick-up date; after that it may be forfeited and
            resold without refund.
          </p>
          <Link href="/en/products/preorder-terms" className="text-xs underline text-black/60">
            Read full Terms & Conditions
          </Link>
        </div>
      ) : null}

      <button
        type="button"
        disabled={!canProceed || lines.length === 0}
        className={`dawn-btn-primary mt-4 w-full ${
          !canProceed || lines.length === 0 ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {dawnCopy.checkout.pay}
      </button>
      {!canProceed ? (
        <p className="mt-2 text-xs text-black/55">
          Please check all required agreement boxes to proceed with payment.
        </p>
      ) : null}

      <Link
        href="/en/products"
        className="mt-4 block text-center text-sm underline text-black/60"
      >
        Continue shopping
      </Link>
    </div>
  );
}
