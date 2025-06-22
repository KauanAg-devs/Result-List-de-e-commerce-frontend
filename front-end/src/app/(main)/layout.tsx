'use server'

import LayoutClient from "@main/layout-client";
import ReduxProvider from "@/app/store/redux-provider";
import { CartDrawerProvider } from "@main/contexts/cart-drawer-context";
import { AuthProvider } from "@main/contexts/auth-context";
import { ChildrenProps } from "@/types/children";

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
