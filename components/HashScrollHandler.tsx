"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HEADER_OFFSET = 88;

function scrollToHashTarget(hash: string, smooth: boolean) {
  const id = hash.replace(/^#/, "");
  if (!id) {
    return;
  }

  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const top =
    element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: smooth ? "smooth" : "auto",
  });
}

export function scrollToSection(hash: string, smooth = true) {
  scrollToHashTarget(hash, smooth);
}

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      return;
    }

    const run = () => scrollToHashTarget(hash, false);
    const timeoutId = window.setTimeout(run, 80);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  useEffect(() => {
    const handleHashChange = () => {
      if (!window.location.hash) {
        return;
      }

      scrollToHashTarget(window.location.hash, true);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return null;
}
