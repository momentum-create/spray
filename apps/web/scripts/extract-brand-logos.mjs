/**
 * spray166.com/page-99/ からブランドロゴを抽出
 * 実行: node scripts/extract-brand-logos.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const htmlPath = join(root, "tmp-brand-page.html");
const outDir = join(root, "public", "images", "brands");

const html = readFileSync(htmlPath, "utf8");
const re =
  /<img class="scale-with-grid" src="(http:\/\/www\.spray166\.com\/wp-content\/uploads\/[^"]+)" alt="([^"]*)"[^>]*>/g;

const brands = [];
let m;
while ((m = re.exec(html)) !== null) {
  const url = m[1];
  const alt = m[2].trim();
  if (url.includes("spraylogo") || url.includes("w19a-11")) continue;

  const base = url.split("/").pop() ?? "brand.jpg";
  const ext = base.match(/\.(jpe?g|png|gif|webp)$/i)?.[0]?.toLowerCase() ?? ".jpg";
  const slug = base.replace(ext, "").toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  const filename = `${slug}${ext === ".jpeg" ? ".jpg" : ext}`;

  brands.push({ name: alt || slug, slug, url, filename });
}

mkdirSync(outDir, { recursive: true });

for (const b of brands) {
  const res = await fetch(b.url);
  if (!res.ok) {
    console.warn("skip", b.url, res.status);
    continue;
  }
  writeFileSync(join(outDir, b.filename), Buffer.from(await res.arrayBuffer()));
  console.log("ok", b.filename);
}

const ts = `/** 出典: http://www.spray166.com/page-99/ (${new Date().toISOString().slice(0, 10)}) */
export const brandLogos = ${JSON.stringify(
  brands.map((b) => ({
    name: b.name,
    slug: b.slug,
    image: `/images/brands/${b.filename}`,
    sourceUrl: b.url,
  })),
  null,
  2,
)} as const;

export type BrandLogo = (typeof brandLogos)[number];
`;

writeFileSync(join(root, "src", "content", "brand-logos.ts"), ts);
console.log(`Wrote ${brands.length} brands`);
