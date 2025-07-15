"use client";

import { useState, useEffect, useRef } from "react";
import { throttle } from "lodash";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import ProductsLister from "@/app/(main)/(home)/components/products-lister";
import { ProductGrouped } from "@/types/product";
import { mockGroupedProducts } from "@/app/mock-api/fetch-products";

const LOAD_COUNT = 4;

export default function Home() {
  const params = useSearchParams();
  const searchTerm = params.get("search") || "";

  const [products, setProducts] = useState<ProductGrouped[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastProductIdRef = useRef<string | null>(null);
  const requestInFlightRef = useRef(false);

  const fetchProducts = async (initial = false) => {
    if (requestInFlightRef.current) return;
    requestInFlightRef.current = true;
    setLoading(true);

    try {
      const lastProductId = initial ? undefined : products.at(-1)?.id;
      if (!initial && lastProductIdRef.current === lastProductId) return;
      lastProductIdRef.current = lastProductId || null;

      if (process.env.NEXT_PUBLIC_MOCK_MODE === "true") {
        const startIndex = lastProductId
          ? mockGroupedProducts.findIndex((p) => p.id === lastProductId) + 1
          : 0;

        const newProducts = mockGroupedProducts.slice(
          startIndex,
          startIndex + LOAD_COUNT
        );

        if (initial) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => {
            const filteredNew = newProducts.filter(
              (p) => !prev.some((existing) => existing.id === p.id)
            );
            return [...prev, ...filteredNew];
          });
        }

        setHasMore(startIndex + LOAD_COUNT < mockGroupedProducts.length);
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/getByPagination`,
          {
            lastProductReceived: lastProductId,
            productsPerPage: LOAD_COUNT,
            searchTerm,
          }
        );

        const newProducts = res.data as ProductGrouped[];

        if (initial) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => [...prev, ...newProducts]);
        }

        setHasMore(newProducts.length === LOAD_COUNT);
      }
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
      requestInFlightRef.current = false;
    }
  };

  useEffect(() => {
    setProducts([]);
    setHasMore(true);
    lastProductIdRef.current = null;
    fetchProducts(true);
  }, [searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 200;

      if (scrollPos >= threshold && hasMore && !loading) {
        fetchProducts(false);
      }
    };

    const throttledScroll = throttle(handleScroll, 300);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [hasMore, loading]);

  return (
    <main className="bg-white flex flex-col pt-5">
      <ProductsLister
        productsGrouped={products}
        loading={loading}
        hasMore={hasMore}
      />

      {loading && (
        <p className="text-center mt-4 text-gray-500">Carregando produtos...</p>
      )}

      {!loading && products.length === 0 && searchTerm !== "" && (
        <p className="text-center mt-8 text-gray-500">
          Nenhum produto encontrado para "{searchTerm}".
        </p>
      )}

      {!hasMore && products.length > 0 && (
        <p className="text-center mt-4 text-gray-500">
          Você chegou ao fim da lista.
        </p>
      )}
    </main>
  );
}
