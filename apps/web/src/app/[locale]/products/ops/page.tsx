import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ShopOpsDashboard } from "@/components/inbound/dawn/ShopOpsDashboard";
import { ShopOpsLogin } from "@/components/inbound/dawn/ShopOpsLogin";
import { getShopOpsReport } from "@/content/inbound/shop-ops-report";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import {
  SHOP_OPS_COOKIE,
  isShopOpsProtectionEnabled,
  isShopOpsSessionValid,
} from "@/lib/inbound/shop-ops-auth";
import { getUpdateLogTail, getUpdateStatus } from "@/lib/inbound/update-center";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop Ops | SPRAY",
  robots: { index: false, follow: false },
};

export default async function ShopOpsPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  const protectionEnabled = isShopOpsProtectionEnabled();
  const cookieStore = await cookies();
  const session = cookieStore.get(SHOP_OPS_COOKIE)?.value;
  const authed = isShopOpsSessionValid(session);

  if (protectionEnabled && !authed) {
    return (
      <div className="mx-auto max-w-[1100px] px-4 py-16 md:px-6">
        <ShopOpsLogin />
      </div>
    );
  }

  const report = getShopOpsReport();
  return (
    <ShopOpsDashboard
      report={report}
      protectionEnabled={protectionEnabled}
      initialUpdateStatus={getUpdateStatus()}
      initialLogLines={getUpdateLogTail(120)}
    />
  );
}
