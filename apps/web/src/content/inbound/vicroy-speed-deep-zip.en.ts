import type { ShopProduct } from "@/content/inbound/shop-product";

const VICROY_BASE = "https://www.vicroy.jp/wp-content/uploads/2026/04";

export const vicroySpeedDeepZip = {
  officialUrl: "https://www.vicroy.jp/product/speed-deep-26-27-zip/",
  imageCredit: "Product images courtesy of VICROY Official Web",
  deliveryNoteJa: "★予約販売となります。商品の納品は、11月中旬予定。",
  deliveryNoteEn: "Pre-order only. Estimated delivery: mid-November.",
  earlyReleaseTitleJa: "限定先行展開モデル",
  earlyReleaseBodyJa:
    "本モデルは、今後の商品改良に向けたフィードバック収集を目的とした限定先行展開モデルです。通常完成モデル想定価格より価格を抑えた、限定先行展開価格での販売となります。",
  earlyReleaseBodyEn:
    "Limited early-release model priced below the expected final retail price. Your feedback helps shape the production version.",
  aboutProductJa: `SPEED DEEPモデルをベースに、甲側へファスナー開閉機能を搭載したロングカフスグローブです。
グローブを外さずに手を出せるため、撮影やスマートフォン操作、細かな作業時にも便利。
ライディング中のちょっとした動作をスムーズにサポートします。
使い終わった後は、ファスナーを開けておくことで内部の湿気を逃がしやすく、乾きやすいのも魅力です。
手のひらには、指先部分に牛革、掌側に特殊合成ゴム素材を組み合わせた構造を採用。
ハンドスライド性能に偏りすぎず、指先の操作性と柔らかさをプラスした仕様です。
甲側には柔らかな山羊革を使用し、しなやかな動きやすさと安心感を両立。
カフス部分には丈夫なナイロン三層生地を採用し、耐久性を確保しながら軽量性にも配慮しています。
ゲレンデでのカービングから、パウダー、そして裏山まで。
足を伸ばしたくなる使い心地と、自由度の高い操作性を備えています。
長めのロングカフスは、雪の侵入を防ぎ、ウエアのスリーブカフもしっかりカバー。
深雪でも春先のトレーナースタイルでも、手首まわりを濡れにくく快適に保ちます。
握るから、滑るへ。
VICROYが提案する、自由に使えるジップ仕様のロングカフスグローブです。`,
  aboutProductEn: `Built on the SPEED DEEP platform with a zip opening on the back of the hand — a long-cuff glove you can slip your hand out of without removing the glove. Handy for photos, phone use, and fine adjustments on the hill. Leave the zip open after riding to vent moisture and dry faster. Palm combines cow leather at the fingertips with a special synthetic rubber palm for balanced glide, fingertip feel, and flexibility. Soft goat leather on the back of the hand; durable lightweight triple-layer nylon cuffs. From groomers to powder and sidecountry — long cuffs block snow and cover jacket sleeves. From grip to glide: VICROY's zip long-cuff glove.`,
  colors: ["BLACK"] as const,
  sizes: ["S", "M", "L"] as const,
  listPriceExTaxJpy: 17_910,
  priceJpy: 19_701,
} as const;

const gallery = [
  `${VICROY_BASE}/64776f6249726a6357505c7a31e34873.jpg`,
  `${VICROY_BASE}/6d7b7b87e89e98fe4de0a78b0c91c5af.jpg`,
  `${VICROY_BASE}/9e5d27cf23b5cbe659e67b2c8c8e86e2.jpg`,
  `${VICROY_BASE}/7cf36812dc01c693fa6ed9e4a982a113.jpg`,
  `${VICROY_BASE}/1bc9f814f5d068ad508372bab69d873b.jpg`,
  `${VICROY_BASE}/d14b39af94d424d4ad717a680546ddde.jpg`,
  `${VICROY_BASE}/750b06d585d667a9b812f0543a0852b3.jpg`,
  `${VICROY_BASE}/size.jpg`,
  `${VICROY_BASE}/efc7af836c4a93eeeaa69b88c1671d63.jpg`,
];

export function getVicroySpeedDeepZipProduct(): ShopProduct {
  return {
    slug: "vicroy-speed-deep-zip-26-27",
    name: "SPEED DEEP ZIP 26-27",
    brand: "VICROY",
    brandSlug: "vicroy",
    priceJpy: vicroySpeedDeepZip.priceJpy,
    imageUrl: gallery[0],
    imageGallery: gallery,
    description: vicroySpeedDeepZip.aboutProductEn,
    officialUrl: vicroySpeedDeepZip.officialUrl,
    categorySlug: "gloves",
    categoryTitle: "Gloves",
    badge: "Early pre-order",
    reviewCount: 0,
  };
}
