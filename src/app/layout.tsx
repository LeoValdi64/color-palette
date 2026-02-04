import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chromatic.app"),
  title: "Chromatic - Free Color Palette Generator",
  description:
    "Generate beautiful, harmonious color palettes instantly. Choose from analogous, complementary, triadic, split-complementary, and monochromatic color schemes. Export as CSS or JSON. Free online tool for designers and developers.",
  keywords: [
    "color palette generator",
    "color scheme",
    "color harmony",
    "design tool",
    "CSS colors",
    "web design",
    "UI colors",
    "complementary colors",
    "analogous colors",
    "triadic colors",
  ],
  authors: [{ name: "Chromatic" }],
  creator: "Chromatic",
  openGraph: {
    title: "Chromatic - Free Color Palette Generator",
    description:
      "Generate beautiful, harmonious color palettes instantly. Choose from 5 different color harmony modes and export as CSS or JSON.",
    url: "https://chromatic.app",
    siteName: "Chromatic",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chromatic Color Palette Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chromatic - Free Color Palette Generator",
    description:
      "Generate beautiful, harmonious color palettes instantly. Choose from 5 different color harmony modes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
