import { UserProfile } from "./user-profile";

export enum VariantStatus {
  Processing = "Processing",
  InTransit = "In-transit",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  PaymentPendent = "Payment-pendent",
  Paid = "Paid",
  Refunded = "Refunded",
}
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
  id: string
  name: string;
  sku: string;
  price: number;
  discount?: number;
  avaliations?: { star: number, comment: string }[]
  stock: number;
  images: string[]; 
  options: Record<string, string>; 
}

export interface ProductGrouped {
  id: string
  ownerId: UserProfile['id'];
  options: Option[];
  default: ProductVariant;
  specs?: { label: string; value: string }[];
  variants: ProductVariant[];
}
