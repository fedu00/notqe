export type DoneTasksType = {
  categories: {
    health: number;
    work: number;
    study: number;
    other: number;
  };
  importanceLevel: {
    noImportant: number;
    lessImportant: number;
    mediumImportant: number;
    important: number;
    veryImportant: number;
  };
};
