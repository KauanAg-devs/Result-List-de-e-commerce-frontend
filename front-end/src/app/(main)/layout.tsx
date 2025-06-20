
import LayoutClient from '@/app/(main)/layout-client'
import ReduxProvider from "@/app/store/redux-provider";
import { CartDrawerProvider } from "@/app/(main)/contexts/cart-drawer-context";
import { geistSans, geistMono } from '@/app/fonts';


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <ReduxProvider>
          <CartDrawerProvider>
            <LayoutClient>
              {children}
            </LayoutClient>
          </CartDrawerProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
