import { createContext, useContext, useState, ReactNode } from "react";

type ProductsContextType = {
  productsPerPage: number;
  setProductsPerPage: (n: number) => void;
  filteredProductsLength: number;
  setFilteredProductsLength: (n: number) => void;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [filteredProductsLength, setFilteredProductsLength] = useState(0);

  return (
    <ProductsContext.Provider value={{ productsPerPage, setProductsPerPage, filteredProductsLength, setFilteredProductsLength }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProducts must be used within ProductsProvider");
  return context;
}
