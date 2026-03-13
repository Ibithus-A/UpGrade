"use client";

import { usePathname, useRouter } from "next/navigation";

export function FixedCallButton() {
  const pathname = usePathname();
  const router = useRouter();

  function handleClick() {
    if (pathname === "/") {
      const target = document.getElementById("contact");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    router.push("/#contact");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="btn btn-primary btn-md fixed bottom-4 right-4 z-[70] shadow-[0_14px_30px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(0,0,0,0.2)]"
    >
      Book Your Free Call
    </button>
  );
}
