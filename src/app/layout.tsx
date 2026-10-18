import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { copy } from "@content/copy";
import { site } from "@content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { toJsonLd } from "@/lib/json-ld";
import "./globals.css";

// Type system (design.md): condensed display, engineering body, mono only for map annotations
const display = Big_Shoulders({ subsets: ["latin"], axes: ["opsz"], display: "swap", variable: "--ff-display" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--ff-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--ff-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: copy.meta.siteTitle, template: `%s | ${site.name}` },
  description: copy.meta.siteDescription,
  applicationName: site.name,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  // sRGB approximation of --color-paper (meta tags can't read CSS variables)
  themeColor: "#1b1612",
  width: "device-width",
  initialScale: 1,
};

// One-line descriptor per page for the header's index sheet
const indexDescriptions = {
  home: copy.footer.tagline,
  trading: copy.businessLines.trading.short,
  ai: copy.businessLines.ai.short,
  about: copy.about.hero.subtitle,
  contact: copy.contact.meta.description,
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
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(organizationJsonLd) }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only bg-accent px-md py-xs font-medium text-accent-ink focus:not-sr-only focus:fixed focus:top-sm focus:left-sm focus:z-[var(--z-modal)]"
        >
          {copy.nav.skipToContent}
        </a>
        <Header nav={copy.nav} descriptions={indexDescriptions} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
