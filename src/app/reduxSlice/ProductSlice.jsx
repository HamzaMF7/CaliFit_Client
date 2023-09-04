import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {STATUS} from "../../utils/status" ;
import { baseURL } from "../../utils/api";



export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/${baseURL}product/`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPopularProducts = createAsyncThunk(
  "product/get-popular-products",
  async (_, thunkAPI) => {
    const { products } = thunkAPI.getState().product;
    const popularProducts = products?.filter(
      (product) => product.popular == true
    );
    return popularProducts;
  }
);

export const getProductsByCategory = createAsyncThunk(
  "product/get-products-by-category",
  async (category_id, thunkAPI) => {
    const { products } = thunkAPI.getState().product;
    const filteredProducts = products.filter(
      (product) => product.category_id == category_id
    );
    return filteredProducts;
  }
);

export const getSingleProduct = createAsyncThunk(
  "product/get-single-product",
  async (productId, thunkAPI) => {
    const { products } = thunkAPI.getState().product;
    const singleProduct = products.find((product) => product.id == productId);
    return singleProduct;
  }
);
export const getAddedProduct = createAsyncThunk(
  "product/get-added-product",
  async (productId, thunkAPI) => {
    const { products } = thunkAPI.getState().product;
    const  addedProduct= products.find((product) => product.id == productId);
    return addedProduct;
  }
);

export const getRelatedProducts = createAsyncThunk(
  "product/get-related-products",
  async (productId, thunkAPI) => {
    const { products } = thunkAPI.getState().product;
    const currentProduct = products.find((product) => product.id == productId);
    const relatedProducts = products.filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    );
    return relatedProducts;
  }
);

const initialState = {
  products: [],
  addedProduct :[],
  productsStatus: STATUS.IDLE,
  popularProducts: [],
  popularProductsStatus: STATUS.IDLE,
  filteredProducts: [],
  filteredStatus: STATUS.IDLE,
  singleProduct: [],
  singleProductStatus: STATUS.IDLE,
  relatedProducts: [],
  relatedProductsStatus: STATUS.IDLE,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.productsStatus = STATUS.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsStatus = STATUS.SUCCEEDED;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.productsStatus = STATUS.FAILED;
      })
      .addCase(getPopularProducts.pending, (state) => {
        state.popularProductsStatus = STATUS.LOADING;
      })
      .addCase(getPopularProducts.fulfilled, (state, action) => {
        state.popularProductsStatus = STATUS.SUCCEEDED;
        state.popularProducts = action.payload;
      })
      .addCase(getPopularProducts.rejected, (state, action) => {
        state.popularProductsStatus = STATUS.FAILED;
      })
      .addCase(getProductsByCategory.pending, (state) => {
        state.filteredStatus = STATUS.LOADING;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.filteredStatus = STATUS.SUCCEEDED;
        state.filteredProducts = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.filteredStatus = STATUS.FAILED;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.singleProductStatus = STATUS.LOADING;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.singleProductStatus = STATUS.SUCCEEDED;
        state.singleProduct = [action.payload];
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.singleProductStatus = STATUS.FAILED;
      })
      .addCase(getAddedProduct.fulfilled, (state, action) => {
        state.addedProduct = [action.payload];
      })
      .addCase(getRelatedProducts.pending, (state) => {
        state.relatedProductsStatus = STATUS.LOADING;
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.relatedProductsStatus = STATUS.SUCCEEDED;
        state.relatedProducts = action.payload;
      })
      .addCase(getRelatedProducts.rejected, (state, action) => {
        state.relatedProductsStatus = STATUS.FAILED;
      });
  },
});

export default productSlice.reducer;

