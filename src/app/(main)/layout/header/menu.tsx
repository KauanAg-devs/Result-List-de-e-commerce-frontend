"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartDrawer } from "@/app/contexts/cart-drawer-context";
import UserProfile from "./user-profile";
import { useAuth } from "@/app/contexts/auth-context";
import SearchProducts from "../../(home)/components/search-products";
import { useState, useEffect } from "react";

export default function Menu() {
  const [showMobileSearchProducts, setshowMobileSearchProducts] = useState(false);
  const { openCart } = useCartDrawer();
  const { isAuthenticated } = useAuth();

  const handleSearchBlur = () => {
    setTimeout(() => {
      setshowMobileSearchProducts(false);
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMobileSearchProducts) {
        const searchContainer = document.getElementById('mobile-search-container');
        const searchButton = document.getElementById('mobile-search-button');
        
        if (searchContainer && searchButton) {
          const target = event.target as Node;
          if (!searchContainer.contains(target) && !searchButton.contains(target)) {
            setshowMobileSearchProducts(false);
          }
        }
      }
    };

    if (showMobileSearchProducts) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMobileSearchProducts]);

  return (
    <nav
      className="mx-auto flex max-w-full md:max-w-7xl items-center justify-between gap-2"
      aria-label="Global"
    >
      <div className={`${showMobileSearchProducts && 'hidden'} ml-3 md:ml-0 flex-shrink-0`}>
        <Link href="../" className="block pl-1">
          <span className="sr-only">Your Company</span>
          <Image
            alt="company-logo"
            src="/company-logo.svg"
            width={120}
            height={100}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
          />
        </Link>
      </div>

      <div 
        id="mobile-search-container"
        className="flex lg:hidden flex-1 min-w-0 py-2 mx-2 sm:mx-4"
      >
        {showMobileSearchProducts && (
          <div className="w-full">
            <SearchProducts 
              onBlur={handleSearchBlur}
              autoFocus={true}
            />
          </div>
        )}
      </div>

      <div className={`${showMobileSearchProducts && 'hidden'} flex justify-end items-center gap-1 pr-3 lg:hidden flex-shrink-0`}>
        <button
          onClick={openCart}
          className="rounded hover:bg-gray-100 transition-colors duration-200"
          aria-label="Toggle Shopping Cart"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .96.304 1.154.774L6.6 7.5m0 0h12.15c.864 0 1.47.845 1.212 1.674l-1.716 5.488A1.5 1.5 0 0 1 16.838 16.5H8.362a1.5 1.5 0 0 1-1.408-.986L4.5 7.5m2.1 0L5.25 4.5M6 20.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm10.5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            />
          </svg>
        </button>
        
        <svg
          id="mobile-search-button"
          onClick={() => setshowMobileSearchProducts((prev) => !prev)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          width="25"
          height="25"
          className="md:hidden p-1 fill-[#666] hover:fill-blue-500 transition-colors duration-200 cursor-pointer"
        >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
        
        {isAuthenticated ? (
          <UserProfile/>
        ) : (
          <Link
            href="/signin"
            className="ml-2 text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>

      <div className="hidden w-7/10 lg:flex justify-center max-w-2xl mx-4">
        <div className="w-7/10 max-w-lg">
          <SearchProducts />
        </div>
      </div>

      <div className="hidden lg:flex lg:justify-end items-center gap-4">
        <button
          onClick={openCart}
          className="p-2 rounded hover:bg-gray-100 transition-colors duration-200"
          aria-label="Toggle Shopping Cart"
        >
          <svg
            className="w-7 h-7 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .96.304 1.154.774L6.6 7.5m0 0h12.15c.864 0 1.47.845 1.212 1.674l-1.716 5.488A1.5 1.5 0 0 1 16.838 16.5H8.362a1.5 1.5 0 0 1-1.408-.986L4.5 7.5m2.1 0L5.25 4.5M6 20.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm10.5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            />
          </svg>
        </button>

        {isAuthenticated ? (
          <UserProfile />
        ) : (
          <Link
            href="/signin"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>
    </nav>
  );
}