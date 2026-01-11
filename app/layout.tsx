import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "RacketStringConnect",
  description:
    "Discover local badminton and tennis stringing professionals with contact links only.",
  viewport: "width=device-width, initial-scale=1",
};

const navLinks = [
  { href: "/", label: "Explore" },
  { href: "/about", label: "About us" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50 font-geist antialiased text-slate-900`}
      >
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 border-b border-white/60 bg-slate-50/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/"
                className="text-2xl font-semibold tracking-tight text-slate-900"
              >
                RacketStringConnect
              </Link>
              <nav className="flex w-full flex-wrap justify-start gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500 sm:w-auto sm:justify-end">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full px-4 py-2 transition hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <div className="flex-1">{children}</div>

          <footer className="border-t border-white/60 bg-slate-50/90">
            <div className="mx-auto max-w-6xl px-4 py-6 text-xs uppercase tracking-[0.4em] text-slate-500 space-y-1">
              <p>PURE CONNECTION · DISCOVERY ONLY · CONTACT EXTERNAL</p>
              <p>2026@RacketStringConnect</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
