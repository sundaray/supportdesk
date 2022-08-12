import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components//clientState/authSlice";

export default configureStore({
  reducer: {
    user: authReducer,
  },
});
