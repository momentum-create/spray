# SPRAY WordPress（ヘッドレス CMS）

フロントは `apps/web`（Next.js）。コンテンツ編集は WordPress 管理画面。

## ローカル起動（Docker）

```bash
cd cms
docker compose up -d
```

- WordPress: http://localhost:8080
- phpMyAdmin: http://localhost:8081

初回: `/wp-admin` でインストール → 設定 → パーマリンク「投稿名」

## ヘッドレス設定

1. `設定 → 一般`: サイト URL は `http://localhost:8080`（ローカル）
2. プラグイン推奨:
   - **Advanced Custom Fields** — brand, staff, service 等
   - **Custom Post Type UI** またはテーマ内 `register_post_type`
   - **WPGraphQL** または REST のみ（本雛形は REST）
3. CORS（本番）: `www.spray166.com` から REST を許可

## 本番構成案

| ホスト | 役割 |
|--------|------|
| `www.spray166.com` | Next.js |
| `cms.spray166.com` | WordPress 管理 + REST（Basic 認証 or IP 制限推奨） |

`apps/web/.env` の `WORDPRESS_API_URL=https://cms.spray166.com`

## CPT 一覧（実装予定）

- `news` → WP 標準 `post` で可
- `brand`, `staff`, `service`, `lesson`, `featured_product`, `park_status`

詳細: `docs/spray-fundamental-concept.md`
