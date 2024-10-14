import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewUserDoneTasksDataType } from "@/types/NewUserDoneTasksDataType";
import axios from "axios";

interface FetchUserType {
  username: string;
  email: string;
  _id: string;
  doneTasks: NewUserDoneTasksDataType;
}

export const fetchUserDetails = createAsyncThunk<FetchUserType>(
  "userData/fetchUserDetails",
  async () => {
    try {
      const response = await axios.get("/api/users/userDetails");
      return response.data.data;
    } catch (error) {
      return "Something went wrong with downloading your data";
    }
  }
);
