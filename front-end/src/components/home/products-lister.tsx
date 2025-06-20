import { useState, useEffect } from 'react'
import { ProductGrouped } from '@/types/home/product'
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

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})

  useEffect(() => {
    setSelectedVariants((prev) => {
      const next = { ...prev }
      let changed = false

      paginatedGroups.forEach((group) => {
        if (!next[group.sku] && group.variants.length > 0) {
          next[group.sku] = group.variants[0].sku
          changed = true
        }
      })

      return changed ? next : prev
    })
  }, [paginatedGroups])

  const handleVariantChange = (groupSku: string, variantSku: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [groupSku]: variantSku,
    }))
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getVisiblePages = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxVisible - 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }
    
    return pages
  }

  if (productsGrouped.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Nenhum produto encontrado</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-6 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {paginatedGroups.map((group) => {
          const selectedSku = selectedVariants[group.sku]
          const selectedVariant = group.variants.find((v) => v.sku === selectedSku)

          if (!selectedVariant) return null

          return (
            <div key={group.sku} className="hover:shadow-lg transition-shadow duration-200">
              <Product
                variant={selectedVariant}
                group={group}
              />
            </div>
          )
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col items-center space-y-3">
          <div className="text-sm text-gray-600">
            {start + 1}-{Math.min(end, productsGrouped.length)} de {productsGrouped.length} produtos
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm border rounded-l hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ‹ Anterior
            </button>

            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 text-sm border ${
                  currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm border rounded-r hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima ›
            </button>
          </div>
        </div>
      )}
    </div>
  )
}