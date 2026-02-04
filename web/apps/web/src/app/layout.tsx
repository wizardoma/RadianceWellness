import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://radiancewellness.com"),
  title: {
    default: "Radiance Wellness Center | Premium Spa & Wellness in Abuja",
    template: "%s | Radiance Wellness Center",
  },
  description:
    "Experience premium wellness services at Radiance Wellness Center. Offering massage therapy, thermal bathing, beauty treatments, fitness, and luxury accommodations in Abuja, Nigeria.",
  keywords: [
    "spa",
    "wellness",
    "massage",
    "Abuja",
    "Nigeria",
    "sauna",
    "hammam",
    "beauty",
    "fitness",
    "relaxation",
    "Wuse 2",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://radiancewellness.com",
    siteName: "Radiance Wellness Center",
    title: "Radiance Wellness Center | Premium Spa & Wellness in Abuja",
    description:
      "Experience premium wellness services at Radiance Wellness Center. Massage therapy, thermal bathing, beauty treatments, and more.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Radiance Wellness Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radiance Wellness Center | Premium Spa & Wellness",
    description: "Experience premium wellness services in Abuja, Nigeria.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
