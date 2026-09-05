import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch ALL residents
export const fetchResidents = createAsyncThunk(
  "residents/fetchResidents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/residents");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Residents fetch failed",
      );
    }
  },
);

// Fetch residents for ONE Care Home
export const fetchCareHomeResidents = createAsyncThunk(
  "residents/fetchCareHomeResidents",
  async (careHomeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/residents?careHome=${careHomeId}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Care Home residents fetch failed",
      );
    }
  },
);

const initialState = {
  residents: [],
  loading: false,
  error: null,
  success: false,
};

const residentSlice = createSlice({
  name: "residents",

  initialState,

  reducers: {
    setResident: (state, action) => {
      state.residents = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // ALL RESIDENTS
      .addCase(fetchResidents.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(fetchResidents.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.residents = action.payload.residents;
      })

      .addCase(fetchResidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // CARE HOME RESIDENTS
      .addCase(fetchCareHomeResidents.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(fetchCareHomeResidents.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.residents = action.payload.residents;
      })

      .addCase(fetchCareHomeResidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setResident, setLoading } = residentSlice.actions;

export default residentSlice.reducer;
