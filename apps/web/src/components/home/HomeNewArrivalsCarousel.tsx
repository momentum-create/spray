"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type NewArrivalCard = {
  slug: string;
  name: string;
  brand: string;
  imageUrl: string;
  priceLabel: string;
  href: string;
  ctaLabel: string;
  external: boolean;
};

type Props = {
  products: NewArrivalCard[];
};

export function HomeNewArrivalsCarousel({ products }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [products, updateEdges]);

  const scrollByPage = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          disabled={atStart}
          aria-label="Previous"
          className="pointer-events-auto ml-0 flex h-8 w-8 items-center justify-center bg-spray-orange text-white transition disabled:cursor-not-allowed disabled:opacity-35 sm:-ml-3"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          disabled={atEnd}
          aria-label="Next"
          className="pointer-events-auto mr-0 flex h-8 w-8 items-center justify-center bg-spray-orange text-white transition disabled:cursor-not-allowed disabled:opacity-35 sm:-mr-3"
        >
          ›
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <article
            key={product.slug}
            className="card-dark flex w-[min(88%,280px)] shrink-0 snap-start flex-col overflow-hidden sm:w-[calc((100%-1.5rem)/3)]"
          >
            <Link href={product.href} className="relative block aspect-[4/3] bg-white">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-3"
                sizes="(max-width: 640px) 88vw, 280px"
              />
            </Link>
            <div className="flex flex-1 flex-col justify-between bg-spray-elevated p-2">
              <div>
                <p className="text-[10px] font-bold uppercase leading-snug text-white">
                  {product.brand}
                </p>
                <p className="mt-1 line-clamp-2 text-[9px] leading-snug text-white/85">
                  {product.name}
                </p>
                <p className="mt-1 text-[9px] font-bold leading-snug text-spray-orange">
                  {product.priceLabel}
                </p>
              </div>
              {product.external ? (
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block bg-[#0068b7] py-1.5 text-center text-[9px] font-bold uppercase tracking-wider text-white"
                >
                  {product.ctaLabel}
                </a>
              ) : (
                <Link
                  href={product.href}
                  className="mt-2 block bg-[#0068b7] py-1.5 text-center text-[9px] font-bold uppercase tracking-wider text-white"
                >
                  {product.ctaLabel}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
