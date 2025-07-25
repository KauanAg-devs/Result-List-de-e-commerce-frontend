"use client";

import { useState } from "react";
import { MobileNavigation } from "../components/mobile-navigation";
import { AddressesSection } from "../components/addresses-section";
import { PaymentMethodsSection } from "../components/payment-methods-section";
import { DesktopNavigation } from "../components/desktop-navigation";
import OverviewSection from "../components/overview-section";
import Header from "@/app/(main)/layout/header/header";
import ShoppingCart from "@/app/(main)/layout/header/shopping-cart";
import { useCartDrawer } from "@/app/contexts/cart-drawer-context";
import { useRequireAuth } from "@/app/(main)/hooks/use-require-auth";
import { LoaderCircle } from "lucide-react";

export default function Page() {
  const { isOpen } = useCartDrawer();
  const [pickedMethod, setPickedMethod] = useState("overview");
  const { loading, isAuthenticated } = useRequireAuth();

  
  if ((loading || !isAuthenticated) && process.env.NEXT_PUBLIC_MOCK_MODE === 'false') return <LoaderCircle className="animate-spin mx-auto mt-8" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-blue-50">
      <Header />
      <div className="">
        {isOpen && <ShoppingCart />}
        <MobileNavigation
          pickedMethod={pickedMethod}
          setPickedMethod={setPickedMethod}
        />

        <DesktopNavigation
          pickedMethod={pickedMethod}
          setPickedMethod={setPickedMethod}
        />

        {pickedMethod === "overview" && (
          <OverviewSection setPickedMethod={setPickedMethod} />
        )}
        {pickedMethod === "addresses" && <AddressesSection />}
        {pickedMethod === "paymentMethods" && <PaymentMethodsSection />}

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
