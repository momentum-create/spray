"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Copy } from "@/i18n/get-copy";
import { getOwlGoggleProduct } from "@/content/inbound/owl-goggle.en";
import type { OwlGoggleModelKey } from "@/content/inbound/owl-goggle.en";
import { calcOwlGoggleOrder } from "@/lib/owl-goggle-commerce";
import { useCart } from "@/components/inbound/dawn/CartProvider";
import {
  DEFAULT_FULFILLMENT_METHOD,
  type FulfillmentMethod,
} from "@/components/inbound/dawn/fulfillment";

type Props = { copy: Copy };

type Buckle = "with" | "without";

function formatJpy(n: number) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(n);
}

export function OwlGoggleJaCheckout({ copy }: Props) {
  const o = copy.owlGoggle;
  const f = o.form;
  const pricing = o.pricing;
  const checkout = o.checkout;
  const ff = checkout.fulfillment;
  const { addToCart } = useCart();
  const router = useRouter();

  const [model, setModel] = useState<OwlGoggleModelKey>("flow");
  const [buckle, setBuckle] = useState<Buckle>("with");
  const [quantity, setQuantity] = useState(1);
  const [fulfillmentMethod, setFulfillmentMethod] = useState<FulfillmentMethod>(
    DEFAULT_FULFILLMENT_METHOD,
  );

  const cartModel = model === "flow" ? "flow" : "vent";
  const order = useMemo(
    () => calcOwlGoggleOrder(cartModel, quantity),
    [cartModel, quantity],
  );
  const product = useMemo(() => getOwlGoggleProduct(model), [model]);
  const isStorePickup = fulfillmentMethod === "store_pickup";

  const variantLabel = `${f.models[model]} · ${buckle === "with" ? f.buckles.with : f.buckles.without}`;

  const addLine = () => {
    addToCart(product, {
      fulfillmentMethod,
      variantLabel,
      quantity,
    });
  };

  const fieldClass = "mt-2 w-full space-y-2";
  const optionClass = (active: boolean) =>
    `flex cursor-pointer items-start gap-3 rounded border p-3 text-sm transition ${
      active ? "border-spray-orange bg-black/40" : "border-spray-border bg-black/20"
    }`;

  return (
    <div className="text-white">
      <div className="mb-6 rounded border border-white/20 bg-black/30 p-4 text-sm">
        <p className="font-bold">{pricing.summaryTitle}</p>
        <dl className="mt-3 space-y-1">
          <div className="flex justify-between gap-4">
            <dt className="text-white/70">{pricing.subtotal}</dt>
            <dd>{formatJpy(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-white/70">{pricing.shipping}</dt>
            <dd>{order.shipping === 0 ? pricing.shippingFree : formatJpy(order.shipping)}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-white/20 pt-2 font-bold">
            <dt>{pricing.total}</dt>
            <dd>{formatJpy(order.total)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-white/60">{pricing.shippingNote}</p>
        <p className="mt-2 text-xs leading-relaxed text-white/60">{pricing.paymentNote}</p>
      </div>

      <fieldset className={fieldClass}>
        <legend className="text-sm font-medium text-white/80">{f.model}</legend>
        {(["flow", "vent"] as const).map((key) => (
          <label key={key} className={optionClass(model === key)}>
            <input
              type="radio"
              name="owl-ja-model"
              checked={model === key}
              onChange={() => setModel(key)}
              className="mt-1 accent-spray-orange"
            />
            <span>
              <span className="font-medium">{f.models[key]}</span>
              <span className="mt-0.5 block text-xs text-white/55">{o.models[key].tagline}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <fieldset className={fieldClass}>
        <legend className="text-sm font-medium text-white/80">{f.buckle}</legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: "with" as const, label: f.buckles.with },
              { id: "without" as const, label: f.buckles.without },
            ] as const
          ).map((opt) => (
            <label
              key={opt.id}
              className={`cursor-pointer border px-4 py-2 text-sm ${
                buckle === opt.id
                  ? "border-spray-orange bg-spray-orange text-black"
                  : "border-spray-border text-white"
              }`}
            >
              <input
                type="radio"
                name="owl-ja-buckle"
                checked={buckle === opt.id}
                onChange={() => setBuckle(opt.id)}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4">
        <label className="text-sm text-white/80" htmlFor="owl-ja-qty">
          {f.quantity}
        </label>
        <select
          id="owl-ja-qty"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-1 min-h-11 w-full max-w-[8rem] rounded border border-spray-border bg-black px-3 text-white"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <fieldset className={`${fieldClass} mt-4`}>
        <legend className="text-sm font-medium text-white/80">{ff.title}</legend>
        <label className={optionClass(fulfillmentMethod === "store_pickup")}>
          <input
            type="radio"
            name="owl-ja-fulfillment"
            checked={fulfillmentMethod === "store_pickup"}
            onChange={() => setFulfillmentMethod("store_pickup")}
            className="mt-1 accent-spray-orange"
          />
          <span>
            <span className="block font-medium">{ff.storePickup}</span>
            <span className="mt-0.5 block text-xs text-white/55">{ff.storePickupNote}</span>
          </span>
        </label>
        <label className={optionClass(fulfillmentMethod === "domestic_shipping")}>
          <input
            type="radio"
            name="owl-ja-fulfillment"
            checked={fulfillmentMethod === "domestic_shipping"}
            onChange={() => setFulfillmentMethod("domestic_shipping")}
            className="mt-1 accent-spray-orange"
          />
          <span>
            <span className="block font-medium">{ff.domesticShipping}</span>
            <span className="mt-0.5 block text-xs text-white/55">{ff.domesticShippingNote}</span>
          </span>
        </label>
        <p className="text-xs text-white/50">{ff.noInternational}</p>
      </fieldset>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={addLine} className="btn-park min-h-12 flex-1">
          {checkout.addToCart}
        </button>
        <button
          type="button"
          onClick={() => {
            addLine();
            router.push("/ja/checkout");
          }}
          className="btn-shop-outline min-h-12 flex-1 border-spray-orange text-white"
        >
          {checkout.buyNow}
        </button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-white/55">
        {isStorePickup ? checkout.pickupSelected : checkout.shipSelected}
      </p>

      <p className="mt-4 text-sm text-white/70">
        {f.phoneCta}:{" "}
        <a href={copy.footer.telLink} className="font-bold text-white underline">
          {copy.footer.tel}
        </a>
      </p>
    </div>
  );
}
