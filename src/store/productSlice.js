import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUS } from "../utils/status";

export const getProductId = createAsyncThunk(
  "products/getProductId",
  async (id, { dispatch, rejectWithValue }) => {
    console.log(id);
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/products/${id}`
      );
      if (response.status === 200) {
        dispatch(fetchProducts());
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    productEdit: {},
    data: [],
    status: STATUS.IDLE,
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    addProduct(state, action) {
      state.data.push(action.payload);
    },
    deleteProduct(state, action) {
      state.data = state.data.filter(
        (product) => product.id !== action.payload
      );
    },
    editProduct(state, action) {
      const index = state.data.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getProductId.fulfilled, (state, action) => {
        state.productEdit = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = STATUS.IDLE;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { setProducts, setStatus, addProduct, editProduct } =
  productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = () => async (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  try {
    const response = await axios.get(`http://localhost:3000/products`);
    dispatch(setProducts(response.data));
    dispatch(setStatus(STATUS.IDLE));
  } catch (error) {
    dispatch(setStatus(STATUS.ERROR));
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/products`,
      product
    );
    dispatch(addProduct(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/products/${product.id}`,
      product
    );
    dispatch(editProduct(response.data));
  } catch (error) {
    console.error(error);
  }
};
