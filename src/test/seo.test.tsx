import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import RouteMetadata from "@/components/RouteMetadata";
import { blogPosts } from "@/data/faqs";
import { getSeoMetadata, publicSeoPaths } from "@/lib/seo";

afterEach(() => {
  cleanup();
  document.head.innerHTML = "";
});

describe("public search metadata", () => {
  it("gives every public page its own canonical URL and an indexable description", () => {
    expect(new Set(publicSeoPaths).size).toBe(publicSeoPaths.length);
    for (const path of publicSeoPaths) {
      const metadata = getSeoMetadata(path);
      expect(metadata.canonical).toBe(`https://dreamglobal.in${path}`);
      expect(metadata.robots).toBe("index, follow");
      expect(metadata.description.length).toBeGreaterThan(40);
      expect(metadata.title).toContain("DreamGlobal");
    }
  });

  it("uses the actual article title and excerpt for all seven articles", () => {
    expect(blogPosts).toHaveLength(7);
    for (const post of blogPosts) {
      const metadata = getSeoMetadata(`/blogs/${post.slug}`);
      expect(metadata.title).toBe(`${post.title} | DreamGlobal`);
      expect(metadata.description).toBe(post.excerpt);
    }
  });

  it("normalises trailing slashes and keeps non-public URLs out of the index", () => {
    expect(getSeoMetadata("/higher-studies/").canonical).toBe("https://dreamglobal.in/higher-studies");
    expect(getSeoMetadata("/admin").robots).toBe("noindex, follow");
    expect(getSeoMetadata("/blogs/missing-article").robots).toBe("noindex, follow");
  });

  it("updates a directly loaded route without duplicating tags or deleting existing keywords", () => {
    document.head.innerHTML = '<meta name="keywords" content="existing keywords"><meta name="description" content="old"><link rel="canonical" href="https://dreamglobal.in/">';
    render(<MemoryRouter initialEntries={["/career-counselling"]}><RouteMetadata /></MemoryRouter>);
    expect(document.title).toContain("Career Counselling & Psychometric Assessment in Aluva");
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelector('meta[name="keywords"]')?.getAttribute("content")).toBe("existing keywords");
    expect(document.head.querySelector('meta[property="og:url"]')?.getAttribute("content")).toBe("https://dreamglobal.in/career-counselling");
  });
});
