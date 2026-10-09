import type { Plugin } from "vite";
import { getSeoMetadata, publicSeoPaths } from "../src/lib/seo";

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const seoPagesPlugin = (): Plugin => ({
  name: "dreamglobal-public-page-metadata",
  apply: "build",
  enforce: "post",
  generateBundle(_options, bundle) {
    const index = bundle["index.html"];
    if (!index || index.type !== "asset") throw new Error("Missing index.html for SEO page generation");
    const template = String(index.source);
    for (const route of publicSeoPaths) {
      const metadata = getSeoMetadata(route);
      let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`);
      const entries = [
        ["name", "description", metadata.description], ["name", "robots", metadata.robots],
        ["property", "og:title", metadata.title], ["property", "og:description", metadata.description],
        ["property", "og:url", metadata.canonical], ["name", "twitter:title", metadata.title],
        ["name", "twitter:description", metadata.description],
      ];
      for (const [attribute, key, value] of entries) {
        html = html.replace(new RegExp(`<meta ${attribute}="${key}"[^>]*>`), `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
      }
      html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${metadata.canonical}" />`);
      if (route === "/") index.source = html;
      else this.emitFile({ type: "asset", fileName: `${route.slice(1)}/index.html`, source: html });
    }
  },
});
