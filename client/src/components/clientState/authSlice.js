import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    jwt: null,
    name: null,
  },
  reducers: {
    updateJwt: (state, action) => {
      state.jwt = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    logout: (state) => {
      state.name = null;
      state.jwt = null;
    },
  },
});
// selectCount is a selector function.
export const selectJwt = (state) => state.user.jwt;
export const selectName = (state) => state.user.name;
// createSlice() automatically creates action creators
export const { updateJwt, updateName, logout } = authSlice.actions;
// exporting the counter slice reducer function
export default authSlice.reducer;
