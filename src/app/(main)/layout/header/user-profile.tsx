"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/app/contexts/auth-context";
import { useRouter } from "next/navigation";
import { clearUserProfile } from "@/app/store/user-profile-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import api from "../../lib/api";

export default function UserProfile() {
  const userProfile = useSelector(
    (state: RootState) => state.userProfile.userProfile
  );
  const dispatch = useDispatch();
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as { contains: Function })?.contains(
          event.target
        ) &&
        !(buttonRef.current as unknown as { contains: Function })?.contains(
          event.target
        )
      ) {
        setShowProfileOptions(false);
      }
    }

    if (showProfileOptions) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showProfileOptions]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowProfileOptions(false);
        (buttonRef.current as unknown as { focus: Function })?.focus();
      }
    }

    if (showProfileOptions) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [showProfileOptions]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      dispatch(clearUserProfile());
      setIsAuthenticated(false);
      router.push("/");
    } catch (error) {
      console.error("Logout falhou", error);
    }
  };

  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m17-4a4 4 0 0 1-8 0 4 4 0 0 1 8 0zM7 12a4 4 0 0 1-8 0 4 4 0 0 1 8 0z" />
        </svg>
      ),
    },
    {
      id: "orders",
      label: "Orders",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      id: "logout",
      label: "Log out",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16,17 21,12 16,7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      ),
      danger: true,
    },
  ];

  const handleMenuClick = (itemId: string) => {
    if (itemId === "profile" && userProfile) {
      router.push("/profile");
    }

    if (itemId === "settings") {
      router.push("/settings");
    }

    if (itemId === "orders") {
      router.push("/orders");
    }

    if (itemId === "logout") {
      handleLogout();
    }

    setShowProfileOptions(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowProfileOptions(!showProfileOptions)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowProfileOptions(!showProfileOptions);
          }
        }}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full
          cursor-pointer transition-all duration-200 ease-in-out
        `}
        aria-expanded={showProfileOptions}
        aria-haspopup="true"
        aria-label="User Menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 256 256"
          fill="currentColor"
          className={`h-5 md:h-16 transition-transform duration-200 ${
            showProfileOptions ? "scale-110" : ""
          }`}
        >
          <g transform="translate(1.41 1.41) scale(2.81 2.81)">
            <path
              fill="#666"
              d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 45 22.007 c 8.899 0 16.14 7.241 16.14 16.14 c 0 8.9 -7.241 16.14 -16.14 16.14 c -8.9 0 -16.14 -7.24 -16.14 -16.14 C 28.86 29.248 36.1 22.007 45 22.007 z M 45 83.843 c -11.135 0 -21.123 -4.885 -27.957 -12.623 c 3.177 -5.75 8.144 -10.476 14.05 -13.341 c 2.009 -0.974 4.354 -0.958 6.435 0.041 c 2.343 1.126 4.857 1.696 7.473 1.696 c 2.615 0 5.13 -0.571 7.473 -1.696 c 2.083 -1 4.428 -1.015 6.435 -0.041 c 5.906 2.864 10.872 7.591 14.049 13.341 C 66.123 78.957 56.135 83.843 45 83.843 z"
            />
          </g>
        </svg>
      </button>

      {showProfileOptions && (
        <div className="fixed inset-0 z-10" aria-hidden="true" />
      )}

      <div
        ref={dropdownRef}
        className={`
          absolute right-0 top-12 z-20 w-48 
          transform transition-all duration-200 ease-out origin-top-right
          ${
            showProfileOptions
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <div className="bg-white rounded-lg shadow-lg ring-1 ring-black/5 py-1">
          <div className="absolute -top-1 right-4 w-2 h-2 bg-white border-l border-t border-black/5 transform rotate-45" />

          <ul
            role="menu"
            aria-orientation="vertical"
            className="focus:outline-none"
          >
            {menuItems.map((item, index) => (
              <li key={item.id} role="none">
                <button
                  role="menuitem"
                  tabIndex={showProfileOptions ? 0 : -1}
                  onClick={() => handleMenuClick(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleMenuClick(item.id);
                    }
                  }}
                  className={`
                    w-full px-4 py-2.5 text-left flex items-center gap-3
                    transition-colors duration-150 ease-in-out
                    ${
                      item.danger
                        ? "text-red-700 hover:bg-red-50 hover:text-red-800"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }
                    focus:outline-none focus:bg-blue-50 focus:text-blue-700
                    ${index === 0 ? "rounded-t-lg" : ""}
                    ${index === menuItems.length - 1 ? "rounded-b-lg" : ""}
                  `}
                >
                  <span className="flex-shrink-0" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
