import { createSlice } from "@reduxjs/toolkit";
import { userSliceInitialState } from "./userSliceInitialState";

const userSlice = createSlice({
  name: "userData",
  initialState: userSliceInitialState.userData,
  reducers: {
    updateUserData: (state, { payload }) => {
      state.username = payload.username;
      state.email = payload.email;
      state.userId = payload._id;
      state.doneTasks = payload.doneTasks;
    },
    updateUserTaskValue: (state, { payload }) => {
      const { category, taskImportance } = payload;
      state.doneTasks.categories[category]++;
      state.doneTasks.importanceLevel[taskImportance]++;
    },
  },
});
export default userSlice.reducer;
export const { updateUserData, updateUserTaskValue } = userSlice.actions;
