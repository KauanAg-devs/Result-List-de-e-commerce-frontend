"use client";

import Header from "@main/layout/header/header";
import PagesNavigation from "@main/layout/pages-navigation/pages-navigation";
import Footer from "@main/layout/footer/footer";
import { usePathname } from "next/navigation";
import { useCartDrawer } from "@/app/contexts/cart-drawer-context";
import ShoppingCart from "@main/layout/header/shopping-cart";
import { ChildrenProps } from "@/types/children";

export default function LayoutClient({ children }: ChildrenProps) {
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
      <Header/>

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
