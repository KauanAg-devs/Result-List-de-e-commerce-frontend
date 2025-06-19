import { ProductProps } from '@/types/home/product';
import { React } from 'react'

export type ProductsListerProps = {
  filteredProducts: ProductProps[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  productsPerPage: number; 
}