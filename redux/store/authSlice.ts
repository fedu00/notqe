import { createSlice } from "@reduxjs/toolkit";

interface userAuth {
  auth: {
    isUserLogIn: boolean;
    userDetails: any;
  };
}

const initialState: userAuth = {
  auth: {
    isUserLogIn: false,
    userDetails: {},
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState.auth,
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
