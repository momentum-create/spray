export type MallId = "rakuten" | "yahoo" | "official";
type Locale = "ja" | "en";

/** メガメニュー等の短いラベル（公式ストアは copy.shop.malls.official.name を優先） */
export function mallNavLabel(
  id: MallId,
  copy: { shop: { malls: Record<MallId, { name: string }> } },
  locale: "ja" | "en",
): string {
  if (id === "official") return copy.shop.malls.official.name;
  if (id === "rakuten") return locale === "ja" ? "楽天市場" : "RAKUTEN";
  return locale === "ja" ? "Yahoo!" : "YAHOO";
}

/** ヒーロー等の CTA — モール表示名と常に一致させる */
export function heroShopCta(
  copy: { shop: { malls: Record<MallId, { name: string }> } },
  locale: "ja" | "en",
): string {
  const rakuten = mallNavLabel("rakuten", copy, locale);
  const yahoo = mallNavLabel("yahoo", copy, locale);
  const official = mallNavLabel("official", copy, locale);
  if (locale === "ja") {
    return `オンラインショップ（${rakuten}・${yahoo}・${official}）`;
  }
  return `SHOP ONLINE (${rakuten}, ${yahoo}, ${official})`;
}

export const malls = [
  {
    id: "official" as const,
    name: "公式ストア",
    url:
      process.env.NEXT_PUBLIC_SHOP_OFFICIAL ??
      process.env.NEXT_PUBLIC_SHOP_GMO ??
      "https://www.spray166.shop/",
    utm: "utm_source=spray166&utm_medium=site&utm_campaign=hub_official",
  },
  {
    id: "rakuten" as const,
    name: "楽天市場 SPRAY 店",
    url: process.env.NEXT_PUBLIC_SHOP_RAKUTEN ?? "https://www.rakuten.ne.jp/gold/spray/",
    utm: "utm_source=spray166&utm_medium=site&utm_campaign=hub_rakuten",
  },
  {
    id: "yahoo" as const,
    name: "Yahoo!ショッピング SPRAY 店",
    url: process.env.NEXT_PUBLIC_SHOP_YAHOO ?? "https://store.shopping.yahoo.co.jp/spray/",
    utm: "utm_source=spray166&utm_medium=site&utm_campaign=hub_yahoo",
  },
] as const;

export function mallUrl(mall: (typeof malls)[number], _locale?: Locale): string {
  const sep = mall.url.includes("?") ? "&" : "?";
  return `${mall.url}${sep}${mall.utm}`;
}
