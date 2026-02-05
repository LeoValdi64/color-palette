import type { Metadata } from "next";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Chromatic",
  url: "https://chromatic.app",
  description:
    "Generate harmonious color palettes with 5 harmony modes. Export as CSS or JSON. Free tool for designers and developers.",
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  browserRequirements: "Requires a modern web browser",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://chromatic.app"),
  title: "Chromatic - Free Color Palette Generator",
  description:
    "Generate harmonious color palettes with 5 harmony modes. Export as CSS or JSON. Free tool for designers and developers.",
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
  alternates: {
    canonical: "https://chromatic.app",
  },
  openGraph: {
    title: "Chromatic - Free Color Palette Generator",
    description:
      "Generate harmonious color palettes with 5 harmony modes. Export as CSS or JSON. Free tool for designers and developers.",
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
      "Generate harmonious color palettes with 5 harmony modes. Export as CSS or JSON.",
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
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
