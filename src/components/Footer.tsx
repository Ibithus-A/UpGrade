import { Logo } from "./Logo";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1HWnqnnAr1/?mibextid=wwXIfr",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.3-1.6 1.7-1.6H16V4.8c-.3 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.5V11H8.5v3h2.4v7h2.6Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ibrahim-ahmed-394b472b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M6.9 8.3a1.6 1.6 0 1 1 0-3.3 1.6 1.6 0 0 1 0 3.3ZM5.6 19V9.8h2.6V19H5.6Zm4.2 0V9.8h2.5v1.3h.1c.4-.7 1.2-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19h-2.6v-4.2c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V19H9.8Z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@excelora.tutors?_r=1&_t=ZN-94J0eBjGJK2",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M14.7 3c.2 1.6 1.1 3 2.5 3.8.8.5 1.8.8 2.8.8v2.6c-1 0-2-.2-2.9-.6v5.5a5.1 5.1 0 1 1-5.1-5.1c.3 0 .7 0 1 .1v2.7a2.6 2.6 0 1 0 1.7 2.4V3h2Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/exceloratutors?igsh=bm93cmwxZjR4MGI0&utm_source=qr",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5Zm0 8.2A3.2 3.2 0 1 1 15.2 12 3.2 3.2 0 0 1 12 15.2ZM18.4 6.8a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2ZM21 8c0-1.7 0-2.9-.5-4A5.4 5.4 0 0 0 17 0.5C15.9 0 14.7 0 13 0h-2C9.3 0 8.1 0 7 0.5A5.4 5.4 0 0 0 3.5 4C3 5.1 3 6.3 3 8v8c0 1.7 0 2.9.5 4A5.4 5.4 0 0 0 7 23.5c1.1.5 2.3.5 4 .5h2c1.7 0 2.9 0 4-.5a5.4 5.4 0 0 0 3.5-3.5c.5-1.1.5-2.3.5-4V8Zm-2.1 8c0 1.6 0 2.5-.3 3.1a3.3 3.3 0 0 1-1.8 1.8c-.6.3-1.5.3-3.1.3h-3.4c-1.6 0-2.5 0-3.1-.3a3.3 3.3 0 0 1-1.8-1.8C5.1 18.5 5 17.6 5 16V8c0-1.6 0-2.5.3-3.1a3.3 3.3 0 0 1 1.8-1.8C7.7 2.8 8.6 2.8 10.2 2.8h3.4c1.6 0 2.5 0 3.1.3a3.3 3.3 0 0 1 1.8 1.8c.3.6.3 1.5.3 3.1v8Z" />
      </svg>
    ),
  },
];

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
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.name}
                  className="inline-flex h-8 w-8 items-center justify-center text-black/85 transition-opacity duration-200 ease-out hover:opacity-65"
                >
                  {link.icon}
                </a>
              ))}
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
