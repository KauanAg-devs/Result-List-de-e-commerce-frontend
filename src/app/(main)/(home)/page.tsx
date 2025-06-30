"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchMockedProducts } from "@/app/api/fetch-products";
import ProductsLister from "@/app/(main)/(home)/components/products-lister";
import { ProductGrouped } from "@/types/product";
import { useSearchParams } from "next/navigation";

const LOAD_COUNT = 4;

export default function Home() {
  const params = useSearchParams();
  const searchTerm = params.get("search") || "";

  const [visibleProducts, setVisibleProducts] = useState<ProductGrouped[]>([]);
  const [allFilteredProducts, setAllFilteredProducts] = useState<
    ProductGrouped[]
  >([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filtered =
      searchTerm === ""
        ? fetchMockedProducts
        : fetchMockedProducts.filter( 
            (product) =>
              product.variants[0].name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              product.variants[0].sku
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          );

    setAllFilteredProducts(filtered);
    setVisibleProducts([]);
    setHasMore(true);
  }, [searchTerm]);

  useEffect(() => {
    if (allFilteredProducts.length > 0) {
      const nextBatch = allFilteredProducts.slice(0, LOAD_COUNT);
      setVisibleProducts(nextBatch);
      setHasMore(nextBatch.length < allFilteredProducts.length);
    } else {
      setVisibleProducts([]);
      setHasMore(false);
    }
  }, [allFilteredProducts]);

  const loadMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    setVisibleProducts((prevVisible) => {
      const start = prevVisible.length;
      const nextBatch = allFilteredProducts.slice(start, start + LOAD_COUNT);
      if (start + LOAD_COUNT >= allFilteredProducts.length) {
        setHasMore(false);
      }
      setLoading(false);
      return [...prevVisible, ...nextBatch];
    });
  }, [loading, hasMore, allFilteredProducts]);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 200;

      if (scrollPosition >= threshold && hasMore && !loading) {
        loadMoreProducts();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreProducts, hasMore, loading]);

  return (
    <main className="bg-white flex flex-col pt-5">
      <ProductsLister
        productsGrouped={visibleProducts}
        loading={loading}
        hasMore={hasMore}
      />

      {loading && (
        <p className="text-center mt-4 text-gray-500">
          Loading more products...
        </p>
      )}

      {!loading && visibleProducts.length === 0 && searchTerm !== "" && (
        <p className="text-center mt-8 text-gray-500">
          Nenhum produto encontrado para "{searchTerm}".
        </p>
      )}

      {!hasMore && visibleProducts.length > 0 && (
        <p className="text-center mt-4 text-gray-500">
          You have reached the end of the list.
        </p>
      )}
    </main>
  );
}