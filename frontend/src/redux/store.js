import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import careHomeReducer from "./features/careHomeSlice";
import residentReducer from "./features/residentSlice";
import notesReducer from "./features/notesSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    careHome: careHomeReducer,
    residents: residentReducer,
    notes: notesReducer,
  },
});

export default store;
