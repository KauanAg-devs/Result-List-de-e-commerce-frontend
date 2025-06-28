import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { UserProfile, UserRole } from '@/types/user-profile';
import { VariantStatus } from '@/types/product'

export const mockedUserProfile: UserProfile = {
  name: "João Silvaa",
  phone: '22 998503923',
  email: {
    credentialPrivateEmail: "joao@login.com",
  },
  id: 1,
  profileImage: null,
  memberSince: "06/25/2025",
  role: [UserRole.User],
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
        name: "Product 1",
        sku: "123456",
        price: 100,
        stock: 10,
        options: {label: 'Color', value: 'blue'},
        images: ['https://via.placeholder.com/150']
      }
    }
    ]
  },
  userPaymentMethods: [],
};

interface CheckoutState {
  userProfile: UserProfile | null; 
}

const initialState: CheckoutState = {
  userProfile: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
    clearUserProfile: (state) => {
      state.userProfile = null;
    },
  }
});

export const { setUserProfile, clearUserProfile } = userProfileSlice.actions;
export const selectUserProfile = (state: RootState) => state.userProfile.userProfile;
export const userProfileReducer = userProfileSlice.reducer;
