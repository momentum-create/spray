import { dawnCopy } from "@/content/inbound/dawn-copy.en";

export type FulfillmentMethod = "store_pickup" | "domestic_shipping";

export const DEFAULT_FULFILLMENT_METHOD: FulfillmentMethod = "store_pickup";

export function fulfillmentLineKeySuffix(method: FulfillmentMethod): string {
  return `::fulfillment-${method}`;
}

export function fulfillmentMethodLabel(method: FulfillmentMethod): string {
  return method === "store_pickup"
    ? dawnCopy.fulfillment.labelStorePickup
    : dawnCopy.fulfillment.labelDomesticShipping;
}
