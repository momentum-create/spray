"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatJpy } from "@/content/inbound/products.en";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import {
  getOwlGoggleProduct,
  owlGoggleEn,
  type OwlGoggleModelKey,
} from "@/content/inbound/owl-goggle.en";
import { TaxFreeNote } from "@/components/inbound/dawn/TaxFreeNote";
import { FulfillmentMethodSelector } from "@/components/inbound/dawn/FulfillmentMethodSelector";
import {
  DEFAULT_FULFILLMENT_METHOD,
  type FulfillmentMethod,
} from "@/components/inbound/dawn/fulfillment";
import { useCart } from "@/components/inbound/dawn/CartProvider";

type Buckle = "with" | "without";

export function OwlGoggleBuyBox() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [model, setModel] = useState<OwlGoggleModelKey>("flow");
  const [buckle, setBuckle] = useState<Buckle>("with");
  const [fulfillmentMethod, setFulfillmentMethod] = useState<FulfillmentMethod>(
    DEFAULT_FULFILLMENT_METHOD,
  );

  const product = useMemo(() => getOwlGoggleProduct(model), [model]);
  const isStorePickup = fulfillmentMethod === "store_pickup";
  const variantLabel = useMemo(() => {
    const buckleLabel = buckle === "with" ? "Buckle: With" : "Buckle: Without";
    return `${product.name} · ${buckleLabel}`;
  }, [product.name, buckle]);

  const cartOptions = {
    fulfillmentMethod,
    variantLabel,
  };

  const addLine = () => {
    addToCart(product, cartOptions);
  };

  return (
    <div className="dawn-buy-box w-full bg-white">
      <p className="text-xs uppercase tracking-widest text-black/50">SPRAY × OWL OPTICAL</p>
      <h1 className="mt-2 text-2xl font-medium leading-tight text-black md:text-3xl">
        Original Goggles — Ainu Logo White
      </h1>

      <p className="mt-3 rounded border border-amber-200/80 bg-amber-50 px-3 py-2 text-sm text-amber-950">
        {owlGoggleEn.deliveryNoteJa}
      </p>
      <p className="mt-1 text-xs text-black/55">{owlGoggleEn.deliveryNoteEn}</p>

      <p className="mt-4 text-xl text-black">{formatJpy(product.priceJpy)}</p>
      <p className="text-xs text-black/50">Tax included · per model</p>
      <span className="mt-2 inline-block border border-[#e8e8e8] px-2 py-0.5 text-xs text-black/70">
        Pre-order
      </span>

      <section className="mt-5 border border-[#e8e8e8] bg-[#fafafa] p-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
          Pre-order notice
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-black/80">
          {owlGoggleEn.preOrderNotice.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <fieldset className="mt-5 border border-[#e8e8e8] p-4">
        <legend className="px-1 text-xs font-medium uppercase tracking-wide text-black/70">
          Model · モデル
        </legend>
        <div className="space-y-2">
          {(["flow", "vent"] as const).map((key) => {
            const m = owlGoggleEn[key];
            return (
              <label
                key={key}
                className={`flex cursor-pointer items-start gap-3 border p-3 text-sm ${
                  model === key ? "border-black bg-black/5" : "border-[#e8e8e8]"
                }`}
              >
                <input
                  type="radio"
                  name="owl-model"
                  value={key}
                  checked={model === key}
                  onChange={() => setModel(key)}
                  className="mt-1"
                />
                <span>
                  <span className="font-medium text-black">{m.fullName}</span>
                  <span className="mt-0.5 block text-xs text-black/55">{m.tagline}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-5 border border-[#e8e8e8] p-4">
        <legend className="px-1 text-xs font-medium uppercase tracking-wide text-black/70">
          Buckle · バックル
        </legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: "with" as const, label: "With buckle / バックルあり" },
              { id: "without" as const, label: "Without buckle / バックルなし" },
            ] as const
          ).map((opt) => (
            <label
              key={opt.id}
              className={`cursor-pointer border px-4 py-2 text-sm ${
                buckle === opt.id ? "border-black bg-black text-white" : "border-[#e8e8e8] text-black"
              }`}
            >
              <input
                type="radio"
                name="owl-buckle"
                value={opt.id}
                checked={buckle === opt.id}
                onChange={() => setBuckle(opt.id)}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <FulfillmentMethodSelector
          name="fulfillment-owl-goggle"
          value={fulfillmentMethod}
          onChange={setFulfillmentMethod}
        />
      </div>

      <div className="mt-6 space-y-3">
        <button type="button" onClick={addLine} className="dawn-btn-secondary w-full">
          {dawnCopy.product.addToCart}
        </button>
        <button
          type="button"
          onClick={() => {
            addLine();
            router.push("/en/checkout");
          }}
          className="dawn-btn-primary w-full"
        >
          {dawnCopy.product.buyNow}
        </button>
        <a
          href={product.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="dawn-btn-secondary flex w-full items-center justify-center text-center text-sm"
        >
          OWL {model === "flow" ? "Flow" : "Vent"} on owloptical.net
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
