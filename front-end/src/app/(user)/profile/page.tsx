"use client";

import { useState } from "react";
import { MobileNavigation } from "../components/mobile-navigation";
import { OrdersSection } from "../components/orders-section";
import { AddressesSection } from "../components/addresses-section";
import { PaymentMethodsSection } from "../components/payment-methods-section";
import { DesktopNavigation } from "../components/desktop-navigation";
import OverviewSection from "../components/overview-section";
import Header from "@/app/(main)/layout/header/header";
import ShoppingCart from "@/app/(main)/layout/header/shopping-cart";
import { useCartDrawer } from "@/app/contexts/cart-drawer-context";

export default function Page() {
  const {isOpen} = useCartDrawer()
  const [pickedMethod, setPickedMethod] = useState("overview");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    name: "Kauan Barcelos",
    email: "kauan.barcelos@email.com",
    phone: "+55 (11) 99999-9999",
    role: "User and Seller",
    memberSince: "Janeiro 2022",
    address: "São Paulo, SP",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-blue-50">
      <div className="mx-auto px-4 md:px-6 py-6 md:py-8">
        <Header />
        {isOpen && <ShoppingCart/>}
        <MobileNavigation
          pickedMethod={pickedMethod}
          setPickedMethod={setPickedMethod}
        />

        <DesktopNavigation
          pickedMethod={pickedMethod}
          setPickedMethod={setPickedMethod}
        />

        {pickedMethod === "overview" && (
          <OverviewSection
            userInfo={userInfo}
            setPickedMethod={setPickedMethod}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
        )}

        {/* Orders Section */}
        {pickedMethod === "orders" && (
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <OrdersSection />
          </div>
        )}

        {/* Addresses Section */}
        {pickedMethod === "addresses" && (
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <AddressesSection />
          </div>
        )}

        {/* Payment Methods Section */}
        {pickedMethod === "paymentMethods" && (
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <PaymentMethodsSection />
          </div>
        )}

        {/* Other sections placeholder */}
        {["notifications", "settings", "chatWithAI"].includes(pickedMethod) && (
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              {pickedMethod === "notifications" && "Notificações"}
              {pickedMethod === "settings" && "Configurações"}
              {pickedMethod === "chatWithAI" && "Chat com IA"}
            </h2>
            <p className="text-zinc-600">
              Conteúdo da seção {pickedMethod} será implementado aqui.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
