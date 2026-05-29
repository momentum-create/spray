import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  SHOP_OPS_COOKIE,
  isShopOpsProtectionEnabled,
  isShopOpsSessionValid,
} from "@/lib/inbound/shop-ops-auth";
import { getUpdateLogTail } from "@/lib/inbound/update-center";

async function isAuthorized() {
  if (!isShopOpsProtectionEnabled()) return true;
  const cookieStore = await cookies();
  const token = cookieStore.get(SHOP_OPS_COOKIE)?.value;
  return isShopOpsSessionValid(token);
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ lines: getUpdateLogTail(200) });
}
