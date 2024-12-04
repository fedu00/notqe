import { UserSliceInitialStateType } from "./UserSliceInitialState.Type";
import { LoadingStates } from "./UserSliceInitialState.Type";

export const userSliceInitialState: UserSliceInitialStateType = {
  username: "unknown",
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
  loading: LoadingStates.IDLE,
};
