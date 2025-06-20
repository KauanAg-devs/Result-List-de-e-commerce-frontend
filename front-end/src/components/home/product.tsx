'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ProductGrouped, Option, ProductVariant } from '@/types/home/product'

interface ProductProps {
  product: ProductGrouped
  showProductDetails?: string
  setShowProductDetails?: (sku: string) => void
  lazy?: boolean
}

const ProductSkeleton = () => (
  <div className="group relative overflow-hidden">
    <div className="relative bg-white rounded-2xl shadow-lg">
      <div className="relative overflow-hidden rounded-t-2xl">
        <div className="w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      </div>
      <div className="p-6">
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
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-3" />
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-5 w-5 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function Product({
  group,
  variant,
  showProductDetails,
  setShowProductDetails,
  lazy = false,
}: ProductProps) {
  const [isVisible, setIsVisible] = useState(!lazy)
  const [isLoaded, setIsLoaded] = useState(!lazy)
  const elementRef = useRef<HTMLDivElement>(null)

  // Estado das opções selecionadas, inicializa com o primeiro valor de cada opção
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    product.options.forEach((opt) => {
      const firstValue = opt.values[0]
      initial[opt.label] = firstValue.color ?? firstValue.label ?? ''
    })
    return initial
  })

  // Variante selecionada com base nas opções
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)

  // Atualiza variante quando as opções mudam
  useEffect(() => {
    // Procura variante que casa exatamente com todas as opções selecionadas
    const variant = product.variants.find((variant) => {
      return Object.entries(selectedOptions).every(
        ([optLabel, optValue]) => variant.options[optLabel] === optValue
      )
    }) || null

    setSelectedVariant(variant)
  }, [selectedOptions, product.variants])

  // Índice da imagem ativa, tenta achar índice da imagem da variante dentro das imagens gerais
  const activeImageIndex = selectedVariant
    ? product.images.findIndex((img) => img === selectedVariant.image)
    : 0

  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const isExpanded = showProductDetails === (selectedVariant?.sku ?? '')

  // Lazy load observer
  useEffect(() => {
    if (!lazy) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            setTimeout(() => setIsLoaded(true), 300)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '50px', threshold: 0.1 }
    )

    if (elementRef.current) observer.observe(elementRef.current)

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current)
    }
  }, [lazy])

  const toggleDetails = () => {
    if (!setShowProductDetails) return
    setShowProductDetails(isExpanded ? '' : (selectedVariant?.sku ?? ''))
  }

  const memorizeProductDetails = () => {
    if (!selectedVariant) return
    localStorage.setItem(
      `product_${selectedVariant.sku}`,
      JSON.stringify({
        name: product.name,
        sku: selectedVariant.sku,
        price: selectedVariant.price,
        images: product.images,
        stock: selectedVariant.stock,
      })
    )
  }

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
        onClick={toggleDetails}
      >
        <div className="relative overflow-hidden rounded-t-2xl">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
          )}
          <img
            src={product.images[activeImageIndex] ?? product.images[0]}
            alt={`${product.name} variant`}
            className={`w-full aspect-square object-cover transition-all duration-700 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            } ${!isExpanded ? 'group-hover:scale-110' : ''}`}
            onLoad={() => setIsImageLoaded(true)}
            loading={lazy ? 'lazy' : 'eager'}
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 overflow-hidden text-ellipsis">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                SKU: {selectedVariant?.sku ?? '—'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                ${selectedVariant?.price?.toFixed(2) ?? '--'}
              </p>
              <p
                className="text-sm font-medium"
                style={{ color: selectedVariant?.stock && selectedVariant.stock > 0 ? 'green' : 'red' }}
              >
                {selectedVariant?.stock && selectedVariant.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>

          {product.options.map((opt) => (
            <div className="mb-4" key={opt.label}>
              <p className="text-sm font-medium text-gray-700 mb-3">
                {opt.label}: <span className="capitalize">{selectedOptions[opt.label]}</span>
              </p>
              <div className="flex gap-3">
                {opt.values.map((value, i) => {
                  const valStr = value.color ?? value.label ?? ''
                  const isSelected = selectedOptions[opt.label] === valStr
                  return (
                    <button
                      key={i}
                      title={valStr}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedOptions((prev) => ({ ...prev, [opt.label]: valStr }))
                        setIsImageLoaded(false) // para efeito de loading imagem
                      }}
                      className={`
                        relative h-5 w-5 rounded-full text-sm border transition-all duration-200
                        ${isSelected ? 'bg-gray-900 text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-gray-900'}
                      `}
                      style={
                        opt.type === 'color'
                          ? {
                              backgroundColor: valStr,
                              color: 'transparent',
                              border: valStr === 'white' ? '2px solid #e5e7eb' : undefined,
                            }
                          : {}
                      }
                    >
                      {opt.type !== 'color' && valStr}
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
                href={`/product/${selectedVariant?.sku}`}
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10" onClick={toggleDetails} />
      )}
    </div>
  )
}
