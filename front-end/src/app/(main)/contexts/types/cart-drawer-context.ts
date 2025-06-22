export type CartDrawerContextType = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

export type CartDrawerProviderProps = {
  children: React.ReactNode
}
