// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import FloatingMount from "@/app/FloatingMount";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://growthis.in"),
  title: {
    default: "GrowthAlis",
    template: "%s | GrowthAlis",
  },
  description:
    "GrowthAlis helps businesses grow with high-converting websites, automation, and performance marketing.",
  openGraph: {
    title: "GrowthAlis",
    description:
      "A modern growth agency building premium websites, systems, and campaigns that convert.",
    url: "https://growthalis.in",
    siteName: "GrowthAlis",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-dvh bg-white text-neutral-900 antialiased">
        <Header />
        {children}
        <Footer />
        <FloatingMount />
      </body>
    </html>
  );
}