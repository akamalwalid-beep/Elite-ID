import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "../context/CartContext";
import { LanguageProvider } from "../context/LanguageContext";

import FloatingActions from "../components/Layout/FloatingActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elite ID",
  description: "Premium Apple ID Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#090909] text-white">
        <LanguageProvider>
          <CartProvider>
            {children}

            <FloatingActions />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}