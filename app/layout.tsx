import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RacketStringConnect · 香港球拍穿線師目錄 | WhatsApp 直接搵師傅",
  description:
    "香港羽毛球、網球、壁球穿線師目錄。WhatsApp 直接聯絡師傅，覆蓋全港 18 區，毋需中間人。Find badminton, tennis & squash stringers in Hong Kong. Direct WhatsApp contact, no middleman, all 18 districts.",
  alternates: {
    languages: {
      "zh-HK": "https://racketstringconnect.com",
      "en-HK": "https://racketstringconnect.com",
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const navLinks = [
  { href: "/", label: "Find a Stringer" },
  { href: "/about", label: "How It Works" },
  { href: "/blog", label: "Blog" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XP6ELMXJLN"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XP6ELMXJLN');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900`}>
        <div className="flex min-h-screen flex-col">
          {/* Header */}
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

              {/* Right: nav + CTA */}
              <div className="flex items-center gap-1">
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
                <Link
                  href="/stringers/join"
                  className="ml-1 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-300 active:bg-yellow-500"
                >
                  免費登記 Join
                </Link>
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1">{children}</div>

          {/* Footer */}
          <footer className="border-t border-gray-200 bg-white mt-16">
            <div className="mx-auto max-w-5xl px-4 py-8 space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-yellow-400 flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-slate-900">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m4.93 4.93 14.14 14.14" />
                    </svg>
                  </span>
                  <span className="text-sm font-bold text-slate-900">RacketStringConnect</span>
                </div>
                <p className="text-xs text-gray-400">© 2026 RacketStringConnect · 香港球拍穿線目錄</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                <Link
                  href="/terms"
                  className="underline-offset-4 hover:text-slate-700 hover:underline"
                >
                  Terms &amp; Conditions
                </Link>
                <span>免費穿線師登記 · 直接聯絡 · 香港各區 · Discovery-only directory.</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
