import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollInstantly = (top: number) => {
  const html = document.documentElement;
  const previousScrollBehavior = html.style.scrollBehavior;

  html.style.scrollBehavior = "auto";
  window.scrollTo(0, top);
  html.style.scrollBehavior = previousScrollBehavior;
};

const ScrollManager = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (!hash) {
      scrollInstantly(0);
      return;
    }

    requestAnimationFrame(() => {
      const target = document.querySelector(hash);
      if (!target) return;

      const html = document.documentElement;
      const previousScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      target.scrollIntoView({ behavior: "auto", block: "start" });
      html.style.scrollBehavior = previousScrollBehavior;
    });
  }, [pathname, search, hash]);

  return null;
};

export default ScrollManager;
