# SPRAY ウェブサイト再構築 — 根本コンセプト

**版:** 1.0  
**日付:** 2026-05-18  
**地位:** 本プロジェクトの **北極星（North Star）**。ベースデザイン（`Pict/`）、技術ロードマップ（`website-rebuild-roadmap-v2-design.md`）、実装判断はすべて本書に従う。

---

## 1. コンセプトステートメント

### 1.1 一言で

> **「買う・滑る・習う・直す・来る」— 5つの意思を、迷わず1クリックで。**

SPRAY は単一の店舗サイトではなく、**実店舗・屋内パーク・スクール・3つのオンラインショップ・プロメンテ** という5つの事業軸を持つ **オムニチャネル・ハブ** である。再構築の目的は、見た目の刷新ではなく、**ユーザー意図（Intent）ごとに情報を分離し、最短動線で届ける情報設計** である。

### 1.2 解くべき現状課題（構造面）

| 課題 | 原因 | コンセプトでの解 |
|------|------|------------------|
| EC の売上取りこぼし | 3モールへの導線が分散・HTTP | トップ + Mega-menu + `/shop/` ハブで **常時3択** |
| パーク利用者の離脱 | `/aircraft/`、スクールが埋もれる | **SKATE PARK / SCHOOL** をメニュー独立 |
| メンテ依頼の不安 | 料金・工程が画像中心 | **MAINTENANCE** 独立 + 工程・スタッフ・表 |
| ブランド検索の断絶 | `/page-99/`、portfolio 非連携 | **BRANDS** A–Z + 各モール深いリンク |
| 来店意欲の弱さ | 地図・初参加者ガイド不足 | **ABOUT US** + **初めての方へ** |

### 1.3 デザイン（Pict）との関係

| レイヤ | 役割 |
|--------|------|
| **本コンセプト** | 何を・なぜ・誰向けに分けるか（IA・動線） |
| **Pict モック** | どう見せるか（ダークUI・オレンジ/青 CTA・コンポーネント） |
| **参考6サイト** | 世界・国内の **構造パターン** の根拠 |

ビジュアルは Pict に従い、**メニュー構造・ページ粒度・導線の優先度** は本書 + 参考サイトのハイブリッドとする。

---

## 2. ユーザー意図モデル（5軸）

すべてのページは、次のいずれか **主目的** を持つ。1ページに主目的を2つ以上載せない（補助リンクは可）。

| 軸 | ユーザー | 知りたいこと | 主 CTA 色（Pict） |
|----|----------|--------------|-------------------|
| **EC** | ネットで買いたい | どこで買う？新着は？ブランドは？ | オレンジ |
| **PARK** | 滑りたい | 料金・空き・ルール・場所 | ブルー |
| **SCHOOL** | 習いたい | レッスン内容・予約・初めて | ブルー |
| **MAINTENANCE** | 直してほしい | 料金・納期・工程・信頼 | オレンジ（依頼） |
| **STORE** | 来店したい | 場所・時間・スタッフ・実店舗在庫感 | 白 / ニュートラル |

**Home の役割:** 5軸への **均等な入口** を提供しつつ、ファーストビューで EC バナー（売上）とパーク CTA（来店・体験）を最も目立たせる（店舗戦略に応じて比率調整可）。

---

## 3. 参考サイト — 構造パターンの抽出

### 3.1 国内3サイト

| 参考 | URL | 借りる構造 | SPRAY への適用 |
|------|-----|------------|----------------|
| **SKIP FACTORY** | スケートパーク（埼玉） | PARK / SCHOOL / CALENDAR の **目的別ナビ独立** | `/skatepark/` に料金・ルール・**カレンダー**を集約。`/school/` をメニュー最上位に |
| **California Street** | スケートショップ | ブランドリスト → EC、トップの **新入荷→購入導線** | `/brands/` + Home **新着**（モールバッジ付き）→ 各 EC 深いリンク |
| **SHIFT** | スノーショップ（千葉） | TUNE UP 独立、**工程・料金・納期・顔** | `/maintenance/` に SNB/SKB タブ、5ステップ、技術者 CPT |

