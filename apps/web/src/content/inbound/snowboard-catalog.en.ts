/**
 * Inventory synced from https://www.spray166.shop/shopbrand/I61077/ (Snowboard category)
 * Source captured 2026-05-28 · Images from spray166.shop (makeshop CDN)
 */

import productImages from "@/content/inbound/snowboard-images.json";

const SHOP = "https://www.spray166.shop";
const CATEGORY = "I61077";

type ImageEntry = { primary: string | null; gallery: string[] };

export type SnowboardBrand = {
  slug: string;
  name: string;
  shopBrandUrl: string;
};

type SnowboardProductRaw = {
  slug: string;
  makeshopId: string;
  brandSlug: string;
  name: string;
  priceJpy: number;
  shopUrl: string;
};

export type SnowboardProduct = SnowboardProductRaw & {
  brand: string;
  imageUrl: string;
  imageGallery: string[];
  description: string;
};

function enrichProduct(raw: SnowboardProductRaw): SnowboardProduct {
  const imgs = (productImages as Record<string, ImageEntry>)[raw.makeshopId];
  const imageUrl = imgs?.primary ?? "";
  const imageGallery =
    imgs?.gallery && imgs.gallery.length > 0
      ? imgs.gallery
      : imageUrl
        ? [imageUrl]
        : [];
  const brand = snowboardBrands.find((b) => b.slug === raw.brandSlug)?.name ?? raw.brandSlug;
  return {
    ...raw,
    brand,
    imageUrl,
    imageGallery,
    description: `${raw.name}. In stock at SPRAY official store (spray166.shop). Tax included. Pick up in Asahikawa or order online.`,
  };
}

function detail(makeshopId: string): string {
  return `${SHOP}/shopdetail/${makeshopId}/${CATEGORY}/page1/order/`;
}

export const snowboardBrands: readonly SnowboardBrand[] = [
  { slug: "spray", name: "SPRAY", shopBrandUrl: `${SHOP}/shopbrand/ct271/` },
  { slug: "gentem", name: "GENTEMSTICK", shopBrandUrl: `${SHOP}/shopbrand/I61078/` },
  { slug: "fieldearth", name: "FIELD EARTH", shopBrandUrl: `${SHOP}/shopbrand/I61203/` },
  { slug: "tj-brand", name: "TJ BRAND", shopBrandUrl: `${SHOP}/shopbrand/I61135/` },
  { slug: "koruashapes", name: "KORUASHAPES", shopBrandUrl: `${SHOP}/shopbrand/I136161/` },
  { slug: "burton", name: "BURTON", shopBrandUrl: `${SHOP}/shopbrand/I61197/` },
  { slug: "moss-snowstick", name: "MOSS SNOWSTICK", shopBrandUrl: `${SHOP}/shopbrand/ct359/` },
  { slug: "wrx", name: "WRX", shopBrandUrl: `${SHOP}/shopbrand/ct326/` },
  { slug: "k2", name: "K2", shopBrandUrl: `${SHOP}/shopbrand/ct363/` },
  { slug: "atirom-avs", name: "atirom-avs", shopBrandUrl: `${SHOP}/shopbrand/ct337/` },
  { slug: "ogasaka", name: "OGASAKA", shopBrandUrl: `${SHOP}/shopbrand/ct332/` },
  { slug: "fntc", name: "FNTC", shopBrandUrl: `${SHOP}/shopbrand/ct349/` },
  { slug: "flux", name: "FLUX", shopBrandUrl: `${SHOP}/shopbrand/ct268/` },
  { slug: "salomon", name: "SALOMON", shopBrandUrl: `${SHOP}/shopbrand/ct284/` },
  { slug: "arbor", name: "ARBOR", shopBrandUrl: `${SHOP}/shopbrand/ct362/` },
] as const;

