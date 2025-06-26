"use client";

import { useState, useEffect } from "react";
import { fetchMockedProducts } from "@/app/api/fetch-products";
import SearchProducts from "@/app/(main)/(home)/components/search-products";
import ProductsPerPage from "@/app/(main)/(home)/components/products-per-page";
import ProductsLister from "@/app/(main)/(home)/components/products-lister";
import { ProductGrouped } from "@/types/product";

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<ProductGrouped[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterInput, setShowFilterInput] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const filtered = fetchMockedProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [productsPerPage, filteredProducts, currentPage]);

  return (
    <main className="bg-white flex flex-col pt-5">
      <SearchProducts
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setShowFilterInput={setShowFilterInput}
      />

      <ProductsPerPage
        filteredProductsLength={filteredProducts.length}
        productsPerPage={productsPerPage}
        setProductsPerPage={setProductsPerPage}
        showFilterInput={showFilterInput}
      />

      {filteredProducts.length === 0 && searchTerm && (
        <div className="text-center text-gray-500 mt-8">
          No products found matching "{searchTerm}"
        </div>
      )}

      <ProductsLister
        productsGrouped={filteredProducts}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}
