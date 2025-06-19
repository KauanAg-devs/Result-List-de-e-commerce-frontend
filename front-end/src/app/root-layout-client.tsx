'use client'

import Header from '@/components/layout-client/header/header'
import Menu from '@/components/layout-client/header/menu'
import MobileMenu from '@/components/layout-client/header/mobile-menu'
import PagesNavigation from '@/components/layout-client/pages-navigation/pages-navigation'
import Footer from '@/components/layout-client/footer/footer'
import {useState} from 'react'

export default function RootLayoutClient({ children }: { children: React.ReactNode }){
  const [showCompanyProducts, setShowCompanyProducts] = useState(false)
  const [showMobileProducts, setShowMobileProducts] = useState(false)
  const [pages, setPages] = useState([{title: 'Home', link: './'}, {title: 'Shop', link: '/shop'}])
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const title = 'Compass'

  return (
    <>
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

      <Footer/>
    </>
  )
}