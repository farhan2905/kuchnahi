import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundController from '@/components/BackgroundController';
import CustomCursor from '@/components/CustomCursor';
import LenisProvider from '@/components/LenisProvider';

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
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased selection:bg-black selection:text-white`}>
        <LenisProvider />
        <BackgroundController />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
