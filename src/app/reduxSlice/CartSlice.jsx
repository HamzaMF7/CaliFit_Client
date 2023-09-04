import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialState = {
  cartItems: [],
  isOpen: false,
  amount: 0,
  total: 0,
  isLoading: true,
  loadingItems: {},
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
    startLoading: (state, action) => {
      state.loadingItems[action.payload.itemId] = true;
    },
    stopLoading: (state, action) => {
      state.loadingItems[action.payload.itemId] = false;
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
  startLoading, 
  stopLoading
} = cartSlice.actions;

export default cartSlice.reducer;

// amountItem
// :
// 1
// category
// :
// "push"
// category_id
// :
// 1
// created_at
// :
// "2023-07-07T17:04:00.000000Z"
// description
// :
// "Our parallettes offer an optimal grip with their 40mm beech wood construction. The combination of wood and steel ensures a solid and durable build, providing you with a reliable platform for your workouts. Not only are they sturdy, but they are also designed for convenience. The parallettes are easy to store and transport, making them ideal for home gyms or on-the-go training. With each purchase, you'll receive two parallettes along with useful accessories to further enhance your training experience"
// id
// :
// 30
// image_url
// :
// (8) ['images/16889872891parallettesmaxbygornation.jpg', 'images/16889872892parallettesmaxbygornationsidevidew.webp', 'images/16889872893parallettesmaxbygornation.webp', 'images/1688987289calisthenics-athlete-holding-straddle-planche-on-high-parallettes.webp', 'images/1688987289calisthenics-athlete-holding-tuck…lanche-on-high-parallettes-beginner-exercise.webp', 'images/1688987289female-calisthenics-athlete-doing-beginner-exercises-on-high-parallettes.webp', 'images/1688987289gornation-parallettes-max-athlete-moodshot.webp', 'images/1688987289gornation-parallettes-max-deep-push-ups-range-of-motion.webp']
// price
// :
// "500.00"
// quantity
// :
// 10
// title
// :
// "Premium Parallettes MAX"
// updated_at
// :
// "2023-07-10T11:08:09.000000Z"
