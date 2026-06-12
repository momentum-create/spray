"use client";

import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import type { FulfillmentMethod } from "@/components/inbound/dawn/fulfillment";

type Props = {
  name: string;
  value: FulfillmentMethod;
  onChange: (value: FulfillmentMethod) => void;
  disableStorePickup?: boolean;
  disableDomesticShipping?: boolean;
};

export function FulfillmentMethodSelector({
  name,
  value,
  onChange,
  disableStorePickup = false,
  disableDomesticShipping = false,
}: Props) {
  const { fulfillment: copy } = dawnCopy;

  return (
    <fieldset className="border border-[#e8e8e8] p-4">
      <legend className="px-1 text-xs font-medium uppercase tracking-wide text-black/70">
        {copy.title}
      </legend>
      <div className="space-y-2">
        <label
          className={`flex cursor-pointer items-start gap-3 rounded-sm border p-3 text-sm transition ${
            value === "store_pickup"
              ? "border-black bg-[#fafafa]"
              : "border-[#e8e8e8] hover:border-black/30"
          } ${disableStorePickup ? "cursor-not-allowed opacity-50" : ""}`}
        >
          <input
            type="radio"
            name={name}
            className="mt-1"
            checked={value === "store_pickup"}
            disabled={disableStorePickup}
            onChange={() => onChange("store_pickup")}
          />
          <span>
            <span className="block font-medium text-black">{copy.storePickup}</span>
            <span className="mt-0.5 block text-xs leading-relaxed text-black/60">
              {copy.storePickupNote}
            </span>
          </span>
        </label>
        <label
          className={`flex cursor-pointer items-start gap-3 rounded-sm border p-3 text-sm transition ${
            value === "domestic_shipping"
              ? "border-black bg-[#fafafa]"
              : "border-[#e8e8e8] hover:border-black/30"
          } ${disableDomesticShipping ? "cursor-not-allowed opacity-50" : ""}`}
        >
          <input
            type="radio"
            name={name}
            className="mt-1"
            checked={value === "domestic_shipping"}
            disabled={disableDomesticShipping}
            onChange={() => onChange("domestic_shipping")}
          />
          <span>
            <span className="block font-medium text-black">{copy.domesticShipping}</span>
            <span className="mt-0.5 block text-xs leading-relaxed text-black/60">
              {copy.domesticShippingNote}
            </span>
          </span>
        </label>
      </div>
      <p className="mt-2 text-[11px] text-black/50">{copy.noInternational}</p>
    </fieldset>
  );
}
