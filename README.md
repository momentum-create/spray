# SPRAY ウェブサイト再構築

北海道旭川・スケート＆スノーショップ SPRAY のコーポレートサイト（Next.js + WordPress ヘッドレス）。

## ドキュメント

| ファイル | 内容 |
|----------|------|
| [docs/spray-fundamental-concept.md](docs/spray-fundamental-concept.md) | IA・参考サイト・サイトマップ（北極星） |
| [docs/japanese-copy-sheet.md](docs/japanese-copy-sheet.md) | 日本語コピー表（画面別） |
| [docs/website-rebuild-roadmap-v2-design.md](docs/website-rebuild-roadmap-v2-design.md) | 技術ロードマップ |
| [docs/p0-security-infra-playbook.md](docs/p0-security-infra-playbook.md) | P0 SSL/HTTPS 手順 |
| [Pict/](Pict/) | ベースデザインモック |

## リポジトリ構成

```
SPRAY/
├── apps/web/          # Next.js 15 フロント（本番 www）
├── packages/tsconfig/ # 共有 TypeScript 設定
├── cms/               # WordPress（Docker ローカル / 本番は別ホスト可）
└── docs/
```

## クイックスタート

### 1. 依存関係

**pnpm（推奨）**

```bash
corepack enable
pnpm install
```

**npm のみの場合**

```bash
cd apps/web
npm install
npm run dev
```

### 2. 環境変数

```bash
cp apps/web/.env.example apps/web/.env.local
```

### 3. WordPress（任意・ローカル）

```bash
cd cms && docker compose up -d
```

### 4. 開発サーバー

```bash
pnpm dev
```

http://localhost:3000

## コピー文言の更新

1. `docs/japanese-copy-sheet.md` を編集
2. `apps/web/src/content/copy.ts` を同期
3. コンポーネントは `import { copy } from "@/content/copy"`

## スクリプト

| コマンド | 説明 |
|----------|------|
| `pnpm dev` | Next 開発サーバー |
| `pnpm build` | 本番ビルド |
| `pnpm typecheck` | TypeScript チェック |

## Vercel へのデプロイ（モノレポ構成のまま）

リポジトリルートがプロジェクトルートです。**Root Directory は空のまま**（`apps/web` にしない）で、ルートの `vercel.json` が次を実行します。

1. `pnpm install`（ワークスペース全体）
2. `pnpm run build` → `apps/web` の Next.js をビルド

| 項目 | 値 |
|------|-----|
| Git リポジトリ | https://github.com/momentum-create/spray |
| Framework | Next.js（`vercel.json` 参照） |
| Root Directory | **（未設定・リポジトリルート）** |

公開 URL 例: `https://<project>.vercel.app/ja`

**注意:** `spray-xxxxx-ユーザー名-projects.vercel.app` のような長い URL は古いプレビュー用です。Vercel の **Overview → Domains → Production** の URL を使ってください。ブックマークは Production のみにしてください。

ダッシュボードで **Install / Build Command を手動上書きしている場合は OFF** にし、`vercel.json` に任せてください。

### Vercel（Seeker-x1）への自動同期

| 役割 | リポジトリ |
|------|------------|
| 編集・push（Cursor） | **momentum-create/spray** |
| Vercel が監視 | **Seeker-x1/spray** |

`momentum-create/spray` の `main` に push すると Actions が Seeker へ mirror し、Vercel がデプロイします。

**初回だけ（Secret は momentum-create 側に登録）:**

1. **Seeker-x1** でログイン → 右上アイコン → **Settings** → 下の方 **Developer settings** → **Personal access tokens** → **Generate new token (classic)** → 権限 **`repo`**
2. **momentum-create/spray** を開く → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
3. Name: **`SEEKER_PUSH_TOKEN`** / Value: 手順1のトークン

※ Secret を **Seeker-x1/spray** に入れると Actions が `SEEKER_PUSH_TOKEN is not set` で失敗します（よくある誤り）。

**ワークフロー本体**は **momentum-create/spray** にある必要があります。Seeker 側だけにファイルがある場合は、Cursor から `origin` へ push するか、momentum-create で同じファイルを追加してください。

**GitHub Actions 用（Vercel の Blocked 回避・任意）:**

| Secret | 値の例 |
|--------|--------|
| `SEEKER_GIT_NAME` | `Seeker-x1` |
| `SEEKER_GIT_EMAIL` | GitHub の Primary または noreply メール |

mirror 後に Seeker 名義の空コミットを足して Vercel を起動します。

### ローカルで `origin` push → 自動で `seeker` push

**初回だけ:**

```powershell
pnpm run setup:hooks
git config user.name "Seeker-x1"
git config user.email "falcosist@gmail.com"
```

以降は **push だけ** で OK（`origin main` → フックで `seeker` も自動）:

```powershell
pnpm push
```

または（初回 `pnpm run setup:hooks` 済みなら）:

```powershell
git Push
```

コマンドプロンプトでリポジトリ直下にいる場合は `push` だけでも可（`push.cmd`）。
