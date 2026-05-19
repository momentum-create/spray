export type MallId = "rakuten" | "yahoo" | "gmo";

export const malls = [
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
  {
    id: "gmo" as const,
    name: "公式オンラインストア",
    url: process.env.NEXT_PUBLIC_SHOP_GMO ?? "https://www.spray166.shop/",
    utm: "utm_source=spray166&utm_medium=site&utm_campaign=hub_gmo",
  },
] as const;

export function mallUrl(mall: (typeof malls)[number]): string {
  const sep = mall.url.includes("?") ? "&" : "?";
  return `${mall.url}${sep}${mall.utm}`;
}
