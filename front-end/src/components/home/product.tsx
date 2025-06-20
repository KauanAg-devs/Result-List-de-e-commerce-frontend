'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ProductGrouped, ProductVariant } from '@/types/home/product'
import Link from 'next/link'

interface ProductProps {
  group: ProductGrouped
  variant?: ProductVariant | null
  lazy?: boolean
}

export default function Product({ group, variant = null, lazy = false }: ProductProps) {
  const [isVisible, setIsVisible] = useState(!lazy)
  const [isLoaded, setIsLoaded] = useState(!lazy)
  const elementRef = useRef<HTMLDivElement>(null)

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variant || group.variants[0] || null
  )

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    if (!selectedVariant) return {}
    return { ...selectedVariant.options }
  })

  const [isExpanded, setIsExpanded] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const findMatchingVariant = useCallback(() => {
    return group.variants.find((v) =>
      Object.entries(selectedOptions).every(([key, val]) => v.options[key] === val)
    ) || null
  }, [selectedOptions, group.variants])

  useEffect(() => {
    if (variant) {
      setSelectedVariant(variant)
      setSelectedOptions({ ...variant.options })
    }
  }, [variant])

  useEffect(() => {
    const match = findMatchingVariant()
    if (match !== selectedVariant) {
      setSelectedVariant(match)
    }
  }, [selectedOptions, findMatchingVariant, selectedVariant])

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

  const handleOptionChange = useCallback((optionLabel: string, value: string) => {
    setIsAnimating(true)
    setIsImageLoading(true)
    setIsImageLoaded(false)
    
    setSelectedOptions((prev) => ({ ...prev, [optionLabel]: value }))
    
    setTimeout(() => setIsAnimating(false), 200)
  }, [])

  const handleExpand = useCallback(() => {
    if (!isAnimating) {
      setIsExpanded(true)
    }
  }, [isAnimating])

  const handleCollapse = useCallback(() => {
    setIsExpanded(false)
  }, [])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCollapse()
    }
  }, [handleCollapse])

  const handleSaveProduct = useCallback(() => {
    console.log('Produto salvo:', selectedVariant)
  }, [selectedVariant])

  const imageToShow = selectedVariant?.image || group.images[0] || ''
  const isOutOfStock = !selectedVariant?.stock || selectedVariant.stock === 0

  return (
    <>
      <div
        ref={elementRef}
        className={`group relative overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? 'scale-105 z-20' : 'hover:scale-[1.02] hover:z-10'
        } ${isAnimating ? 'pointer-events-none' : ''}`}
        onClick={handleExpand}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`Ver detalhes de ${group.name}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleExpand()
          }
        }}
      >
        <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer overflow-hidden">
          {isImageLoading && (
            <div className="absolute top-2 right-2 z-10">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          
          {isOutOfStock && (
            <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Esgotado
            </div>
          )}

          <div className="relative overflow-hidden rounded-t-2xl">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              </div>
            )}
            
            <img
              src={imageToShow}
              alt={`${group.name} - ${Object.values(selectedOptions).join(', ')}`}
              className={`w-full aspect-square object-cover transition-all duration-700 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              } ${!isExpanded ? 'group-hover:scale-110' : ''} ${
                isOutOfStock ? 'grayscale' : ''
              }`}
              onLoad={() => {
                setIsImageLoaded(true)
                setIsImageLoading(false)
              }}
              onError={() => {
                setIsImageLoading(false)
              }}
              loading={lazy ? 'lazy' : 'eager'}
            />
            
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  {group.name}
                </h3>
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  SKU: {selectedVariant?.sku ?? '—'}
                </p>
              </div>
              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {selectedVariant?.price ? `$${selectedVariant.price.toFixed(2)}` : '--'}
                </p>
                <p
                  className={`text-sm font-medium transition-colors ${
                    selectedVariant?.stock && selectedVariant.stock > 0 
                      ? 'text-emerald-600' 
                      : 'text-red-500'
                  }`}
                >
                  {selectedVariant?.stock && selectedVariant.stock > 0
                    ? `In stock (${selectedVariant.stock})`
                    : 'Sold out'}
                </p>
              </div>
            </div>

            {group.options.map((opt) => (
              <div className="mb-4" key={opt.label}>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  {opt.label}: <span className="capitalize font-semibold">{selectedOptions[opt.label]}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {opt.values.map((value, i) => {
                    const valStr = value.label ?? ''
                    const isSelected = selectedOptions[opt.label] === valStr
                    return (
                      <div
                        key={i}
                        className="relative"
                        onMouseEnter={() => setShowTooltip(`${opt.label}-${valStr}`)}
                        onMouseLeave={() => setShowTooltip(null)}
                      >
                        <button
                          title={valStr}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOptionChange(opt.label, valStr)
                          }}
                          disabled={isAnimating}
                          className={`relative h-8 min-w-8 px-2 rounded-lg text-sm border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            isSelected
                              ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-900 hover:shadow-sm'
                          } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                          style={
                            opt.type === 'color'
                              ? {
                                  backgroundColor: value.color,
                                  color: 'transparent',
                                  border: valStr.toLowerCase() === 'white' 
                                    ? '2px solid #e5e7eb' 
                                    : isSelected 
                                      ? '2px solid #374151'
                                      : '2px solid transparent',
                                }
                              : {}
                          }
                        >
                          {opt.type !== 'color' && valStr}
                          {isSelected && opt.type === 'color' && (
                            <div className="absolute inset-0 rounded-lg border-2 border-gray-900"></div>
                          )}
                        </button>
                        
                        {showTooltip === `${opt.label}-${valStr}` && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-30">
                            {valStr}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {(group.specs ?? []).length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Especificações:</h4>
                <div className="space-y-1">
                  {group.specs?.map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="font-medium text-gray-600">{label}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isExpanded && (
              <div className="mt-6 border-t border-gray-200 pt-4 space-y-3">
                <div className="flex gap-3">
                  <Link 
                    href={`/product/${group?.sku ?? ''}`}
                    className="flex-1"
                    onClick={handleSaveProduct}
                  >
                    <button 
                      className={`${!isOutOfStock && 'cursor-pointer'} w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
                      disabled={isOutOfStock}
                    >
                      {isOutOfStock ? 'Produto Esgotado' : 'Ver Detalhes'}
                    </button>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCollapse()
                    }}
                    className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    aria-label="Fechar detalhes"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 transition-opacity duration-300"
          onClick={handleBackdropClick}
          role="button"
          tabIndex={0}
          aria-label="Fechar detalhes do produto"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              handleCollapse()
            }
          }}
        />
      )}
    </>
  )
}