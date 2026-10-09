import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeoMetadata } from "@/lib/seo";

const RouteMetadata = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const metadata = getSeoMetadata(pathname);
    document.title = metadata.title;
    const setMeta = (attribute: "name" | "property", key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.append(element);
      }
      element.content = content;
    };
    setMeta("name", "description", metadata.description);
    setMeta("name", "robots", metadata.robots);
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:url", metadata.canonical);
    setMeta("property", "og:image", metadata.image);
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta("name", "twitter:image", metadata.image);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = metadata.canonical;
  }, [pathname]);
  return null;
};

export default RouteMetadata;
