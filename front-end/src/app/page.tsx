'use client'

import { useState, useEffect } from 'react'
import ProductsLister from '@/components/home/products-lister'
import {fetchMockedProducts} from '@/app/api/fetch-products'
import { ProductProps } from '@/types/product'

export default function Home() {
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterInput, setShowFilterInput] = useState(false);

  const [productsPerPageInput, setProductsPerPageInput] = useState('8');
  const [productsPerPage, setProductsPerPage] = useState(8);

  const [currentPage, setCurrentPage] = useState(1);

  const handleProductsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setProductsPerPageInput(value);
    const num = parseInt(value, 10);
    setProductsPerPage(num);
  };

  useEffect(() => {
    fetchMockedProducts
    setAllProducts(fetchMockedProducts);
    setFilteredProducts(fetchMockedProducts);
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, allProducts]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [productsPerPage, filteredProducts, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main className='bg-white flex flex-col pt-5'>
      <div className="flex px-4 py-3 rounded-md border-2 border-zinc-500 overflow-hidden w-96 md:max-w-md mx-auto">
        <input 
          type="text" 
          placeholder="Search Products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full outline-none bg-transparent text-gray-600 text-sm" 
        />
        <div className='flex gap-3'>
          <svg onClick={() => setShowFilterInput(prev => !prev)} className='cursor-pointer' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#718096" width='24px'>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M18 7H17M17 7H16M17 7V6M17 7V8M12.5 5H6C5.5286 5 5.29289 5 5.14645 5.14645C5 5.29289 5 5.5286 5 6V7.96482C5 8.2268 5 8.35779 5.05916 8.46834C5.11833 8.57888 5.22732 8.65154 5.4453 8.79687L8.4688 10.8125C9.34073 11.3938 9.7767 11.6845 10.0133 12.1267C10.25 12.5688 10.25 13.0928 10.25 14.1407V19L13.75 17.25V14.1407C13.75 13.0928 13.75 12.5688 13.9867 12.1267C14.1205 11.8765 14.3182 11.6748 14.6226 11.4415M20 7C20 8.65685 18.6569 10 17 10C15.3431 10 14 8.65685 14 7C14 5.34315 15.3431 4 17 4C18.6569 4 20 5.34315 20 7Z" stroke="#464455" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600 cursor-pointer">
            <path
              d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
            </path>
          </svg>
        </div>
      </div>

     <div className='mx-auto relative flex z-1 justify-center'>
      <div className={`absolute transition-all duration-300 ease-in-out mx-auto max-w-md w-96 mt-3 ${showFilterInput ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Items per page
            </label>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {filteredProducts.length} total
            </div>
          </div>
          
          <div className="relative">
            <select
              value={productsPerPageInput}
              onChange={handleProductsPerPageChange}
              className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-colors duration-200"
            >
              <option value="2">2 items</option>
              <option value="4">4 items</option>
              <option value="6">6 items</option>
              <option value="8">8 items</option>
            </select>
            
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(parseInt(productsPerPageInput) / 8) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {productsPerPageInput}/8
            </span>
          </div>
          
          <div className="mt-3 flex gap-1">
            {[2, 4, 6, 8].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setProductsPerPageInput(num.toString());
                  setProductsPerPage(num);
                }}
                className={`flex-1 px-2 py-1.5 text-xs rounded-md font-medium transition-all duration-200 ${
                  parseInt(productsPerPageInput) === num
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div> 
     </div>
      {filteredProducts.length === 0 && searchTerm && (
        <div className="text-center text-gray-500 mt-8">
          No products found matching "{searchTerm}"
        </div>
      )}

      <ProductsLister
        filteredProducts={filteredProducts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}  
      />
    </main>
  );
}