import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SHOP_OPS_COOKIE } from "@/lib/inbound/shop-ops-auth";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete(SHOP_OPS_COOKIE);
  const url = new URL("/en/products/ops", request.url);
  return NextResponse.redirect(url, 303);
}
