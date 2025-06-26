"use server";

import LayoutClient from "@main/layout-client";
import ReduxProvider from "@/app/store/redux-provider";
import { CartDrawerProvider } from "@/app/contexts/cart-drawer-context";
import { AuthProvider } from "@/app/contexts/auth-context";
import { ChildrenProps } from "@/types/children";
import { UserProfileProvider } from "../contexts/user-profile-context";

export default async function RootLayout({
  children,
}: Readonly<ChildrenProps>) {
  return (
    <ReduxProvider>
      <AuthProvider>
        <UserProfileProvider>
          <CartDrawerProvider>
            <LayoutClient>{children}</LayoutClient>
          </CartDrawerProvider>
        </UserProfileProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}
