"use client";

import Link from "next/link";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import { useCart } from "@/components/inbound/dawn/CartProvider";

export function DawnHeader() {
  const { openCart, itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e8e8] bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/en/products" className="text-xl font-medium tracking-tight text-black">
          SPRAY
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-black md:flex">
          <Link href="/en/products/categories" className="hover:underline">
            Categories
          </Link>
          <Link href="/en/products/categories/snowboard" className="hover:underline">
            Snowboards
          </Link>
          <Link href="/en/booking/tune-up" className="hover:underline">
            {dawnCopy.nav.tuneUp}
          </Link>
          <Link href="/en/products/gentemstick#visit-store" className="hover:underline">
            {dawnCopy.nav.visit}
          </Link>
          <Link href="/en/products/ops" className="text-black/40 hover:text-black hover:underline">
            Ops
          </Link>
          <Link href="/ja" className="text-black/50 hover:underline">
            {dawnCopy.nav.mainSite}
          </Link>
        </nav>
        <button
          type="button"
          onClick={openCart}
          className="relative text-sm text-black hover:underline"
          aria-label="Open cart"
        >
          Cart
          {itemCount > 0 ? (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
              {itemCount}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  );
}
