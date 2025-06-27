"use server";

import LayoutClient from "@main/layout-client";
import { CartDrawerProvider } from "@/app/contexts/cart-drawer-context";
import { AuthProvider } from "@/app/contexts/auth-context";
import { ChildrenProps } from "@/types/children";
import { UserProfileProvider } from "../contexts/user-profile-context";
import ReduxProvider from "../store/redux-provider";

export default async function RootLayout({
  children,
}: Readonly<ChildrenProps>) {
  return (
    <AuthProvider>
      <ReduxProvider>
          <UserProfileProvider>
            <CartDrawerProvider>
              <LayoutClient>{children}</LayoutClient>
            </CartDrawerProvider>
          </UserProfileProvider>
        </ReduxProvider>
    </AuthProvider>
  );
}
