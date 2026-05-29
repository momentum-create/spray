import accessories from "@/content/inbound/catalogs/accessories.json";
import backpack from "@/content/inbound/catalogs/backpack.json";
import backcountry from "@/content/inbound/catalogs/backcountry.json";
import bag from "@/content/inbound/catalogs/bag.json";
import binding from "@/content/inbound/catalogs/binding.json";
import boots from "@/content/inbound/catalogs/boots.json";
import footwear from "@/content/inbound/catalogs/footwear.json";
import gloves from "@/content/inbound/catalogs/gloves.json";
import goggles from "@/content/inbound/catalogs/goggles.json";
import hat from "@/content/inbound/catalogs/hat.json";
import helmet from "@/content/inbound/catalogs/helmet.json";
import jacket from "@/content/inbound/catalogs/jacket.json";
import kids from "@/content/inbound/catalogs/kids.json";
import layering from "@/content/inbound/catalogs/layering.json";
import longSleeve from "@/content/inbound/catalogs/long-sleeve.json";
import pants from "@/content/inbound/catalogs/pants.json";
import parka from "@/content/inbound/catalogs/parka.json";
import sale from "@/content/inbound/catalogs/sale.json";
import snowboard from "@/content/inbound/catalogs/snowboard.json";
import skateboard from "@/content/inbound/catalogs/skateboard.json";
import skateboardParts from "@/content/inbound/catalogs/skateboard-parts.json";
import sprayOriginal from "@/content/inbound/catalogs/spray-original.json";
import sticker from "@/content/inbound/catalogs/sticker.json";
import sunglasses from "@/content/inbound/catalogs/sunglasses.json";
import tshirt from "@/content/inbound/catalogs/tshirt.json";
import watch from "@/content/inbound/catalogs/watch.json";
import waxMaintenance from "@/content/inbound/catalogs/wax-maintenance.json";
import wear from "@/content/inbound/catalogs/wear.json";

export type CatalogFile = {
  category: {
    slug: string;
    makeshopCode: string;
    title: string;
    titleJa: string;
    shopCategoryUrl: string;
    totalProducts: number;
  };
  brands: {
    slug: string;
    name: string;
    shopBrandUrl: string;
    productCount: number;
  }[];
  products: {
    slug: string;
    makeshopId: string;
    brandSlug: string;
    name: string;
    priceJpy: number;
    shopUrl: string;
    updatedAt?: string;
  }[];
  images: Record<string, { primary: string | null; gallery: string[] }>;
  syncedAt?: string;
};

export const catalogJsonBySlug: Record<string, CatalogFile> = {
  "spray-original": sprayOriginal as CatalogFile,
  binding: binding as CatalogFile,
  boots: boots as CatalogFile,
  wear: wear as CatalogFile,
  goggles: goggles as CatalogFile,
  gloves: gloves as CatalogFile,
  backpack: backpack as CatalogFile,
  backcountry: backcountry as CatalogFile,
  "wax-maintenance": waxMaintenance as CatalogFile,
  layering: layering as CatalogFile,
  tshirt: tshirt as CatalogFile,
  "long-sleeve": longSleeve as CatalogFile,
  parka: parka as CatalogFile,
  jacket: jacket as CatalogFile,
  pants: pants as CatalogFile,
  footwear: footwear as CatalogFile,
  bag: bag as CatalogFile,
  watch: watch as CatalogFile,
  sunglasses: sunglasses as CatalogFile,
  hat: hat as CatalogFile,
  helmet: helmet as CatalogFile,
  skateboard: skateboard as CatalogFile,
  "skateboard-parts": skateboardParts as CatalogFile,
  sticker: sticker as CatalogFile,
  accessories: accessories as CatalogFile,
  kids: kids as CatalogFile,
  sale: sale as CatalogFile,
  snowboard: snowboard as CatalogFile,
};
