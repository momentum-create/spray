import type { Locale } from "@/i18n/config";

/** JA: 予約フォーム / EN: Dawn カート商品ページ */
export function owlGoggleReserveHref(locale: Locale): string {
  return locale === "en" ? "/en/products/spray/owl-goggle" : "/shop/owl-goggle";
}
