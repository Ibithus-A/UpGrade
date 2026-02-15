import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  // “G” + integrated arrow mark (minimal monochrome)
  return (
    <Link href="/" aria-label="UpGrade home" className="inline-flex items-center gap-2">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white hairline border soft-shadow">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 3.5c4.7 0 8.5 3.8 8.5 8.5S16.7 20.5 12 20.5 3.5 16.7 3.5 12 7.3 3.5 12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            opacity="0.95"
          />
          <path
            d="M20.5 12h-7.4c-.4 0-.7.3-.7.7v2.9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M14.2 15.6l-1.8 1.8-1.8-1.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {!compact && (
        <span className="text-[17px] font-semibold tracking-[-0.02em]">
          Up<span className="text-black/55">Grade</span>
        </span>
      )}
    </Link>
  );
}
