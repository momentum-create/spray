/**
 * Official store category index — https://www.spray166.shop/
 * Run: node scripts/fetch-category-catalog.mjs --all
 *      node scripts/fetch-category-catalog.mjs ct299 --images
 */

export type ShopCategoryDef = {
  slug: string;
  makeshopCode: string;
  title: string;
  titleJa: string;
};

export const shopCategoryRegistry: readonly ShopCategoryDef[] = [
  { slug: "spray-original", makeshopCode: "ct271", title: "SPRAY Original", titleJa: "SPRAYオリジナル" },
  { slug: "snowboard", makeshopCode: "I61077", title: "Snowboards", titleJa: "スノーボード" },
  { slug: "binding", makeshopCode: "ct296", title: "Bindings", titleJa: "バインディング" },
  { slug: "boots", makeshopCode: "ct297", title: "Boots", titleJa: "ブーツ" },
  { slug: "wear", makeshopCode: "ct298", title: "Wear", titleJa: "ウェア" },
  { slug: "goggles", makeshopCode: "ct327", title: "Goggles", titleJa: "ゴーグル" },
  { slug: "gloves", makeshopCode: "ct299", title: "Gloves", titleJa: "グローブ" },
  { slug: "backpack", makeshopCode: "ct300", title: "Backpacks", titleJa: "バックパック" },
  { slug: "backcountry", makeshopCode: "ct301", title: "Backcountry", titleJa: "バックカントリーアイテム" },
  { slug: "wax-maintenance", makeshopCode: "ct357", title: "Wax & Maintenance", titleJa: "WAX＆メンテナンス" },
  { slug: "layering", makeshopCode: "ct302", title: "Layering & Inner", titleJa: "レイヤリング・インナー" },
  { slug: "tshirt", makeshopCode: "I61116", title: "T-Shirts", titleJa: "Tシャツ" },
  { slug: "long-sleeve", makeshopCode: "ct303", title: "Long Sleeve", titleJa: "長袖" },
  { slug: "parka", makeshopCode: "ct304", title: "Parkas", titleJa: "パーカー" },
  { slug: "jacket", makeshopCode: "ct308", title: "Jackets & Outerwear", titleJa: "ジャケット・アウター" },
  { slug: "pants", makeshopCode: "I61132", title: "Pants", titleJa: "パンツ" },
  { slug: "footwear", makeshopCode: "I61086", title: "Footwear", titleJa: "フットウェア" },
  { slug: "bag", makeshopCode: "I61075", title: "Bags", titleJa: "バッグ" },
  { slug: "watch", makeshopCode: "I61066", title: "Watches", titleJa: "時計" },
  { slug: "sunglasses", makeshopCode: "I61109", title: "Sunglasses", titleJa: "サングラス" },
  { slug: "hat", makeshopCode: "I61098", title: "Hats", titleJa: "帽子" },
  { slug: "helmet", makeshopCode: "ct339", title: "Helmets", titleJa: "ヘルメット" },
  { slug: "skateboard", makeshopCode: "I61085", title: "Skateboards", titleJa: "スケートボード" },
  { slug: "skateboard-parts", makeshopCode: "ct307", title: "Skateboard Parts", titleJa: "スケートボードパーツ" },
  { slug: "sticker", makeshopCode: "ct306", title: "Stickers", titleJa: "ステッカー" },
  { slug: "accessories", makeshopCode: "I61079", title: "Accessories", titleJa: "小物・アクセサリー他" },
  { slug: "kids", makeshopCode: "ct305", title: "Kids & Junior", titleJa: "キッズ・ジュニア" },
  { slug: "sale", makeshopCode: "I61093", title: "Sale", titleJa: "SALE" },
] as const;

export function getCategoryDef(slugOrCode: string): ShopCategoryDef | undefined {
  return shopCategoryRegistry.find(
    (c) => c.slug === slugOrCode || c.makeshopCode === slugOrCode,
  );
}
