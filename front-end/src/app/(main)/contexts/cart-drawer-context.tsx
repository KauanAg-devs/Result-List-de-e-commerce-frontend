'use client';

import { CartDrawerContextProps } from '@/types/main/contexts/cart-drawer-context';
import { createContext, useContext, useState } from 'react';

type CartDrawerContextType = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartDrawerContext = createContext<CartDrawerContextType | undefined>(undefined);

export function CartDrawerProvider({ children }: CartDrawerContextProps) {
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
