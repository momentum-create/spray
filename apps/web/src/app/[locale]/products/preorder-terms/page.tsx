import Link from "next/link";
import { notFound } from "next/navigation";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export const metadata = {
  title: "Pre-order Terms | SPRAY",
  robots: { index: false, follow: false },
};

export default async function PreorderTermsPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  return (
    <div className="mx-auto max-w-[900px] px-4 py-10 text-black md:px-6 md:py-14">
      <p className="text-xs uppercase tracking-[0.2em] text-black/50">Terms & Conditions</p>
      <h1 className="mt-3 text-3xl font-medium md:text-4xl">Pre-order Policy</h1>
      <p className="mt-4 text-sm text-black/65">
        This policy applies to made-to-order GENTEMSTICK pre-orders.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-medium">Order and Cancellation Policy</h2>
        <h3 className="text-sm font-medium uppercase tracking-wide text-black/60">
          1. All Sales Final (Strict No-Cancellation Policy)
        </h3>
        <p className="text-sm leading-relaxed text-black/80">
          As all our snowboards are made-to-order specifically for each customer, all sales are
          strictly final. Once the payment is completed, we do not accept any cancellations,
          modifications to the order, or refunds under any circumstances. This includes, but is
          not limited to, flight delays, trip cancellations, injuries, or any other personal
          reasons.
        </p>
        <p lang="ja" className="text-sm leading-relaxed text-black/70">
          （和訳）当店のスノーボードはすべてお客様のための受注発注品であるため、決済完了後のキャンセル、注文内容の変更、および返金は、いかなる理由（フライトの遅延、旅行のキャンセル、怪我、その他の個人的な理由を含む）であっても一切お受けできません。
        </p>
        <p lang="zh-Hant" className="text-sm leading-relaxed text-black/70">
          （繁中）本店滑雪板皆為依客製化之訂製商品，付款完成後，恕不接受任何取消、內容變更或退款，包含航班延誤、行程取消、受傷或其他個人因素。
        </p>
        <p lang="zh-Hans" className="text-sm leading-relaxed text-black/70">
          （简中）本店滑雪板均为按客户需求制作的定制商品，付款完成后，不接受任何取消、订单变更或退款，包括航班延误、行程取消、受伤或其他个人原因。
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-medium">Delivery and Pick-up Policy</h2>
        <h3 className="text-sm font-medium uppercase tracking-wide text-black/60">
          2. Domestic Pick-up Only / No International Shipping
        </h3>
        <p className="text-sm leading-relaxed text-black/80">
          Products must be picked up at our designated store. We do not offer international
          shipping under any circumstances. Upon pick-up at the store, customers are required to
          present the order confirmation email and a valid passport (or official photo ID) for
          verification.
        </p>
        <p lang="ja" className="text-sm leading-relaxed text-black/70">
          （和訳）商品は当店の指定店舗での引き取りのみとなります。いかなる場合も海外発送は行いません。店舗での引き取り時には、本人確認のため、注文完了メールと有効なパスポート（または公的写真付き身分証明書）の提示が必要です。
        </p>
        <p lang="zh-Hant" className="text-sm leading-relaxed text-black/70">
          （繁中）商品僅能於本店指定門市取貨，不提供任何國際配送。取貨時需出示訂單確認信與有效護照（或官方照片證件）以進行身分查核。
        </p>
        <p lang="zh-Hans" className="text-sm leading-relaxed text-black/70">
          （简中）商品仅可在本店指定门店自提，不提供任何国际配送。提货时须出示订单确认邮件及有效护照（或官方带照片证件）进行身份核验。
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-medium">Tax Free Policy (Japan, effective Nov 1, 2026)</h2>
        <h3 className="text-sm font-medium uppercase tracking-wide text-black/60">
          3. Tax-inclusive payment and airport refund process
        </h3>
        <p className="text-sm leading-relaxed text-black/80">
          All payments on this site are processed at tax-inclusive prices (including 10% Japanese
          consumption tax). For eligible non-resident customers, tax-free treatment follows
          Japan&apos;s refund method rules. We process the required duty-free record at store pick-up,
          and the customer must complete the refund procedure at airport customs upon departure.
        </p>
        <p className="text-sm leading-relaxed text-black/80">
          If you choose delivery to a hotel or domestic address in Japan without in-person passport
          verification at our store, tax-free treatment is not available and the sale remains
          taxable.
        </p>
        <p lang="ja" className="text-sm leading-relaxed text-black/70">
          （和訳）本サイトでの決済はすべて日本の消費税（10%）込み価格です。非居住者のお客様の免税は、日本のリファンド方式に基づいて処理されます。店舗受取時に必要な免税データ送信を行い、消費税の還付手続きは出国時にお客様ご自身で空港税関にて行っていただきます。ホテルや国内住所への配送で、店舗での対面パスポート確認がない場合は免税対象外となり、課税販売となります。
        </p>
        <p lang="zh-Hant" className="text-sm leading-relaxed text-black/70">
          （繁中）本網站所有付款均為含稅價格（含日本消費稅10%）。符合資格之非居住者可依日本退稅制度辦理；本店於門市取貨時完成必要免稅資料傳送，旅客須於出境時自行在機場海關辦理退稅。若配送至飯店或日本國內地址，且未於門市進行護照對面核驗，則不適用免稅，視為一般課稅銷售。
        </p>
        <p lang="zh-Hans" className="text-sm leading-relaxed text-black/70">
          （简中）本网站所有付款均为含税价格（含日本消费税10%）。符合资格的非居民可按日本退税制度办理；门店自提时由本店完成必要免税数据传送，旅客需在离境时自行于机场海关办理退税。若配送至酒店或日本国内地址，且未在门店进行护照当面核验，则不适用免税，按应税销售处理。
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-medium">Unclaimed Items and No-Show Policy</h2>
        <h3 className="text-sm font-medium uppercase tracking-wide text-black/60">
          4. Pick-up Date Changes and Forfeiture of Unclaimed Items
        </h3>
        <p className="text-sm leading-relaxed text-black/80">
          Customers must contact us in advance if there are any changes to the scheduled pick-up
          date. If we do not receive any prior notice, we will hold the product for 30 days from
          the originally scheduled pick-up date.
        </p>
        <p className="text-sm leading-relaxed text-black/80">
          If the product is not claimed within this 30-day period, the customer will be deemed to
          have completely forfeited all rights to the product. In such cases, our store reserves
          the right to dispose of or resell the unclaimed product at our sole discretion. No
          refunds will be issued under any circumstances.
        </p>
        <p lang="ja" className="text-sm leading-relaxed text-black/70">
          （和訳）予定された受取日に変更がある場合、お客様は必ず事前に当店へご連絡ください。事前連絡がない場合、当店は当初の受取予定日から30日間商品を保管します。この30日間を過ぎても受け取りがない場合、お客様は商品に対する一切の権利を放棄したものとみなされます。その場合、当店は独自の判断で未受取の商品を処分または再販する権利を有します。いかなる場合も返金は行いません。
        </p>
        <p lang="zh-Hant" className="text-sm leading-relaxed text-black/70">
          （繁中）若取貨日期有變更，請務必事前聯絡。若未事先通知，本店將自原定取貨日起保留商品30天。逾期未領取者，視為放棄商品之一切權利；本店得自行處分或轉售，且不予退款。
        </p>
        <p lang="zh-Hans" className="text-sm leading-relaxed text-black/70">
          （简中）如提货日期有变更，请务必提前联系。若未提前通知，本店将自原定提货日起保留商品30天。超过期限未领取者，视为放弃商品全部权利；本店有权自行处置或转售，且不予退款。
        </p>
      </section>

      <p className="mt-10">
        <Link href="/en/checkout" className="text-sm underline text-black/60 hover:text-black">
          ← Back to checkout
        </Link>
      </p>
    </div>
  );
}
