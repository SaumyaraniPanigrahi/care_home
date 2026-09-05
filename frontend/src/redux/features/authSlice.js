import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        loginData,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

const initialState = {
  user: "",
  token: null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.success = false;
      });
  },
});

export const { setUser, setToken, setLoading } = authSlice.actions;

export default authSlice.reducer;
