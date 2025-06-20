
import { Geist, Geist_Mono } from "next/font/google";
import RootLayoutClient from '@/app/root-layout-client'
import "./globals.css";
import type { Metadata } from "next";
import ReduxProvider from "./store/redux-provider";
import { CartDrawerProvider } from "./contexts/cart-drawer-context";

export const homeMetadata: Metadata = {
  title: "Compass Shop",
  description: "Compass Shop - Integrated with AI",
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: {params: string}
}>) {
 

  return (
    <html lang="en bg-[#fffff]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <CartDrawerProvider>
            <RootLayoutClient>
              {children}
            </RootLayoutClient>
          </CartDrawerProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
