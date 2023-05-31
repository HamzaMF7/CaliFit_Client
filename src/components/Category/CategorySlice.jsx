// import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
// import axios from "axios";


// export const getProductsByCategory = createAsyncThunk(
//   "product/Category",
//   async ( id_category , thunkAPI) => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_STRIPE_APP_DEV_URL +`product/category/${id_category}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const getSingleProduct = createAsyncThunk(
//   "product/singleProduct",
//   async (id_product , thunkAPI) => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_STRIPE_APP_DEV_URL +`product/${id_product}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// )

// const initialState = {
//   products: [],
//   isError: false,
//   isLoading: false,
//   isSuccess: false,
//   message: "",
// };
// export const resetState = createAction("Reset_all");
// export const restESL = createAction("Reset_Loading&Success&Error");

// const categorySlice = createSlice({
//   name: "products",
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(getProductsByCategory.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getProductsByCategory.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.products = action.payload;
//       })
//       .addCase(getProductsByCategory.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.error;
//       })
//       .addCase(getSingleProduct.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getSingleProduct.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.products = action.payload;
//       })
//       .addCase(getSingleProduct.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.error;
//       })
//       .addCase(resetState, () => initialState)
//       .addCase(restESL(), (state) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = false;
//       });
//   },
// });

// export default categorySlice.reducer;
