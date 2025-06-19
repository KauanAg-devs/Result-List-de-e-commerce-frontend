'use client'

import Product from '@/components/home/product';
import { ProductsListerProps } from '@/types/home/products-lister';
import { useMemo, useState } from 'react';

export default function ProductsLister({
  filteredProducts,
  currentPage,
  setCurrentPage,
  productsPerPage
}: ProductsListerProps) {
  const [showProductDetails, setShowProductDetails] = useState('');

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    return filteredProducts.slice(start, end);
  }, [currentPage, filteredProducts, productsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {paginatedProducts.map((product, index) => (
            <Product
              key={product.sku}
              product={product}
              showProductDetails={showProductDetails}
              setShowProductDetails={setShowProductDetails}
              showColorsOnCard={true}
              lazy={index >= 4 || currentPage > 1}
            />
          ))}
        </div>

        <p className="w-full text-center text-zinc-500 pt-6 font-bold">
          Page {currentPage} of {totalPages}
        </p>

        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-bold py-2 px-4 rounded-r"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}