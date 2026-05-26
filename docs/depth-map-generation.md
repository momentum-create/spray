# 深度マップ生成手順（ヒーロー擬似3D用）

トップヒーロー画像に WebGL 擬似3Dパララックス効果（カーソルでスケーター・スノーボーダーが立体的に動いて見える）を適用するためのグレースケール **深度マップ** を生成する手順です。

## 必要なもの

| 対象画像 | 出力 |
|----------|------|
| `apps/web/public/images/hero-play-on-snow-ride-concrete.png` | `apps/web/public/images/hero-play-on-snow-ride-concrete.depth.png` |

出力ファイル名は **元ファイル名に `.depth.png` を付けたもの**にしてください（既に `HomeHero.tsx` がこのパスを参照しています）。

> 深度マップが無くても WebGL コンポーネントは画像の輝度から擬似深度を作って動作します。深度マップを置くと品質が一段上がります（人物が背景から正しく分離して浮き出る）。

---

## 方法 1: HuggingFace の Depth-Anything-V2 デモ（推奨・最速）

1. <https://huggingface.co/spaces/depth-anything/Depth-Anything-V2> を開く
2. **Image to Depth** タブ
3. 元画像 `hero-play-on-snow-ride-concrete.png` をドラッグ＆ドロップ
4. **Submit** ボタン押下、数秒〜30秒待機
5. 右側に生成された深度マップが表示される
6. 深度マップを右クリック → **「名前を付けて画像を保存」**
7. ファイル名を `hero-play-on-snow-ride-concrete.depth.png` に変更し、`apps/web/public/images/` 配下に保存

> Depth-Anything V2 は 2024年公開の最新手法でクオリティが高く、人物・地形を綺麗に分離します。

---

## 方法 2: ローカルで Python で生成（オフライン・大量処理向け）

Python 3.10+ と pip が必要です。

```powershell
# 仮想環境（任意）
python -m venv .venv
.venv\Scripts\Activate.ps1

# 依存関係
pip install torch transformers pillow

# ワンライナーで生成
python -c "
from transformers import pipeline
from PIL import Image
pipe = pipeline(task='depth-estimation', model='depth-anything/Depth-Anything-V2-Small-hf')
img = Image.open('apps/web/public/images/hero-play-on-snow-ride-concrete.png')
out = pipe(img)['depth']
out.save('apps/web/public/images/hero-play-on-snow-ride-concrete.depth.png')
print('Done')
"
```

CPU でも 5〜15 秒で完了します（モデル初回ダウンロードは別途数百MB）。

---

## 方法 3: その他のオンラインサービス

| サービス | URL | 備考 |
|---------|-----|------|
| LeiaPix Converter | <https://convert.leiapix.com/> | 元は 3Dフォト用、深度マップもダウンロード可（要無料登録） |
| Depthy | <https://depthy.stamina.pl/> | 古いが手軽 |

---

## 深度マップの規格（重要）

- **フォーマット**: PNG または JPG
- **色**: グレースケール（RGB でも可、R チャンネルのみ使用）
- **値の意味**: **白（255）= カメラに近い／黒（0）= カメラから遠い**
  - Depth-Anything V2 はこの規格で出力します
  - 逆向きのマップ（白=遠い）の場合、画像編集ソフトで「ネガティブ反転」してください
- **サイズ**: 元画像と同じか、それより小さくても可（GPU が自動で補間）
- **ファイル名**: 元画像 + `.depth.png`（例: `hero-xxx.png` → `hero-xxx.depth.png`）

---

## 確認方法

1. 生成した `*.depth.png` を `apps/web/public/images/` に配置
2. `pnpm dev` が起動済みなら自動でホットリロード
3. ブラウザの DevTools → Network タブで `*.depth.png` が 200 で読まれていることを確認
4. ヒーロー上でマウスを動かし、人物と背景がズレて動くか確認

---

## チューニング

`apps/web/src/components/home/HomeHero.tsx` の props を調整:

```tsx
<DepthParallaxImage
  src={designAssets.hero}
  depthSrc="/images/hero-play-on-snow-ride-concrete.depth.png"
  strength={0.06}    // 0.02 (控えめ) 〜 0.10 (派手)
  smoothing={0.08}   // 小さいほどぬるり、0.15+ でキビキビ
  focalX={0.5}       // object-position X (0〜1)
  focalY={0.35}      // object-position Y (0〜1)
/>
```
