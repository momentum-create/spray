"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { InboundProduct } from "@/content/inbound/products.en";
import { formatJpy } from "@/content/inbound/products.en";
import { DrawerCart } from "@/components/inbound/dawn/DrawerCart";

export type CartLine = {
  product: InboundProduct;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: InboundProduct) => void;
  removeLine: (slug: string) => void;
  subtotalJpy: number;
  subtotalLabel: string;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((product: InboundProduct) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.product.slug === product.slug);
      if (existing) {
        return prev.map((l) =>
          l.product.slug === product.slug ? { ...l, quantity: l.quantity + 1 } : l,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeLine = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.product.slug !== slug));
  }, []);

  const subtotalJpy = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.priceJpy * l.quantity, 0),
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
