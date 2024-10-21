type UserDataTasksCategoryType = {
  health: number;
  work: number;
  study: number;
  other: number;
};
type UserDataTasksImportanceLevelType = {
  noImportant: number;
  lessImportant: number;
  mediumImportant: number;
  important: number;
  veryImportant: number;
};

export type NewUserDoneTasksDataType = {
  categories: UserDataTasksCategoryType;
  importanceLevel: UserDataTasksImportanceLevelType;
};
