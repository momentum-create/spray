"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ShopProduct } from "@/content/inbound/shop-product";
import { formatJpy } from "@/content/inbound/products.en";
import { DrawerCart } from "@/components/inbound/dawn/DrawerCart";

export type CartAddon = {
  id: "pre-tune" | "full-tune" | "gentem-sole-guard" | "spray-knit-sole-guard";
  label: string;
  priceJpy: number;
};

export type CartLine = {
  product: ShopProduct;
  addons: CartAddon[];
  pickupDate?: string;
  variantLabel?: string;
  lineKey: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    product: ShopProduct,
    addons?: CartAddon[],
    pickupDate?: string,
    variantLabel?: string,
  ) => void;
  removeLine: (lineKey: string) => void;
  subtotalJpy: number;
  subtotalLabel: string;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback(
    (
      product: ShopProduct,
      addons: CartAddon[] = [],
      pickupDate?: string,
      variantLabel?: string,
    ) => {
    const addonSignature = addons.map((a) => a.id).sort().join("+");
      const dateSignature = pickupDate ? `::pickup-${pickupDate}` : "";
      const variantSignature = variantLabel ? `::${variantLabel}` : "";
      const lineKey = addonSignature
        ? `${product.slug}::${addonSignature}${dateSignature}${variantSignature}`
        : `${product.slug}${dateSignature}${variantSignature}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.lineKey === lineKey);
      if (existing) {
        return prev.map((l) =>
          l.lineKey === lineKey ? { ...l, quantity: l.quantity + 1 } : l,
        );
      }
        return [...prev, { product, addons, pickupDate, variantLabel, lineKey, quantity: 1 }];
    });
    setIsOpen(true);
    },
    [],
  );

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
      <DrawerCart />
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
