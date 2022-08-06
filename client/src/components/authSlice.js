import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    name: null,
  },
  reducers: {
    updateUser: (state, action) => {
      console.log(action.payload);
      state.name = action.payload;
    },
  },
});
// selectCount is a selector function.
export const selectUser = (state) => state.user.name;
// createSlice() automatically creates action creators
export const { updateUser } = authSlice.actions;
// exporting the counter slice reducer function
export default authSlice.reducer;
