import { createSlice } from "@reduxjs/toolkit";
import { authInitialState } from "./authSliceInitialState";

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState.auth,
  reducers: {
    login: (state) => {
      state.isUserLogIn = true;
    },
    logout: (state) => {
      state.isUserLogIn = false;
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
