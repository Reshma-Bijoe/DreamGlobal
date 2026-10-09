import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(`${root}${path}`, "utf8");
const source = read("index.html");
const sitemap = read("public/sitemap.xml");
assert.equal(read("dist/sitemap.xml"), sitemap, "Built sitemap is out of date");
const paths = [...sitemap.matchAll(/<loc>https:\/\/dreamglobal\.in([^<]*)<\/loc>/g)].map((match) => match[1] || "/");
assert.equal(new Set(paths).size, paths.length, "Sitemap contains duplicate URLs");
const keywords = source.match(/<meta name="keywords" content="([\s\S]*?)"\s*\/>/)[1];
const verification = source.match(/<meta name="google-site-verification"[^>]*>/)[0];

for (const path of paths) {
  const file = path === "/" ? "dist/index.html" : `dist${path}/index.html`;
  assert(existsSync(`${root}${file}`), `Missing built HTML: ${path}`);
  const html = read(file);
  assert(html.includes(`rel="canonical" href="https://dreamglobal.in${path}"`), `Wrong canonical: ${path}`);
  assert.equal((html.match(/<title>/g) ?? []).length, 1);
  assert.equal((html.match(/<meta name="description"/g) ?? []).length, 1);
  assert(html.includes(keywords), `Existing keywords lost: ${path}`);
  assert(html.includes(verification), `Search Console verification lost: ${path}`);
  assert(html.includes('content="index, follow"'), `Public page is not indexable: ${path}`);
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert(scripts.length > 0, `Missing original business schema: ${path}`);
  for (const [, json] of scripts) JSON.parse(json);
  assert(html.includes('"postalCode": "683101"'));
  assert(!html.includes("path-to-your-logo.png"));
}
console.log(`SEO checks passed for ${paths.length} sitemap pages: unique metadata tags, canonical URLs, preserved keywords and verification, valid original JSON-LD, and full local address.`);
