import { ProductVariant, VariantStatus } from "./product";

export type UserRole = 'admin' | 'seller' | 'user'

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
  name: string | null;
  email: {
    credentialPrivateEmail: string
    publicEmail: string | null
  };
  phone: string | null;
  profileImage: string | ArrayBuffer | null;
  memberSince: string;
  role: UserRole[]
  
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
