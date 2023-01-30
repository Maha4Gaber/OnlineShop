import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const productsFetch
const initialState = {
  items: [],
  status: null,
};

export const productsFetch = createAsyncThunk(
  'products/productsFetch',
  async() => {
    const respons = await axios.get('https://fakestoreapi.com/products');
    return respons?.data
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state,action) => {
      state.status = 'pending';
    },
    [productsFetch.fulfilled]: (state,action) => {
      state.status = 'Success';
      state.items = action.payload;
    },
    [productsFetch.rejected]: (state,action) => {
      state.status = 'rejected';
    },
  },
});

export default productsSlice.reducer;
