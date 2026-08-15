import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-space", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://monovwaudi.co.zw";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Monos VW-Audi Service & Parts | Car Service & Repairs in Bulawayo",
    template: "%s | Monos VW-Audi Service & Parts",
  },
  description: "Monos VW-Audi Service & Parts (Pvt) Ltd is a vehicle service and repair workshop in Bulawayo, Zimbabwe. VW and Audi specialists offering computer diagnostics, auto electrical work, injector testing and cleaning, panel beating, spray painting, fleet maintenance and parts.",
  keywords: [
    "Monos", "Monos VW Audi", "Monos Bulawayo", "VW specialist Bulawayo", "Audi specialist Bulawayo",
    "car service Bulawayo", "car repairs Bulawayo", "vehicle diagnostics Bulawayo", "auto electrician Bulawayo",
    "panel beating Bulawayo", "spray painting Bulawayo", "fuel injector testing Bulawayo",
    "fuel injector cleaning Bulawayo", "fleet maintenance Zimbabwe", "vehicle repairs Zimbabwe",
  ],
  authors: [{ name: "Monos VW-Audi Service & Parts (Pvt) Ltd" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Monos VW-Audi Service & Parts | Car Service & Repairs in Bulawayo",
    description: "VW, Audi and all-makes vehicle service, diagnostics, repairs, injector testing and cleaning, panel beating and spray painting in Bulawayo, Zimbabwe.",
    url: SITE_URL,
    siteName: "Monos VW-Audi Service & Parts",
    locale: "en_ZW",
    type: "website",
    images: [{ url: "/images/workshop-hero.jpg", width: 1100, height: 733 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monos VW-Audi Service & Parts",
    description: "Vehicle service, diagnostics and repairs in Bulawayo, Zimbabwe.",
    images: ["/images/workshop-hero.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/favicon-16.png", sizes: "16x16", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  category: "Automotive",
};

export const viewport = { themeColor: "#0b0b0b", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Monos VW-Audi Service & Parts (Pvt) Ltd",
    alternateName: "Monos VW-Audi Service & Parts",
    image: `${SITE_URL}/images/workshop-hero.jpg`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: "+263712579531",
    email: "monosvw_audiservice@yahoo.com",
    address: { "@type": "PostalAddress", streetAddress: "16 Ironbridge Road, Donnington", addressLocality: "Bulawayo", addressCountry: "ZW" },
    foundingDate: "2016",
    areaServed: ["Bulawayo", "Zimbabwe"],
    serviceType: [
      "Vehicle servicing", "Vehicle repairs", "VW servicing and repairs", "Audi servicing and repairs",
      "Computer diagnostics", "Auto electrical services", "Fuel injector testing and cleaning",
      "Panel beating", "Spray painting", "Fleet maintenance", "Vehicle parts supply",
    ],
    priceRange: "$$",
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:30", closes: "17:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:00", closes: "13:00" },
    ],
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-offwhite font-body antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
