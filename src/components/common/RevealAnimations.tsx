"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the `.reveal` → `.reveal.visible` scroll-trigger animation.
 *
 * IMPORTANT: re-observes whenever the route changes. Without this, navigating
 * back to a previously-visited page leaves all `.reveal` elements stuck at
 * `opacity: 0`, because the existing IntersectionObserver was bound to the
 * previous page's nodes only.
 *
 * Strategy: on each pathname change, disconnect the previous observer, defer
 * one frame so the new page's DOM is committed, then observe the fresh set of
 * `.reveal` elements. We also clear the `.visible` class so animations replay
 * — feels intentional rather than stuck.
 */
export default function RevealAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    rafId = requestAnimationFrame(() => {
      const elements = document.querySelectorAll<HTMLElement>(".reveal");
      elements.forEach((el) => {
        el.classList.remove("visible");
        observer.observe(el);
      });
    });

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
