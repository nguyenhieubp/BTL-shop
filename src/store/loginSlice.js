import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserCart = createAsyncThunk(
  "login/getUserCart",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/carts?userId=${id}`
      );
      const carts = response.data;
      return carts;
    } catch (error) {
      console.log("Failed to fetch cart", error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data;
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        localStorage.setItem("userId", user.id);
        return { username: user.username };
      } else {
        return thunkAPI.rejectWithValue({
          error: "Invalid username or password",
        });
      }
    } catch (error) {
      console.log("Failed to login", error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getUser = createAsyncThunk("login/getUser", async (thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:3000/users");
    const users = response.data;
    return users;
  } catch (error) {
    console.log("Failed to login", error);
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const getUserById = createAsyncThunk(
  "login/getUserById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/users/" + id);
      const users = response.data;
      return users;
    } catch (error) {
      console.log("Failed to login", error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getUserCurrent = createAsyncThunk(
  "login/getUserCurrent",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/users/" + id);
      const users = response.data;
      return users;
    } catch (error) {
      console.log("Failed to login", error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateUser = createAsyncThunk(
  "login/updateUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${user.id}`,
        {
          email: user.email,
          password: user.password,
        }
      );
      const users = response.data;
      return users;
    } catch (error) {
      console.log("Failed to update", error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteUsers = createAsyncThunk(
  "login/deleteUser",
  async (id, thunkAPI) => {
    try {
      await axios.delete("http://localhost:3000/users/" + id);
      return id;
    } catch (error) {
      console.log("Failed to login", error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    error: null,
    users: [],
    userUpdate: null,
    userCurrent: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.error;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        const indexUser = state.users.findIndex(
          (user) => user.id === action.payload
        );
        state.users.splice(indexUser, 1);
        console.log(state.users);
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userUpdate = action.payload;
      })
      .addCase(getUserCurrent.fulfilled, (state, action) => {
        state.userCurrent = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userUpdate = action.payload;

        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );

        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.userCart = action.payload;
      });
  },
});

export default loginSlice.reducer;
