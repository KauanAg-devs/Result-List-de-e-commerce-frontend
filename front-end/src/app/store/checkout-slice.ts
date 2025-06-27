import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { ProductProps } from '@/app/(main)/(home)/types/product'

export interface ProductItem extends Omit<ProductProps, 'images' | 'options'> {
  name: string
  quantity: number;
  image: string;
  options: Record<string, string>;
  sku: string; 
  stock: number;
  price: number;
}

interface CheckoutState {
  comeFrom: 'cart' | 'product';
  selectedProduct: ProductItem | null; 
}

const initialState: CheckoutState = {
  comeFrom: 'cart',
  selectedProduct: null
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setComeFrom: (state, action: PayloadAction<'cart' | 'product'>) => {
      state.comeFrom = action.payload;
    },

    setBuyNowProduct: (state, action: PayloadAction<ProductItem>) => {
      state.comeFrom = 'product';
      state.selectedProduct = action.payload;
    },

    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    resetCheckout: (state) => {
      state.comeFrom = 'cart';
      state.selectedProduct = null;
    }
  },
})

export const selectComeFrom = (state: RootState) => state.checkout.comeFrom;
export const selectIsFromCart = (state: RootState) => state.checkout.comeFrom === 'cart';
export const selectIsFromProduct = (state: RootState) => state.checkout.comeFrom === 'product';

export const selectSelectedProduct = (state: RootState) => state.checkout.selectedProduct;
export const selectHasSelectedProduct = (state: RootState) => state.checkout.selectedProduct !== null;

export const { 
  setComeFrom, 
  setBuyNowProduct, 
  clearSelectedProduct, 
  resetCheckout 
} = checkoutSlice.actions;

export const checkoutReducer = checkoutSlice.reducer;