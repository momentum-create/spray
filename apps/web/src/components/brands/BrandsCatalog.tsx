"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { BrandsAlphabetBar } from "@/components/brands/BrandsAlphabetBar";
import { brands, type BrandRecord } from "@/content/brands";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";

type Filter = "all" | "snow" | "skate";

type Props = { locale: Locale; copy: Copy };

function matchesCategory(brand: BrandRecord, filter: Filter): boolean {
  if (filter === "all") return true;
  if (filter === "snow") return brand.category === "snow" || brand.category === "both";
  return brand.category === "skate" || brand.category === "both";
}

export function BrandsCatalog({ locale, copy }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [letter, setLetter] = useState<string | null>(null);
  const b = copy.brands;

  const filtered = useMemo(() => {
    return brands.filter((brand) => {
      if (!matchesCategory(brand, filter)) return false;
      if (letter && brand.letter !== letter) return false;
      return true;
    });
  }, [filter, letter]);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: b.filters.all },
    { id: "snow", label: b.filters.snow },
    { id: "skate", label: b.filters.skate },
  ];

  const displayName = (brand: BrandRecord) =>
    locale === "ja" ? brand.nameJa : brand.nameEn;

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`min-h-11 rounded border px-4 py-2 text-xs font-bold uppercase tracking-wider ${
              filter === f.id
                ? "border-spray-orange bg-spray-orange text-black"
                : "border-spray-border text-white hover:border-spray-orange"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <BrandsAlphabetBar
        activeLetter={letter}
        onSelect={(l) => {
          setLetter(l);
          document.getElementById("brands-grid")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <p className="mb-4 text-sm text-spray-muted">
        {filtered.length} brands
      </p>
      <div
        id="brands-grid"
        className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
      >
        {filtered.map((brand) => (
          <LocaleLink
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            locale={locale}
            className="flex aspect-square items-center justify-center border border-spray-border bg-white p-3 transition hover:border-spray-orange"
            title={displayName(brand)}
          >
            <Image
              src={brand.logo.src}
              alt={brand.logo.alt}
              width={96}
              height={96}
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
          </LocaleLink>
        ))}
      </div>
    </>
  );
}
