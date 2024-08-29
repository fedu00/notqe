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

export type TaskType = {
  title: string;
  description: string;
  category: string;
  importanceLevel: string;
};

export interface TaskComponentType {
  task: TaskType;
  id: string;
  userID: string;
  handleUpdateTasks(id: string): void;
}
