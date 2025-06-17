'use client'

import { Geist, Geist_Mono } from "next/font/google";
import Header from '@/components/header/header'
import Menu from '@/components/header/menu'
import MobileMenu from '@/components/header/mobile-menu'
import PagesNavigation from '@/components/pages-navigation/pages-navigation'
import {useState} from 'react'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showCompanyProducts, setShowCompanyProducts] = useState(false)
  const [showMobileProducts, setShowMobileProducts] = useState(false)
  const [pages, setPages] = useState([{title: 'Home', link: '#'}, {title: 'Shop', link: '/shop'}])
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const title = 'Compass'

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
      <Header>
        <Menu 
          setShowCompanyProducts={setShowCompanyProducts} 
          showCompanyProducts={showCompanyProducts} 
          setShowMobileMenu={setShowMobileMenu}
        />
        <MobileMenu 
          setShowMobileProducts={setShowMobileProducts} 
          showMobileProducts={showMobileProducts} 
          showMobileMenu={showMobileMenu} 
          setShowMobileMenu={setShowMobileMenu}
        />
      </Header>

      <PagesNavigation
        title={title}
        pages={pages}
      />
      
      {children}

      {/*Footer*/}
      </body>
    </html>
  );
}
