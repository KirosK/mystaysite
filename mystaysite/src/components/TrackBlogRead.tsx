"use client";

import { useEffect, useRef } from "react";
import { trackBlogRead, trackScrollDepth } from "@/lib/analytics";

/**
 * Tracks article engagement:
 * - Fires `blog_read` after 30s on page (or 75% scroll, whichever comes first)
 * - Fires `scroll_depth` milestones at 25%, 50%, 75%, 100%
 */
export default function TrackBlogRead({
  slug,
  category,
}: {
  slug: string;
  category?: string;
}) {
  const readFiredRef = useRef(false);
  const milestonesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const path = window.location.pathname;

    const fireRead = () => {
      if (readFiredRef.current) return;
      readFiredRef.current = true;
      trackBlogRead(slug, category);
    };

    const timer = window.setTimeout(fireRead, 30000);

    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop + window.innerHeight;
      const total = h.scrollHeight;
      if (total <= window.innerHeight) return;
      const pct = Math.min(100, Math.round((scrolled / total) * 100));
      [25, 50, 75, 100].forEach((m) => {
        if (pct >= m && !milestonesRef.current.has(m)) {
          milestonesRef.current.add(m);
          trackScrollDepth(m, path);
          if (m >= 75) fireRead();
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [slug, category]);

  return null;
}
