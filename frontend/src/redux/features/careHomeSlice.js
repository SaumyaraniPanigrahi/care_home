import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCareHomes = createAsyncThunk(
  "careHomes/fetchCareHomes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/care-homes");
      return response.data.careHomes;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch care homes",
      );
    }
  },
);
const initialState = {
  careHomes: [],
  loading: false,
  error: null,
};

const careHomeSlice = createSlice({
  name: "careHomes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareHomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareHomes.fulfilled, (state, action) => {
        state.loading = false;
        state.careHomes = action.payload;
      })
      .addCase(fetchCareHomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default careHomeSlice.reducer;
