import { ProductVariant } from "./product";

export type UserRole = 'admin' | 'seller' | 'user'

export type User = {
  email: string;
  profileImage: string;

  purchases?: {
    variants: ProductVariant[];
  };

  sales?: {
    variants: ProductVariant[];
  };
};
