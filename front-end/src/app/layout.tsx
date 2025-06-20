import "./globals.css";
import { geistSans, geistMono } from '@/app/fonts';
import type { Metadata } from "next";

export const homeMetadata: Metadata = {
  title: "Compass Shop",
  description: "Compass Shop - Integrated with AI",
};




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
        >
        {children}
      </body>
    </html>
  )
}