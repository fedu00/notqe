import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewUserDoneTasksDataType } from "@/types/NewUserDoneTasksDataType";
import { ThunkApiConfigType } from "@/types/ThunkApiConfigType";
import tasksApi from "@/apiClients/tasksApi";
import usersApi from "@/apiClients/usersAPi";

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
      await tasksApi.delete(`?id=${taskId}`);
      const { userId, doneTasks } = getState().userData;

      await usersApi.put("/login", {
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
