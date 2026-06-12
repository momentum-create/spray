"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ShopProduct } from "@/content/inbound/shop-product";
import { formatJpy } from "@/content/inbound/products.en";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import {
  getVicroySpeedDeepZipProduct,
  vicroySpeedDeepZip,
} from "@/content/inbound/vicroy-speed-deep-zip.en";
import { TaxFreeNote } from "@/components/inbound/dawn/TaxFreeNote";
import { FulfillmentMethodSelector } from "@/components/inbound/dawn/FulfillmentMethodSelector";
import {
  DEFAULT_FULFILLMENT_METHOD,
  type FulfillmentMethod,
} from "@/components/inbound/dawn/fulfillment";
import { useCart } from "@/components/inbound/dawn/CartProvider";

type Props = {
  product: ShopProduct;
};

export function VicroySpeedDeepZipBuyBox({ product }: Props) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [size, setSize] = useState<(typeof vicroySpeedDeepZip.sizes)[number] | "">("");
  const [fulfillmentMethod, setFulfillmentMethod] = useState<FulfillmentMethod>(
    DEFAULT_FULFILLMENT_METHOD,
  );
  const isStorePickup = fulfillmentMethod === "store_pickup";

  const variantLabel = size ? `Size ${size} · BLACK` : "";
  const canPurchase = size !== "";

  const cartOptions = {
    fulfillmentMethod,
    variantLabel: canPurchase ? variantLabel : undefined,
  };

  const addLine = () => {
    if (!canPurchase) return;
    addToCart(product, cartOptions);
  };

  return (
    <div className="dawn-buy-box w-full bg-white">
      <p className="text-xs uppercase tracking-widest text-black/50">
        {product.brand} · DRIFT MAX
      </p>
      <h1 className="mt-2 text-2xl font-medium leading-tight text-black md:text-3xl">
        {product.name}
      </h1>

      <p className="mt-3 rounded border border-amber-200/80 bg-amber-50 px-3 py-2 text-sm text-amber-950">
        {vicroySpeedDeepZip.deliveryNoteJa}
      </p>
      <p className="mt-1 text-xs text-black/55">{vicroySpeedDeepZip.deliveryNoteEn}</p>

      <p className="mt-4 text-xl text-black">{formatJpy(product.priceJpy)}</p>
      <p className="text-xs text-black/50">
        Tax included · List ¥{vicroySpeedDeepZip.listPriceExTaxJpy.toLocaleString("en-US")} + tax
      </p>
      {product.badge ? (
        <span className="mt-2 inline-block border border-[#e8e8e8] px-2 py-0.5 text-xs text-black/70">
          {product.badge}
        </span>
      ) : null}

      <section className="mt-5 border border-[#e8e8e8] bg-[#fafafa] p-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
          {vicroySpeedDeepZip.earlyReleaseTitleJa}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-black/80">
          {vicroySpeedDeepZip.earlyReleaseBodyJa}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-black/60">
          {vicroySpeedDeepZip.earlyReleaseBodyEn}
        </p>
      </section>

      <section className="mt-5 border border-[#e8e8e8] bg-[#fafafa] p-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
          Pre-order notice
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-black/80">
          <li>先行予約のため、納品までお時間をいただきます（11月中旬予定）。</li>
          <li>決済後のキャンセル・変更・返金はお受けできません。</li>
          <li>日本国内の店舗受取または国内配送。海外発送は行いません。</li>
          <li>サイズによっては在庫がない場合がございます。確定は店舗にてご連絡します。</li>
        </ul>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-relaxed text-black/65">
          <li>Pre-order only; estimated delivery mid-November.</li>
          <li>No cancellation, modification, or refund after payment.</li>
          <li>Japan only — store pickup or domestic shipping. Size availability may vary.</li>
        </ul>
      </section>

      <fieldset className="mt-5 border border-[#e8e8e8] p-4">
        <legend className="px-1 text-xs font-medium uppercase tracking-wide text-black/70">
          Size · サイズ
        </legend>
        <p className="mb-3 text-xs text-black/50">Color: BLACK（カラー：BLACK）</p>
        <div className="flex flex-wrap gap-2">
          {vicroySpeedDeepZip.sizes.map((s) => (
            <label
              key={s}
              className={`flex min-w-[3.5rem] cursor-pointer items-center justify-center border px-4 py-2 text-sm ${
                size === s ? "border-black bg-black text-white" : "border-[#e8e8e8] text-black"
              }`}
            >
              <input
                type="radio"
                name="vicroy-size"
                value={s}
                checked={size === s}
                onChange={() => setSize(s)}
                className="sr-only"
              />
              {s}
            </label>
          ))}
        </div>
        {!canPurchase ? (
          <p className="mt-2 text-xs text-black/50">Please select a size to continue.</p>
        ) : null}
      </fieldset>

      <div className="mt-5">
        <FulfillmentMethodSelector
          name="fulfillment-vicroy"
          value={fulfillmentMethod}
          onChange={setFulfillmentMethod}
        />
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={addLine}
          disabled={!canPurchase}
          className={`dawn-btn-secondary w-full ${!canPurchase ? "cursor-not-allowed opacity-50" : ""}`}
        >
          {dawnCopy.product.addToCart}
        </button>
        <button
          type="button"
          onClick={() => {
            addLine();
            router.push("/en/checkout");
          }}
          disabled={!canPurchase}
          className={`dawn-btn-primary w-full ${!canPurchase ? "cursor-not-allowed opacity-50" : ""}`}
        >
          {dawnCopy.product.buyNow}
        </button>
        <a
          href={getVicroySpeedDeepZipProduct().officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="dawn-btn-secondary flex w-full items-center justify-center text-center text-sm"
        >
          View on VICROY official site
        </a>
      </div>

      {isStorePickup ? (
        <div className="mt-4 flex items-start gap-2 rounded-sm border border-[#e8e8e8] bg-[#f9f9f9] px-3 py-3 text-sm text-black">
          <span className="mt-0.5 shrink-0 font-bold text-[#108043]" aria-hidden>
            ✓
          </span>
          <span>{dawnCopy.product.bopis}</span>
        </div>
      ) : (
        <div className="mt-4 flex items-start gap-2 rounded-sm border border-[#e8e8e8] bg-[#f9f9f9] px-3 py-3 text-sm text-black">
          <span className="mt-0.5 shrink-0 font-bold text-black/70" aria-hidden>
            →
          </span>
          <span>{dawnCopy.product.domesticShippingSelected}</span>
        </div>
      )}

      <TaxFreeNote show={isStorePickup} />

      <p className="mt-4 text-xs leading-relaxed text-black/50">
        {isStorePickup ? dawnCopy.product.shippingNotePickup : dawnCopy.product.shippingNoteDomestic}
      </p>
    </div>
  );
}
