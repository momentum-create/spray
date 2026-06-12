"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ShopProduct } from "@/content/inbound/shop-product";
import { formatJpy } from "@/content/inbound/products.en";
import { DrawerCart } from "@/components/inbound/dawn/DrawerCart";
import { OwlGoggleJaDrawerCart } from "@/components/shop/OwlGoggleJaDrawerCart";
import {
  DEFAULT_FULFILLMENT_METHOD,
  fulfillmentLineKeySuffix,
  type FulfillmentMethod,
} from "@/components/inbound/dawn/fulfillment";

const CART_STORAGE_KEY = "spray-dawn-cart-v1";

function readStoredLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export type CartAddon = {
  id: "pre-tune" | "full-tune" | "gentem-sole-guard" | "spray-knit-sole-guard";
  label: string;
  priceJpy: number;
};

export type CartLine = {
  product: ShopProduct;
  addons: CartAddon[];
  fulfillmentMethod: FulfillmentMethod;
  pickupDate?: string;
  variantLabel?: string;
  lineKey: string;
  quantity: number;
};

export type AddToCartOptions = {
  addons?: CartAddon[];
  fulfillmentMethod?: FulfillmentMethod;
  pickupDate?: string;
  variantLabel?: string;
  quantity?: number;
};

export type CartDrawerLocale = "en" | "ja" | "none";

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: ShopProduct, options?: AddToCartOptions) => void;
  removeLine: (lineKey: string) => void;
  subtotalJpy: number;
  subtotalLabel: string;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  drawer = "en",
}: {
  children: ReactNode;
  drawer?: CartDrawerLocale;
}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLines(readStoredLines());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const addToCart = useCallback((product: ShopProduct, options: AddToCartOptions = {}) => {
    const {
      addons = [],
      fulfillmentMethod = DEFAULT_FULFILLMENT_METHOD,
      pickupDate,
      variantLabel,
      quantity = 1,
    } = options;
    const addQty = Math.max(1, quantity);
    const addonSignature = addons
      .map((a) => a.id)
      .sort()
      .join("+");
    const dateSignature =
      fulfillmentMethod === "store_pickup" && pickupDate ? `::pickup-${pickupDate}` : "";
    const variantSignature = variantLabel ? `::${variantLabel}` : "";
    const fulfillmentSignature = fulfillmentLineKeySuffix(fulfillmentMethod);
    const lineKey = addonSignature
      ? `${product.slug}::${addonSignature}${fulfillmentSignature}${dateSignature}${variantSignature}`
      : `${product.slug}${fulfillmentSignature}${dateSignature}${variantSignature}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.lineKey === lineKey);
      if (existing) {
        return prev.map((l) =>
          l.lineKey === lineKey ? { ...l, quantity: l.quantity + addQty } : l,
        );
      }
      return [
        ...prev,
        {
          product,
          addons,
          fulfillmentMethod,
          pickupDate:
            fulfillmentMethod === "store_pickup" ? pickupDate : undefined,
          variantLabel,
          lineKey,
          quantity: addQty,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeLine = useCallback((lineKey: string) => {
    setLines((prev) => prev.filter((l) => l.lineKey !== lineKey));
  }, []);

  const subtotalJpy = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const addonTotal = l.addons.reduce((addonSum, a) => addonSum + a.priceJpy, 0);
        const lineTotal = (l.product.priceJpy + addonTotal) * l.quantity;
        return sum + lineTotal;
      }, 0),
    [lines],
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addToCart,
      removeLine,
      subtotalJpy,
      subtotalLabel: formatJpy(subtotalJpy),
      itemCount,
    }),
    [lines, isOpen, addToCart, removeLine, subtotalJpy, itemCount],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      {drawer === "en" ? <DrawerCart /> : drawer === "ja" ? <OwlGoggleJaDrawerCart /> : null}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
