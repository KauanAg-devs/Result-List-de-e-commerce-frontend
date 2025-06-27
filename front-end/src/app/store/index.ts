import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { cartReducer } from "./cart-slice"; 
import { checkoutReducer } from "./checkout-slice"; 
import { userProfileReducer } from "./user-profile-slice"

const createNoopStorage = () => {
  return {
    getItem(_key: string): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string): Promise<void> {
      return Promise.resolve();
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"], 
};

const checkoutPersistConfig = {
  key: "checkout",
  storage,
  whitelist: ["comeFrom", "selectedProduct"],
};

const userProfilePersistConfig = {
  key: "userProfile",
  storage,
  whitelist: ["userProfile"],
}

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedCheckoutReducer = persistReducer(checkoutPersistConfig, checkoutReducer);
const persistedUserProfileReducer = persistReducer(userProfilePersistConfig, userProfileReducer)

const rootReducer = combineReducers({
  cart: persistedCartReducer,
  checkout: persistedCheckoutReducer,
  userProfile: persistedUserProfileReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;