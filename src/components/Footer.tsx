import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t hairline bg-[#f5f5f7]">
      <div className="container py-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-3 md:col-span-5 lg:col-span-4">
            <Logo />
            <p className="max-w-md text-sm text-black/60">
              Premium Maths tuition for GCSE & A-Level learners — structured,
              exam-focused, and built for measurable progress.
            </p>
          </div>

          <nav
            className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2 md:col-span-7 md:grid-cols-3 lg:col-span-8"
            aria-label="Footer"
          >
            <div className="space-y-2">
              <p className="font-semibold">Explore</p>
              <div className="flex flex-col gap-2 text-black/60">
                <Link href="/pricing" className="ui-link w-fit px-0">
                  Pricing
                </Link>
                <Link href="/#faq" className="ui-link w-fit px-0">
                  FAQ
                </Link>
                <Link href="/testimonials" className="ui-link w-fit px-0">
                  Testimonials
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Contact</p>
              <div className="flex flex-col gap-2 text-black/60">
                <Link href="/#contact" className="ui-link w-fit px-0">
                  Enquiry form
                </Link>
                <span>Payment details are confirmed during onboarding.</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Legal</p>
              <p className="text-black/60">Terms are discussed during your Free Call.</p>
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t hairline pt-6 text-xs text-black/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} UpGrade. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
