"use client";
import { ChildrenProps } from "@/types/children";
import { VariantStatus } from "@/types/product";
import { UserProfile } from "@/types/user-profile";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

const defaultUserProfile: UserProfile = {
  name: "João Silva",
  email: {
    credentialPrivateEmail: "joao@login.com",
    publicEmail: "joao@email.com",
  },
  phone: "(11) 99999-9999",
  profileImage: null,
  memberSince: "Janeiro 2023",
  role: ["admin"],
  UserAddresses: [
    {
      title: "Casa",
      address: "Rua das Flores, 13",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      complement: "Apto 45",
    },
  ],
  purchases: {
    purchasedVariants: [
      {
        date: "24/05",
        price: 19.99,
        quantity: 1,
        status: VariantStatus.InTransit,
        variant: {
          sku: "TSHIRT-BLK-S",
          price: 19.99,
          stock: 10,
          image:
            "https://www.skhouston.com/pub/media/catalog/product/cache/249608ba4171d44d21805ed7657a13ae/t/s/tshirt_black.jpg",
          options: {
            Color: "Black",
          },
        },
      },
      {
        date: "24/05",
        quantity: 3,
        price: 49.9,
        status: VariantStatus.Cancelled,
        variant: {
          sku: "HOODIE-BLU-M",
          price: 49.99,
          stock: 0,
          image:
            "https://studios-tc.com/wp-content/uploads/2021/10/oversize-hoodie-royal-blue-front-900x1021.jpg",
          options: {
            Color: "Blue",
          },
        },
      },
    ],
  },
  userPaymentMethods: [
    {
      cardType: "Visa",
      cardName: "João Silva",
      cardNumber: "1234 5444 3222 1234",
      cardCvv: "123",
      expiry: "12/25",
      isDefault: true,
    },
    {
      cardType: "Master Card",
      cardName: "João Silva",
      cardNumber: "1234 5444 3222 1234",
      cardCvv: "123",
      expiry: "12/25",
      isDefault: false,
    },
  ],
};

const mockedUserProfile = {
  userProfile: defaultUserProfile,
  setUserProfile: () => {},
};

const userProfileContext = createContext<{
  userProfile: UserProfile;
  setUserProfile: Dispatch<SetStateAction<UserProfile>>;
}>(mockedUserProfile);

export const UserProfileProvider = ({ children }: ChildrenProps) => {
  const [userProfile, setUserProfile] =
    useState<UserProfile>(defaultUserProfile);

  return (
    <userProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </userProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(userProfileContext);

  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }

  return context;
};
