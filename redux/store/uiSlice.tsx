import { createSlice } from "@reduxjs/toolkit";

interface userUi {
  ui: {
    darkModeTheme: boolean;
  };
}

const initialState: userUi = {
  ui: {
    darkModeTheme: true,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState.ui,
  reducers: {
    toggleTheme: (state) => {
      state.darkModeTheme = !state.darkModeTheme;
      console.log(state.darkModeTheme);
    },
  },
});

export default uiSlice.reducer;
export const { toggleTheme } = uiSlice.actions;
