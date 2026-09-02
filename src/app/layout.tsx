import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/constants";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sign & Smile Notary | Notary Public & Wedding Officiant, Fort Bend County TX",
    template: "%s | Sign & Smile Notary",
  },
  description:
    "Friendly, reliable notary and wedding officiant services in Fort Bend County and the Greater Houston area. Documents signed, vows exchanged — made simple.",
  openGraph: {
    title: "Sign & Smile Notary",
    description:
      "Notary public and wedding officiant services serving Fort Bend County and the Greater Houston area.",
    url: SITE_URL,
    siteName: "Sign & Smile Notary",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sign & Smile Notary",
    description:
      "Notary public and wedding officiant services serving Fort Bend County and the Greater Houston, Texas area.",
    areaServed: [
      "Fort Bend County, TX",
      "Richmond, TX",
      "Rosenberg, TX",
      "Sugar Land, TX",
      "Stafford, TX",
      "Missouri City, TX",
      "Fulshear, TX",
      "Houston, TX",
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "TX",
      addressCountry: "US",
    },
    url: SITE_URL,
  };

  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body>
        <a href="#main-content" className="skipLink">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
