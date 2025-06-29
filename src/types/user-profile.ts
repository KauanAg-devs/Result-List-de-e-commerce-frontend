import { ProductVariant, VariantStatus } from "./product";

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Seller = 'Seller'
}

type CommercializedVariant = {
  variant: ProductVariant;
  quantity: number;
  price: number;
  date: string;
  status: VariantStatus
}
export type UserAddress = {
    title: string
    address: string;
    city: string;
    state: string;
    zipCode: string;
    complement?: string;
}

export type UserProfile = {
  id: number;
  name?: string;
  email: {
    credentialPrivateEmail: string
    publicEmail?: string
  };
  phone?: string;
  profileImage: string | ArrayBuffer | null;
  memberSince: string;
  roles: UserRole[]
  
  UserAddresses?: UserAddress[];

  userPaymentMethods?: {
    cardName: string;
    cardNumber: string;
    cardType: string;
    cardCvv: string;
    expiry: string;
    isDefault: boolean;
  }[]

  purchases?: {
    purchasedVariants: CommercializedVariant[];
  };

  sales?: {
    variants: CommercializedVariant[];
  };
};
