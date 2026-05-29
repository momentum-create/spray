const ids = [
  "000000002910", "000000002748", "000000002753", "000000003763", "000000002813",
  "000000003522", "000000002829", "000000002830", "000000003526", "000000003527",
  "000000002913", "000000002914", "000000002981", "000000002983", "000000003139",
  "000000003888", "000000003294", "000000003303", "000000003500", "000000003501",
  "000000003502", "000000003504", "000000003503", "000000003519", "000000002712",
  "000000002728", "000000002726", "000000002715", "000000002714", "000000002710",
  "000000003520", "000000003521", "000000003643", "000000003644", "000000003207",
  "000000003310", "000000003279", "000000003276", "000000003274", "000000002838",
  "000000002689", "000000002687",
];

const imgRe =
  /https:\/\/makeshop-multi-images\.akamaized\.net\/spray166\/(?:itemimages|shopimages)\/[^"'\s>]+/g;

async function main() {
  const out = {};
  for (const id of ids) {
    const url = `https://www.spray166.shop/shopdetail/${id}/I61077/page1/order/`;
    try {
      const res = await fetch(url);
      const html = await res.text();
      const imgs = [...html.matchAll(imgRe)].map((m) => m[0]);
      const unique = [...new Set(imgs)];
      const primary =
        unique.find((u) => u.includes("/itemimages/")) ??
        unique.find((u) => u.includes("/shopimages/")) ??
        unique[0];
      out[id] = { primary, gallery: unique.slice(0, 5) };
      console.log(id, primary ? "OK" : "NONE");
    } catch {
      console.log(id, "ERR");
      out[id] = { primary: null, gallery: [] };
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  const fs = await import("fs");
  fs.writeFileSync("scripts/snowboard-images.json", JSON.stringify(out, null, 2));
}

main();
