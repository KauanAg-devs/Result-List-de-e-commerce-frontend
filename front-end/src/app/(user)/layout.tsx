import { ChildrenProps } from "@/types/children";
import { AuthProvider } from "@/app/contexts/auth-context";
import { CartDrawerProvider } from "@/app/contexts/cart-drawer-context";
import ReduxProvider from "../store/redux-provider";

export default function UserLayout({ children }: ChildrenProps) {
  return (
    <ReduxProvider>
      <AuthProvider>
        <CartDrawerProvider>{children}</CartDrawerProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}
