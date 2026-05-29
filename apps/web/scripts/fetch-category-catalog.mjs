/**
 * Scrape https://www.spray166.shop/shopbrand/{code}/ into catalog JSON.
 *
 * Usage:
 *   node scripts/fetch-category-catalog.mjs ct299 --images
 *   node scripts/fetch-category-catalog.mjs --all
 *   node scripts/fetch-category-catalog.mjs --all --images
 *   node scripts/fetch-category-catalog.mjs --all --images-only
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHOP = "https://www.spray166.shop";
const OUT_DIR = path.join(__dirname, "../src/content/inbound/catalogs");
const IMAGE_DELAY_MS = 150;

const REGISTRY = [
  { slug: "spray-original", makeshopCode: "ct271", title: "SPRAY Original", titleJa: "SPRAYオリジナル" },
  { slug: "snowboard", makeshopCode: "I61077", title: "Snowboards", titleJa: "スノーボード" },
  { slug: "binding", makeshopCode: "ct296", title: "Bindings", titleJa: "バインディング" },
  { slug: "boots", makeshopCode: "ct297", title: "Boots", titleJa: "ブーツ" },
  { slug: "wear", makeshopCode: "ct298", title: "Wear", titleJa: "ウェア" },
  { slug: "goggles", makeshopCode: "ct327", title: "Goggles", titleJa: "ゴーグル" },
  { slug: "gloves", makeshopCode: "ct299", title: "Gloves", titleJa: "グローブ" },
  { slug: "backpack", makeshopCode: "ct300", title: "Backpacks", titleJa: "バックパック" },
  { slug: "backcountry", makeshopCode: "ct301", title: "Backcountry", titleJa: "バックカントリーアイテム" },
  { slug: "wax-maintenance", makeshopCode: "ct357", title: "Wax & Maintenance", titleJa: "WAX＆メンテナンス" },
  { slug: "layering", makeshopCode: "ct302", title: "Layering & Inner", titleJa: "レイヤリング・インナー" },
  { slug: "tshirt", makeshopCode: "I61116", title: "T-Shirts", titleJa: "Tシャツ" },
  { slug: "long-sleeve", makeshopCode: "ct303", title: "Long Sleeve", titleJa: "長袖" },
  { slug: "parka", makeshopCode: "ct304", title: "Parkas", titleJa: "パーカー" },
  { slug: "jacket", makeshopCode: "ct308", title: "Jackets & Outerwear", titleJa: "ジャケット・アウター" },
  { slug: "pants", makeshopCode: "I61132", title: "Pants", titleJa: "パンツ" },
  { slug: "footwear", makeshopCode: "I61086", title: "Footwear", titleJa: "フットウェア" },
  { slug: "bag", makeshopCode: "I61075", title: "Bags", titleJa: "バッグ" },
  { slug: "watch", makeshopCode: "I61066", title: "Watches", titleJa: "時計" },
  { slug: "sunglasses", makeshopCode: "I61109", title: "Sunglasses", titleJa: "サングラス" },
  { slug: "hat", makeshopCode: "I61098", title: "Hats", titleJa: "帽子" },
  { slug: "helmet", makeshopCode: "ct339", title: "Helmets", titleJa: "ヘルメット" },
  { slug: "skateboard", makeshopCode: "I61085", title: "Skateboards", titleJa: "スケートボード" },
  { slug: "skateboard-parts", makeshopCode: "ct307", title: "Skateboard Parts", titleJa: "スケートボードパーツ" },
  { slug: "sticker", makeshopCode: "ct306", title: "Stickers", titleJa: "ステッカー" },
  { slug: "accessories", makeshopCode: "I61079", title: "Accessories", titleJa: "小物・アクセサリー他" },
  { slug: "kids", makeshopCode: "ct305", title: "Kids & Junior", titleJa: "キッズ・ジュニア" },
  { slug: "sale", makeshopCode: "I61093", title: "Sale", titleJa: "SALE" },
];

const imgRe =
  /https:\/\/makeshop-multi-images\.akamaized\.net\/spray166\/(?:itemimages|shopimages)\/[^"'\s>]+/g;

const productLinkRe = /href="\/shopdetail\/(\d+)\/([^/]+)\/page(\d+)\/order\/"/gi;

function slugifyBrand(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function parsePrice(text) {
  const m = text.match(/([\d,]+)\s*円/);
  if (!m) return 0;
  return Number(m[1].replace(/,/g, ""));
}

function padMakeshopId(id) {
  return String(id).padStart(12, "0");
}

async function fetchHtml(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const charset = res.headers.get("content-type")?.match(/charset=([^;]+)/i)?.[1]?.toLowerCase();
  const encoding = charset?.includes("euc") ? "euc-jp" : "utf-8";
  return new TextDecoder(encoding).decode(buf);
}

function discoverCategoryPages(code, firstHtml) {
  const pages = new Set([1]);
  const pagerRe = new RegExp(`shopbrand/${code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/page(\\d+)/order`, "gi");
  let m;
  while ((m = pagerRe.exec(firstHtml)) !== null) {
    pages.add(Number(m[1]));
  }
  return [...pages].sort((a, b) => a - b);
}

async function fetchCategoryHtmlAllPages(code) {
  const firstUrl = `${SHOP}/shopbrand/${code}/`;
  const firstHtml = await fetchHtml(firstUrl);
  const pageNums = discoverCategoryPages(code, firstHtml);
  const parts = [firstHtml];

  for (const page of pageNums) {
    if (page === 1) continue;
    const url = `${SHOP}/shopbrand/${code}/page${page}/order/`;
    parts.push(await fetchHtml(url));
    await new Promise((r) => setTimeout(r, 100));
  }

  return { html: parts.join("\n"), pages: pageNums.length };
}

function stripHtml(text) {
  return text
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCategoryHtml(html, categorySlug, categoryCode) {
  const brands = [];
  const brandRe = /href="\/shopbrand\/([^/]+)\/"[^>]*>([^<]+?)\s*\((\d+)\)/gi;
  let bm;
  while ((bm = brandRe.exec(html)) !== null) {
    const name = stripHtml(bm[2]);
    if (!name || name.includes("全") || name === "SALE") continue;
    brands.push({
      slug: slugifyBrand(name) || bm[1],
      name,
      shopBrandUrl: `${SHOP}/shopbrand/${bm[1]}/`,
      productCount: Number(bm[3]),
    });
  }

  const products = [];
  const seen = new Set();
  let pm;
  while ((pm = productLinkRe.exec(html)) !== null) {
    const makeshopId = padMakeshopId(pm[1]);
    if (seen.has(makeshopId)) continue;
    seen.add(makeshopId);

    const chunk = html.slice(pm.index, pm.index + 1500);
    const priceJpy = parsePrice(chunk);
    const nameFromP =
      chunk.match(/<p class="name"><a href="\/shopdetail\/[^"]+">([^<]+)<\/a>/i)?.[1] ??
      chunk.match(/alt="([^"]+)"/)?.[1] ??
      "";
    const name = stripHtml(nameFromP);
    if (!name) continue;

    const brandMatch = name.match(/【([^】]+)】/);
    const brandName = brandMatch ? brandMatch[1] : brands[0]?.name ?? "Other";
    const brandSlug = slugifyBrand(brandName);

    products.push({
      slug: `${categorySlug}-${makeshopId}`,
      makeshopId,
      brandSlug,
      name,
      priceJpy,
      shopUrl: `${SHOP}/shopdetail/${makeshopId}/${categoryCode}/page1/order/`,
    });
  }

  return { brands, products };
}

async function fetchProductImages(makeshopId, categoryCode) {
  const url = `${SHOP}/shopdetail/${makeshopId}/${categoryCode}/page1/order/`;
  try {
    const html = await fetchHtml(url);
    const imgs = [...html.matchAll(imgRe)].map((m) => m[0]);
    const unique = [...new Set(imgs)];
    const primary =
      unique.find((u) => u.includes("/itemimages/")) ??
      unique.find((u) => u.includes("/shopimages/")) ??
      unique[0] ??
      null;
    return { primary, gallery: unique.slice(0, 5) };
  } catch {
    return { primary: null, gallery: [] };
  }
}

async function fetchImagesForProducts(products, categoryCode, images, { skipExisting = false } = {}) {
  let done = 0;
  for (const p of products) {
    if (skipExisting && images[p.makeshopId]?.primary) {
      done++;
      continue;
    }
    images[p.makeshopId] = await fetchProductImages(p.makeshopId, categoryCode);
    done++;
    if (done % 25 === 0) {
      console.log(`    images: ${done}/${products.length}`);
    }
    await new Promise((r) => setTimeout(r, IMAGE_DELAY_MS));
  }
}

function stampProductUpdates(outPath, catalog) {
  const now = new Date().toISOString();
  let previous = null;
  if (fs.existsSync(outPath)) {
    try {
      previous = JSON.parse(fs.readFileSync(outPath, "utf8"));
    } catch {
      previous = null;
    }
  }
  const prevById = new Map((previous?.products ?? []).map((p) => [p.makeshopId, p]));
  catalog.syncedAt = now;
  catalog.products = catalog.products.map((p) => {
    const prev = prevById.get(p.makeshopId);
    const changed =
      !prev || prev.name !== p.name || prev.priceJpy !== p.priceJpy || prev.slug !== p.slug;
    return {
      ...p,
      updatedAt: changed ? now : (prev.updatedAt ?? now),
    };
  });
  return catalog;
}

async function buildCatalog(def, { withImages, imagesOnly }) {
  const outPath = path.join(OUT_DIR, `${def.slug}.json`);

  if (imagesOnly && fs.existsSync(outPath)) {
    console.log(`\n→ ${def.slug} (images only)`);
    const catalog = JSON.parse(fs.readFileSync(outPath, "utf8"));
    catalog.images = catalog.images ?? {};
    if (!def.skipImages) {
      await fetchImagesForProducts(catalog.products, def.makeshopCode, catalog.images, {
        skipExisting: true,
      });
    }
    return catalog;
  }

  console.log(`\n→ ${def.slug} (${def.makeshopCode})`);
  const { html, pages } = await fetchCategoryHtmlAllPages(def.makeshopCode);
  const { brands, products } = parseCategoryHtml(html, def.slug, def.makeshopCode);
  console.log(`  pages: ${pages}, brands: ${brands.length}, products: ${products.length}`);

  const existingImages =
    !withImages && !imagesOnly && fs.existsSync(outPath)
      ? (JSON.parse(fs.readFileSync(outPath, "utf8")).images ?? {})
      : {};

  const images = { ...existingImages };
  if (withImages && products.length > 0 && !def.skipImages) {
    await fetchImagesForProducts(products, def.makeshopCode, images);
  }

  return {
    category: {
      slug: def.slug,
      makeshopCode: def.makeshopCode,
      title: def.title,
      titleJa: def.titleJa,
      shopCategoryUrl: `${SHOP}/shopbrand/${def.makeshopCode}/`,
      totalProducts: products.length,
    },
    brands,
    products,
    images,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const withImages = args.includes("--images");
  const imagesOnly = args.includes("--images-only");
  const all = args.includes("--all");
  const codes = args.filter((a) => !a.startsWith("--"));

  let targets = REGISTRY;
  if (!all && codes.length > 0) {
    targets = REGISTRY.filter(
      (r) => codes.includes(r.slug) || codes.includes(r.makeshopCode),
    );
  } else if (!all) {
    console.log("Usage: node scripts/fetch-category-catalog.mjs ct299 [--images]");
    console.log("       node scripts/fetch-category-catalog.mjs --all [--images]");
    console.log("       node scripts/fetch-category-catalog.mjs --all --images-only");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let totalProducts = 0;
  let totalImages = 0;

  for (const def of targets) {
    try {
      const catalog = await buildCatalog(def, { withImages, imagesOnly });
      const outPath = path.join(OUT_DIR, `${def.slug}.json`);
      const stamped = stampProductUpdates(outPath, catalog);
      fs.writeFileSync(outPath, JSON.stringify(stamped, null, 2));
      const imgCount = Object.values(catalog.images ?? {}).filter((i) => i.primary).length;
      totalProducts += catalog.products.length;
      totalImages += imgCount;
      console.log(`  saved: ${outPath} (${catalog.products.length} products, ${imgCount} images)`);
    } catch (err) {
      console.error(`  FAILED ${def.slug}:`, err.message);
    }
  }

  console.log(`\nDone. ${totalProducts} products, ${totalImages} with images.`);
}

main();
