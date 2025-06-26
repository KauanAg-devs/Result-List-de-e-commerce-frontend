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
  phone: '22 998503923',
  email: {
    credentialPrivateEmail: "joao@login.com",
  },
  profileImage: null,
  memberSince: "06/25/2025",
  role: ["user"],
  UserAddresses: [
    {
      city: 'São Paulo',
      state: 'SP',
      address: 'Rua das Flores, 123',
      zipCode: '01234-567',
      title: 'Casa',
      complement: 'Apto 101',
    }
  ],
  purchases: {
    purchasedVariants: [{
      date: "2023-10-10",
      price: 100,
      quantity: 1,
      status: VariantStatus.Delivered,
      variant: {
        sku: "123456",
        price: 100,
        stock: 10,
        options: {label: 'Color', value: 'blue'},
        image: 'https://via.placeholder.com/150'
      }
    }
    ]
  },
  userPaymentMethods: [],
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
