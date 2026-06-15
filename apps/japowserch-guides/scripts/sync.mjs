/**
 * Sync SkiresortWebPlan mock-assets → public/ for guides.japowserch.com
 *
 * Local: reads ../../../SkiresortWebPlan/docs/mock-assets (sibling repo)
 * Vercel: clones Seeker-x1/SkiresortWebPlan into .cache/ when sibling is absent
 */
import { execSync } from "child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = join(__dirname, "..");
const HUB_ROOT = join(APP_ROOT, "hub");
const OUT = join(APP_ROOT, "public");
const CACHE_ROOT = join(APP_ROOT, ".cache");
const HOST = process.env.GUIDES_HOST || "https://guides.japowserch.com";
const SWP_REPO =
  process.env.SKIRESORT_WEB_PLAN_REPO || "https://github.com/Seeker-x1/SkiresortWebPlan.git";
const SWP_REF = process.env.SKIRESORT_WEB_PLAN_REF || "main";

function resolveSkiresortWebPlanRoot() {
  if (process.env.SKIRESORT_WEB_PLAN_ROOT) {
    return process.env.SKIRESORT_WEB_PLAN_ROOT;
  }
  const sibling = join(APP_ROOT, "..", "..", "..", "SkiresortWebPlan");
  if (existsSync(join(sibling, "docs", "mock-assets"))) {
    return sibling;
  }
  return null;
}

function ensureSkiresortWebPlanRoot() {
  const existing = resolveSkiresortWebPlanRoot();
  if (existing) return existing;

  const cached = join(CACHE_ROOT, "SkiresortWebPlan");
  const mockAssets = join(cached, "docs", "mock-assets");
  if (existsSync(mockAssets)) {
    console.log(`✓ using cached ${cached}`);
    return cached;
  }

  rmSync(CACHE_ROOT, { recursive: true, force: true });
  mkdirSync(CACHE_ROOT, { recursive: true });
  console.log(`↓ cloning ${SWP_REPO} (${SWP_REF})…`);
  execSync(
    `git clone --depth 1 --branch ${SWP_REF} ${SWP_REPO} ${cached}`,
    { stdio: "inherit" },
  );
  if (!existsSync(mockAssets)) {
    throw new Error(`clone ok but mock-assets missing at ${mockAssets}`);
  }
  return cached;
}

function loadResortGuides(resortGuidesSrc) {
  const data = JSON.parse(readFileSync(resortGuidesSrc, "utf8"));
  const byRegistryId = {};
  for (const [japowId, entry] of Object.entries(data.guides)) {
    byRegistryId[entry.registryId] = { japowResortId: Number(japowId), ...entry };
  }
  return { data, byRegistryId };
}

function mergeJapowIds(registry, resortGuides) {
  const { byRegistryId } = resortGuides;
  return {
    ...registry,
    resorts: registry.resorts.map((r) => {
      const link = byRegistryId[r.id];
      if (!link) {
        console.warn(`⚠ resort-guides.json: no japow id for registry id "${r.id}"`);
        return r;
      }
      return {
        ...r,
        japowResortId: link.japowResortId,
        guideTier: link.tier,
        ...(link.note ? { guideNote: link.note } : {}),
      };
    }),
  };
}

function validateResortGuides(registry, resortGuides) {
  const registryIds = new Set(registry.resorts.map((r) => r.id));
  const guideIds = new Set(Object.values(resortGuides.data.guides).map((g) => g.registryId));
  for (const id of registryIds) {
    if (!guideIds.has(id)) throw new Error(`resort-guides.json missing registryId: ${id}`);
  }
  for (const id of guideIds) {
    if (!registryIds.has(id)) throw new Error(`resort-guides.json unknown registryId: ${id}`);
  }
}

