'use client'
import Product from '@/components/home/product';
import { ProductProps } from '@/types/product';
import {useMemo} from 'react'

interface Props {
  filteredProducts: ProductProps[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  productsPerPage: number; 
}

export default function ProductsLister({ filteredProducts, currentPage, setCurrentPage, productsPerPage }: Props) {
  
  const paginated = useMemo(()=>{
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return currentProducts
  }, [currentPage, filteredProducts, productsPerPage])
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
 
  function handlePrev() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  function handleNext() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {paginated.map((product, i) => (
            <Product
              key={`${product.sku}-${i}`}
              colors={product.colors}
              name={product.name}
              sku={product.sku}
            />
          ))}
        </div>
      </div>

      <p className='w-full text-center text-zinc-500 pb-1 font-bold'>Page {currentPage} of {totalPages}</p>

      <div className="flex justify-center w-full pb-10 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-bold py-2 px-4 rounded-l h-10 w-24 md:h-10"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-bold py-2 px-4 rounded-r h-10 w-24 md:h-10"
        >
          Next
        </button>
      </div>
    </div>
  );
}
