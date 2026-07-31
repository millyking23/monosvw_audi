import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.monosvwaudi.co.zw";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Monos VW-Audi Service & Parts | Premium Automotive Engineering, Bulawayo",
    template: "%s | Monos VW-Audi Service & Parts",
  },
  description:
    "Monos VW-Audi Service & Parts (Pvt) Ltd — Bulawayo's premium automotive engineering specialists since 2016. VW & Audi specialists, computer diagnostics, ECU & auto electrics, panel beating, spray painting, fleet maintenance and genuine parts supply for all vehicle makes across Zimbabwe.",
  keywords: [
    "Mechanic Bulawayo",
    "VW Specialist Bulawayo",
    "Audi Repairs Zimbabwe",
    "Vehicle Diagnostics Bulawayo",
    "Auto Electrician Bulawayo",
    "Panel Beating Bulawayo",
    "Car Service Bulawayo",
    "Fleet Maintenance Zimbabwe",
    "Vehicle Repairs Zimbabwe",
    "Injector Cleaning Bulawayo",
  ],
  authors: [{ name: "Monos VW-Audi Service & Parts (Pvt) Ltd" }],
  openGraph: {
    title: "Monos VW-Audi Service & Parts | Premium Automotive Engineering",
    description:
      "Engineering Confidence. Driving Excellence. VW, Audi and all-marque specialists in Bulawayo, Zimbabwe — established 2016.",
    url: SITE_URL,
    siteName: "Monos VW-Audi Service & Parts",
    locale: "en_ZW",
    type: "website",
    images: [{ url: "/images/workshop-hero.jpg", width: 1100, height: 733 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monos VW-Audi Service & Parts",
    description: "Premium automotive engineering in Bulawayo, Zimbabwe — VW, Audi and all makes.",
    images: ["/images/workshop-hero.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: { index: true, follow: true },
  category: "Automotive",
};

export const viewport = {
  themeColor: "#0b0b0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Monos VW-Audi Service & Parts (Pvt) Ltd",
    image: `${SITE_URL}/images/workshop-hero.jpg`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: "+263712579531",
    email: "monosvw_audiservice@yahoo.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "16 Ironbridge Road, Donnington",
      addressLocality: "Bulawayo",
      addressCountry: "ZW",
    },
    foundingDate: "2016",
    areaServed: "Zimbabwe",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "13:00",
      },
    ],
    sameAs: [],
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-offwhite font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
