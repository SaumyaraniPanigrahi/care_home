import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const fetchResidentNotes = createAsyncThunk(
  "notes/fetchResidentNotes",
  async (residentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/residents/${residentId}/notes`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch resident notes",
      );
    }
  },
);

export const createResidentNote = createAsyncThunk(
  "notes/createResidentNote",
  async ({ residentId, note }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/residents/${residentId}/notes`,
        {
          note,
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create resident note",
      );
    }
  },
);

const initialState = {
  notes: [],
  loading: false,
  saving: false,
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,

  reducers: {
    clearNotesError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchResidentNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchResidentNotes.fulfilled, (state, action) => {
        state.loading = false;

        state.notes = action.payload.notes || [];
      })

      .addCase(fetchResidentNotes.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(createResidentNote.pending, (state) => {
        state.saving = true;
        state.error = null;
      })

      .addCase(createResidentNote.fulfilled, (state, action) => {
        state.saving = false;

        if (action.payload.note) {
          state.notes.unshift(action.payload.note);
        }
      })

      .addCase(createResidentNote.rejected, (state, action) => {
        state.saving = false;

        state.error = action.payload;
      });
  },
});

export const { clearNotesError } = notesSlice.actions;

export default notesSlice.reducer;
