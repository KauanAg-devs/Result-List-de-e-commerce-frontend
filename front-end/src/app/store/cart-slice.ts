import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductProps } from '../(main)/(home)/types/product';

export interface CartItem extends Omit<ProductProps, 'images' | 'options'> {
  name: string
  quantity: number;
  image: string;
  options: Record<string, string>;
  sku: string; 
  stock: number;
  price: number;
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

    const existingItem = state.cart.items.find((i: CartItem) => {
      const matchedVariant = i.group.variants.find(v =>
        Object.entries(i.options).every(([key, value]) => v.options[key] === value)
      );

      const newVariant = item.group.variants.find(v =>
        Object.entries(item.options).every(([key, value]) => v.options[key] === value)
      );

      return matchedVariant?.sku === newVariant?.sku;
    });

    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const variant = item.group.variants.find(v =>
      Object.entries(item.options).every(([key, value]) => v.options[key] === value)
    );

    if (!variant) {
      return rejectWithValue('Variant not found');
    }

    if (currentQuantity + item.quantity > variant.stock) {
      return rejectWithValue('Quantity exceeds available stock');
    }

    return {
      ...item,
      sku: variant.sku,
      stock: variant.stock,
      price: variant.price
    };
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
