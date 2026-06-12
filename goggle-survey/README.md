# ゴーグルストラップデザイン アンケート

SPRAY オリジナルゴーグル（ストラップ4案）の投票用シングルページ HTML。画像は Base64 埋め込みのため **このフォルダだけ** で動作します（ビルド不要）。

## 公開 URL（GitHub Pages）

`main` に push すると [Deploy goggle survey](../.github/workflows/goggle-survey-pages.yml) が `goggle-survey/` をデプロイします。

1. [momentum-create/spray の Settings → Pages](https://github.com/momentum-create/spray/settings/pages) を開く
2. **Build and deployment** → Source: **GitHub Actions** を選んで Save
3. **Actions** で「Deploy goggle survey」を **Re-run**（初回は push で自動実行）
4. 成功後: `https://momentum-create.github.io/spray/`（`index.html` がエントリ）

> Seeker-x1/spray にミラーされるが、Pages デプロイは momentum-create 側のみ実行します。

ローカル確認: `index.html` をブラウザで開く（`file://` で可）。

## 本番前の必須設定

`index.html` と `goggle-survey.html` の `CONFIG` を編集してください。

```javascript
const CONFIG = {
  recipientEmail: "your-real-address@spray166.com", // FormSubmit 受信先
  maxComments: 500,
  storageKey: "spray-goggle-survey-v1",
};
```

`YOUR_EMAIL` のままでは送信ボタンがエラーになります（意図的なガード）。

FormSubmit を初めて使うアドレスの場合、送信時に届く確認メールでアドレスを有効化してください。

## ファイル

| ファイル | 説明 |
|----------|------|
| `index.html` | GitHub Pages 用エントリ（`goggle-survey.html` と同期） |
| `goggle-survey.html` | 同上（ファイル名指定で配布する場合） |
| `images/` | 元画像（編集・差し替え用。実行時は HTML 内 Base64 を参照） |

## 機能概要

- ストラップ案 4 択（3D モック + ストラップ拡大・タップでライトボックス）
- レンズロゴ参考（投票対象外）
- 日本語 / English
- コメント・メール任意
- `localStorage` による二重投票防止（同一ブラウザ）

## 更新手順

1. `images/` の PNG を差し替え（必要なら HTML 内 Base64 を再生成）
2. `index.html` と `goggle-survey.html` を同内容に保つ
3. `main` に push → Pages が自動更新