### 3.2 海外3サイト

| 参考 | URL | 借りる構造 | SPRAY への適用 |
|------|-----|------------|----------------|
| **Evo** | evo.com | SHOP / LOCATIONS / **SERVICES** の完全分離、メンテ表 | グローバルナビを **目的別5+1** に。メンテは表形式・サービス説明 |
| **Blue Tomato** | blue-tomato.com | **Brands A–Z** ロゴインデックス、Snow/Skate 入口分割 | `/brands/` + Home で **スノー｜スケート** 2入口（季節切替） |
| **Rampfest** | rampfest.com.au | Book a Session / Coaching、**First Timers** | `/skatepark/booking/`、`/school/`、**`/skatepark/first-timers/`** 新設 |

### 3.3 パターン → 機能マトリクス

| 構造パターン | 出典 | 実装場所 |
|--------------|------|----------|
| 目的別グローバルナビ | Evo, SKIP | ヘッダー6項目 |
| Mega-menu（写真付きEC） | Evo, Pict | ONLINE SHOP ホバー/タップ |
| パークカレンダー | SKIP | `/skatepark/` + Home ウィジェット |
| 初めての方ガイド | Rampfest | `/skatepark/first-timers/` |
| ブランド A–Z ロゴ | Blue Tomato, Pict | `/brands/` |
| Snow / Skate 分割入口 | Blue Tomato | Home ヒーロー下 |
| メンテ工程・料金表 | SHIFT, Evo | `/maintenance/` |
| 新着 → モール誘導 | California Street, Pict | Home + `/shop/` |
| スタッフ・作業風景 | SHIFT | `/maintenance/`, `/about/staff/` |
| 実店舗・地図 | Evo LOCATIONS | `/about/access/` |

---

## 4. 理想的なサイト構造（確定サイトマップ）

### 4.1 グローバルナビゲーション（PC / モバイル共通ラベル）

```
[ SPRAY Logo ]   ONLINE SHOP ▾   SKATE PARK ▾   SCHOOL ▾   MAINTENANCE   BRANDS   ABOUT US ▾   [ 🔵 パーク ] [ 🟠 通販 ]
```

**モバイル:** ハンバーガー内に同一6項目 + 下部固定2 CTA（パーク / 通販）。

#### Mega-menu 定義

| 親 | ドロップダウン内容 |
|----|-------------------|
| **ONLINE SHOP** | 楽天市場（特徴1行・ポイント）／ Yahoo!ショッピング／ 公式オンライン GMO（`spray166.shop`）— **各バナー画像 + 新着へのリンク** |
| **SKATE PARK** | 施設案内｜料金・時間｜カレンダー｜ルール｜**初めての方へ** |
| **SCHOOL** | レッスン一覧｜キッズキャンプ｜インストラクター｜予約・問い合わせ |
| **ABOUT US** | アクセス・地図｜スタッフ｜会社・歴史｜**店舗カレンダー**（休業・イベント） |

MAINTENANCE / BRANDS は **下層なし単一リンク**（ページ内アンカーで十分なため）。

---

### 4.2 ディレクトリツリー（完全版）

