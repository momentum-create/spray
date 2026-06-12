"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { copy } from "@/content/copy.ja";
import { isOwlGoggleSlug } from "@/content/inbound/owl-goggle.en";
import { useCart } from "@/components/inbound/dawn/CartProvider";

const c = copy.owlGoggle.checkout;
const ff = c.fulfillment;

const PAYMENT_ICONS = ["Apple Pay", "Google Pay", "PayPal", "Visa", "Mastercard"] as const;

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

export function JaExpressCheckout() {
  const { lines, subtotalJpy } = useCart();
  const [agreeFinalSale, setAgreeFinalSale] = useState(false);
  const [agreePickupOnly, setAgreePickupOnly] = useState(false);
  const [agreeTax, setAgreeTax] = useState(false);

  const hasOwlPreOrder = useMemo(
    () => lines.some((line) => isOwlGoggleSlug(line.product.slug)),
    [lines],
  );

  const fulfillmentSummary = useMemo(() => {
    const methods = new Set(lines.map((line) => line.fulfillmentMethod));
    if (methods.size > 1) return "mixed" as const;
    if (methods.has("domestic_shipping")) return "domestic_shipping" as const;
    return "store_pickup" as const;
  }, [lines]);

  const canProceed = !hasOwlPreOrder || (agreeFinalSale && agreePickupOnly && agreeTax);

  useEffect(() => {
    if (!hasOwlPreOrder) {
      setAgreeFinalSale(false);
      setAgreePickupOnly(false);
      setAgreeTax(false);
    }
  }, [hasOwlPreOrder]);

  return (
    <div className="container-page mx-auto max-w-lg py-12">
      <h1 className="text-center text-2xl font-bold text-white">{c.pageTitle}</h1>
      <p className="mt-2 text-center text-xs text-spray-muted">{c.demoNote}</p>

      <div className="mt-8 space-y-3">
        {PAYMENT_ICONS.map((label) => (
          <button
            key={label}
            type="button"
            className="flex w-full items-center justify-center gap-2 border border-spray-border bg-black/40 py-3 text-sm font-medium text-white hover:border-spray-orange"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-spray-muted">
        <span className="h-px flex-1 bg-spray-border" />
        または
        <span className="h-px flex-1 bg-spray-border" />
      </div>

      <div className="card-dark space-y-3 p-4 text-sm">
        {lines.length === 0 ? (
          <p className="text-spray-muted">商品がありません — 予約ページからカートに追加してください。</p>
        ) : (
          lines.map((line) => (
            <div key={line.lineKey} className="space-y-1">
              <div className="flex justify-between gap-4">
                <span className="text-white/90">
                  {line.product.name}
                  {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                </span>
                <span className="shrink-0 font-medium text-white">
                  {formatJpy(line.product.priceJpy * line.quantity)}
                </span>
              </div>
              {line.variantLabel ? (
                <p className="text-xs text-spray-muted">{line.variantLabel}</p>
              ) : null}
              <p className="text-xs text-spray-muted">{fulfillmentLabel(line.fulfillmentMethod)}</p>
            </div>
          ))
        )}
        <div className="flex justify-between border-t border-spray-border pt-3 font-bold text-white">
          <span>{c.total}</span>
          <span>{formatJpy(subtotalJpy)}</span>
        </div>
        <p className="text-xs text-spray-muted">
          {fulfillmentSummary === "mixed"
            ? c.mixedSummary
            : fulfillmentSummary === "domestic_shipping"
              ? c.shipSummary
              : c.pickupSummary}
        </p>
      </div>

      {hasOwlPreOrder ? (
        <div className="card-dark mt-4 space-y-3 p-4 text-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-spray-orange">
            {c.agreementTitle}
          </p>
          <p className="text-xs text-spray-muted">{c.owlDeliveryNote}</p>
          <label className="flex items-start gap-2 leading-relaxed text-white/85">
            <input
              type="checkbox"
              checked={agreeFinalSale}
              onChange={(e) => setAgreeFinalSale(e.target.checked)}
              className="mt-1 accent-spray-orange"
            />
            <span>{c.agreeFinalSale}</span>
          </label>
          <label className="flex items-start gap-2 leading-relaxed text-white/85">
            <input
              type="checkbox"
              checked={agreePickupOnly}
              onChange={(e) => setAgreePickupOnly(e.target.checked)}
              className="mt-1 accent-spray-orange"
            />
            <span>{c.agreePickupOnly}</span>
          </label>
          <label className="flex items-start gap-2 leading-relaxed text-white/85">
            <input
              type="checkbox"
              checked={agreeTax}
              onChange={(e) => setAgreeTax(e.target.checked)}
              className="mt-1 accent-spray-orange"
            />
            <span>{c.agreeTax}</span>
          </label>
        </div>
      ) : null}

      <button
        type="button"
        disabled={!canProceed || lines.length === 0}
        className={`btn-park mt-6 w-full ${!canProceed || lines.length === 0 ? "cursor-not-allowed opacity-50" : ""}`}
      >
        {c.pay}
      </button>
      {!canProceed && hasOwlPreOrder ? (
        <p className="mt-2 text-xs text-spray-muted">{c.agreementHint}</p>
      ) : null}

      <Link
        href="/ja/shop/owl-goggle"
        className="mt-4 block text-center text-sm text-spray-blue underline hover:text-white"
      >
        ← 予約ページに戻る
      </Link>
    </div>
  );
}
