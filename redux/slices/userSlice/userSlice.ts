import { createSlice } from "@reduxjs/toolkit";
import { userSliceInitialState } from "./userSliceInitialState";
import { finishUserTask } from "./userThunk/finishUserTask";
import { fetchUserDetails } from "./userThunk/fetchUserDetails";
import { LoadingStates } from "./UserSliceInitialState.Type";

const userSlice = createSlice({
  name: "userData",
  initialState: userSliceInitialState,
  reducers: {
    updateUserData: (state, { payload }) => {
      state.loading = LoadingStates.IDLE;
      state.username = payload.username;
      state.email = payload.email;
      state.userId = payload._id;
      state.doneTasks = payload.doneTasks;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = LoadingStates.PENDING;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, { payload }) => {
      state.loading = LoadingStates.SUCCEEDED;
      state.username = payload.username;
      state.email = payload.email;
      state.userId = payload._id;
      state.doneTasks = payload.doneTasks;
    });
    builder.addCase(finishUserTask.fulfilled, (state, { payload }) => {
      const { category, taskImportance } = payload;
      state.doneTasks.categories[category]++;
      state.doneTasks.importanceLevel[taskImportance]++;
    });
  },
});
export default userSlice.reducer;
export const { updateUserData } = userSlice.actions;
