import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postOrder = createAsyncThunk("orders/postOrder", async (order) => {
  const response = await axios.post("http://localhost:3000/orders", order);
  return response.data;
});

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async () => {
    const response = await axios.get("http://localhost:3000/orders");
    return response.data;
  }
);

export const deleteOrders = createAsyncThunk(
  "orders/deleteOrder",
  async (id) => {
    await axios.delete(`http://localhost:3000/orders/${id}`);
    return id;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    listOrder: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listOrder.push(action.payload);
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listOrder = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteOrders.fulfilled, (state, action) => {
        const indexOrder = state.listOrder.findIndex(
          (order) => order.id === action.payload
        );
        state.listOrder.splice(indexOrder, 1);
      });
  },
});

export default ordersSlice.reducer;
