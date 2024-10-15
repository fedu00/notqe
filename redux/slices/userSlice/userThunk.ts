import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewUserDoneTasksDataType } from "@/types/NewUserDoneTasksDataType";
import axios from "axios";

interface FetchUserType {
  username: string;
  email: string;
  _id: string;
  doneTasks: NewUserDoneTasksDataType;
}
interface FinishUserTaskType {
  taskId: string;
  category: string;
  taskImportance: string;
  doneTasks: NewUserDoneTasksDataType;
}

export const fetchUserDetails = createAsyncThunk<
  FetchUserType,
  void,
  { rejectValue: string }
>("userData/fetchUserDetails", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/users/userDetails");
    return response.data.data;
  } catch (error) {
    return rejectWithValue("Something went wrong with downloading your data");
  }
});

export const finishUserTask = createAsyncThunk<
  { category: string; taskImportance: string },
  FinishUserTaskType,
  { rejectValue: string }
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
