'use client';

import { CartDrawerProviderProps, CartDrawerContextType } from '@main/contexts/types/cart-drawer-context';
import { createContext, useContext, useState } from 'react';

const CartDrawerContext = createContext<CartDrawerContextType | undefined>(undefined);

export function CartDrawerProvider({ children }: CartDrawerProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartDrawerContext.Provider value={{
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartDrawerContext.Provider>
  )
}

export function useCartDrawer() {
  const context = useContext(CartDrawerContext);
  if (!context) throw new Error('useCartDrawer must be used within a CartDrawerProvider');
  return context;
}
