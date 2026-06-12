import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logosPath = path.join(__dirname, "../src/content/brand-logos.ts");
const raw = fs.readFileSync(logosPath, "utf8");
const start = raw.indexOf("export const brandLogos = ");
const arrStart = raw.indexOf("[", start);
const arrEnd = raw.indexOf("] as const", arrStart);
const existing = JSON.parse(raw.slice(arrStart, arrEnd + 1));

const snowSlugs = new Set([
  "burton",
  "northface",
  "salomon",
  "gentem",
  "msr",
  "korua",
  "hestra",
  "deeluxe",
]);

const extra = [
  ["686", "686", "snow"],
  ["Airblaster", "airblaster", "snow"],
  ["Analog", "analog", "snow"],
  ["Bataleon", "bataleon", "snow"],
  ["Capita", "capita", "snow"],
  ["DC", "dc", "both"],
  ["Dakine", "dakine", "both"],
  ["Dragon", "dragon", "snow"],
  ["Eagle", "eagle", "skate"],
  ["Emerica", "emerica", "skate"],
  ["Etnies", "etnies", "skate"],
  ["Flux", "flux", "snow"],
  ["Gnu", "gnu", "snow"],
  ["Jones", "jones", "snow"],
  ["K2", "k2", "snow"],
  ["Lib Tech", "lib-tech", "snow"],
  ["Nike SB", "nike-sb", "skate"],
  ["Nitro", "nitro", "snow"],
  ["POC", "poc", "snow"],
  ["Quiksilver", "quiksilver", "both"],
  ["Ride", "ride", "snow"],
  ["Rome", "rome", "snow"],
  ["Roxy", "roxy", "both"],
  ["Santa Cruz", "santa-cruz", "skate"],
  ["Smith", "smith", "snow"],
  ["ThirtyTwo", "thirtytwo", "snow"],
  ["Toy Machine", "toy-machine", "skate"],
  ["Vans", "vans", "both"],
  ["YES", "yes", "snow"],
  ["Amplid", "amplid", "snow"],
  ["Arbor", "arbor", "both"],
  ["Bonfire", "bonfire", "snow"],
  ["Coal", "coal", "snow"],
  ["Crab Grab", "crab-grab", "snow"],
  ["Endeavor", "endeavor", "snow"],
  ["Giro", "giro", "snow"],
  ["Holden", "holden", "snow"],
  ["Ipath", "ipath", "skate"],
  ["L1", "l1", "snow"],
  ["Mammut", "mammut", "snow"],
  ["Matix", "matix", "skate"],
  ["Nidecker", "nidecker", "snow"],
  ["Nomis", "nomis", "snow"],
  ["Pow", "pow", "snow"],
  ["Rossignol", "rossignol", "snow"],
  ["Sandbox", "sandbox", "snow"],
  ["Special Blend", "special-blend", "snow"],
  ["Technine", "technine", "snow"],
  ["Von Zipper", "von-zipper", "snow"],
  ["Weston", "weston", "snow"],
  ["Zimtstern", "zimtstern", "snow"],
  ["Bent Metal", "bent-metal", "snow"],
  ["Forum", "forum", "snow"],
  ["Gravis", "gravis", "skate"],
  ["Horsefeathers", "horsefeathers", "snow"],
  ["Obermeyer", "obermeyer", "snow"],
  ["Picture Organic", "picture", "snow"],
  ["Sessions", "sessions", "snow"],
  ["Spyder", "spyder", "snow"],
  ["Stepchild", "stepchild", "snow"],
];

const seen = new Set();
const records = [];

for (const b of existing) {
  seen.add(b.slug);
  const letter = /^[A-Za-z]/.test(b.name) ? b.name[0].toUpperCase() : "#";
  const category = snowSlugs.has(b.slug)
    ? "snow"
    : ["volcom", "union", "dice", "prism", "vicroy", "hid", "fieldearth", "lade", "green", "oakley"].includes(
          b.slug,
        )
      ? "both"
      : "skate";
  records.push({
    slug: b.slug,
    nameJa: b.name,
    nameEn: b.name,
    sortKey: b.name,
    letter,
    category,
    logo: { src: b.image, alt: b.name },
    ...(b.sourceUrl ? { sourceUrl: b.sourceUrl } : {}),
    ...(b.shopUrl ? { mallLinks: { official: b.shopUrl } } : {}),
  });
}

for (const [nameJa, slug, category] of extra) {
  if (seen.has(slug) || records.length >= 80) continue;
  seen.add(slug);
  const letter = /^[0-9]/.test(nameJa) ? "#" : nameJa[0].toUpperCase();
  records.push({
    slug,
    nameJa,
    nameEn: nameJa,
    sortKey: nameJa,
    letter,
    category,
    logo: { src: "/images/brands/placeholder.svg", alt: nameJa },
  });
}

let n = 1;
while (records.length < 80) {
  const slug = `partner-${n}`;
  if (!seen.has(slug)) {
    seen.add(slug);
    records.push({
      slug,
      nameJa: `Partner ${n}`,
      nameEn: `Partner ${n}`,
      sortKey: `Partner ${n}`,
      letter: "P",
      category: "other",
      logo: { src: "/images/brands/placeholder.svg", alt: `Partner ${n}` },
    });
  }
  n++;
}

const outDir = path.join(__dirname, "../src/content/brands");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "records.json"),
  JSON.stringify(records.slice(0, 80), null, 2),
);
console.log("wrote", Math.min(records.length, 80), "brand records");
