import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/api";


export const createOrder = createAsyncThunk(
  "order/create-order",
  async (orderData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/${baseURL}order`, orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  orderObjects: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const resetState = createAction("Reset_all");

const cartSlice = createSlice({
  name: "checkOut",
  initialState,
  // reducers: {
  //   submitInfo: (state, action) => {
  //     const infoPayload = action.payload;
  //     state.shipping = infoPayload;
  //   },
  //   orderFilled: (state, action) => {
  //     const orderPayload = action.payload;
  //     state.order = orderPayload;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderObjects = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(resetState, () => initialState);
  },
});
// export const { submitInfo, orderFilled } = cartSlice.actions;

export default cartSlice.reducer;
