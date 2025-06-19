'use client'
import { ProductProps } from '@/types/product'
import { useState } from 'react'
import Link from 'next/link'

export default function Product({
  name,
  sku,
  price,
  images,
  options = [],
  specs = [],
  showProductDetails,
  setShowProductDetails,
  showColorsOnCard
}: ProductProps) {
  const colorOption = options.find((opt) => opt.type === 'color')
  const defaultColor = colorOption?.values?.[0]

  const [selectedOptions, setSelectedOptions] = useState(
    options.reduce((acc, opt) => {
      acc[opt.label] = opt.values[0].color || opt.values[0]
      return acc
    }, {} as Record<string, string>)
  )

  const [activeImageIndex, setActiveImageIndex] = useState(
    defaultColor?.relativeImage ?? 0
  )

  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const isExpanded = showProductDetails === sku

  const handleToggleDetails = () => {
    setShowProductDetails(isExpanded ? '' : sku)
  }

  return (
    <div className="group relative overflow-hidden">
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
            src={images[activeImageIndex]}
            alt={`${name}`}
            className={`
              w-full aspect-square object-cover transition-all duration-700
              ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
              ${!isExpanded ? 'group-hover:scale-110' : ''}
            `}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 overflow-hidden text-ellipsis">
                {name}
              </h3>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                SKU: {sku}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">${price}</p>
              <p className="text-sm text-green-600 font-medium">In Stock</p>
            </div>
          </div>

          {showColorsOnCard && colorOption && (
            <div className="mb-4 flex gap-2">
              {colorOption.values.map(({ color }, i) => (
                <div
                  key={i}
                  title={color}
                  style={{
                    backgroundColor: color,
                    border: color === 'white' ? '1px solid #ccc' : undefined,
                  }}
                  className="w-5 h-5 rounded-full"
                />
              ))}
            </div>
          )}

          {options.map((opt) => (
            <div className="mb-4" key={opt.label}>
              <p className="text-sm font-medium text-gray-700 mb-3">
                {opt.label}:{' '}
                <span className="capitalize">{selectedOptions[opt.label]}</span>
              </p>
              <div className="flex gap-3">
                {opt.values.map((value, i) => {
                  const isSelected = selectedOptions[opt.label] === value.color
                  return (
                    <button
                      key={i}
                      title={value.color}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [opt.label]: value.color
                        }))
                        if (typeof value.relativeImage === 'number') {
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
                              backgroundColor: value.color,
                              color: 'transparent',
                              border:
                                value.color === 'white'
                                  ? '2px solid #e5e7eb'
                                  : undefined
                            }
                          : {}
                      }
                    >
                      {opt.type !== 'color' && value.color}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {specs.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              {specs.map(({ label, value }) => (
                <p key={label}>
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </div>
          )}

          {isExpanded && (
            <div className="mt-6 border-t border-gray-200 pt-4 text-gray-700 flex justify-center">
              <button
                className="cursor-pointer text-lg font-semibold mb-3 border rounded-md p-3 relative flex"
                onClick={(e) => e.stopPropagation()}
              >
                <Link href={`/product/${sku}`}>Detalhes do Produto</Link>
              </button>
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
