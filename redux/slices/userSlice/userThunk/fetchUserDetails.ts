import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewUserDoneTasksDataType } from "@/types/NewUserDoneTasksDataType";
import { ThunkApiConfigType } from "@/types/ThunkApiConfigType";
import usersApi from "@/apiClients/usersAPi";

type FetchUserThunkReturnType = {
  username: string;
  email: string;
  _id: string;
  doneTasks: NewUserDoneTasksDataType;
};

export const fetchUserDetails = createAsyncThunk<
  FetchUserThunkReturnType,
  void,
  ThunkApiConfigType
>("userData/fetchUserDetails", async (_, { rejectWithValue }) => {
  try {
    const response = await usersApi.get("/userDetails");
    return response.data.data;
  } catch (error) {
    return rejectWithValue("Something went wrong with downloading your data");
  }
});
