export interface OptionValue {
  color: string
  relativeImage?: number
}

export interface Option {
  label: string
  type: string
  values: OptionValue[]
}

export interface Spec {
  label: string
  value: string | number
}

export interface ProductProps {
  name: string
  sku: string
  price: number
  images: string[]
  colors?: string[] 
  options?: Option[]
  stock: number
  specs?: { label: string; value: string }[]
  showProductDetails?: string
  setShowProductDetails?: (sku: string) => void
  showColorsOnCard?: boolean
}
