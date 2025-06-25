"use client";
import { useState } from "react";
import MobileMenu from "./mobile-menu";
import Menu from "./menu";

export default function Header() {
  const [showCompanyProducts, setShowCompanyProducts] = useState(false);
  const [showMobileProducts, setShowMobileProducts] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  return (
    <header className="bg-white">
      <Menu
        setShowCompanyProducts={setShowCompanyProducts}
        setShowMobileMenu={setShowMobileMenu}
        showCompanyProducts={showCompanyProducts}
      />

      <MobileMenu
        setShowMobileMenu={setShowMobileMenu}
        setShowMobileProducts={setShowMobileProducts}
        showMobileMenu={showMobileMenu}
        showMobileProducts={showMobileProducts}
      />
    </header>
  );
}
