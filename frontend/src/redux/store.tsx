import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/userSclice";
import productSclice from "./slice/productSclice";
import addToCartSlice from "./slice/addToCartSlice";
import userProfileSclice from "./slice/profileSlice";
import addresSclice from "./slice/addresSlice";
import homeProductSlice from "./slice/homeProductSlice";
import wishlistSlice from "./slice/wishlistSlice";
// import orderSlice from "./slice/orderSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSclice,
    addToCart: addToCartSlice,
    profile: userProfileSclice,
    address:addresSclice,
    homeProducts : homeProductSlice,
    wishlist : wishlistSlice,
    // order : orderSlice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
