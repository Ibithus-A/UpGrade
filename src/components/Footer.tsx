import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t hairline bg-[#f5f5f7]">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="space-y-3 md:col-span-6">
            <Logo />
            <p className="max-w-md text-sm text-black/60">
              Premium Maths tuition for GCSE & A-Level learners — structured,
              exam-focused, and built for measurable progress.
            </p>
          </div>

          <nav
            className="md:col-span-6"
            aria-label="Footer"
          >
            <div className="flex flex-wrap gap-2 md:justify-end">
              <Link href="/pricing" className="ui-link w-fit">
                Services
              </Link>
              <Link href="/testimonials" className="ui-link w-fit">
                Testimonials
              </Link>
              <Link href="/#faq" className="ui-link w-fit">
                FAQ
              </Link>
              <Link href="/#contact" className="ui-link w-fit">
                Book your call
              </Link>
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t hairline pt-6 text-xs text-black/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Excelora. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
