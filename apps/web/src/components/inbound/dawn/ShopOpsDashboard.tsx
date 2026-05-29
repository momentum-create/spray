import Link from "next/link";
import { ShopUpdateCenter } from "@/components/inbound/dawn/ShopUpdateCenter";
import {
  shopOpsCommands,
  shopOpsSourceFiles,
  type ShopOpsReport,
} from "@/content/inbound/shop-ops-report";
import type { UpdateStatus } from "@/lib/inbound/update-center";

type ShopOpsDashboardProps = {
  report: ShopOpsReport;
  protectionEnabled: boolean;
  initialUpdateStatus: UpdateStatus;
  initialLogLines: string[];
};

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-[#e8e8e8] p-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">{label}</p>
      <p className="mt-1 text-2xl font-medium text-black">{value}</p>
    </div>
  );
}

function CommandBlock({ label, command }: { label: string; command: string }) {
  return (
    <div className="border border-[#e8e8e8] bg-[#fafafa] p-4">
      <p className="text-xs font-medium text-black">{label}</p>
      <pre className="mt-2 overflow-x-auto text-xs text-black/80">
        <code>{`cd apps/web\n${command}`}</code>
      </pre>
    </div>
  );
}

export function ShopOpsDashboard({
  report,
  protectionEnabled,
  initialUpdateStatus,
  initialLogLines,
}: ShopOpsDashboardProps) {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:px-6 md:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-black/50">Shop operations</p>
          <h1 className="mt-2 text-3xl font-medium text-black">カタログ更新・運用</h1>
          <p className="mt-3 max-w-2xl text-sm text-black/65">
            公式オンラインストア（spray166.shop）の内容を英語ショップに反映するための手順と状態です。
            商品の追加・価格変更後は、下記コマンドで JSON を再取得し、ビルド・デプロイしてください。
            GitHub Actions により毎日 03:00（JST）に一覧同期、日曜 02:00（JST）に画像の追補が自動実行されます。
          </p>
        </div>
        {protectionEnabled ? (
          <form action="/api/shop-ops/logout" method="post">
            <button type="submit" className="dawn-btn-secondary text-xs">
              ログアウト
            </button>
          </form>
        ) : null}
      </div>

      {!protectionEnabled ? (
        <p className="mt-6 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          本番では環境変数 <code className="text-xs">SHOP_OPS_SECRET</code> を設定してください（未設定のため誰でも閲覧可能です）。
        </p>
      ) : null}

      <section className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-wide text-black">現在の状態</h2>
        <p className="mt-1 text-xs text-black/50">
          集計: {new Date(report.generatedAt).toLocaleString("ja-JP")}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="サイト掲載商品" value={report.totalSiteProducts} />
          <StatCard label="カタログ商品" value={report.totalCatalogProducts} />
          <StatCard label="画像あり" value={report.totalWithImages} />
          <StatCard label="画像なし" value={report.totalMissingImages} />
        </div>
      </section>

      <ShopUpdateCenter initialStatus={initialUpdateStatus} initialLogLines={initialLogLines} />

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-wide text-black">更新手順</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-black/75">
          <li>公式ストアで商品・価格・在庫を更新する</li>
          <li>
            ローカルで <code className="text-xs">apps/web</code> に移動し、下記「全カテゴリ同期」を実行（数分〜十数分）
          </li>
          <li>
            <code className="text-xs">git diff src/content/inbound/catalogs/</code> で差分を確認
          </li>
          <li>
            <code className="text-xs">npm run build</code> が通ることを確認してからコミット・デプロイ
          </li>
          <li>本ページの「画像なし」が 0 に近いか、該当カテゴリだけ再取得する</li>
        </ol>
      </section>

      <section className="mt-12 grid gap-4 lg:grid-cols-2">
        <CommandBlock label="全カテゴリ同期（一覧 + 画像）" command={shopOpsCommands.fullSync} />
        <CommandBlock label="一覧のみ（高速）" command={shopOpsCommands.quickSync} />
        <CommandBlock
          label="特定カテゴリ（例: グローブ ct299）"
          command={shopOpsCommands.categoryWithImages}
        />
        <CommandBlock label="画像だけ再取得" command={shopOpsCommands.imagesOnly} />
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-wide text-black">新しいカテゴリを追加する</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-black/75">
          <li>
            公式 URL の <code className="text-xs">shopbrand/XXXX/</code> のコードを確認
          </li>
          <li>
            <code className="text-xs">shop-categories.registry.ts</code> と{" "}
            <code className="text-xs">fetch-category-catalog.mjs</code> の REGISTRY に追加
          </li>
          <li>
            <code className="text-xs">catalog-data.ts</code> に JSON の import を1行追加
          </li>
          <li>
            <code className="text-xs">node scripts/fetch-category-catalog.mjs XXXX --images</code> を実行
          </li>
          <li>ビルド後、下表にカテゴリが表示されることを確認</li>
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-wide text-black">
          免税（Tax Free）運用チェックリスト
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-black/75">
          <li>サイト価格は常に税込（10%）で表示・決済されること</li>
          <li>
            2026-11-01以降は「リファンド方式」案内を表示（店頭で免税データ送信、還付は空港税関で顧客本人）
          </li>
          <li>店舗受取時にパスポート（または公的身分証）で対面確認を実施できること</li>
          <li>ホテル配送・国内配送は原則免税不可として明示されていること</li>
          <li>
            受注発注品のキャンセル不可・受取期限（30日）・未受取時失効を商品ページ/決済/規約で同じ文言に統一
          </li>
          <li>スタッフ向けに免税対応フロー（案内・照合・記録）を共有済みであること</li>
        </ul>
        <p className="mt-3 text-xs text-black/55">
          Note: 税務・法務要件の最終判断は所轄税務署および顧問専門家に確認してください。
        </p>
        <p className="mt-2 text-xs text-black/55">
          多言語運用: 英語・日本語・繁體中文・简体中文の重要文言が一致しているか、更新時に同時確認してください。
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-wide text-black">編集するファイル</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {shopOpsSourceFiles.map((file) => (
            <li key={file.path} className="border-b border-[#eee] pb-2">
              <code className="text-xs text-black">{file.path}</code>
              <span className="mt-0.5 block text-black/55">{file.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-black">カテゴリ一覧</h2>
          <Link href="/en/products/categories" className="text-sm underline text-black/60 hover:text-black">
            ショップのカテゴリページ →
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#e8e8e8] text-xs uppercase tracking-wide text-black/50">
                <th className="py-2 pr-4 font-medium">カテゴリ</th>
                <th className="py-2 pr-4 font-medium">コード</th>
                <th className="py-2 pr-4 font-medium">商品</th>
                <th className="py-2 pr-4 font-medium">画像なし</th>
                <th className="py-2 pr-4 font-medium">公式</th>
                <th className="py-2 font-medium">サイト</th>
              </tr>
            </thead>
            <tbody>
              {report.categories.map((row) => (
                <tr key={row.slug} className="border-b border-[#f0f0f0]">
                  <td className="py-3 pr-4">
                    <p className="font-medium text-black">{row.title}</p>
                    <p className="text-xs text-black/45">{row.titleJa}</p>
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs text-black/70">{row.makeshopCode}</td>
                  <td className="py-3 pr-4 text-black/80">{row.productCount}</td>
                  <td className="py-3 pr-4">
                    {row.missingImages > 0 ? (
                      <span className="text-amber-700">{row.missingImages}</span>
                    ) : (
                      <span className="text-black/40">0</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <a
                      href={row.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline text-black/60 hover:text-black"
                    >
                      spray166.shop
                    </a>
                  </td>
                  <td className="py-3">
                    <Link
                      href={row.sitePath}
                      className="text-xs underline text-black/60 hover:text-black"
                    >
                      プレビュー
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-wide text-black">ページが表示されないとき</h2>
        <p className="mt-3 text-sm text-black/70">
          開発サーバーで 500 エラーが出る場合は、一度サーバーを止めてキャッシュを削除してください。
        </p>
        <CommandBlock label="キャッシュ削除して再起動" command={shopOpsCommands.devClean} />
      </section>

      <section className="mt-12 border-t border-[#e8e8e8] pt-8">
        <h2 className="text-sm font-medium uppercase tracking-wide text-black">ショップへのリンク</h2>
        <ul className="mt-4 flex flex-wrap gap-4 text-sm">
          <li>
            <Link href="/en/products" className="underline text-black/60 hover:text-black">
              ショップトップ
            </Link>
          </li>
          <li>
            <a
              href="https://www.spray166.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-black/60 hover:text-black"
            >
              公式オンラインストア
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
