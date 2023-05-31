import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const cartItems = [];

const initialState = {
  cartItems: cartItems,
  isOpen: false,
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const [item] = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);
      if (!isItemExist) {
        state.cartItems = [...state.cartItems, { ...item, amountItem: 1 }];
        state.amount = state.amount + 1;
      }
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemID = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemID);
    },
    increase: (state, action) => {
      const itemID = action.payload;
      const currentItem = state.cartItems.find((item) => item.id === itemID);
      currentItem.amountItem = currentItem.amountItem + 1;
    },
    decrease: (state, action) => {
      const itemID = action.payload;
      const currentItem = state.cartItems.find((item) => item.id === itemID);
      currentItem.amountItem = currentItem.amountItem - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amountItem;
        total += item.amountItem * item.price;
      });
      state.amount = amount;
      state.total = total.toFixed(2);
    },
  },
});
export const {
  addToCart,
  openCart,
  closeCart,
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
