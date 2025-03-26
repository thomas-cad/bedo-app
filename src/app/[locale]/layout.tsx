import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/app/[locale]/components/NavbarWrapper";
import FooterWrapper from "@/app/[locale]/components/FooterWrapper";
import CartProviderWrapper from "@/app/[locale]/components/CartProviderWrapper"; // New client wrapper
import SessionProviderWrapper from "@/app/[locale]/components/SessionProviderWrapper"
import { getSession } from "next-auth/react";

interface LangParams {
  locale: string;
}

export const metadata: Metadata = {
  title: "BedBusters",
  description: "BedBusters official web site",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: LangParams;
}>) {
  const { locale } = await params
  const session = await getSession()

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper session={session}>
          <CartProviderWrapper>
            <NavbarWrapper locale={locale} />
              <main className="flex-1">{children}</main>
            <FooterWrapper locale={locale} />
          </CartProviderWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}