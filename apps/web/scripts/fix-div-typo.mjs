import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src");
const typo = "motionBarInnerImpl2";
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?)$/.test(name)) {
      const t = fs.readFileSync(p, "utf8");
      if (t.includes(typo)) fs.writeFileSync(p, t.split(typo).join("motionBarInnerImpl2".length ? "motionBarInnerImpl2" : "div").replaceAll(typo, "motionBarInnerImpl2"));
    }
  }
}
// fix
for (const name of fs.readdirSync(root, { recursive: true })) {
  if (typeof name === "string" && name.endsWith(".tsx")) {
    const p = path.join(root, name);
    if (fs.statSync(p).isFile()) {
      const t = fs.readFileSync(p, "utf8");
      if (t.includes(typo)) {
        fs.writeFileSync(p, t.replaceAll(typo, "motionBarInnerImpl2"));
      }
    }
  }
}
