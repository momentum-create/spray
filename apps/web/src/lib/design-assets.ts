/**
 * 差し込み画像マップ（Pict モック + ユーザー添付）
 *
 * | 掲載箇所 | 採用ファイル | 出典・用途 |
 * |----------|--------------|------------|
 * | トップ BOARD MAINTENANCE 左 | user-provided/workshop-scraper-hero.png | ユーザー提案 Gemini fvpovg：スクレーパー・RIP SAS 壁 |
 * | メンテナンス全幅ヒーロー | 同上 | 同上 |
 * | メンテ チューンアップ下部イラスト | pict-maintenance-tools-panel.png | Pict 10xx6x：ヤスリ・アイロン工具 |
 * | トップ全幅ヒーロー | hero-play-on-snow-ride-concrete.png | 雪×スケート斜め分割（生成オリジナル） |
 * | トップ左カラム（パーク）・/skatepark ヒーロー | indoor-skatepark-hero.png | ユーザー提案 Gemini ncmmn：屋内ボウル |
 * | メンテ フロー/技術者サムネ | workshop-scraper-hero + pict 系 | 暫定プレースホルダ |
 * | NG（ページ全体スクショ） | maintenance-reference-full, home-board-maintenance-section | ネストした画面キャプチャのため左パネルに使わない |
 */
export const designAssets = {
  pict: {
    homeFull: "/images/design/Gemini_Generated_Image_3uqwxy3uqwxy3uqw.png",
    homeMegaMenu: "/images/design/Gemini_Generated_Image_ldx2inldx2inldx2.png",
    homePanels: "/images/design/Gemini_Generated_Image_g3n7fsg3n7fsg3n7.png",
    skateparkHub: "/images/design/Gemini_Generated_Image_xsbgb0xsbgb0xsbg.png",
    maintenance: "/images/design/Gemini_Generated_Image_k97hotk97hotk97h.png",
    maintenanceAlt: "/images/design/Gemini_Generated_Image_10xx6x10xx6x10xx.png",
    brands: "/images/design/Gemini_Generated_Image_xdsljbxdsljbxdsl.png",
    mobile: "/images/design/Gemini_Generated_Image_so14s6so14s6so14.png",
  },
  /** ユーザー添付 — ワークショップ・スクレーパー（Precision Care 用） */
  userProvided: {
    workshopScraperHero: "/images/user-provided/workshop-scraper-hero.png",
    indoorSkateparkHero: "/images/user-provided/indoor-skatepark-hero.png",
    pictMaintenanceFullMock: "/images/user-provided/pict-maintenance-full-mock.png",
    pictMaintenanceTools: "/images/user-provided/pict-maintenance-tools-panel.png",
  },
  /** トップ全幅ヒーロー（PLAY ON SNOW — 斜め分割） */
  hero: "/images/hero-play-on-snow-ride-concrete.png",
  /** パーク系サムネ・左カラム */
  skateparkHero: "/images/user-provided/indoor-skatepark-hero.png",
  graffiti: "/images/graffiti-spray-logo.png",
  /** @deprecated alias — workshopScraperHero と同一 */
  maintenanceHero: "/images/user-provided/workshop-scraper-hero.png",
  maintenanceReference: "/images/design/maintenance-reference-full.png",
  /** トップ左パネル背景（スクレーパー写真 + コードで文字重ね） */
  homeMaintenancePanel: "/images/user-provided/workshop-scraper-hero.png",
} as const;
