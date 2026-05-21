/** Shopify Dawn POC — set false to hide inbound routes UI without deleting code */
export function isInboundShopifyPocEnabled(): boolean {
  return process.env.NEXT_PUBLIC_INBOUND_SHOPIFY_POC !== "false";
}

export function isDawnRoute(pathname: string): boolean {
  if (!isInboundShopifyPocEnabled()) return false;
  return (
    /^\/en\/products(\/|$)/.test(pathname) ||
    /^\/en\/booking(\/|$)/.test(pathname) ||
    pathname === "/en/checkout"
  );
}
