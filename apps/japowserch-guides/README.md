# japowserch-guides — スキー場ガイド静的サイト

`SkiresortWebPlan/docs/mock-assets/` をビルドして **guides.japowserch.com** 向けに配信する SPRAY 配下の独立サイト。

## なぜ SPRAY 側？

`docs/mock-assets` を `serve` で直接見るとパス・cleanUrls の都合で 404 になりやすい。  
本アプリは **本番と同じルート絶対パス**（`/_shared/`、`/area-map.html` 等）で `public/` を生成する。

## ローカル

```bash
cd apps/japowserch-guides
npm run dev
# → http://localhost:3456/biei/
# → http://localhost:3456/biei/nearby-food.html
# → http://localhost:3456/area-map.html?resort=biei&layers=food,anchor
```

隣に `SkiresortWebPlan` がある場合はそこから同期。無い場合は GitHub から shallow clone する。

## Vercel

1. [Vercel](https://vercel.com) → **spray** リポジトリを Import（または New Project）
2. **Root Directory**: `apps/japowserch-guides`
3. **Framework**: Other（`vercel.json` 参照）
4. **Build**: `node scripts/sync.mjs`（自動）
5. **Output**: `public`
6. ドメイン: `guides.japowserch.com` を割り当て

### 環境変数（任意）

| 変数 | 用途 |
|------|------|
| `GUIDES_HOST` | registry の URL ベース（既定 `https://guides.japowserch.com`） |
| `SKIRESORT_WEB_PLAN_REPO` | ビルド時 clone 先（既定 Seeker-x1/SkiresortWebPlan） |
| `SKIRESORT_WEB_PLAN_REF` | ブランチ（既定 `main`） |
| `SKIRESORT_WEB_PLAN_ROOT` | ローカル絶対パスで mock-assets を指定（CI では不要） |

## ソースの正

| 開発 | 本アプリ |
|------|----------|
| `SkiresortWebPlan/docs/mock-assets/` | `scripts/sync.mjs` → `public/` |
| `SkiresortWebPlan/guides/hub/` | `hub/`（索引ページ） |
| `data/resort-guides.json` | `data/resort-guides.json`（JAPOW ID 対応表） |

LP・マップの編集は **SkiresortWebPlan** 側で行い、push 後に Vercel が再ビルドする。
