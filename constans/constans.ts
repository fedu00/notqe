export const NEW_USER_DONE_TASKS_DATA = {
  categories: {
    health: 0,
    work: 0,
    study: 0,
    other: 0,
  },
  importanceLevel: {
    noImportant: 0,
    lessImportant: 0,
    mediumImportant: 0,
    important: 0,
    veryImportant: 0,
  },
};

export const TASK_CATEGORY_LIST = ["health", "work", "study", "other"];
export const FULL_TASK_CATEGORY_LIST = ["all", ...TASK_CATEGORY_LIST];

export const TASK_LVL_IMPORTANCE_LIST = [
  "no important",
  "less important",
  "medium",
  "important",
  "very important",
];
export const FULL_TASK_LVL_IMPORTANCE_LIST = [
  "all",
  ...TASK_LVL_IMPORTANCE_LIST,
];
