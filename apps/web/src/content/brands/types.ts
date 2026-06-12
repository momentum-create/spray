export type BrandCategory = "snow" | "skate" | "both" | "other";

export type BrandRecord = {
  slug: string;
  nameJa: string;
  nameEn: string;
  sortKey: string;
  letter: string;
  category: BrandCategory;
  logo: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  sourceUrl?: string;
  mallLinks?: {
    official?: string;
    rakuten?: string;
    yahoo?: string;
  };
  featured?: boolean;
  legacySlugs?: string[];
};
