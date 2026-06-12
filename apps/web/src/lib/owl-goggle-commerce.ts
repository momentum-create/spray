import type { OwlGoggleModel } from "@/lib/forms/types";

/** 税込単価 */
export const OWL_GOGGLE_UNIT_PRICE_JPY = 25000;

/** 公式ストア利用案内: 税込5,000円以上で送料無料 */
export const OWL_GOGGLE_FREE_SHIPPING_FROM_JPY = 5000;

/** 全国一律500円（税別）→ 税込550円 */
export const OWL_GOGGLE_SHIPPING_FEE_JPY = 550;

export const OWL_GOGGLE_SHOP_INFO_URL = "https://www.spray166.shop/html/info.html";

export function owlGoggleUnits(model: OwlGoggleModel, quantity: number): number {
  if (quantity < 1) return 0;
  return model === "both" ? quantity * 2 : quantity;
}

export function calcOwlGoggleOrder(model: OwlGoggleModel, quantity: number) {
  const units = owlGoggleUnits(model, quantity);
  const subtotal = OWL_GOGGLE_UNIT_PRICE_JPY * units;
  const shipping =
    subtotal >= OWL_GOGGLE_FREE_SHIPPING_FROM_JPY ? 0 : OWL_GOGGLE_SHIPPING_FEE_JPY;
  return { units, subtotal, shipping, total: subtotal + shipping };
}

export function getOwlGoggleCheckoutUrl(model: OwlGoggleModel): string | null {
  const flow = process.env.NEXT_PUBLIC_OWL_GOGGLE_SHOP_FLOW_URL?.trim();
  const vent = process.env.NEXT_PUBLIC_OWL_GOGGLE_SHOP_VENT_URL?.trim();
  const both = process.env.NEXT_PUBLIC_OWL_GOGGLE_SHOP_BOTH_URL?.trim();

  if (model === "flow" && flow) return flow;
  if (model === "vent" && vent) return vent;
  if (model === "both" && both) return both;
  return null;
}
