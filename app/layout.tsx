import type { Metadata } from "next";
import "@fontsource/fredoka/600.css";
import "@fontsource/fredoka/700.css";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTransition from "@/components/MotionReveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.edenlittleones.co.ke"),
  title: {
    default: "Eden Little Ones Activity Centre | Lavington, Nairobi",
    template: "%s | Eden Little Ones Activity Centre",
  },
  description:
    "Nairobi's favourite activity centre for children aged 2 to 12 — arts, science, outdoor play, birthday parties, school field trips and membership in Lavington.",
  openGraph: {
    title: "Eden Little Ones Activity Centre",
    description:
      "Where children learn through play. Activities, birthday parties, school group visits and membership in Lavington, Nairobi.",
    url: "https://www.edenlittleones.co.ke",
    siteName: "Eden Little Ones Activity Centre",
    locale: "en_KE",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: "Eden Little Ones Activity Centre",
  image: "https://www.edenlittleones.co.ke/images/hero/hero-1.jpg",
  "@id": "https://www.edenlittleones.co.ke",
  url: "https://www.edenlittleones.co.ke",
  telephone: "+254112272061",
  priceRange: "KES",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lavington",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LoadingScreen />
        <Navbar />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <CookieConsentBanner />
        <WhatsAppButton />
      </body>
    </html>
  );
}