```
https://www.spray166.com/
│
├── /  …………………………… HOME
│   ├── ファーストビュー: Snow｜Skate 2入口 + ヒーロー（Pict: PLAY ON SNOW…）
│   ├── 特大 EC バナー ×3（楽天・Yahoo・GMO）— California Street 参考
│   ├── 新着アイテム（モールバッジ付きカルーセル）
│   ├── 最新 News 3件（Instagram 連動可）
│   ├── パーク今日の状況 + カレンダー要約（SKIP 参考）
│   └── ショートカット: メンテ依頼｜初めての方｜ブランド一覧
│
├── /shop/  …………………… ONLINE SHOP ハブ
│   ├── 3モール比較表（ポイント・送料・取扱の違い）
│   ├── 各モールへの CTA（HTTPS・UTM）
│   └── よくある質問（どこで買う？返品は各モールへ）
│
├── /skatepark/  ………… SKATE PARK（旧 /aircraft/ → 301）
│   ├── /skatepark/facility/     施設・写真・580㎡・セクション紹介
│   ├── /skatepark/prices/       料金表（HTML表・会員/非会員）
│   ├── /skatepark/calendar/     営業・貸切・スクール占有（Google Calendar 埋め込み or 手動）
│   ├── /skatepark/rules/        ルール・マナー・装備
│   └── /skatepark/first-timers/ 初めての方へ（Rampfest 参考）★必須
│
├── /school/  ………………… SCHOOL（現行から独立）★必須
│   ├── /school/lessons/         プライベート・グループ等
│   ├── /school/camp/            キッズキャンプ等
│   ├── /school/instructors/     コーチ紹介
│   └── /school/booking/         予約・問い合わせ（フォーム or 電話）
│
├── /maintenance/  ……… MAINTENANCE（旧 board-maintenance → 301）
│   ├── SNB｜SKB タブ（SHIFT 参考）
│   ├── サービスカード + 料金・納期表（Evo 参考）
│   ├── 工程 5ステップ（Pict）
│   ├── 技術者紹介（SHIFT）
│   └── /maintenance/request/    依頼フォーム（一般問い合わせと分離）
│
├── /brands/  ………………… BRAND LIST（旧 /page-99/ → 301）
│   ├── ?category=snow｜skate（Blue Tomato 参考）
│   ├── A–Z フィルタ + ロゴグリッド（Pict）
│   └── /brands/{slug}/          ブランド詳細 → 各モール検索URLへ
│
├── /about/  …………………… ABOUT US
│   ├── /about/access/           地図・交通・バス・駐車（レスポンシブ表）
│   ├── /about/staff/            スタッフ紹介
│   ├── /about/story/            1996年〜の歴史・コンセプト
│   └── /about/calendar/         店舗イベント・特別営業（パークカレンダーと別）
│
├── /news/  …………………… News（旧 /blog/ → 301）
│   └── /news/{slug}/
│
└── /legal/privacy/  … プライバシー
```

---

### 4.3 階層表（メニュー ↔ 目的）

| 階層1（メインメニュー） | 階層2（主要サブ） | 主ユーザー意図 | 参考 |
|------------------------|-------------------|----------------|------|
| **HOME** | News、ECバナー、新着、パーク状況 | 全体把握・入口 | California Street, Pict |
| **SKATE PARK** | 施設、料金、カレンダー、ルール、初めて | 滑る | SKIP, Rampfest |
| **SCHOOL** | レッスン、予約、インストラクター | 習う | SKIP, Rampfest |
| **MAINTENANCE** | SNB/SKB、料金、依頼 | 直す | SHIFT, Evo |
| **BRAND LIST** | スノー/スケート、A–Z | 買う（探索） | Blue Tomato, California Street |
| **ONLINE SHOP** | 楽天、Yahoo、GMO | 買う（決定） | California Street, Pict Mega |
| **ABOUT US** | アクセス、スタッフ、歴史 | 来る・信頼 | Evo LOCATIONS, SHIFT |

---

## 5. ユーザー別ジャーニー（迷わせない動線）

### 5.1 「パークで滑りたい」

```
Home → [パーク CTA] または メニュー SKATE PARK
  → /skatepark/calendar/（空き確認）
  → /skatepark/prices/（料金）
  → /skatepark/first-timers/（初回のみ）
  → 来店（/about/access/）
```

### 5.2 「レッスンを受けたい」

```
Home → SCHOOL または /skatepark/ 内からスクールへ
  → /school/lessons/
  → /school/booking/（予約）
```

### 5.3 「ネットで買いたい」

