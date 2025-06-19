import { ProductProps } from "@/types/home/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends Omit<ProductProps, "images" | "options" | "stock"> {
  quantity: number;
  image: string;
  options: Record<string, string>; 
}


interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(item => item.sku === action.payload.sku);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.sku !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ sku: string; quantity: number }>
    ) => {
      const item = state.items.find(item => item.sku === action.payload.sku);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
