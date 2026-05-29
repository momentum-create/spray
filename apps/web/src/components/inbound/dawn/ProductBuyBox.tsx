"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ShopProduct } from "@/content/inbound/shop-product";
import { formatJpy } from "@/content/inbound/products.en";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import { BopisPickup } from "@/components/inbound/dawn/BopisPickup";
import { TaxFreeNote } from "@/components/inbound/dawn/TaxFreeNote";
import { useCart, type CartAddon } from "@/components/inbound/dawn/CartProvider";

type Props = {
  product: ShopProduct;
};

export function ProductBuyBox({ product }: Props) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [tuneUp, setTuneUp] = useState<"none" | "pre" | "full">("none");
  const [soleGuard, setSoleGuard] = useState<"none" | "gentem" | "spray">("none");
  const [pickupDate, setPickupDate] = useState("");
  const requiresPickupSchedule = tuneUp !== "none";
  const earliestPickupDate = useMemo(() => {
    const start = new Date();
    const leadDays = tuneUp === "full" ? 7 : tuneUp === "pre" ? 3 : 0;
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() + leadDays);
    while (start.getDay() === 3) {
      start.setDate(start.getDate() + 1);
    }
    const y = start.getFullYear();
    const m = String(start.getMonth() + 1).padStart(2, "0");
    const d = String(start.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, [tuneUp]);
  const selectedAddons = useMemo<CartAddon[]>(() => {
    const addons: CartAddon[] = [];
    if (tuneUp === "pre") {
      addons.push({ id: "pre-tune", label: "Pre tune-up", priceJpy: 6_600 });
    }
    if (tuneUp === "full") {
      addons.push({ id: "full-tune", label: "Full tune-up", priceJpy: 15_400 });
    }
    if (soleGuard === "gentem") {
      addons.push({
        id: "gentem-sole-guard",
        label: "GENTEMSTICK Sole Guard",
        priceJpy: 15_950,
      });
    }
    if (soleGuard === "spray") {
      addons.push({
        id: "spray-knit-sole-guard",
        label: "SPRAY Knit Sole Guard",
        priceJpy: 8_800,
      });
    }
    return addons;
  }, [tuneUp, soleGuard]);

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
      {product.reviewCount > 0 ? (
        <p className="mt-2 text-xs text-black/50">
          {dawnCopy.product.reviews(product.reviewCount)}
        </p>
      ) : null}
      {product.brandSlug === "gentem" ? (
        <section className="mt-5 border border-[#e8e8e8] bg-[#fafafa] p-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
            Pre-order notice
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-black/80">
            <li>No cancellation, modification, or refund after payment.</li>
            <li>Pick-up in Japan only. No international shipping.</li>
            <li>
              Payment is tax-inclusive (10% JP tax). Eligible tax refunds are handled by the
              customer at airport customs (Japan refund method).
            </li>
            <li>
              If pick-up date changes, contact us in advance. Without notice, orders are held for
              30 days then may be forfeited.
            </li>
          </ul>
          <p className="mt-2 text-xs text-black/55">
            日本語: 決済後のキャンセル・変更・返金不可。日本国内受取限定。決済は税込（10%）で、免税還付は条件該当時に出国時空港でお客様ご自身の手続きとなります。受取日変更は事前連絡必須、無連絡の場合は30日保管後に権利失効の対象となります。
          </p>
          <details className="mt-2 text-xs text-black/60">
            <summary className="cursor-pointer select-none">繁體中文（台灣）</summary>
            <p className="mt-1 leading-relaxed">
              付款後不可取消、不可修改、不可退款。僅限日本國內取貨，不提供海外配送。付款價格已含日本消費稅（10%）；符合條件者需於出境時由本人在機場海關辦理退稅。若取貨日期變更，請務必事前聯絡；未事前通知者，商品自原定取貨日起保留30天，逾期可能喪失權利。
            </p>
          </details>
          <details className="mt-1 text-xs text-black/60">
            <summary className="cursor-pointer select-none">简体中文（中国）</summary>
            <p className="mt-1 leading-relaxed">
              付款后不可取消、不可修改、不可退款。仅限日本国内自提，不提供国际配送。付款价格已含日本消费税（10%）；符合条件者需在离境时由本人在机场海关办理退税。如提货日期有变更，请务必提前联系；未提前通知的订单将自原定提货日起保留30天，逾期可能视为放弃权益。
            </p>
          </details>
          <a href="/en/products/preorder-terms" className="mt-2 inline-block text-xs underline text-black/65">
            Read full Terms & Conditions
          </a>
        </section>
      ) : null}
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
                  onChange={() => {
                    setTuneUp("none");
                    setPickupDate("");
                  }}
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
          {requiresPickupSchedule ? (
            <label className="mt-3 block border-t border-[#e8e8e8] pt-3 text-sm">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black/70">
                Earliest pickup date
              </span>
              <input
                type="date"
                min={earliestPickupDate}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="dawn-input w-full"
              />
              <span className="mt-1 block text-[11px] text-black/50">
                Same-day / next-day pickup is not available. Wednesdays are unavailable.
              </span>
            </label>
          ) : null}
          <div className="mt-3 border-t border-[#e8e8e8] pt-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-black/70">
              Sole guard options
            </p>
            <div className="space-y-2">
              <label className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`sole-guard-${product.slug}`}
                    checked={soleGuard === "none"}
                    onChange={() => setSoleGuard("none")}
                  />
                  No sole guard
                </span>
                <span className="text-black/50">+¥0</span>
              </label>
              <label className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`sole-guard-${product.slug}`}
                    checked={soleGuard === "gentem"}
                    onChange={() => setSoleGuard("gentem")}
                  />
                  GENTEMSTICK Sole Guard
                </span>
                <span>+¥15,950</span>
              </label>
              <label className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`sole-guard-${product.slug}`}
                    checked={soleGuard === "spray"}
                    onChange={() => setSoleGuard("spray")}
                  />
                  SPRAY Knit Sole Guard
                </span>
                <span>+¥8,800</span>
              </label>
            </div>
          </div>
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
              onClick={() => addToCart(product, selectedAddons, pickupDate || undefined)}
              disabled={requiresPickupSchedule && !pickupDate}
              className={`dawn-btn-secondary w-full ${
                requiresPickupSchedule && !pickupDate ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {dawnCopy.product.addToCart}
            </button>
            <button
              type="button"
              onClick={() => {
                addToCart(product, selectedAddons, pickupDate || undefined);
                router.push("/en/checkout");
              }}
              disabled={requiresPickupSchedule && !pickupDate}
              className={`dawn-btn-primary w-full ${
                requiresPickupSchedule && !pickupDate ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {dawnCopy.product.buyNow}
            </button>
            <a
              href={product.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dawn-btn-secondary flex w-full items-center justify-center text-center"
            >
              Buy on spray166.shop
            </a>
          </>
        )}
      </div>

      <div className="mt-4">
        <BopisPickup />
      </div>

      <TaxFreeNote />

      <p className="mt-4 text-xs leading-relaxed text-black/50">{dawnCopy.product.shippingNote}</p>

      {product.officialUrl.includes("gentemstick.com") ? (
        <a
          href={product.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm underline text-black/70 hover:text-black"
        >
          {dawnCopy.product.viewOfficial}
        </a>
      ) : null}
    </div>
  );
}
