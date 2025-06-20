import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductProps } from '@/types/home/product';

export interface CartItem extends Omit<ProductProps, 'images' | 'options'> {
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

export const addToCartWithValidation = createAsyncThunk<
  CartItem,
  CartItem,
  { rejectValue: string }
>(
  'cart/addToCartWithValidation',
  (item, { getState, rejectWithValue }) => {
    const state: any = getState();
    const existingItem = state.cart.items.find((i: CartItem) => i.sku === item.sku);

    const currentQuantity = existingItem ? existingItem.quantity : 0;
    if (currentQuantity + item.quantity > item.stock) {
      return rejectWithValue('Quantity exceeds the avaliable stock');
    }

    return item;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.sku !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ sku: string; quantity: number }>) => {
      const item = state.items.find(item => item.sku === action.payload.sku);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCartWithValidation.fulfilled, (state, action) => {
      const existing = state.items.find(i => i.sku === action.payload.sku);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    });
  }
});

export const { removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
