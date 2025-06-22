import { ProductGrouped } from "@/types/product";

export type ProductsListerProps = {
  productsGrouped: ProductGrouped[];
  productsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
