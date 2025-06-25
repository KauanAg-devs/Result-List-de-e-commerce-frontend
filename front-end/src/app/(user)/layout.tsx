import { ChildrenProps } from "@/types/children";
import { AuthProvider } from "@/app/contexts/auth-context";
import { CartDrawerProvider } from "@/app/contexts/cart-drawer-context";
import ReduxProvider from "../store/redux-provider";
import { UserProfileProvider } from "./contexts/user-profile-context";

export default function UserLayout({ children }: ChildrenProps) {
  return (
    <ReduxProvider>
      <AuthProvider>
        <CartDrawerProvider>
          <UserProfileProvider>
            {children}
          </UserProfileProvider>
        </CartDrawerProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}
