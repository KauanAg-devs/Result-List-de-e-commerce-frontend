import "./globals.css";
import { geistSans, geistMono } from "@/app/fonts";
import { ChildrenProps } from "@/types/children";
import type { Metadata } from "next";

export const homeMetadata: Metadata = {
  title: "Compass Shop",
  description: "Compass Shop - Integrated with AI",
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
