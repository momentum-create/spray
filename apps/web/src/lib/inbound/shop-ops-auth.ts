import crypto from "node:crypto";

export const SHOP_OPS_COOKIE = "shop_ops_auth";
export const SHOP_OPS_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function getShopOpsSecret(): string | undefined {
  const secret = process.env.SHOP_OPS_SECRET?.trim();
  return secret || undefined;
}

export function isShopOpsProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

export function isShopOpsProtectionEnabled(): boolean {
  return Boolean(getShopOpsSecret());
}

export function verifyShopOpsPassword(input: string): boolean {
  const secret = getShopOpsSecret();
  if (!secret) return !isShopOpsProduction();
  return input === secret;
}

export function createShopOpsSessionToken(): string {
  const secret = getShopOpsSecret();
  if (!secret) return "public";
  return crypto.createHash("sha256").update(secret).digest("hex");
}

export function isShopOpsSessionValid(cookieValue: string | undefined): boolean {
  if (!isShopOpsProtectionEnabled()) return !isShopOpsProduction();
  return cookieValue === createShopOpsSessionToken();
}
