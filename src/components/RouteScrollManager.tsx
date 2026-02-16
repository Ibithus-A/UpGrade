"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function RouteScrollManager() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (previousPath.current === null) {
      previousPath.current = pathname;
      return;
    }
    if (previousPath.current === pathname) return;

    window.scrollTo({ top: 0, behavior: "auto" });
    previousPath.current = pathname;
  }, [pathname]);

  return null;
}
