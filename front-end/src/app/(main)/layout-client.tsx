'use client'

import Header from '@/components/layout-client/header/header'
import Menu from '@/components/layout-client/header/menu'
import MobileMenu from '@/components/layout-client/header/mobile-menu'
import PagesNavigation from '@/components/layout-client/pages-navigation/pages-navigation'
import Footer from '@/components/layout-client/footer/footer'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useCartDrawer } from './contexts/cart-drawer-context'
import ShoppingCart from '@/components/layout-client/header/shopping-cart'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [showCompanyProducts, setShowCompanyProducts] = useState(false)
  const [showMobileProducts, setShowMobileProducts] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const { isOpen } = useCartDrawer()

  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const page = segments.length > 0 ? segments[segments.length - 1] : null

  const basePages = [
    { title: 'Home', link: '/' },
    { title: 'Shop', link: '/' },
  ]

  const pages = page ? [...basePages, { title: page, link: pathname }] : basePages
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
        currentPage={page || 'Home'}
      />

      {children}

      {isOpen && <ShoppingCart />} 

      <Footer />
    </>
  )
}
