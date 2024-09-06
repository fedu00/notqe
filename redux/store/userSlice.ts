import { createSlice } from "@reduxjs/toolkit";

interface userData {
  userData: {
    username: string;
    email: string;
    userId: string;
    doneTasks: {
      categories: {
        health: number;
        other: number;
        study: number;
        work: number;
      };
      importanceLevel: {
        important: number;
        lessImportant: number;
        mediumImportant: number;
        noImportant: number;
        veryImportant: number;
      };
    };
  };
}

const initialState: userData = {
  userData: {
    username: "unknow",
    email: "",
    userId: "",
    doneTasks: {
      categories: {
        health: 0,
        other: 0,
        study: 0,
        work: 0,
      },
      importanceLevel: {
        important: 0,
        lessImportant: 0,
        mediumImportant: 0,
        noImportant: 0,
        veryImportant: 0,
      },
    },
  },
};

const userDataSlice = createSlice({
  name: "userData",
  initialState: initialState.userData,
  reducers: {
    getUserData: (state, { payload }) => {
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
export default userDataSlice.reducer;
export const { getUserData, updateUserTaskValue } = userDataSlice.actions;
