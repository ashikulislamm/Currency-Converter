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
  title: "GlobalXchange - Currency Converter",
  description: "Convert currencies with real-time exchange rates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white">
            <Navigation />

            <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>

            <footer className="bg-white dark:bg-slate-900 py-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 text-sm">
              © 2024 GlobalXchange. Powered by Open Exchange Rates & Binance.
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
