import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCartOfUser = createAsyncThunk(
  "cart/getCartOfUser",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:3000/carts?userId=${userId}`
    );
    return response.data;
  }
);

export const addCartOfUser = createAsyncThunk(
  "cart/addCartOfUser",
  async (cart) => {
    console.log(cart);
    try {
      const response = await axios.post(`http://localhost:3000/carts`, cart);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateQuantityOfCartItem = createAsyncThunk(
  "cart/updateQuantityOfCartItem",
  async ({ userId, cartId, quantity }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/carts/${cartId}`,
        {
          quantity,
        }
      );
      return { cartId, quantity: response.data.quantity };
    } catch (error) {
      console.error(error);
    }
  }
);

export const removeCartOfUser = createAsyncThunk(
  "cart/removeCartOfUser",
  async (id) => {
    try {
      await axios.delete(`http://localhost:3000/carts/${id}`);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const emptyCartOfUser = createAsyncThunk(
  "cart/emptyCartOfUser",
  async (userId) => {
    try {
      const currentCart = await axios.get(
        `http://localhost:3000/carts?userId=${userId}`
      );
      console.log(currentCart);
      const deletePromises = currentCart.data.map((item) =>
        axios.delete(`http://localhost:3000/carts/${item.id}`)
      );
      await Promise.all(deletePromises);
      return userId;
    } catch (error) {
      console.error(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartOfUser.fulfilled, (state, action) => {
      state.carts = action.payload;
    });
    builder.addCase(addCartOfUser.fulfilled, (state, action) => {
      state.carts.push(action.payload);
    });
    builder.addCase(removeCartOfUser.fulfilled, (state, action) => {
      const indexCart = state.carts.findIndex(
        (item) => item.id === action.payload
      );
      state.carts.splice(indexCart, 1);
    });
    builder.addCase(updateQuantityOfCartItem.fulfilled, (state, action) => {
      const { cartId, quantity } = action.payload;
      const indexCart = state.carts.findIndex((item) => item.id === cartId);
      if (indexCart !== -1) {
        state.carts[indexCart].quantity = quantity;
      }
    });

    builder.addCase(emptyCartOfUser.fulfilled, (state, action) => {
      state.carts = [];
    });
  },
});

export const selectTotalPrice = (state) =>
  state.cart.carts.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );

export default cartSlice.reducer;