```
Home → 特大ECバナー または ONLINE SHOP Mega-menu
  → /shop/（比較）または 直接 楽天/Yahoo/GMO
  → 商品探索は /brands/{slug}/ から各モール深いリンク
```

### 5.4 「ボードを直したい」

```
Home → メンテショートカット または MAINTENANCE
  → /maintenance/（料金・工程・スタッフ確認）
  → /maintenance/request/
```

### 5.5 「店舗に行きたい」

```
Home → ABOUT US
  → /about/access/（Maps・tel:）
  → /about/staff/
```

**設計原則:** 各ジャーニーは **3クリック以内** で主 CTA に到達。Home は5軸すべてに **1クリック** で入れること。

---

## 6. UI/UX 原則（参考サイト × Pict の合成）

| # | 原則 | 根拠 |
|---|------|------|
| 1 | **目的色の一貫性** | ブルー=パーク/スクール、オレンジ=EC/メンテ依頼（Pict） |
| 2 | **Mega-menu で3 EC を常時可視** | Evo, Pict |
| 3 | **First Timers を独立URL** | Rampfest |
| 4 | **料金は HTML 表**（画像のみ禁止） | SHIFT, Evo |
| 5 | **ブランドはロゴ + A–Z**（テキスト羅列禁止） | Blue Tomato, Pict |
| 6 | **Snow / Skate の入口分割** | Blue Tomato |
| 7 | **カレンダーはパークページの中心** | SKIP |
| 8 | **メンテは顔と作業風景** | SHIFT |
| 9 | **モバイル: 固定フッター CTA**（パーク｜通販） | 国内ユーザー実態 |
| 10 | **日本語メイン**、専門用語は補足 | 旭川・国内向け |

---

## 7. 旧URL → 新URL（コンセプト準拠）

| 旧 | 新 |
|----|-----|
| `/aircraft/` | `/skatepark/` |
| `/page-99/` | `/brands/` |
| `/board-maintenance/` | `/maintenance/` |
| `/service/board-maintenance/` | `/maintenance/` |
| `/contact/` | `/about/access/` |
| `/blog/` | `/news/` |
| `/online-shop/` | `/shop/` |
| `/portfolio-item/*/` | `/brands/*/` |

---

## 8. コンテンツ優先度（ベースデザイン制作時）

| 優先度 | ページ | デザイン成果物 |
|--------|--------|----------------|
| P0 | Home, Mega-menu | PC + モバイル |
| P0 | `/skatepark/` + first-timers + calendar | PC + モバイル |
| P0 | `/shop/` ハブ | PC + モバイル |
| P1 | `/maintenance/` | PC + モバイル |
| P1 | `/brands/` | PC + モバイル |
| P1 | `/school/` | PC + モバイル |
| P2 | `/about/*`, `/news/` | PC + モバイル |

---

## 9. 技術方針（コンセプト不変）

構造（IA）は本書。実装は `website-rebuild-roadmap-v2-design.md` に従う。

- **フロント:** Next.js + Tailwind（Pict 再現）
- **CMS:** WordPress ヘッドレス（news, brand, staff, service, lesson, park_calendar）
- **EC:** 外部3モール送客のみ（カートは持たない）

---

## 10. 本コンセプトのチェックリスト

新しいページ・デザイン案を追加するとき、次をすべて満たすこと。

- [ ] 5軸（EC / PARK / SCHOOL / MAINTENANCE / STORE）のどれが **主目的** か明示されているか
- [ ] グローバルナビ6項目のどれに属するか
- [ ] モバイルで **3タップ以内** で主 CTA に届くか
- [ ] EC 導線が **3モール** を公平に扱っているか
- [ ] 初参加者向けに **/skatepark/first-timers/** へ誘導できるか
- [ ] 料金・納期が **表** で読めるか（画像のみでないか）

---

## 改訂履歴

| 版 | 日付 | 内容 |
|----|------|------|
| 1.0 | 2026-05-18 | 参考6サイト + ハイブリッド案 + Pict を統合した根本コンセプト初版 |
