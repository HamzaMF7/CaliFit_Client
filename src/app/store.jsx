import { configureStore } from "@reduxjs/toolkit";
// import categoryReducer from "../components/Category/CategorySlice";
import productReducer from "./reduxSlice/ProductSlice";
import cartReducer from "./reduxSlice/CartSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});