function rewriteHtml(content) {
  let out = content
    .replaceAll('href="../_shared/', 'href="/_shared/')
    .replaceAll('src="../_shared/', 'src="/_shared/')
    .replaceAll('href="../map.html', 'href="/map.html')
    .replaceAll('href="../area-map.html', 'href="/area-map.html')
    .replaceAll('src="../area-map.html', 'src="/area-map.html')
    .replaceAll('href="../index.html"', 'href="/"')
    .replaceAll("href='../index.html'", "href='/'")
    .replaceAll('href="index.html"', 'href="/"')
    .replaceAll('href="_shared/', 'href="/_shared/')
    .replaceAll('src="_shared/', 'src="/_shared/');
  out = out.replace(/<p class="mock-banner">[\s\S]*?<\/p>\s*/g, "");
  return out;
}

function rewriteJs(content, filename) {
  let out = content
    .replaceAll("fetchJson(`../_shared/messages/", "fetchJson(`/_shared/messages/")
    .replaceAll("fetch(`data/maps/", "fetch(`/data/maps/")
    .replaceAll('fetch("registry.json"', 'fetch("/registry.json"');

  if (filename === "mock-hub.js") {
    out = out.replace(
      'const href = `${r.slug}/index.html${locale === "en" ? "?lang=en" : ""}`;',
      'const href = `/${r.id}/${locale === "en" ? "?lang=en" : ""}`;',
    );
    out = out.replace(
      'href="map.html?resort=${r.id}',
      'href="/map.html?resort=${r.id}',
    );
  }

  if (filename === "resort-map.js") {
    out = out.replace(
      "el.back.href = `${resort.slug}/index.html${locale === \"en\" ? \"?lang=en\" : \"\"}`;",
      "el.back.href = `/${resortId}/${locale === \"en\" ? \"?lang=en\" : \"\"}`;",
    );
    out = out.replace(
      /src="\$\{hero\.src\}"/,
      'src="${hero.src.startsWith("/") ? hero.src : `/${hero.src}`}"',
    );
  }

  if (filename === "area-map.js") {
    out = out
      .replaceAll("`${resortId}-lp/", "`/${resortId}/")
      .replaceAll('fetch(`data/maps/', 'fetch(`/data/maps/')
      .replaceAll('href = `index.html', 'href = `/');
  }

  if (filename === "map-embed-layers.js") {
    out = out.replaceAll('"../area-map.html"', '"/area-map.html"');
  }

  return out;
}

function copyDirSimple(src, dest, opts = {}) {
  mkdirSync(dest, { recursive: true });
  for (const ent of readdirSync(src, { withFileTypes: true })) {
    const srcPath = join(src, ent.name);
    const destPath = join(dest, ent.name);
    if (ent.isDirectory()) {
      copyDirSimple(srcPath, destPath, opts);
    } else if (opts.transformHtml && ent.name.endsWith(".html")) {
      writeFileSync(destPath, rewriteHtml(readFileSync(srcPath, "utf8")), "utf8");
    } else if (opts.transformJs && ent.name.endsWith(".js")) {
      writeFileSync(destPath, rewriteJs(readFileSync(srcPath, "utf8"), ent.name), "utf8");
    } else {
      cpSync(srcPath, destPath);
    }
  }
}

