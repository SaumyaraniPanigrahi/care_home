import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "User fetch failed",
      );
    }
  },
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.users = action.payload.users;
      })

      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },

  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
