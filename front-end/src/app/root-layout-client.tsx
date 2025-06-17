'use client'

import Header from '@/components/header/header'
import Menu from '@/components/header/menu'
import MobileMenu from '@/components/header/mobile-menu'
import PagesNavigation from '@/components/pages-navigation/pages-navigation'
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

      {/*Footer*/}
    </>
  )
}