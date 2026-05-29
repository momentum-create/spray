import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  SHOP_OPS_COOKIE,
  SHOP_OPS_COOKIE_MAX_AGE,
  createShopOpsSessionToken,
  getShopOpsSecret,
  verifyShopOpsPassword,
} from "@/lib/inbound/shop-ops-auth";

export async function POST(request: Request) {
  const secret = getShopOpsSecret();
  if (!secret) {
    return NextResponse.json({ ok: true, message: "Protection disabled" });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!body.password || !verifyShopOpsPassword(body.password)) {
    return NextResponse.json({ error: "パスワードが正しくありません" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(SHOP_OPS_COOKIE, createShopOpsSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SHOP_OPS_COOKIE_MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
