"use server";

import LayoutClient from "@main/layout-client";
import { CartDrawerProvider } from "@/app/contexts/cart-drawer-context";
import { AuthProvider } from "@/app/contexts/auth-context";
import { ChildrenProps } from "@/types/children";
import ReduxProvider from "../store/redux-provider";

export default async function RootLayout({
  children,
}: Readonly<ChildrenProps>) {
  return (
    <ReduxProvider>
      <AuthProvider>
        <CartDrawerProvider>
          <LayoutClient>{children}</LayoutClient>
        </CartDrawerProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}
