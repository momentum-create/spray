"use client";

import { brandLetters } from "@/content/brands";

type Props = {
  activeLetter: string | null;
  onSelect: (letter: string | null) => void;
};

export function BrandsAlphabetBar({ activeLetter, onSelect }: Props) {
  return (
    <div className="sticky top-0 z-20 -mx-4 mb-4 border-b border-spray-border bg-black/95 px-4 py-2 backdrop-blur">
      <div className="flex gap-1 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={`min-h-11 min-w-11 shrink-0 rounded border px-2 text-xs font-bold ${
            activeLetter === null
              ? "border-spray-orange bg-spray-orange text-black"
              : "border-spray-border text-white hover:border-spray-orange"
          }`}
        >
          ALL
        </button>
        {brandLetters.map((letter) => (
          <button
            key={letter}
            type="button"
            onClick={() => onSelect(letter)}
            className={`min-h-11 min-w-11 shrink-0 rounded border px-2 text-xs font-bold ${
              activeLetter === letter
                ? "border-spray-orange bg-spray-orange text-black"
                : "border-spray-border text-white hover:border-spray-orange"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
