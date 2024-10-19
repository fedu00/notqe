import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewUserDoneTasksDataType } from "@/types/NewUserDoneTasksDataType";
import { ThunkApiConfigType } from "@/types/ThunkApiConfigType";
import clientApi from "@/apiClients/clientApi";

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
  async (
    { taskId, category, taskImportance },
    { getState, rejectWithValue }
  ) => {
    try {
      await clientApi.delete(`/usersTasks/${taskId}`);
      const { userId, doneTasks } = getState().userData;

      await clientApi.put("/users/login", {
        userId: userId,
        doneTasks: {
          ...doneTasks,
          categories: {
            ...doneTasks.categories,
            [category]: doneTasks.categories[category] + 1,
          },
          importanceLevel: {
            ...doneTasks.importanceLevel,
            [taskImportance]: doneTasks.importanceLevel[taskImportance] + 1,
          },
        },
      });

      return { category, taskImportance };
    } catch (error) {
      return rejectWithValue("Something went wrong when you finished task");
    }
  }
);
