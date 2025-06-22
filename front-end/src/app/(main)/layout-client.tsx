"use client";

import Header from "@main/layout/header/header";
import Menu from "@main/layout/header/menu";
import MobileMenu from "@main/layout/header/mobile-menu";
import PagesNavigation from "@main/layout/pages-navigation/pages-navigation";
import Footer from "@main/layout/footer/footer";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCartDrawer } from "@main/contexts/cart-drawer-context";
import ShoppingCart from "@main/layout/header/shopping-cart";
import { ChildrenProps } from "@/types/children";

export default function LayoutClient({ children }: ChildrenProps) {
  const [showCompanyProducts, setShowCompanyProducts] = useState(false);
  const [showMobileProducts, setShowMobileProducts] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { isOpen } = useCartDrawer();

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const page = segments.length > 0 ? segments[segments.length - 1] : null;

  const basePages = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/" },
  ];

  const pages = page
    ? [...basePages, { title: page, link: pathname }]
    : basePages;
  const title = "Compass";

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
        currentPage={page || "Home"}
      />

      {children}

      {isOpen && <ShoppingCart />}

      <Footer />
    </>
  );
}
