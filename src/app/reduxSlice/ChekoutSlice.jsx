import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "http://127.0.0.1:8000/api/";

export const createOrder = createAsyncThunk(
  "order/create-order",
  async (orderData, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}order`, orderData, {
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
  shipping: {},
  information: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  order: {},
};

export const resetState = createAction("Reset_all");

const cartSlice = createSlice({
  name: "checkOut",
  initialState,
  reducers: {
    submitInfo: (state, action) => {
      const infoPayload = action.payload;
      state.shipping = infoPayload;
    },
    orderFilled: (state, action) => {
      const orderPayload = action.payload;
      state.order = orderPayload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.information = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(resetState, () => initialState);
  },
});
export const { submitInfo, orderFilled } = cartSlice.actions;

export default cartSlice.reducer;
