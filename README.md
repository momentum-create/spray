# SPRAY — Concrete Ground Zer0 LP

BKKDW 型ストーリーテリング LP の **独立デプロイ用** 静的サイト。  
本番 `apps/web` とは別プロジェクトとして Vercel に載せる想定。

## ローカルプレビュー

```powershell
cd spray-ground-zero-lp
python -m http.server 3456
# → http://localhost:3456/
```

## モック画像の生成

```powershell
cd spray-ground-zero-lp
npm install
npm run capture:serve
```

出力: `mock-images/*.png`（desktop / mobile、セクション別 + フルページ）

## Vercel デプロイ

### 初回

```powershell
cd spray-ground-zero-lp
git init
git add .
git commit -m "Initial Ground Zer0 LP mock"
npx vercel link    # 新規プロジェクト spray-ground-zero-lp
npx vercel --prod
```

### 設定

| 項目 | 値 |
|------|-----|
| Framework | Other |
| Root Directory | `spray-ground-zero-lp`（モノレポからデプロイ時） |
| Build Command | （空） |
| Output Directory | `.` |

`vercel.json` 同梱。静的 HTML のみ — ビルド不要。

## 親リポジトリとの関係

- **ソース UX モック:** `.claude/agents/product-ux/mock-001.html`
- **Handoff:** `.claude/agents/docs-knowledge/handoffs/bkkdw-clone-v1/HANDOFF.md`
- 本フォルダは **別 Git リポジトリ**（Vercel 単体プロジェクト用）

## 本番差し替え時

1. YouTube 埋め込み → 自社ホスト MP4（`public/video/hero.mp4`）
2. `apps/web` トップ `/` へ Next.js 移植（implementer ゲート）
