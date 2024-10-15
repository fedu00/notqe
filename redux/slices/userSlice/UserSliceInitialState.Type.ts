export interface UserSliceInitialStateType {
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
  loading: "idle" | "pending" | "succeeded" | "failed";
}
