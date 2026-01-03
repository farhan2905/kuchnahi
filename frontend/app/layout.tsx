'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";
import BackgroundController from '@/components/BackgroundController';
import CustomCursor from '@/components/CustomCursor';
import { initLenis } from '@/lib/lenis';

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Kuchnahi - Digital Agency",
  description: "A digital agency that delivers results",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const lenis = initLenis();
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased selection:bg-black selection:text-white`}>
        <BackgroundController />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
