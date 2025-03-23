import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/app/[locale]/components/NavbarWrapper";
import FooterWrapper from "@/app/[locale]/components/FooterWrapper";
import { CartProvider } from '@/app/[locale]/context/CartContext';

interface LangParams {
  locale: string;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BedBusters",
  description: "BedBusters official web site",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: LangParams;
}>) {
  const { locale } = await params; // Await params before destructuring

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap the entire content with CartProvider */}
        <CartProvider>
          <NavbarWrapper locale={locale}/>
          <main className="flex-1">{children}</main>
          <FooterWrapper locale={locale}/>
        </CartProvider>
      </body>
    </html>
  );
}