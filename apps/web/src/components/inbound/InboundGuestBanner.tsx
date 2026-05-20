import Link from "next/link";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";

export function InboundGuestBanner() {
  if (!isInboundShopifyPocEnabled()) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-spray-orange/50 bg-spray-elevated px-4 py-3">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-spray-orange">
          {dawnCopy.banner.label}
        </p>
        <p className="mt-1 text-xs text-spray-muted">
          Shopify-style English shop preview — products, BOPIS, tune-up booking
        </p>
      </div>
      <Link
        href="/en/products/gentemstick"
        className="btn-orange-outline shrink-0 px-4 py-2 text-[10px]"
      >
        {dawnCopy.banner.cta}
      </Link>
    </div>
  );
}
