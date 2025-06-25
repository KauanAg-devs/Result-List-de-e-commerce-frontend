import { ProductVariant } from "./product";

export type UserRole = 'admin' | 'seller' | 'user'

export type UserProfile = {
  name: string | null;
  email: string;
  phone: string | null;
  profileImage: string | ArrayBuffer | null;
  memberSince: string;
  
  role: UserRole[]
  
  addressData?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    complement: string;
  };

  userPaymentMethods?: {
    cardName: string;
    cardNumber: string;
    cardType: string;
    cardCvv: string;
    expiry: string;
    isDefault: boolean;
  }[]

  purchases?: {
    variants: ProductVariant[];
  };

  sales?: {
    variants: ProductVariant[];
  };
};
