import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import type { ReactNode } from "react";
import { copy } from "@content/copy";
import { site } from "@content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { toJsonLd } from "@/lib/json-ld";
import "./globals.css";

// Be Vietnam Pro: modern geometric sans-serif with strong bold weights for headings
const font = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: copy.meta.siteTitle, template: `%s | ${site.name}` },
  description: copy.meta.siteDescription,
  applicationName: site.name,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#222e20",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  description: copy.meta.siteDescription,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds the "js" class before React hydrates
    <html lang="en" className={font.variable} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS runs, so content is never hidden without JS */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(organizationJsonLd) }} />
      </head>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-moss-900 px-4 py-2 text-sm font-semibold text-cream-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {copy.nav.skipToContent}
        </a>
        <Header nav={copy.nav} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
