import { createSlice } from "@reduxjs/toolkit";

interface isUserLogInState {
  isUserLogIn: boolean;
}

const initialState: isUserLogInState = {
  isUserLogIn: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logIn: (state) => {
      state.isUserLogIn = true;
    },
    logOut: (state) => {
      state.isUserLogIn = false;
    },
  },
});

export default authSlice.reducer;
export const { logIn, logOut } = authSlice.actions;
