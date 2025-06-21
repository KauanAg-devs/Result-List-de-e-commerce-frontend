import LayoutClient from "@/app/(main)/layout-client";
import ReduxProvider from "@/app/store/redux-provider";
import { CartDrawerProvider } from "@/app/(main)/contexts/cart-drawer-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <CartDrawerProvider>
        <LayoutClient>{children}</LayoutClient>
      </CartDrawerProvider>
    </ReduxProvider>
  );
}
