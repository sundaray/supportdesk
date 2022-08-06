import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/authSlice";

export default configureStore({
  reducer: {
    user: authReducer,
  },
});
