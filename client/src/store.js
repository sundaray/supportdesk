import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/authSlice";

const token = localStorage.getItem("authStatus")
  ? JSON.parse(localStorage.getItem("authStatus"))
  : null;

const preloadedState = {
  user: {
    jwt: token,
  },
};

export default configureStore({
  reducer: {
    user: authReducer,
  },
  preloadedState: preloadedState || {},
});
