import { useState,  } from 'react'
import { ProductGrouped} from '@/types/home/product'
import Product from './product'

interface ProductsListerProps {
  productsGrouped: ProductGrouped[]
  productsPerPage: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

export default function ProductsLister({
  productsGrouped = [],
  productsPerPage,
  currentPage,
  setCurrentPage,
}: ProductsListerProps) {
  const totalPages = Math.ceil(productsGrouped.length / productsPerPage)
  const start = (currentPage - 1) * productsPerPage
  const end = start + productsPerPage
  const paginatedGroups = productsGrouped.slice(start, end)

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    productsGrouped.forEach((group) => {
      if (group.variants.length > 0) initial[group.sku] = group.variants[0].sku
    })
    return initial
  })

  const handleVariantChange = (groupSku: string, variantSku: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [groupSku]: variantSku,
    }))
  }
  console.log(productsGrouped);
  
  return (
    <div>
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        {paginatedGroups.map((group) => {
          const selectedSku = selectedVariants[group.sku]
          const selectedVariant = group.variants.find((v) => v.sku === selectedSku)
          if (!selectedVariant) return null

          return (
            <div key={group.sku} className="border rounded p-2">
              <Product product={selectedVariant} options={group.options} />
              <div className="flex gap-2 mt-2">
                {group.variants.map((variant) => (
                  <button
                    key={variant.sku}
                    onClick={() => handleVariantChange(group.sku, variant.sku)}
                    className={`h-6 w-6 rounded-full border-2 ${
                      selectedSku === variant.sku ? 'border-black' : 'border-gray-300'
                    }`}
                    style={{
                      backgroundColor: variant.options['Color'],
                      border:
                        variant.options['Color'] === 'white' ? '2px solid #e5e7eb' : undefined,
                    }}
                    title={variant.options['Color']}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
