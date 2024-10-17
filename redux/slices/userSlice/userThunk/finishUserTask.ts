import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewUserDoneTasksDataType } from "@/types/NewUserDoneTasksDataType";
import { ThunkApiConfigType } from "@/types/ThunkApiConfigType";
import axios from "axios";

type FinishUserThunkReturnType = {
  category: string;
  taskImportance: string;
};

type FinishUserThunkArgType = {
  taskId: string;
  category: string;
  taskImportance: string;
  doneTasks: NewUserDoneTasksDataType;
};

export const finishUserTask = createAsyncThunk<
  FinishUserThunkReturnType,
  FinishUserThunkArgType,
  ThunkApiConfigType
>(
  "userData/finishUserTask",
  async ({ taskId, category, taskImportance }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/usersTasks?id=${taskId}`
      );
      return { category, taskImportance };
    } catch (error) {
      return rejectWithValue("Something went wrong when you finished task");
    }
  }
);
