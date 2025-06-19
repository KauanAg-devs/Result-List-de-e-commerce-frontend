'use client'

import { ProductProps, Option } from '@/types/home/product'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface ProductComponentProps {
  product: ProductProps
  showProductDetails?: string
  setShowProductDetails?: (sku: string) => void
  showColorsOnCard?: boolean
  lazy?: boolean
}

// Skeleton component that matches the product card dimensions
const ProductSkeleton = () => {
  return (
    <div className="group relative overflow-hidden">
      <div className="relative bg-white rounded-2xl shadow-lg">
        {/* Image skeleton */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className="w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        </div>

        <div className="p-6">
          {/* Header skeleton */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
            <div className="text-right">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-16 mb-1" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
            </div>
          </div>

          {/* Options skeleton */}
          <div className="mb-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-3" />
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-5 w-5 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
          </div>

          {/* Specs skeleton */}
          <div className="mt-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Product({
  product,
  showProductDetails,
  setShowProductDetails,
  showColorsOnCard,
  lazy = false
}: ProductComponentProps) {
  
  const [isVisible, setIsVisible] = useState(!lazy)
  const [isLoaded, setIsLoaded] = useState(!lazy)
  const elementRef = useRef<HTMLDivElement>(null)
  
  const colorOption = product.options?.find((opt) => opt.type === 'color') as Option | undefined
  const defaultColor = colorOption?.values?.[0]

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    (product.options ?? []).reduce((acc, opt) => {
      const firstValue = opt.values[0]
      acc[opt.label] = 'color' in firstValue ? firstValue.color : (firstValue as any)
      return acc
    }, {} as Record<string, string>)
  )

  const [activeImageIndex, setActiveImageIndex] = useState<number>(
    defaultColor?.relativeImage ?? 0
  )

  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const isExpanded = showProductDetails === product.sku

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Add a small delay to simulate loading time and show the skeleton briefly
            setTimeout(() => {
              setIsLoaded(true)
            }, 300)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px', // Start loading when element is 50px away from viewport
        threshold: 0.1
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [lazy])

  const handleToggleDetails = () => {
    if (setShowProductDetails) {
      setShowProductDetails(isExpanded ? '' : product.sku)
    }
  }

  const memorizeProductDetails = () => {
    localStorage.setItem(
      `product_${product.sku}`, 
      JSON.stringify({
        name: product.name,
        sku: product.sku,
        price: product.price,
        images: product.images,
        stock: product.stock
      })
    )
  }

  // Show skeleton while loading
  if (lazy && (!isVisible || !isLoaded)) {
    return (
      <div ref={elementRef}>
        <ProductSkeleton />
      </div>
    )
  }

  return (
    <div className="group relative overflow-hidden" ref={elementRef}>
      <div
        className={`
          relative bg-white rounded-2xl shadow-lg hover:shadow-2xl 
          transition-all duration-500 ease-out
          ${isExpanded ? 'scale-105 z-20' : 'hover:scale-[1.02]'}
        `}
        onClick={handleToggleDetails}
      >
        <div className="relative overflow-hidden rounded-t-2xl">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
          )}

          <img
            src={product.images[activeImageIndex]}
            alt={`${product.name}`}
            className={`
              w-full aspect-square object-cover transition-all duration-700
              ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
              ${!isExpanded ? 'group-hover:scale-110' : ''}
            `}
            onLoad={() => setIsImageLoaded(true)}
            loading={lazy ? "lazy" : "eager"}
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 overflow-hidden text-ellipsis">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                SKU: {product.sku}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">${product.price}</p>
              <p
                className="text-sm font-medium"
                style={{ color: product.stock > 0 ? 'green' : 'red' }}
              >
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>

          {(product.options ?? []).map((opt) => (
            <div className="mb-4" key={opt.label}>
              <p className="text-sm font-medium text-gray-700 mb-3">
                {opt.label}:{' '}
                <span className="capitalize">{selectedOptions[opt.label]}</span>
              </p>
              <div className="flex gap-3">
                {opt.values.map((value, i) => {
                  const colorValue = 'color' in value ? value.color : String(value)
                  const isSelected = selectedOptions[opt.label] === colorValue
                  return (
                    <button
                      key={i}
                      title={colorValue}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [opt.label]: colorValue
                        }))
                        if ('relativeImage' in value && typeof value.relativeImage === 'number') {
                          setActiveImageIndex(value.relativeImage)
                        }
                      }}
                      className={`
                        relative h-5 w-5 rounded-full text-sm border transition-all duration-200
                        ${isSelected
                          ? 'bg-gray-900 text-white'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-900'}
                      `}
                      style={
                        opt.type === 'color'
                          ? {
                              backgroundColor: colorValue,
                              color: 'transparent',
                              border:
                                colorValue === 'white'
                                  ? '2px solid #e5e7eb'
                                  : undefined
                            }
                          : {}
                      }
                    >
                      {opt.type !== 'color' && colorValue}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {(product.specs ?? []).length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              {product.specs?.map(({ label, value }) => (
                <p key={label}>
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </div>
          )}

          {isExpanded && (
            <div className="mt-6 border-t border-gray-200 pt-4 text-gray-700 flex justify-center">
              <Link
                href={`/product/${product.sku}`}
                onClick={(e) => {
                  e.stopPropagation()
                  memorizeProductDetails()
                }}
                className="text-lg font-semibold mb-3 border rounded-md p-3 relative flex cursor-pointer"
              >
                Product Details
              </Link>
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
          onClick={handleToggleDetails}
        />
      )}
    </div>
  )
}