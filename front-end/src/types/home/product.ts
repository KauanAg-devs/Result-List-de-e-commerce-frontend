export interface OptionValue {
  color?: string;
  label?: string;
  relativeImage?: number; 
}

export interface Option {
  label: string; 
  type: string; 
  values: OptionValue[];
}

export interface ProductVariant {
  sku: string;
  price: number;
  stock: number;
  image: string; 
  options: Record<string, string>; 
}

export interface ProductGrouped {
  name: string;
  sku: string;
  images: string[]; 
  options: Option[];
  specs?: { label: string; value: string }[];
  variants: ProductVariant[];
}

export interface ProductProps {
  group: ProductGrouped;
  lazy: boolean
}