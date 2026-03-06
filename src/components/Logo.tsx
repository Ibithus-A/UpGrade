import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Excelora home"
      className="inline-flex items-center"
    >
      <img
        src="/excelora-logo.svg"
        alt="Excelora"
        width={compact ? 128 : 176}
        height={compact ? 29 : 40}
        className={compact ? "h-[29px] w-[128px]" : "h-[40px] w-[176px]"}
      />
    </Link>
  );
}
