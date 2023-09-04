import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/api";



export const createCustomer = createAsyncThunk(
  "customer/create-customer",
  async (customerData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/${baseURL}customer`, customerData, {
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
  customer: {},
  Loading: false,
  Error: false,
  Success: false,
};

export const resetCustomer = createAction("Reset_all");

const cartSlice = createSlice({
  name: "Customers",
  initialState,
  reducers: {
    customerFilled: (state, action) => {
      const customerPayload = action.payload;
      state.customer = customerPayload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.Loading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.Loading = false;
        state.Error = false;
        state.Success = true;
        state.customer = action.payload;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.Loading = false;
        state.Error = true;
        state.Success = false;
      })
      .addCase(resetCustomer, () => initialState);
  },
});
export const { customerFilled } = cartSlice.actions;

export default cartSlice.reducer;
