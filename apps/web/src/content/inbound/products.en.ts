export type InboundProduct = {
  slug: string;
  name: string;
  brand: string;
  priceJpy: number;
  badge?: string;
  description: string;
  series: string;
  lengthMm: number;
  officialUrl: string;
  reviewCount: number;
};

export const gentemCollection = {
  slug: "gentemstick",
  title: "GENTEMSTICK",
  subtitle: "THE SNOWSURF — Pre-order boards for 26/27 season",
  description:
    "Curated GENTEMSTICK models available through SPRAY Asahikawa. Reserve online, pick up in store, or arrange international shipping.",
  shopCollectionUrl: "https://www.spray166.shop/shopbrand/I61078/",
} as const;

export const inboundProducts: readonly InboundProduct[] = [
  {
    slug: "26-27-aloha-nokaoi",
    name: "26-27 ALOHA NOKAOI",
    brand: "GENTEMSTICK",
    priceJpy: 160_600,
    badge: "Pre-order",
    description:
      "Jerry Lopez–inspired hot-dogging shape with a pointy nose and controlled taper. Short camber for stable performance in variable North American-style conditions.",
    series: "THE SNOWSURF",
    lengthMm: 1570,
    officialUrl: "https://gentemstick.com/products/26-27-aloha-nokaoi",
    reviewCount: 1,
  },
  {
    slug: "26-27-spoon-fish-146",
    name: "26-27 SPOON FISH 146",
    brand: "GENTEMSTICK",
    priceJpy: 136_400,
    badge: "Pre-order",
    description:
      "Women-tuned mid-size Spoon Fish with a slightly narrower nose and deeper slit. Accel camber for slashy, responsive turns in trees and groomers.",
    series: "THE SNOWSURF",
    lengthMm: 1460,
    officialUrl: "https://gentemstick.com/products/26-27-spoon-fish-146",
    reviewCount: 1,
  },
  {
    slug: "26-27-the-chaser-hp",
    name: "26-27 THE CHASER HIGH PERFORMANCE",
    brand: "GENTEMSTICK",
    priceJpy: 150_700,
    badge: "Pre-order",
    description:
      "All-mountain weapon with strong float, nimble size, and honest carving from day one. Fine-tuned from the wide THE CHASER platform for everyday riders.",
    series: "ALTERNATIVE",
    lengthMm: 1552,
    officialUrl: "https://gentemstick.com/products/26-27-the-chaser-hp",
    reviewCount: 17,
  },
  {
    slug: "26-27-mid-fish-oc",
    name: "26-27 MID FISH OUTLINE CORE",
    brand: "GENTEMSTICK",
    priceJpy: 188_100,
    badge: "Pre-order",
    description:
      "New outline core layout in the FISH line. Refined sidecut and tail balance with bamboo hybrid sidewalls. Accel camber for loose or quick lines in powder and trees.",
    series: "ALTERNATIVE",
    lengthMm: 1520,
    officialUrl: "https://gentemstick.com/products/26-27-mid-fish-oc",
    reviewCount: 7,
  },
] as const;

export function getInboundProduct(slug: string): InboundProduct | undefined {
  return inboundProducts.find((p) => p.slug === slug);
}

export function formatJpy(amount: number): string {
  return `¥${amount.toLocaleString("en-US")} JPY`;
}
