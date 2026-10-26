"use client";

import { m } from "motion/react";
import { useEffect, type ReactNode } from "react";

// The first render is the server-rendered page: show it immediately so LCP is not delayed.
// Every later client-side navigation (template.tsx remounts this) fades in.
// Only ever set in an effect, so it is client-only state and never leaks between server renders.
let hasMounted = false;

export function PageTransition({ children }: { children: ReactNode }) {
  const animate = hasMounted;

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <m.div
      initial={animate ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