const rawSnowboardProducts: readonly SnowboardProductRaw[] = [
  {
    slug: "spray-original-freestyle",
    makeshopId: "000000002910",
    brandSlug: "spray",
    name: "SPRAY Original -Freestyle Snowboards-",
    priceJpy: 66_000,
    shopUrl: detail("000000002910"),
  },
  {
    slug: "gentem-rocket-fish-outline-144",
    makeshopId: "000000002748",
    brandSlug: "gentem",
    name: "GENTEMSTICK ROCKET FISH OUTLINE CORE 144 (25-26)",
    priceJpy: 187_000,
    shopUrl: detail("000000002748"),
  },
  {
    slug: "gentem-baby-stingray-151-cs",
    makeshopId: "000000002753",
    brandSlug: "gentem",
    name: "GENTEMSTICK BABY STINGRAY 151 CHOPSTICKS (25-26)",
    priceJpy: 188_100,
    shopUrl: detail("000000002753"),
  },
  {
    slug: "gentem-hornet-26-27",
    makeshopId: "000000003763",
    brandSlug: "gentem",
    name: "GENTEMSTICK HORNET (26-27)",
    priceJpy: 148_500,
    shopUrl: detail("000000003763"),
  },
  {
    slug: "flux-tw-r-23-24",
    makeshopId: "000000002813",
    brandSlug: "flux",
    name: "FLUX TW-R (23-24)",
    priceJpy: 44_220,
    shopUrl: detail("000000002813"),
  },
  {
    slug: "flux-tw-c-23-24",
    makeshopId: "000000003522",
    brandSlug: "flux",
    name: "FLUX TW-C (23-24)",
    priceJpy: 47_520,
    shopUrl: detail("000000003522"),
  },
  {
    slug: "salomon-sight-25-26",
    makeshopId: "000000002829",
    brandSlug: "salomon",
    name: "SALOMON SIGHT (25-26)",
    priceJpy: 51_900,
    shopUrl: detail("000000002829"),
  },
  {
    slug: "salomon-pulse-25-26",
    makeshopId: "000000002830",
    brandSlug: "salomon",
    name: "SALOMON PULSE (25-26)",
    priceJpy: 48_400,
    shopUrl: detail("000000002830"),
  },
  {
    slug: "salomon-sleepwalker-grom",
    makeshopId: "000000003526",
    brandSlug: "salomon",
    name: "SALOMON SLEEPWALKER GROM (23-24)",
    priceJpy: 30_800,
    shopUrl: detail("000000003526"),
  },
  {
    slug: "salomon-grace-grom",
    makeshopId: "000000003527",
    brandSlug: "salomon",
    name: "SALOMON Grace (23-24 Kids)",
    priceJpy: 26_950,
    shopUrl: detail("000000003527"),
  },
  {
    slug: "atirom-grounder",
    makeshopId: "000000002913",
    brandSlug: "atirom-avs",
    name: "atirom-avs GROUNDER",
    priceJpy: 86_944,
    shopUrl: detail("000000002913"),
  },
  {
    slug: "atirom-force-152",
    makeshopId: "000000002914",
    brandSlug: "atirom-avs",
    name: "atirom-avs FORCE 152cm",
    priceJpy: 86_944,
    shopUrl: detail("000000002914"),
  },
  {
    slug: "fieldearth-directional-142",
    makeshopId: "000000002981",
    brandSlug: "fieldearth",
    name: "FIELD EARTH DIRECTIONAL 142 (25-26)",
    priceJpy: 110_110,
    shopUrl: detail("000000002981"),
  },
  {
    slug: "fieldearth-directional-148",
    makeshopId: "000000002983",
    brandSlug: "fieldearth",
    name: "FIELD EARTH DIRECTIONAL 148 (25-26)",
    priceJpy: 119_900,
    shopUrl: detail("000000002983"),
  },
  {
    slug: "fieldearth-svo-lefty",
    makeshopId: "000000003139",
    brandSlug: "fieldearth",
    name: "FIELD EARTH SVO Lefty (25-26)",
    priceJpy: 117_700,
    shopUrl: detail("000000003139"),
  },
  {
    slug: "fieldearth-t3-162",
    makeshopId: "000000003888",
    brandSlug: "fieldearth",
    name: "FIELD EARTH T3 162 Mid 3D (25-26)",
    priceJpy: 167_200,
    shopUrl: detail("000000003888"),
  },
  {
    slug: "fieldearth-t3-153",
    makeshopId: "000000003294",
    brandSlug: "fieldearth",
    name: "FIELD EARTH T3 153 Mid 3D (25-26)",
    priceJpy: 167_200,
    shopUrl: detail("000000003294"),
  },
  {
    slug: "fieldearth-x1-165-custom",
    makeshopId: "000000003303",
    brandSlug: "fieldearth",
    name: "FIELD EARTH X1 165 CUSTOM 3D Prepreg Carbon (25-26)",
    priceJpy: 229_900,
    shopUrl: detail("000000003303"),
  },
  {
    slug: "arbor-coda-25-26",
    makeshopId: "000000003500",
    brandSlug: "arbor",
    name: "ARBOR CODA (25-26)",
    priceJpy: 79_992,
    shopUrl: detail("000000003500"),
  },
  {
    slug: "arbor-mantra-25-26",
    makeshopId: "000000003501",
    brandSlug: "arbor",
    name: "ARBOR MANTRA (25-26)",
    priceJpy: 71_984,
    shopUrl: detail("000000003501"),
  },
  {
    slug: "arbor-swoon-25-26",
    makeshopId: "000000003502",
    brandSlug: "arbor",
    name: "ARBOR SWOON (25-26)",
    priceJpy: 71_984,
    shopUrl: detail("000000003502"),
  },
  {
    slug: "arbor-cadence-25-26",
    makeshopId: "000000003504",
    brandSlug: "arbor",
    name: "ARBOR CADENCE (25-26)",
    priceJpy: 60_720,
    shopUrl: detail("000000003504"),
  },
  {
    slug: "arbor-kuro-neko-25-26",
    makeshopId: "000000003503",
    brandSlug: "arbor",
    name: "ARBOR KURO NEKO (25-26)",
    priceJpy: 71_984,
    shopUrl: detail("000000003503"),
  },
  {
    slug: "burton-process-flying-v",
    makeshopId: "000000003519",
    brandSlug: "burton",
    name: "BURTON Process Flying V (25-26)",
    priceJpy: 73_480,
    shopUrl: detail("000000003519"),
  },
  {
    slug: "burton-grom-ketchup-mustard",
    makeshopId: "000000002712",
    brandSlug: "burton",
    name: "BURTON Grom Ketchup / Mustard (Kids)",
    priceJpy: 27_280,
    shopUrl: detail("000000002712"),
  },
  {
    slug: "burton-custom-smalls",
    makeshopId: "000000002728",
    brandSlug: "burton",
    name: "BURTON Custom Smalls (24-25 Kids)",
    priceJpy: 41_360,
    shopUrl: detail("000000002728"),
  },
  {
    slug: "burton-grom-camber",
    makeshopId: "000000002726",
    brandSlug: "burton",
    name: "BURTON Grom Camber (24-25 Kids)",
    priceJpy: 30_800,
    shopUrl: detail("000000002726"),
  },
  {
    slug: "burton-smalls-pink",
    makeshopId: "000000002715",
    brandSlug: "burton",
    name: "BURTON Smalls Pink (Kids)",
    priceJpy: 38_720,
    shopUrl: detail("000000002715"),
  },
  {
    slug: "burton-smalls-blue",
    makeshopId: "000000002714",
    brandSlug: "burton",
    name: "BURTON Smalls Blue (Kids)",
    priceJpy: 38_720,
    shopUrl: detail("000000002714"),
  },
  {
    slug: "burton-mini-grom",
    makeshopId: "000000002710",
    brandSlug: "burton",
    name: "BURTON Mini Grom (Kids)",
    priceJpy: 27_280,
    shopUrl: detail("000000002710"),
  },
  {
    slug: "fntc-tnt-r",
    makeshopId: "000000003520",
    brandSlug: "fntc",
    name: "FNTC TNT R 153/157 (25-26)",
    priceJpy: 54_560,
    shopUrl: detail("000000003520"),
  },
  {
    slug: "fntc-tnt-l",
    makeshopId: "000000003521",
    brandSlug: "fntc",
    name: "FNTC TNT L 153/157 (25-26)",
    priceJpy: 54_560,
    shopUrl: detail("000000003521"),
  },
  {
    slug: "k2-gateway-25-26",
    makeshopId: "000000003643",
    brandSlug: "k2",
    name: "K2 Gateway (25-26)",
    priceJpy: 57_200,
    shopUrl: detail("000000003643"),
  },
  {
    slug: "k2-dreamsicle",
    makeshopId: "000000003644",
    brandSlug: "k2",
    name: "K2 Dreamsicle (24-25)",
    priceJpy: 59_840,
    shopUrl: detail("000000003644"),
  },
  {
    slug: "ogasaka-facet",
    makeshopId: "000000003207",
    brandSlug: "ogasaka",
    name: "OGASAKA FACET Split (25-26)",
    priceJpy: 162_800,
    shopUrl: detail("000000003207"),
  },
  {
    slug: "moss-wing-pin-75-fishbone",
    makeshopId: "000000003310",
    brandSlug: "moss-snowstick",
    name: "MOSS SNOWSTICK WING PIN 75 FISHBONE",
    priceJpy: 178_200,
    shopUrl: detail("000000003310"),
  },
  {
    slug: "moss-pq60-fishbone",
    makeshopId: "000000003279",
    brandSlug: "moss-snowstick",
    name: "MOSS SNOWSTICK PQ60 FISHBONE",
    priceJpy: 174_900,
    shopUrl: detail("000000003279"),
  },
  {
    slug: "moss-u5-ex",
    makeshopId: "000000003276",
    brandSlug: "moss-snowstick",
    name: "MOSS SNOWSTICK U5 EX (25-26)",
    priceJpy: 137_500,
    shopUrl: detail("000000003276"),
  },
  {
    slug: "moss-wing-pin-59",
    makeshopId: "000000003274",
    brandSlug: "moss-snowstick",
    name: "MOSS SNOWSTICK WING PIN 59 (25-26)",
    priceJpy: 135_300,
    shopUrl: detail("000000003274"),
  },
  {
    slug: "wrx-mk-u",
    makeshopId: "000000002838",
    brandSlug: "wrx",
    name: "WRX Mk-U (25-26)",
    priceJpy: 133_100,
    shopUrl: detail("000000002838"),
  },
  {
    slug: "tj-brand-smooth-groove",
    makeshopId: "000000002689",
    brandSlug: "tj-brand",
    name: "TJ BRAND Smooth Groove (24-25)",
    priceJpy: 94_050,
    shopUrl: detail("000000002689"),
  },
  {
    slug: "koruashapes-otto",
    makeshopId: "000000002687",
    brandSlug: "koruashapes",
    name: "KORUASHAPES Otto 153/157/161 (24-25)",
    priceJpy: 79_200,
    shopUrl: detail("000000002687"),
  },
] as const;

export const snowboardProducts: readonly SnowboardProduct[] =
  rawSnowboardProducts.map(enrichProduct);

export const snowboardCategory = {
  slug: "snowboard" as const,
  title: "Snowboards",
  titleJa: "スノーボード",
  shopCategoryUrl: `${SHOP}/shopbrand/${CATEGORY}/`,
  totalProducts: snowboardProducts.length,
} as const;

export function getSnowboardProduct(slug: string): SnowboardProduct | undefined {
  return snowboardProducts.find((p) => p.slug === slug);
}

export function getSnowboardBrand(slug: string): SnowboardBrand | undefined {
  return snowboardBrands.find((b) => b.slug === slug);
}

export function getSnowboardProductsByBrand(brandSlug: string): SnowboardProduct[] {
  return snowboardProducts.filter((p) => p.brandSlug === brandSlug);
}

export function getSnowboardBrandProductCount(brandSlug: string): number {
  return getSnowboardProductsByBrand(brandSlug).length;
}

export function getSnowboardBrandsWithStock(): SnowboardBrand[] {
  return snowboardBrands.filter((b) => getSnowboardBrandProductCount(b.slug) > 0);
}
