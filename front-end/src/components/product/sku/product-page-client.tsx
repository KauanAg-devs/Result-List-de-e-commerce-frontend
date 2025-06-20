'use client'

import { useEffect, useState } from 'react'
import { ProductProps } from '@/types/home/product'
import { useAppDispatch } from '@/app/store'
import { addToCartWithValidation } from '@/app/store/cart-slice'
import { useCartDrawer } from '@/app/contexts/cart-drawer-context'
import { toast, ToastContainer } from 'react-toastify';

export default function ProductPageClient({ sku }: { sku: string }) {
  const [product, setProduct] = useState<ProductProps | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useAppDispatch()
  const { openCart } = useCartDrawer()

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))

      const stored = localStorage.getItem(`product_${sku}`)
      if (stored) {
        const productData = JSON.parse(stored)
        setProduct(productData)

        const initialOptions: Record<string, string> = {}
        productData.options?.forEach((opt: any) => {
          const first = opt.values[0]
          initialOptions[opt.label] = 'color' in first ? first.color : String(first)
        })

        setSelectedOptions(initialOptions)
      }

      setIsLoading(false)
    }

    loadProduct()
  }, [sku])

  const handleOptionChange = (label: string, value: string, relativeImage?: number) => {
    setSelectedOptions(prev => ({ ...prev, [label]: value }))
    if (relativeImage !== undefined) setSelectedImage(relativeImage)
  }
  
  const handleAddToCart = async () => {
  if (!product || product.stock === 0) return

  const cartItem = {
    sku: product.sku,
    name: product.name,
    price: product.price,
    options: selectedOptions,
    quantity,
    image: product.images[selectedImage],
    stock: product.stock
  }

  try {
    await dispatch(addToCartWithValidation(cartItem)).unwrap()
    openCart()
    toast.success('Product added to shopping cart!')
  } catch (error) {
    toast.error(typeof error === 'string' ? error : 'Error during shopping cart addiction') 
  }
}

  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="w-full aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex gap-3">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
              </div>
              <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse ml-4"></div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
            </div>

            <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-32"></div>

            <div className="space-y-4">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="flex gap-2 flex-wrap">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="h-10 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-full"></div>

            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">Product not found.</p>
      </div>
    )
  }

  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock <= 5

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative">
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center rounded-lg">
              <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-lg">
                OUT OF STOCK
              </div>
            </div>
          )}
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className={`w-full aspect-square object-cover rounded-lg shadow transition-all ${
              isOutOfStock ? 'filter grayscale' : ''
            }`}
          />
          <div className="flex gap-3 mt-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                disabled={isOutOfStock}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === idx ? 'border-gray-900' : 'border-transparent'
                } ${isOutOfStock ? 'opacity-50 cursor-not-allowed filter grayscale' : ''}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <ToastContainer position="top-right" autoClose={3000} />

          <div className="flex items-start justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            {isOutOfStock && (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                Unavailable
              </span>
            )}
            {isLowStock && !isOutOfStock && (
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                Low stock
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-500 mt-1 mb-4">SKU: {product.sku}</p>
          
          <div className="mb-4">
            {isOutOfStock ? (
              <div className="flex items-center gap-2 text-red-600">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-sm font-medium">Product out of stock</span>
              </div>
            ) : isLowStock ? (
              <div className="flex items-center gap-2 text-orange-600">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                <span className="text-sm font-medium">Only {product.stock} units left</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm font-medium">In stock</span>
              </div>
            )}
          </div>

          <p className={`text-3xl font-semibold mb-6 ${isOutOfStock ? 'text-gray-500' : 'text-gray-900'}`}>
            R$ {product.price}
          </p>

          {product.options?.map((opt, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-2">{opt.label}</h3>
              <div className="flex gap-2 flex-wrap">
                {opt.values.map((val, idx) => {
                  const value = 'color' in val ? val.color : String(val)
                  const isSelected = selectedOptions[opt.label] === value

                  return (
                    <button
                      key={idx}
                      onClick={() =>
                        handleOptionChange(
                          opt.label,
                          value,
                          'relativeImage' in val ? val.relativeImage : undefined
                        )
                      }
                      disabled={isOutOfStock}
                      className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                        isSelected
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-900'
                      }`}
                      style={opt.type === 'color' && !isOutOfStock
                        ? {
                            backgroundColor: value,
                            color: 'transparent',
                            border: value === 'white' ? '1px solid #ccc' : undefined,
                            width: '2rem',
                            height: '2rem',
                            padding: 0,
                            borderRadius: '9999px',
                          }
                        : {}
                      }
                    >
                      {opt.type !== 'color' && value}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {product.stock > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-2">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 text-zinc-700 border border-zinc-700 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  −
                </button>
                <span className="text-lg text-zinc-700 min-w-[2rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-8 h-8 text-zinc-700 border border-zinc-700 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {isOutOfStock ? (
            <div className="space-y-3">
              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 py-4 rounded-lg font-medium cursor-not-allowed"
              >
                Product Unavailable
              </button>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-red-800 font-medium text-sm">Product Out of Stock</span>
                </div>
                <p className="text-red-700 text-sm">
                  This product is temporarily out of stock. Contact us for information about restocking.
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={Object.keys(selectedOptions).length < (product.options?.length || 0)}
              className="w-full cursor-pointer bg-gray-900 text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add to cart
            </button>
          )}

          {product.specs && product.specs.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Specifications</h3>
              <ul className="grid grid-cols-2 gap-4">
                {product.specs.map((spec, idx) => (
                  <li key={idx} className={`bg-white p-4 rounded border text-sm ${
                    isOutOfStock ? 'text-gray-500 opacity-75' : 'text-gray-700'
                  }`}>
                    <strong>{spec.label}:</strong> {spec.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
