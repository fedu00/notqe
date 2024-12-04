export enum LoadingStates {
  IDLE = "idle",
  PENDING = "pending",
  SUCCEEDED = "succeeded",
  DAILED = "failed",
}

export interface UserSliceInitialStateType {
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
  loading: LoadingStates;
}
