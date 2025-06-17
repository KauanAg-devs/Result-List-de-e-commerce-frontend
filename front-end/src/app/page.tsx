'use client'

import Image from "next/image";
import Header from '@/components/header/header'
import Menu from '@/components/header/menu'
import MobileMenu from '@/components/header/mobile-menu'
import {useState} from 'react'
export default function Home() {
  const [showCompanyProducts, setShowCompanyProducts] = useState(false)
  const [showMobileProducts, setShowMobileProducts] = useState(false)
  
  return (
    <>
    <Header>
      <Menu setShowCompanyProducts={setShowCompanyProducts} showCompanyProducts={showCompanyProducts}/>
      <MobileMenu setShowMobileProducts={setShowMobileProducts} showMobileProducts={showMobileProducts}/>
    </Header>

     {/*PagesNavigation*/}
     {/*ProductsLister*/}
     {/*Footer*/}
    </>
  );
}