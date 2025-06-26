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
  sku: string;
  price: number;
  stock: number;
  image: string; 
  options: Record<string, string>; 
}

export interface ProductGrouped {
  ownerId: UserProfile['id'];
  name: string;
  sku: string;
  images: string[]; 
  options: Option[];
  specs?: { label: string; value: string }[];
  variants: ProductVariant[];
}
