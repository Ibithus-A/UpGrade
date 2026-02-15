import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t hairline bg-[#f5f5f7]">
      <div className="container py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <Logo />
            <p className="max-w-md text-sm text-black/60">
              Premium STEM tuition for GCSE & A-Level learners — structured,
              exam-focused, and built for measurable progress.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3" aria-label="Footer">
            <div className="space-y-2">
              <p className="font-semibold">Explore</p>
              <div className="flex flex-col gap-2 text-black/60">
                <Link href="/#pricing" className="hover:text-black">
                  Pricing
                </Link>
                <Link href="/#faq" className="hover:text-black">
                  FAQ
                </Link>
                <Link href="/testimonials" className="hover:text-black">
                  Testimonials
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Contact</p>
              <div className="flex flex-col gap-2 text-black/60">
                <Link href="/#contact" className="hover:text-black">
                  Enquiry form
                </Link>
                <span>Payments via bank transfer</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Legal</p>
              <p className="text-black/60">Terms are listed in the Pricing section.</p>
            </div>
          </nav>
        </div>

        <div className="mt-10 flex items-center justify-between border-t hairline pt-6 text-xs text-black/55">
          <span>© {new Date().getFullYear()} UpGrade. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
