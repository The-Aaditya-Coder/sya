import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sya Perfume | Crafting Perfume Story",
  description:
    "Discover Sya Perfumes – premium, long-lasting luxury fragrances crafted with imported essences. Perfect for personal indulgence or luxury gifting, our authentic perfumes are safe, elegant, and designed to last all day. Fast delivery in Nagpur and Pan-India.",
    keywords: "luxury perfumes, long-lasting fragrances, imported perfumes, gifting perfumes Nagpur, premium perfumes India",
  openGraph: {
    title: "Sya Perfume",
    description: "Luxury long-lasting perfumes & gifting solutions.",
    url: "https://syaperfume.com",
    siteName: "Sya Perfume",
    images: ["/SyaLogo.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
        <Analytics /> <SpeedInsights />
      </body>
    </html>
  );
}
