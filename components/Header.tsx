"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Find a Stringer" },
  { href: "/about", label: "How It Works" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-slate-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 flex-shrink-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="text-slate-900"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a10 10 0 0 1 10 10" />
              <path d="m4.93 4.93 14.14 14.14" />
              <path d="M2 12h4" />
              <path d="M18 12h4" />
            </svg>
          </span>
          <span className="text-base leading-tight">
            RacketString<span className="text-yellow-500">Connect</span>
          </span>
        </Link>

        {/* Right: nav + CTA + hamburger */}
        <div className="flex items-center gap-1">
          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-gray-100 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/stringers/join"
            className="ml-1 hidden sm:inline-flex rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-300 active:bg-yellow-500"
          >
            免費登記 Join
          </Link>

          {/* Mobile hamburger */}
          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