function buildRegistry(registry) {
  const langSuffix = (path, locale) =>
    locale === "en" ? `${path}${path.includes("?") ? "&" : "?"}lang=en` : path;

  return {
    schemaVersion: "2026-06-13",
    host: HOST,
    locales: registry.locales,
    defaultLocale: registry.defaultLocale,
    deployment: {
      phase: "mock-static",
      source: "SkiresortWebPlan/docs/mock-assets/",
      buildApp: "SPRAY/apps/japowserch-guides",
    },
    resorts: registry.resorts.map((r) => {
      const lpPath = `/${r.id}/`;
      const mapPath = `/map.html?resort=${r.id}`;
      return {
        ...r,
        guideUrl: `${HOST}${lpPath}`,
        guideUrlEn: `${HOST}${langSuffix(lpPath, "en")}`,
        japowResortId: r.japowResortId ?? null,
        paths: {
          lp: lpPath,
          lpEn: langSuffix(lpPath, "en"),
          map: mapPath,
          mapEn: langSuffix(mapPath, "en"),
        },
        urls: {
          lp: `${HOST}${lpPath}`,
          lpEn: `${HOST}${langSuffix(lpPath, "en")}`,
          map: `${HOST}${mapPath}`,
          mapEn: `${HOST}${langSuffix(mapPath, "en")}`,
          detail: `${HOST}${lpPath}`,
          detailEn: `${HOST}${langSuffix(lpPath, "en")}`,
        },
        japowserch: {
          detailButtonTarget: "guideUrl",
          registryId: r.id,
          mapByJapowResortId: r.japowResortId != null,
        },
      };
    }),
    indexByJapowResortId: Object.fromEntries(
      registry.resorts
        .filter((r) => r.japowResortId != null)
        .map((r) => [String(r.japowResortId), r.id]),
    ),
  };
}

function main() {
  const swpRoot = ensureSkiresortWebPlanRoot();
  const MOCK_ROOT = join(swpRoot, "docs", "mock-assets");
  const resortGuidesSrc =
    process.env.RESORT_GUIDES_JSON || join(APP_ROOT, "data", "resort-guides.json");

  if (!existsSync(MOCK_ROOT)) {
    throw new Error(`mock-assets not found: ${MOCK_ROOT}`);
  }
  if (!existsSync(resortGuidesSrc)) {
    throw new Error(`resort-guides.json not found: ${resortGuidesSrc}`);
  }

  const resortGuides = loadResortGuides(resortGuidesSrc);
  const registryRaw = JSON.parse(readFileSync(join(MOCK_ROOT, "registry.json"), "utf8"));
  validateResortGuides(registryRaw, resortGuides);
  const registry = mergeJapowIds(registryRaw, resortGuides);

  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  writeFileSync(
    join(OUT, "index.html"),
    rewriteHtml(readFileSync(join(HUB_ROOT, "index.html"), "utf8")),
    "utf8",
  );
  writeFileSync(
    join(OUT, "map.html"),
    rewriteHtml(readFileSync(join(MOCK_ROOT, "map.html"), "utf8")),
    "utf8",
  );
  writeFileSync(
    join(OUT, "area-map.html"),
    rewriteHtml(readFileSync(join(MOCK_ROOT, "area-map.html"), "utf8")),
    "utf8",
  );

  copyDirSimple(join(MOCK_ROOT, "_shared"), join(OUT, "_shared"), { transformJs: true });
  mkdirSync(join(OUT, "messages"), { recursive: true });
  for (const f of ["hub.ja.json", "hub.en.json"]) {
    cpSync(join(HUB_ROOT, "messages", f), join(OUT, "messages", f));
  }

  copyDirSimple(join(MOCK_ROOT, "data"), join(OUT, "data"));
  copyDirSimple(join(MOCK_ROOT, "images"), join(OUT, "images"));

  for (const resort of registry.resorts) {
    const src = join(MOCK_ROOT, resort.slug);
    const dest = join(OUT, resort.id);
    copyDirSimple(src, dest, { transformHtml: true });
    console.log(`✓ /${resort.id}/ ← ${resort.slug}`);
  }

  const extended = buildRegistry(registry);
  writeFileSync(join(OUT, "registry.json"), JSON.stringify(extended, null, 2) + "\n", "utf8");
  cpSync(resortGuidesSrc, join(OUT, "resort-guides.json"));

  writeFileSync(
    join(OUT, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${HOST}/registry.json\n`,
    "utf8",
  );

  console.log(`\n✓ public/ ready (${extended.resorts.length} resorts)`);
  console.log(`  Hub:      ${HOST}/`);
  console.log(`  Biei:     ${HOST}/biei/`);
  console.log(`  Food map: ${HOST}/biei/nearby-food.html`);
  console.log(`  Area map: ${HOST}/area-map.html?resort=biei&layers=food,anchor`);
}

main();
