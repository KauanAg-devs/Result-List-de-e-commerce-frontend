"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartDrawer } from "@/app/contexts/cart-drawer-context";
import { useAuth } from "@/app/contexts/auth-context";
import UserProfile from "./user-profile";
import SearchProducts from "../../(home)/components/search-products";

export default function Menu() {
  const { openCart } = useCartDrawer();
  const { isAuthenticated } = useAuth();
  const isAuth = isAuthenticated || process.env.NEXT_PUBLIC_MOCK_MODE === "true";

  return (
    <nav className="mx-auto flex max-w-full md:max-w-7xl items-center justify-between p-3 gap-2" aria-label="Main navigation">
      <div className="ml-3 md:ml-0 flex-shrink-0">
        <Link href="/" className="block pl-1">
          <span className="sr-only">Your Company</span>
          <Image
            alt="company-logo"
            src="/company-logo.svg"
            width={120}
            height={100}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
            priority
          />
        </Link>
      </div>

      <div className="hidden lg:flex flex-1 justify-center max-w-2xl mx-4">
        <div className="w-full max-w-lg">
          <SearchProducts />
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="relative lg:hidden">
          <input id="search-toggle" type="checkbox" className="peer hidden" />
          <label htmlFor="search-toggle" className="p-1 rounded hover:bg-gray-100 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="24"
              height="24"
              className="fill-[#666] hover:fill-blue-500 transition-colors duration-200"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </label>

          <div className="hidden peer-checked:block absolute top-12 right-0 w-64 z-50 bg-white border border-gray-200 shadow-lg p-2">
            <SearchProducts autoFocus />
          </div>
        </div>

        <button
          onClick={openCart}
          className="p-2 rounded hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Open shopping cart"
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
              d="M2.25 3h1.386c.51 0 .96.304 1.154.774L6.6 7.5h12.15c.864 0 1.47.845 1.212 1.674l-1.716 5.488a1.5 1.5 0 0 1-1.408.986H8.362a1.5 1.5 0 0 1-1.408-.986L4.5 7.5l-1.35-3M6 20.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm10.5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            />
          </svg>
        </button>

        {isAuth ? (
          <UserProfile />
        ) : (
          <Link
            href="/signin"
            className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
