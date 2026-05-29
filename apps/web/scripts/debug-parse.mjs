const html = await (await fetch("https://www.spray166.shop/shopbrand/ct299/")).text();
const idx = html.indexOf("shopdetail");
console.log(html.slice(idx, idx + 500));
const re = /href="\/shopdetail\/(\d+)\/([^/]+)\/page1\/order\/"[^>]*>([\s\S]*?)<\/a>/gi;
let m, n = 0;
while ((m = re.exec(html))) {
  n++;
  if (n <= 2) console.log("match", m[1], m[3].slice(0, 60));
}
console.log("total", n);
