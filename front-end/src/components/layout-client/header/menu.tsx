'use client';

import { MenuProps } from '@/types/layout-client/menu-props';
import Image from 'next/image';
import Link from 'next/link';
import { useCartDrawer } from '@/app/contexts/cart-drawer-context'; 

export default function Menu({ setShowCompanyProducts, showCompanyProducts, setShowMobileMenu }: MenuProps) {
  const { openCart } = useCartDrawer();

  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <Link href="../" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <Image alt="company-logo" src="/company-logo.svg" width={100} height={100} />
        </Link>
      </div>

      <div className="flex lg:hidden">
        <button
          onClick={openCart} 
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Toggle Shopping Cart"
        >
          <svg
            className="w-6 h-6 text-gray-700"
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
        <button
          type="button"
          onClick={() => setShowMobileMenu(prev => !prev)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      <div className="hidden lg:flex lg:gap-x-12">
        <div className="relative">
          <button
            onClick={() => setShowCompanyProducts(prev => !prev)}
            type="button"
            className="cursor-pointer flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900"
            aria-expanded="false"
          >
            Product
            <svg
              className={`size-5 flex-none text-gray-400 transition-transform duration-300 ${
                showCompanyProducts ? 'rotate-180' : ''
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {showCompanyProducts && (
            <div className="absolute top-full -left-8 z-50 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
              </div>
            </div>
          )}
        </div>

        <Link href="#" className="text-sm/6 font-semibold text-gray-900">
          Features
        </Link>
        <Link href="#" className="text-sm/6 font-semibold text-gray-900">
          Marketplace
        </Link>
        <Link href="#" className="text-sm/6 font-semibold text-gray-900">
          Company
        </Link>
      </div>

      <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
        <button
          onClick={openCart} 
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Toggle Shopping Cart"
        >
          <svg
            className="w-6 h-6 text-gray-700"
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
        <Link href="#" className="text-sm/6 font-semibold text-gray-900">
          Log in <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </nav>
  );
}
