import { redirect } from "next/navigation";

/** OWL ゴーグル予約は英語ショップ（Dawn カート）へ統合 */
export default function OwlGoggleShopRedirectPage() {
  redirect("/en/products/spray/owl-goggle");
}
