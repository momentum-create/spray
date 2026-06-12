import type { ShopProduct } from "@/content/inbound/shop-product";
import { OWL_GOGGLE_UNIT_PRICE_JPY } from "@/lib/owl-goggle-commerce";

const DESIGN_SHEET = "/images/owl-goggle/design-sheet-flow-vent.png";
const STRAP_SHEET = "/images/owl-goggle/strap-spec-sheet.png";

export const owlGoggleEn = {
  officialFlowUrl: "https://owloptical.net/products/flow-yellow-photochromic-lens-purple",
  officialVentUrl: "https://owloptical.net/products/vent-black-photochromic-lens-red",
  deliveryNoteJa: "★予約販売となります。お届け予定：2026年11月上旬。",
  deliveryNoteEn: "Pre-order only. Estimated delivery: early November 2026.",
  designLead:
    "Navy PANTONE 539C base with white OWL logotype (PANTONE White) and Ainu motif — SPRAY exclusive.",
  strapSpecs: [
    "Base: PANTONE 539C navy / logos: PANTONE White",
    "Strap width 45 mm",
    "Left (325 mm): OWL logo",
    "Right (345 mm): Ainu motif (35 mm inset from right edge)",
    "OWL logo: 114.19 mm × 25.42 mm",
    "Ainu motif: 79.41 mm × 45.46 mm",
  ],
  flow: {
    name: "Flow",
    fullName: "Flow Ainu Logo White (black lens)",
    tagline: "Flat lens × flip-up ventilation",
    desc: "Clean flat lens design with one-finger flip-up airflow. Great for instructors who need eye contact.",
    features: [
      "Stylish flat lens design",
      "Magnetic lens swap and flip-up",
      "Photochromic lens for changing light",
      "Anti-fog double lens",
      "Silicone strap grip · Asian fit",
      "Glasses-compatible · helmet-compatible",
    ],
  },
  vent: {
    name: "Vent",
    fullName: "Vent Ainu Logo White (blue lens)",
    tagline: "Hybrid frame × flip-up ventilation",
    desc: "Round-and-flat hybrid frame with a soft, wide field of view for all-day comfort.",
    features: [
      "Hybrid round + flat frame",
      "Flip-up internal ventilation",
      "Magnetic lens exchange",
      "Photochromic for all weather",
      "Anti-fog double lens",
      "Silicone strap · Asian fit · glasses-compatible",
    ],
  },
  preOrderNotice: [
    "Made-to-order pre-order. No cancellation, modification, or refund after payment.",
    "Japan only — store pickup at SPRAY Asahikawa or domestic shipping.",
    "Free shipping on orders ¥5,000+ tax incl. (this item qualifies at qty 1).",
    "Fixed lens colors: Flow black lens, Vent blue lens.",
  ],
} as const;

export type OwlGoggleModelKey = "flow" | "vent";

function baseProduct(
  slug: string,
  name: string,
  description: string,
): ShopProduct {
  return {
    slug,
    name,
    brand: "SPRAY × OWL",
    brandSlug: "spray",
    priceJpy: OWL_GOGGLE_UNIT_PRICE_JPY,
    imageUrl: DESIGN_SHEET,
    imageGallery: [DESIGN_SHEET, STRAP_SHEET],
    description,
    officialUrl: owlGoggleEn.officialFlowUrl,
    categorySlug: "goggles",
    categoryTitle: "Goggles",
    badge: "Pre-order",
    reviewCount: 0,
  };
}

export function getOwlGoggleFlowProduct(): ShopProduct {
  return {
    ...baseProduct(
      "spray-owl-goggle-flow",
      owlGoggleEn.flow.fullName,
      owlGoggleEn.flow.desc,
    ),
    officialUrl: owlGoggleEn.officialFlowUrl,
  };
}

export function getOwlGoggleVentProduct(): ShopProduct {
  return {
    ...baseProduct(
      "spray-owl-goggle-vent",
      owlGoggleEn.vent.fullName,
      owlGoggleEn.vent.desc,
    ),
    officialUrl: owlGoggleEn.officialVentUrl,
  };
}

export function getOwlGoggleProduct(model: OwlGoggleModelKey): ShopProduct {
  return model === "flow" ? getOwlGoggleFlowProduct() : getOwlGoggleVentProduct();
}

export const OWL_GOGGLE_SLUGS = ["spray-owl-goggle-flow", "spray-owl-goggle-vent"] as const;

export function isOwlGoggleSlug(slug: string): boolean {
  return (OWL_GOGGLE_SLUGS as readonly string[]).includes(slug);
}
