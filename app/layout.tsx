import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GlobalXchange - Real-Time Currency & Crypto Converter",
    template: "%s | GlobalXchange",
  },
  description:
    "Convert currencies and track cryptocurrency prices in real-time. Free currency converter with live exchange rates for 8+ fiat currencies and 4+ cryptocurrencies including BTC, ETH, BNB, and SOL.",
  keywords: [
    "currency converter",
    "exchange rates",
    "cryptocurrency prices",
    "forex converter",
    "crypto converter",
    "BTC price",
    "ETH price",
    "real-time exchange rates",
    "USD to EUR",
    "currency calculator",
    "crypto dashboard",
    "Binance prices",
    "live currency rates",
  ],
  authors: [{ name: "GlobalXchange" }],
  creator: "GlobalXchange",
  publisher: "GlobalXchange",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://globalxchange.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GlobalXchange - Real-Time Currency & Crypto Converter",
    description:
      "Convert currencies and track cryptocurrency prices in real-time with live exchange rates and an intuitive dashboard.",
    url: "https://globalxchange.vercel.app",
    siteName: "GlobalXchange",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GlobalXchange Currency Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlobalXchange - Currency & Crypto Converter",
    description:
      "Real-time currency conversion and cryptocurrency price tracking in one place.",
    images: ["/og-image.png"],
    creator: "@globalxchange",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GlobalXchange",
    applicationCategory: "FinanceApplication",
    description:
      "Real-time currency converter and cryptocurrency price tracker",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Real-time currency conversion",
      "Live cryptocurrency prices",
      "Historical exchange rate charts",
      "Support for 8+ fiat currencies",
      "Support for 4+ cryptocurrencies",
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white">
            <Navigation />

            <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>

            <footer className="bg-white dark:bg-slate-900 py-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 text-sm">
              © 2026 GlobalXchange. Powered by Open Exchange Rates & Binance.
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
