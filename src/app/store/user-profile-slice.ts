import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { UserProfile, UserRole } from "@/types/user-profile";
import { VariantStatus } from "@/types/product";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const mockedUserProfile: UserProfile = {
  name: "João Silvaa",
  phone: "22 998503923",
  email: {
    credentialPrivateEmail: "joao@login.com",
    publicEmail: "joao.public@example.com",
  },

  id: 1,
  profileImage: null,
  memberSince: "06/25/2025",
  roles: [UserRole.User],
  UserAddresses: [
    {
      city: "São Paulo",
      state: "SP",
      address: "Rua das Flores, 123",
      zipCode: "01234-567",
      title: "Casa",
      complement: "Apto 101",
    },
  ],
  purchases: {
    purchasedVariants: [
      {
        date: "2023-10-10",
        price: 100,
        quantity: 1,
        status: VariantStatus.Delivered,
        variant: {
          name: "Product 1",
          sku: "123456",
          price: 100,
          stock: 10,
          options: { label: "Color", value: "blue" },
          images: ["https://via.placeholder.com/150"],
        },
      },
    ],
  },
  userPaymentMethods: [],
};

export const updateUserProfile = createAsyncThunk(
  "userProfile/updateUserProfile",
  async (userProfile: UserProfile, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/update`,
        userProfile
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface UserProfileState {
  userProfile: UserProfile | null;
  loading: boolean;
  error?: string | null;
}

const initialState: UserProfileState = {
  userProfile: null,
  loading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
      state.error = null;
    },
    clearUserProfile: (state) => {
      state.userProfile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        console.log("updateUserProfile fulfilled:", action.payload);
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro desconhecido";
      });
  },
});

export const { setUserProfile, clearUserProfile } = userProfileSlice.actions;
export const userProfileReducer = userProfileSlice.reducer;
