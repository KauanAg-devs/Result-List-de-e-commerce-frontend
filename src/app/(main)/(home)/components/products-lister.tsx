import { useState, useEffect } from "react";
import Product from "./product";
import { ProductsListerProps } from "@/app/(main)/(home)/types/products-lister";

export default function ProductsLister({
  productsGrouped = [],
  loading,
  hasMore,
}: ProductsListerProps & { loading: boolean; hasMore: boolean }) {
  const paginatedGroups = productsGrouped;

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    setSelectedVariants((prev) => {
      const next = { ...prev };
      let changed = false;

      paginatedGroups.forEach((group) => {
        const groupId = group.default.sku;
        if (!next[groupId] && group.variants.length > 0) {
          next[groupId] = group.variants[0].sku;
          changed = true;
        }
      });

      return changed ? next : prev;
    });
  }, [paginatedGroups]);

  if (productsGrouped.length === 0 && !loading && !hasMore) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10 xl:gap-14">
        {paginatedGroups.map((group) => {          
          const groupId = group.default.sku;
          const selectedSku = selectedVariants[groupId];
          const selectedVariant = group.variants.find(
            (v) => v.sku === selectedSku
          );

          if (!selectedVariant) return null;

          return (
            <div
              key={groupId}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <Product variant={selectedVariant} group={group} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
